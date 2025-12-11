import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0B1220] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#007bff]">Petit</span>{' '}
              <span className="text-[#28a745]">Marin</span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre guide de confiance pour l'achat de bateaux
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Formation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/programmes" className="hover:text-white transition-colors">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/temoignages" className="hover:text-white transition-colors">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/connexion" className="hover:text-white transition-colors">
                  Espace Client
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Petit Marin - NaviGuide. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
