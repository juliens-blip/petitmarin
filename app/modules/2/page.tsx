import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Module2Page() {
  const pdfResources = [
    {
      title: "Types de bateaux - module 2",
      url: "https://www.dropbox.com/scl/fi/qh192d9mdiveavv62qzve/Types-de-Bateaux-module-2.pdf?rlkey=bsaqqvm63lz6qz2c0n4rwed8u&st=o35lr7vx&dl=1",
      description: "Panorama des types de bateaux et usages.",
    },
    {
      title: "Guide d'achat - Merry Fisher 795",
      url: "https://www.dropbox.com/scl/fi/jbzboelyyumf1ucnfng6j/Guide-dAchat-Le-Merry-Fisher-795.pdf?rlkey=jyeuyzm9rgk2k213olwszdqno&st=l3d9ltlx&dl=1",
      description: "Exemple concret pour evaluer un modele.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        className="relative min-h-[400px] flex items-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="text-white/80 font-semibold mb-3">Module 2</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Budget et financement
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Comprenez toutes les options de financement disponibles pour votre achat de bateau
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Le financement d'un bateau nécessite une stratégie adaptée. Ce module vous guide à travers
                les différentes options de prêt, d'assurance et de garanties bancaires.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 1 : Prêts bancaires nautiques</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Découvrez les spécificités du crédit bateau et comment obtenir les meilleurs taux.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 2 : Assurances obligatoires</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Comprenez les différentes assurances requises et comment choisir la bonne couverture.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 3 : Garanties bancaires</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Les garanties exigées par les banques pour financer votre achat.</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ressources telechargeables
              </h2>
              <div className="space-y-4">
                {pdfResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#007bff] hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#007bff]">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link href="/modules/1" className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-[#007bff]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Module précédent
              </Link>
              <Link href="/modules/3" className="inline-flex items-center gap-2 px-8 py-4 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] font-bold">
                Module suivant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
