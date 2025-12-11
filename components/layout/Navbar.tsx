'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* PC Navigation */}
      <nav className="navbar hidden md:block bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="nav-left">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://www.dropbox.com/scl/fi/y9vjgzmh1pywu7puy83qs/unnamed-2025-09-02T180151.475.png?rlkey=oyo05s8l93p4ffe3c20ghwk68&st=gq6hsebe&dl=1"
                  alt="Petit Marin"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold">
                  <span className="text-[#007bff]">Petit</span>{' '}
                  <span className="text-[#28a745]">Marin</span>
                </span>
              </Link>
            </div>

            {/* Center Menu */}
            <div className="nav-center">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    href="/programmes"
                    className="text-gray-700 hover:text-[#007bff] transition-colors"
                  >
                    Programmes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#presentation"
                    className="text-gray-700 hover:text-[#007bff] transition-colors"
                  >
                    Notre approche
                  </Link>
                </li>
                <li>
                  <Link
                    href="/temoignages"
                    className="text-gray-700 hover:text-[#007bff] transition-colors"
                  >
                    Témoignages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connexion"
                    className="text-gray-700 hover:text-[#007bff] transition-colors"
                  >
                    Espace Client
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="nav-right">
              <Link
                href="/programmes"
                className="inline-block px-6 py-2 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-medium"
              >
                Voir nos programmes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="navbar-mobile md:hidden bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Mobile */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://www.dropbox.com/scl/fi/y9vjgzmh1pywu7puy83qs/unnamed-2025-09-02T180151.475.png?rlkey=oyo05s8l93p4ffe3c20ghwk68&st=gq6hsebe&dl=1"
                alt="Petit Marin"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-bold">
                <span className="text-[#007bff]">Petit</span>{' '}
                <span className="text-[#28a745]">Marin</span>
              </span>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#007bff]"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="py-4 border-t border-gray-200">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/programmes"
                    className="block text-gray-700 hover:text-[#007bff] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Programmes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#presentation"
                    className="block text-gray-700 hover:text-[#007bff] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Notre approche
                  </Link>
                </li>
                <li>
                  <Link
                    href="/temoignages"
                    className="block text-gray-700 hover:text-[#007bff] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Témoignages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connexion"
                    className="block text-gray-700 hover:text-[#007bff] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Espace Client
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/programmes"
                    className="block px-6 py-2 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Voir nos programmes
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
