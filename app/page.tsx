import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { VideoSection } from '@/components/home/VideoSection'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'

export default function Home() {
  const programs = [
    {
      title: 'Navigateur Confiant',
      price: '99€',
      description: 'Formation complète pour débutants',
      features: [
        'Les 6 modules complets',
        'Accès à vie',
        'Support par email',
        'Ressources téléchargeables',
      ],
    },
    {
      title: 'Capitaine Averti',
      price: '149€',
      description: 'Pour une expertise approfondie',
      features: [
        'Tout du Navigateur Confiant',
        'Sessions de coaching',
        'Checklist personnalisée',
        'Accès prioritaire',
      ],
      featured: true,
    },
    {
      title: 'Marin Expert',
      price: '249€',
      description: 'Accompagnement premium',
      features: [
        'Tout du Capitaine Averti',
        'Accompagnement personnalisé',
        'Aide à la négociation',
        'Support téléphonique',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://www.dropbox.com/scl/fi/b3asvg27ad3h6k5tmnw7l/unnamed-2025-09-02T174608.918.png?rlkey=0jocpoxaqohudtqlbe2nnvihy&st=rlmdmtnc&dl=1') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Devenez propriétaire de votre bateau<br />en toute confiance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            La formation complète pour réussir l'achat de votre bateau et éviter les pièges
          </p>
          <Link
            href="/programmes"
            className="inline-block px-8 py-4 bg-white text-[#007bff] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
          >
            Découvrir nos programmes
          </Link>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50" id="programmes">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos programmes de formation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez la formule qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  program.featured ? 'ring-4 ring-[#007bff] scale-105' : ''
                }`}
              >
                {program.featured && (
                  <div className="bg-[#007bff] text-white text-center py-2 font-bold">
                    POPULAIRE
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-[#007bff]">
                      {program.price}
                    </span>
                    <span className="text-gray-500 ml-2">/ paiement unique</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-[#28a745] mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/programmes"
                    className={`block text-center px-6 py-3 rounded-lg font-bold transition-colors ${
                      program.featured
                        ? 'bg-[#007bff] text-white hover:bg-[#0056b3]'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Choisir ce programme
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section
        className="py-20"
        id="presentation"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.9)), url('https://www.dropbox.com/scl/fi/3iyuq7nbghq03mrldei2x/unnamed-2025-09-07T222151.578.png?rlkey=z7cr3f7htlf225yfl59mdy7yb&st=7uc6o97w&dl=1') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Notre approche
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez comment NaviGuide vous accompagne dans votre projet
              </p>
            </div>
            <VideoSection />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils ont réussi leur achat
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des centaines d'acheteurs satisfaits
            </p>
          </div>
          <TestimonialCarousel />
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
              Prêt à devenir propriétaire ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez la formation NaviGuide dès aujourd'hui et réalisez votre rêve en toute sérénité
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/programmes"
                className="inline-block px-8 py-4 bg-white text-[#007bff] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
              >
                Acheter la formation - 99€
              </Link>
              <p className="text-sm text-white/80">
                Garantie satisfait ou remboursé 30 jours
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
