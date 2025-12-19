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
    const { data: profile } = await supabase
      .from('users')
      .select('email, stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!profile?.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const { origin } = new URL(request.url)
    const session = await createCheckoutSession({
      email: profile.email,
      userId: user.id,
      priceId,
      successUrl: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/dashboard`,
      customerId: profile.stripe_customer_id,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
