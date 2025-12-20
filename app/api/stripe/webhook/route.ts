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
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('email', params.email)
      .single()

    if (data?.id) return data.id
  }

  return undefined
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
        const supabaseUserId = session.metadata?.supabase_user_id as string | undefined

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

          const updates: Database['public']['Tables']['users']['Update'] = {
            has_access: true,
          }

          if (customerId) {
            updates.stripe_customer_id = customerId
          }

          const { error: updateError } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)

          if (updateError) {
            console.error('Error updating user access from checkout:', updateError)
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

          const updates: Database['public']['Tables']['users']['Update'] = {
            has_access: true,
          }

          if (customerId) {
            updates.stripe_customer_id = customerId
          }

          const { error: updateError } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)

          if (updateError) {
            console.error('Error updating user access from checkout:', updateError)
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

        const updates: Database['public']['Tables']['users']['Update'] = {
          has_access: shouldHaveAccess,
        }

        if (customerId) {
          updates.stripe_customer_id = customerId
        }

        const { error: updateError } = await supabase
          .from('users')
          .update(updates)
          .eq('id', userId)

        if (updateError) {
          console.error('Error syncing subscription access:', updateError)
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
