import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Module6Page() {
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
