import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Module1Page() {
  const pdfResources = [
    {
      title: 'Budget et financement - diapo module 1',
      url: 'https://www.dropbox.com/scl/fi/s92j0onjqrkjq67w1eicz/Budget-and-Financement-pour-Votre-Premier-Bateau-diapo-module1.pdf?rlkey=a9mt7et3cjf30zx1oay33swvx&st=5u3z08ma&dl=1',
      description: 'Presentation generale du budget et du financement.',
    },
    {
      title: 'Cas pratique - Voilier familial',
      url: 'https://www.dropbox.com/scl/fi/h75xqs5uatvb57dzjbzll/Cas-pratique-Voilier-familial.pdf?rlkey=mnq73k50q6ifco2q9btmzxt49&st=f5037tke&dl=1',
      description: 'Etude de cas pour appliquer la methode.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Module Header */}
      <section
        className="relative min-h-[400px] flex items-center text-white"
        style={{
          background: `linear-gradient(135deg, rgba(36, 107, 253, 0.82), rgba(25, 195, 125, 0.72)), url('https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="text-white/80 font-semibold mb-3">Module 1</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Les fondamentaux de l'achat de bateau
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Apprenez à définir votre budget réel et à comprendre tous les coûts liés à l'acquisition d'un bateau
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>45 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>5 leçons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Introduction
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Acheter un bateau est un projet excitant, mais qui nécessite une préparation financière rigoureuse.
                Beaucoup de nouveaux propriétaires sous-estiment les coûts réels et se retrouvent face à des dépenses imprévues.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Dans ce premier module, vous allez découvrir comment établir un budget réaliste qui prend en compte
                non seulement le prix d'achat, mais aussi tous les frais annexes souvent oubliés.
              </p>
            </div>

            {/* Lessons */}
            <div className="space-y-6 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Leçon 1 : Définir votre budget global
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Comment évaluer votre capacité d'achat réelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Les différents types de financement disponibles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Règle des 30% : ne pas dépasser 30% de vos revenus annuels</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Leçon 2 : Les coûts cachés de l'acquisition
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Frais de courtage (10-15% du prix)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Taxes et droits d'enregistrement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Frais d'expertise et d'inspection (500-2000€)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Transport et mise à l'eau</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Leçon 3 : Coûts d'utilisation annuels
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Place au port (2000-10 000€/an selon taille et localisation)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Assurance bateau (5-10% de la valeur/an)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Entretien et maintenance (10% de la valeur/an)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Carburant et consommables</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Leçon 4 : Optimiser votre budget
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Acheter en basse saison pour négocier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Bateau d'occasion vs neuf : avantages et inconvénients</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Co-propriété et partage de bateau</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#007bff] to-[#28a745] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Leçon 5 : Créer votre tableau de budget
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Utiliser notre template Excel (fourni)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Prévoir une marge de sécurité de 20%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#007bff] font-bold">•</span>
                      <span>Planifier sur 5 ans minimum</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ressources téléchargeables
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

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-[#007bff] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour au dashboard
              </Link>
              <Link
                href="/modules/2"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-bold"
              >
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
