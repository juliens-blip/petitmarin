import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe/client'

export async function POST(request: Request) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price id missing' },
        { status: 500 }
      )
    }

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile to get email + Stripe customer id
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('email, stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching user profile:', profileError)
    }

    const email = profile?.email ?? user.email

    if (!email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    if (!profile && user.email) {
      const { error: upsertError } = await supabase.from('users').upsert(
        {
          id: user.id,
          email: user.email,
          full_name: (user.user_metadata?.full_name as string | undefined) ?? null,
        },
        { onConflict: 'id' }
      )

      if (upsertError) {
        console.error('Error upserting user profile:', upsertError)
      }
    }

    // Create Stripe checkout session
    const { origin } = new URL(request.url)
    const session = await createCheckoutSession({
      email,
      userId: user.id,
      priceId,
      successUrl: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/dashboard`,
      customerId: profile?.stripe_customer_id,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
