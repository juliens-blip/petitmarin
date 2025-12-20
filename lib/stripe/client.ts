import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

type CreateCheckoutSessionParams = {
  email: string
  userId: string
  priceId: string
  successUrl: string
  cancelUrl: string
  customerId?: string | null
}

export async function createCheckoutSession({
  email,
  userId,
  priceId,
  successUrl,
  cancelUrl,
  customerId,
}: CreateCheckoutSessionParams) {
  const customerConfig = customerId
    ? { customer: customerId }
    : { customer_email: email }

  const price = await stripe.prices.retrieve(priceId)
  const isRecurring = Boolean(price.recurring)

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: userId,
    metadata: { supabase_user_id: userId },
    ...(isRecurring
      ? {
          subscription_data: {
            metadata: { supabase_user_id: userId },
          },
        }
      : {}),
    allow_promotion_codes: true,
    ...customerConfig,
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}
