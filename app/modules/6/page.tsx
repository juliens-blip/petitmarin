import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Module6Page() {
  const pdfResources = [
    {
      title: 'Salons et marche de l'occasion - module 6',
      url: 'https://www.dropbox.com/scl/fi/xnvabzrx10tytmxpk1kde/Salons-and-Marche-de-lOccasion-module-6.pdf?rlkey=6q0dyo11h33eb7coz56oel91e&st=j6ncqyj5&dl=1',
      description: 'Ou comparer et acheter en salon.',
    },
    {
      title: 'Salons et marche de l'occasion - complement',
      url: 'https://www.dropbox.com/scl/fi/m6qpnhcpyn22j0uv0uamf/Module-6-Salons-and-Marche-de-lOccasion.pdf?rlkey=dc39wmb3fu7tre6p090h2ws5t&st=u6ycej6a&dl=1',
      description: 'Complements et checklist salon.',
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
            <div className="text-white/80 font-semibold mb-3">Module 6</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Post-achat et entretien
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Prenez soin de votre bateau et profitez-en pendant des années
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
                Félicitations, vous êtes maintenant propriétaire ! Ce dernier module vous guide pour
                bien démarrer et entretenir votre bateau sur le long terme.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 1 : Premiers pas avec votre bateau</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Sortie initiale, vérifications essentielles, prise en main.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 2 : Entretien régulier</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Planning d'entretien, nettoyage, vérifications mensuelles.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 3 : Hivernage et stockage</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Préparer votre bateau pour l'hiver, stockage sécurisé.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 4 : Revente future</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Maintenir la valeur de revente, documenter l'entretien.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] text-white rounded-xl shadow-xl p-8 mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Félicitations ! 🎉</h2>
              <p className="text-xl mb-6">
                Vous avez terminé la formation NaviGuide !
              </p>
              <p className="text-lg opacity-90">
                Vous disposez maintenant de toutes les connaissances pour acheter et entretenir votre bateau en toute confiance.
              </p>
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
              <Link href="/modules/5" className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-[#007bff]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Module précédent
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-[#28a745] text-white rounded-lg hover:bg-[#1e7e34] font-bold">
                Retour au dashboard
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
