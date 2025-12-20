import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Module4Page() {
  const pdfResources = [
    {
      title: 'Negociation et achat - module 4',
      url: 'https://www.dropbox.com/scl/fi/kgu5vl6ddsuzrey1wgg03/Negociation-et-Achat-de-Votre-Bateau-module-4.pdf?rlkey=nwr1hxoaeydptlhutllx2lrxu&st=4wbs7p6l&dl=1',
      description: 'Guide pratique pour negocier et acheter.',
    },
    {
      title: 'Negociation et achat d'un bateau d'occasion',
      url: 'https://www.dropbox.com/scl/fi/plzeucnmms72tl3iih9ke/Negociation-and-Achat-dun-Bateau-dOccasion.pdf?rlkey=jhqj728od7x665axfyigpf4f9&st=lx9phh0i&dl=1',
      description: 'Conseils pour le marche de l'occasion.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        className="relative min-h-[400px] flex items-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="text-white/80 font-semibold mb-3">Module 4</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Les aspects juridiques
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Maîtrisez la paperasse administrative et les démarches obligatoires
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
                L'aspect juridique de l'achat d'un bateau est souvent négligé. Ce module vous guide à travers
                toutes les démarches administratives et documents obligatoires.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 1 : Documents obligatoires</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Titre de navigation, acte de francisation, certificat de conformité CE.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 2 : Immatriculation</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Comment immatriculer votre bateau auprès des Affaires Maritimes.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">Leçon 3 : Contrat de vente</h3>
                </div>
                <div className="p-6 text-gray-700">
                  <p>Rédiger un contrat de vente sécurisé et éviter les litiges.</p>
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
              <Link href="/modules/3" className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-[#007bff]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Module précédent
              </Link>
              <Link href="/modules/5" className="inline-flex items-center gap-2 px-8 py-4 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] font-bold">
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
