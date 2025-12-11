import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

export async function createCheckoutSession(
  email: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Formation NaviGuide - Achat de Bateau',
            description: 'Accès complet aux 6 modules de formation',
            images: ['https://www.dropbox.com/scl/fi/y9vjgzmh1pywu7puy83qs/unnamed-2025-09-02T180151.475.png?rlkey=oyo05s8l93p4ffe3c20ghwk68&dl=1'],
          },
          unit_amount: 9900, // 99€ in cents
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}
