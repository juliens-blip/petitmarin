import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Sparkles } from 'lucide-react'

const allowedPriceId = process.env.STRIPE_PRICE_ID

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

type AccessResult = {
  granted: boolean
  reason?: string
}

function normalizeEmail(email?: string | null) {
  const trimmed = email?.trim()
  return trimmed ? trimmed.toLowerCase() : undefined
}

function emailsMatch(a?: string | null, b?: string | null) {
  const normalizedA = normalizeEmail(a)
  const normalizedB = normalizeEmail(b)
  return Boolean(normalizedA && normalizedB && normalizedA === normalizedB)
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

async function grantAccessFromSession(
  sessionId: string,
  userId: string,
  userEmail: string | null | undefined,
  supabaseClient: SupabaseServerClient
): Promise<AccessResult> {
  if (!allowedPriceId) {
    return { granted: false, reason: 'Stripe price id manquant.' }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const sessionUserId =
    (session.metadata?.supabase_user_id as string | undefined) ??
    (session.client_reference_id as string | undefined)
  const sessionEmail = session.customer_email || session.customer_details?.email

  if (sessionUserId) {
    if (sessionUserId !== userId && !emailsMatch(sessionEmail, userEmail)) {
      return {
        granted: false,
        reason: 'Session Stripe invalide pour cet utilisateur.',
      }
    }
  } else if (!emailsMatch(sessionEmail, userEmail)) {
    return { granted: false, reason: 'Session Stripe invalide pour cet utilisateur.' }
  }

  let customerId: string | undefined

  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
      { expand: ['items.data.price', 'customer'] }
    )

    const matchesPrice = subscription.items.data.some(
      (item) => item.price?.id === allowedPriceId
    )

    if (!matchesPrice || !isActiveSubscription(subscription.status)) {
      return { granted: false, reason: 'Abonnement Stripe non valide.' }
    }

    customerId = getCustomerId(subscription.customer)
  } else if (session.mode === 'payment') {
    if (session.payment_status !== 'paid') {
      return { granted: false, reason: 'Paiement non confirme.' }
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 10,
    })

    const matchesPrice = lineItems.data.some(
      (item) => item.price?.id === allowedPriceId
    )

    if (!matchesPrice) {
      return { granted: false, reason: 'Tarif Stripe non valide.' }
    }

    customerId = getCustomerId(session.customer)
  } else {
    return { granted: false, reason: 'Mode Stripe non pris en charge.' }
  }

  const updates = {
    has_access: true,
    ...(customerId ? { stripe_customer_id: customerId } : {}),
  }
  const normalizedEmail = normalizeEmail(userEmail)

  try {
    const supabaseAdmin = createAdminClient()
    const { data: updatedRows, error: updateError } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id')

    if (!updateError && updatedRows && updatedRows.length > 0) {
      return { granted: true }
    }

    if (!updateError && normalizedEmail) {
      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert(
          {
            id: userId,
            email: normalizedEmail,
            has_access: true,
            ...(customerId ? { stripe_customer_id: customerId } : {}),
          },
          { onConflict: 'id' }
        )

      if (!upsertError) {
        return { granted: true }
      }
    }
  } catch (error) {
    console.error('Admin update failed, falling back to user session.', error)
  }

  const { data: updatedRows, error } = await supabaseClient
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select('id')

  if (!error && updatedRows && updatedRows.length > 0) {
    return { granted: true }
  }

  if (!error && normalizedEmail) {
    const { error: upsertError } = await supabaseClient
      .from('users')
      .upsert(
        {
          id: userId,
          email: normalizedEmail,
          has_access: true,
          ...(customerId ? { stripe_customer_id: customerId } : {}),
        },
        { onConflict: 'id' }
      )

    if (!upsertError) {
      return { granted: true }
    }
  }

  if (error) {
    return { granted: false, reason: "Impossible d'activer l'acces." }
  }

  return { granted: false, reason: "Impossible d'activer l'acces." }
}

export default async function PaiementSuccessPage({
  searchParams,
}: {
  searchParams?: { session_id?: string }
}) {
  const supabase = await createClient()
  const sessionId = searchParams?.session_id

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const nextPath = sessionId
      ? `/paiement/success?session_id=${encodeURIComponent(sessionId)}`
      : '/paiement/success'
    redirect(`/connexion?next=${encodeURIComponent(nextPath)}`)
  }

  let accessResult: AccessResult | null = null

  if (sessionId) {
    accessResult = await grantAccessFromSession(
      sessionId,
      user.id,
      user.email,
      supabase
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green via-green-600 to-blue flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <Card className="text-center">
          <CardBody className="space-y-6 py-12">
            {/* Success Icon */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-white" size={48} />
              </div>
            </div>

            {/* Success Message */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Paiement réussi ! 🎉
              </h1>
              <p className="text-lg text-gray-600">
                Bienvenue à bord de NaviGuide !
              </p>
            </div>

            {accessResult && !accessResult.granted && (
              <p className="text-sm text-orange-600">
                {accessResult.reason ??
                  "Votre acces est en cours d'activation. Merci de reessayer dans quelques minutes."}
              </p>
            )}

            {/* Features List */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 text-left space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Sparkles className="text-blue flex-shrink-0" size={20} />
                <span>Accès immédiat aux 6 modules de formation</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Sparkles className="text-blue flex-shrink-0" size={20} />
                <span>Ressources téléchargeables (PDFs, guides)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Sparkles className="text-blue flex-shrink-0" size={20} />
                <span>Support et réponses à vos questions</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Sparkles className="text-blue flex-shrink-0" size={20} />
                <span>Accès à vie au contenu de la formation</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="pt-4">
              <p className="text-gray-600 mb-6">
                Votre acces est maintenant active. Commencez votre formation des maintenant !
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/modules/1">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Commencer le module 1
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Acceder a mon dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Un problème ?{' '}
                <Link href="/contact" className="text-blue hover:underline font-medium">
                  Contactez notre support
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Email Confirmation Note */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            📧 Un email de confirmation a été envoyé à votre adresse
          </p>
        </div>
      </div>
    </div>
  )
}
