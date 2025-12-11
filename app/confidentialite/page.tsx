import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ArrowLeft, Shield } from 'lucide-react'

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue">
              ⚓ NaviGuide
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-blue" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : Décembre 2025
            </p>
          </div>

          {/* Content */}
          <Card>
            <CardBody className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des Données</h2>
                <p className="text-gray-700 mb-4">
                  NaviGuide collecte les données suivantes :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Données d'identification (nom, prénom, email)</li>
                  <li>Données de connexion (adresse IP, logs)</li>
                  <li>Données de paiement (via Stripe, non stockées par NaviGuide)</li>
                  <li>Progression dans la formation</li>
                  <li>Questions posées dans les modules</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des Données</h2>
                <p className="text-gray-700 mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Gérer votre accès à la formation</li>
                  <li>Vous envoyer vos identifiants de connexion</li>
                  <li>Répondre à vos questions</li>
                  <li>Améliorer nos services</li>
                  <li>Vous informer des mises à jour (avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection des Données</h2>
                <p className="text-gray-700">
                  Nous utilisons des mesures de sécurité techniques et organisationnelles pour protéger
                  vos données personnelles. Nos services sont hébergés sur des serveurs sécurisés
                  (Supabase, Vercel).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des Données</h2>
                <p className="text-gray-700">
                  Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement
                  avec nos prestataires techniques (Stripe pour le paiement, Supabase pour l'hébergement)
                  dans le cadre strict de la fourniture du service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos Droits (RGPD)</h2>
                <p className="text-gray-700 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Pour exercer ces droits, contactez-nous à :
                  <a href="mailto:contact@naviguide.fr" className="text-blue hover:underline ml-2">
                    contact@naviguide.fr
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
                <p className="text-gray-700">
                  Notre site utilise des cookies essentiels pour le fonctionnement de la plateforme
                  (authentification, préférences). Aucun cookie de tracking publicitaire n'est utilisé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conservation des Données</h2>
                <p className="text-gray-700">
                  Vos données sont conservées aussi longtemps que vous disposez d'un accès à la formation.
                  Vous pouvez demander la suppression de votre compte à tout moment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
                <p className="text-gray-700">
                  Pour toute question concernant la protection de vos données :
                  <a href="mailto:contact@naviguide.fr" className="text-blue hover:underline ml-2">
                    contact@naviguide.fr
                  </a>
                </p>
              </section>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  )
}
