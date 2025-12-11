import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Sparkles } from 'lucide-react'

export default async function PaiementSuccessPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
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
                Votre accès est maintenant activé. Commencez votre formation dès maintenant !
              </p>
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Accéder à mon dashboard
                </Button>
              </Link>
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
