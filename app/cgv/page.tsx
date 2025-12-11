import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ArrowLeft, FileText } from 'lucide-react'

export default function CGVPage() {
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
              <FileText className="text-blue" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : Décembre 2025
            </p>
          </div>

          {/* Content */}
          <Card>
            <CardBody className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
                <p className="text-gray-700">
                  Les présentes conditions générales de vente (CGV) régissent la vente de la formation en ligne
                  "NaviGuide - Formation à l'Achat de Bateaux" proposée par NaviGuide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Produit</h2>
                <p className="text-gray-700 mb-4">
                  La formation NaviGuide comprend :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>6 modules de formation complets</li>
                  <li>Ressources téléchargeables (PDFs, guides)</li>
                  <li>Accès à vie au contenu de la formation</li>
                  <li>Support et réponses aux questions</li>
                  <li>Mises à jour gratuites du contenu</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prix et Paiement</h2>
                <p className="text-gray-700 mb-4">
                  Le prix de la formation est de 99€ TTC (paiement unique). Le paiement est sécurisé via Stripe
                  et s'effectue en ligne par carte bancaire.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Accès à la Formation</h2>
                <p className="text-gray-700">
                  L'accès à la formation est immédiat après validation du paiement. Les identifiants de connexion
                  sont envoyés par email. L'accès est personnel et ne peut être partagé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Droit de Rétractation</h2>
                <p className="text-gray-700">
                  Conformément à la législation en vigueur, vous disposez d'un délai de 30 jours pour exercer
                  votre droit de rétractation et obtenir un remboursement intégral.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriété Intellectuelle</h2>
                <p className="text-gray-700">
                  Tous les contenus de la formation (textes, vidéos, documents) sont protégés par les droits
                  d'auteur. Toute reproduction ou distribution non autorisée est interdite.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
                <p className="text-gray-700">
                  Pour toute question concernant ces CGV, contactez-nous à :
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
