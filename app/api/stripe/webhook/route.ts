import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

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

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get customer email from session
        const customerEmail = session.customer_email || session.customer_details?.email

        if (!customerEmail) {
          console.error('No customer email found in session')
          return NextResponse.json(
            { error: 'No customer email found' },
            { status: 400 }
          )
        }

        // Update user access in Supabase
        const supabase = await createClient()

        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', customerEmail)
          .single()

        if (userError || !user) {
          console.error('User not found:', customerEmail)
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          )
        }

        // Grant access
        const { error: updateError } = await supabase
          .from('users')
          .update({ has_access: true })
          .eq('id', user.id)

        if (updateError) {
          console.error('Error updating user access:', updateError)
          return NextResponse.json(
            { error: 'Error updating user access' },
            { status: 500 }
          )
        }

        console.log(`✅ Access granted to user: ${customerEmail}`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`💰 Payment succeeded: ${paymentIntent.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`❌ Payment failed: ${paymentIntent.id}`)
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
