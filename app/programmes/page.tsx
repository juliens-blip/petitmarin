import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProgrammeVideoSection } from '@/components/programmes/ProgrammeVideoSection'

export default function ProgrammesPage() {
  const programs = [
    {
      id: 'navigateur',
      title: 'Navigateur Confiant',
      price: '99€',
      description: 'Formation complète pour débutants',
      features: [
        'Les 6 modules complets',
        'Accès à vie au contenu',
        'Support par email',
        'Ressources téléchargeables (PDFs, checklists)',
        'Mises à jour gratuites',
      ],
      stripeLink: 'https://buy.stripe.com/00w5kD4fscjmd8Y4VHcbC00',
    },
    {
      id: 'capitaine',
      title: 'Capitaine Averti',
      price: '149€',
      description: 'Pour une expertise approfondie',
      features: [
        'Tout du Navigateur Confiant',
        '2 sessions de coaching individuel',
        'Checklist personnalisée selon votre projet',
        'Accès prioritaire au support',
        'Groupe privé d\'entraide',
      ],
      featured: true,
      stripeLink: 'https://buy.stripe.com/00w5kD4fscjmd8Y4VHcbC00',
    },
    {
      id: 'marin',
      title: 'Marin Expert',
      price: '249€',
      description: 'Accompagnement premium',
      features: [
        'Tout du Capitaine Averti',
        'Accompagnement personnalisé tout au long du processus',
        'Aide à la négociation avec le vendeur',
        'Support téléphonique prioritaire',
        'Analyse personnalisée de vos annonces',
      ],
      stripeLink: 'https://buy.stripe.com/00w5kD4fscjmd8Y4VHcbC00',
    },
  ]

  const modules = [
    {
      number: 1,
      title: 'Les fondamentaux de l\'achat de bateau',
      description: 'Définir votre budget, comprendre les coûts cachés',
    },
    {
      number: 2,
      title: 'Budget et financement',
      description: 'Options de financement, assurances, garanties',
    },
    {
      number: 3,
      title: 'L\'inspection technique',
      description: 'Détecter les problèmes, checklist complète',
    },
    {
      number: 4,
      title: 'Les aspects juridiques',
      description: 'Paperasse, immatriculation, documents obligatoires',
    },
    {
      number: 5,
      title: 'Négociation et achat',
      description: 'Techniques de négociation, finaliser l\'achat',
    },
    {
      number: 6,
      title: 'Post-achat et entretien',
      description: 'Premiers pas, maintenance, hivernage',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center justify-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Programmes de Formation
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Choisissez la formule qui correspond à vos besoins et devenez propriétaire en toute confiance
          </p>
        </div>
      </section>

      {/* Programs Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre programme
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Paiement unique • Accès à vie • Sans abonnement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.id}
                className={`bg-white rounded-xl shadow-xl overflow-hidden border-2 ${
                  program.featured ? 'border-[#007bff] scale-105 relative' : 'border-gray-200'
                }`}
              >
                {program.featured && (
                  <div className="bg-[#007bff] text-white text-center py-3 font-bold text-lg">
                    ⭐ LE PLUS POPULAIRE
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <div className="mb-8">
                    <span className="text-6xl font-bold text-[#007bff]">
                      {program.price}
                    </span>
                    <div className="text-gray-500 mt-2">Paiement unique</div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[#28a745] mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={program.stripeLink}
                    className={`block text-center px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                      program.featured
                        ? 'bg-[#007bff] text-white hover:bg-[#0056b3] shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Commencer maintenant
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce qui est inclus dans chaque programme
            </h2>
            <p className="text-xl text-gray-600">
              6 modules complets pour maîtriser tous les aspects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {modules.map((module) => (
              <div
                key={module.number}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007bff] to-[#28a745] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {module.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {module.title}
                  </h3>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Découvrez la formation en vidéo
              </h2>
              <p className="text-xl text-gray-600">
                Une présentation complète de ce qui vous attend
              </p>
            </div>
            <ProgrammeVideoSection />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Combien de temps ai-je accès à la formation ?
                </h3>
                <p className="text-gray-600">
                  Vous avez un accès à vie à tous les contenus de la formation. Vous pouvez la suivre
                  à votre rythme et y revenir autant de fois que vous le souhaitez.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Y a-t-il une garantie satisfait ou remboursé ?
                </h3>
                <p className="text-gray-600">
                  Oui ! Vous disposez de 30 jours pour tester la formation. Si elle ne vous convient
                  pas, nous vous remboursons intégralement, sans question.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  La formation convient-elle aux débutants ?
                </h3>
                <p className="text-gray-600">
                  Absolument ! La formation est conçue pour accompagner aussi bien les débutants que
                  les personnes ayant déjà quelques connaissances. Nous partons des bases et allons
                  jusqu'aux aspects les plus techniques.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Puis-je poser des questions pendant la formation ?
                </h3>
                <p className="text-gray-600">
                  Oui, tous les programmes incluent un support par email. Les programmes Capitaine
                  Averti et Marin Expert incluent également des sessions de coaching et un support
                  prioritaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.9), rgba(25, 195, 125, 0.9))',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez des centaines d'acheteurs satisfaits et réussissez votre achat
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={programs[1].stripeLink}
                className="inline-block px-8 py-4 bg-white text-[#007bff] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
              >
                Choisir Capitaine Averti - 149€
              </a>
              <Link
                href="/connexion"
                className="text-white underline hover:no-underline"
              >
                Déjà client ? Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
