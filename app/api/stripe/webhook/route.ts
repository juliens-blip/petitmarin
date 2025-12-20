import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Database } from '@/types/database.types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const allowedPriceId = process.env.STRIPE_PRICE_ID

if (!webhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

function normalizeEmail(email?: string | null) {
  const trimmed = email?.trim()
  return trimmed ? trimmed.toLowerCase() : undefined
}

function isActiveSubscription(status: Stripe.Subscription.Status) {
  return status === 'active' || status === 'trialing'
}

function getCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  if (!customer) return undefined
  if (typeof customer === 'string') return customer
  return 'id' in customer ? customer.id : undefined
}

async function resolveUserId(
  supabase: ReturnType<typeof createAdminClient>,
  params: { supabaseUserId?: string; email?: string | null; customerId?: string }
) {
  if (params.supabaseUserId) return params.supabaseUserId

  if (params.customerId) {
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('stripe_customer_id', params.customerId)
      .single()

    if (data?.id) return data.id
  }

  if (params.email) {
    const normalizedEmail = normalizeEmail(params.email)
    if (!normalizedEmail) return undefined

    const { data } = await supabase
      .from('users')
      .select('id')
      .ilike('email', normalizedEmail)
      .single()

    if (data?.id) return data.id
  }

  return undefined
}

async function applyUserUpdates(
  supabase: ReturnType<typeof createAdminClient>,
  params: {
    userId: string
    hasAccess: boolean
    customerId?: string
    email?: string | null
  }
) {
  const updates: Database['public']['Tables']['users']['Update'] = {
    has_access: params.hasAccess,
  }

  if (params.customerId) {
    updates.stripe_customer_id = params.customerId
  }

  const { data: updatedRows, error: updateError } = await supabase
    .from('users')
    .update(updates)
    .eq('id', params.userId)
    .select('id')

  if (updateError) {
    return { ok: false, error: updateError }
  }

  if (updatedRows && updatedRows.length > 0) {
    return { ok: true }
  }

  const normalizedEmail = normalizeEmail(params.email)
  if (!normalizedEmail) {
    return { ok: false, error: new Error('Missing email for user upsert') }
  }

  const insertPayload: Database['public']['Tables']['users']['Insert'] = {
    id: params.userId,
    email: normalizedEmail,
    has_access: params.hasAccess,
    ...(params.customerId ? { stripe_customer_id: params.customerId } : {}),
  }

  const { error: upsertError } = await supabase
    .from('users')
    .upsert(insertPayload, { onConflict: 'id' })

  if (upsertError) {
    return { ok: false, error: upsertError }
  }

  return { ok: true }
}

export async function POST(request: Request) {
  if (!allowedPriceId) {
    return NextResponse.json(
      { error: 'Stripe price id missing' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerEmail = session.customer_email || session.customer_details?.email
        const supabaseUserId =
          (session.metadata?.supabase_user_id as string | undefined) ??
          (session.client_reference_id as string | undefined)

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
            { expand: ['items.data.price', 'customer'] }
          )

          const matchesPrice = subscription.items.data.some(
            (item) => item.price?.id === allowedPriceId
          )

          if (!matchesPrice) {
            console.log('Subscription completed with another price, ignoring')
            break
          }

          if (!isActiveSubscription(subscription.status)) {
            console.log(
              `Subscription status ${subscription.status} not granting access`
            )
            break
          }

          const customerId = getCustomerId(subscription.customer)
          const userId = await resolveUserId(supabase, {
            supabaseUserId:
              supabaseUserId ||
              (subscription.metadata?.supabase_user_id as string | undefined),
            email: customerEmail,
            customerId,
          })

          if (!userId) {
            console.error('Unable to map Stripe session to Supabase user', {
              supabaseUserId,
              customerEmail,
              customerId,
            })
            break
          }

          const updateResult = await applyUserUpdates(supabase, {
            userId,
            hasAccess: true,
            customerId,
            email: customerEmail,
          })

          if (!updateResult.ok) {
            console.error(
              'Error updating user access from checkout:',
              updateResult.error
            )
            return NextResponse.json(
              { error: 'Error updating user access' },
              { status: 500 }
            )
          }

          console.log(`Access granted to user: ${userId}`)
          break
        }

        if (session.mode === 'payment') {
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id,
            { limit: 10 }
          )

          const matchesPrice = lineItems.data.some(
            (item) => item.price?.id === allowedPriceId
          )

          if (!matchesPrice) {
            console.log('Payment completed with another price, ignoring')
            break
          }

          const customerId = getCustomerId(session.customer)
          const userId = await resolveUserId(supabase, {
            supabaseUserId,
            email: customerEmail,
            customerId,
          })

          if (!userId) {
            console.error('Unable to map Stripe session to Supabase user', {
              supabaseUserId,
              customerEmail,
              customerId,
            })
            break
          }

          const updateResult = await applyUserUpdates(supabase, {
            userId,
            hasAccess: true,
            customerId,
            email: customerEmail,
          })

          if (!updateResult.ok) {
            console.error(
              'Error updating user access from checkout:',
              updateResult.error
            )
            return NextResponse.json(
              { error: 'Error updating user access' },
              { status: 500 }
            )
          }

          console.log(`Access granted to user: ${userId}`)
          break
        }

        console.log('Checkout completed ignored: unsupported session mode')
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const matchesPrice = subscription.items.data.some(
          (item) => item.price.id === allowedPriceId
        )

        if (!matchesPrice) {
          console.log('Subscription event ignored: non-target price')
          break
        }

        const shouldHaveAccess = isActiveSubscription(subscription.status)
        const supabaseUserId = subscription.metadata
          ?.supabase_user_id as string | undefined
        const customerId = getCustomerId(subscription.customer)

        const userId = await resolveUserId(supabase, {
          supabaseUserId,
          customerId,
        })

        if (!userId) {
          console.error('Unable to map subscription to Supabase user', {
            supabaseUserId,
            customerId,
          })
          break
        }

        const updateResult = await applyUserUpdates(supabase, {
          userId,
          hasAccess: shouldHaveAccess,
          customerId,
        })

        if (!updateResult.ok) {
          console.error('Error syncing subscription access:', updateResult.error)
          return NextResponse.json(
            { error: 'Error syncing subscription access' },
            { status: 500 }
          )
        }

        console.log(
          `Subscription sync for user ${userId}: has_access=${shouldHaveAccess}`
        )
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}
