'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { href: '/programmes', label: 'Programmes' },
  { href: '/#presentation', label: 'Notre approche' },
  { href: '/temoignages', label: 'Temoignages' },
  { href: '/connexion', label: 'Espace Client' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:h-[78px] md:h-[86px] md:px-6">
          <div className="flex min-w-[220px] items-center gap-3">
            <Link href="/" className="flex items-center gap-3 font-black text-slate-900">
              <Image
                src="https://www.dropbox.com/scl/fi/y9vjgzmh1pywu7puy83qs/unnamed-2025-09-02T180151.475.png?rlkey=oyo05s8l93p4ffe3c20ghwk68&st=gq6hsebe&dl=1"
                alt="Petit Marin"
                width={70}
                height={70}
                className="h-[48px] w-auto sm:h-[56px] md:h-[70px]"
                priority
              />
              <span className="text-[1.2rem] font-black tracking-[0.3px] sm:text-[1.4rem] md:text-[1.6rem]">
                <span className="text-[#007bff]">Petit</span>{' '}
                <span className="text-[#28a745]">Marin</span>
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-[#007bff]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden min-w-[220px] justify-end md:flex">
            <Link
              href="/programmes"
              className="rounded-full bg-[#28a745] px-5 py-3 font-extrabold text-white shadow-[0_4px_12px_rgba(40,167,69,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(40,167,69,0.35)]"
            >
              Voir nos programmes
            </Link>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div className="h-[70px] sm:h-[78px] md:h-[86px]" />

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-50 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl transition-transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-slate-900"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="https://www.dropbox.com/scl/fi/y9vjgzmh1pywu7puy83qs/unnamed-2025-09-02T180151.475.png?rlkey=oyo05s8l93p4ffe3c20ghwk68&st=gq6hsebe&dl=1"
              alt="Petit Marin"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-lg font-black tracking-[0.3px]">
              <span className="text-[#007bff]">Petit</span>{' '}
              <span className="text-[#28a745]">Marin</span>
            </span>
          </Link>
          <button
            type="button"
            className="relative h-8 w-8"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer"
          >
            <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-gray-500" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-gray-500" />
          </button>
        </div>

        <ul className="py-2">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-gray-100">
              <Link
                href={item.href}
                className="block px-5 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-[#007bff]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-5 py-6">
          <Link
            href="/programmes"
            className="block w-full rounded-xl bg-[#28a745] px-6 py-4 text-center text-lg font-extrabold text-white shadow-[0_4px_12px_rgba(40,167,69,0.25)] transition hover:-translate-y-0.5 hover:bg-[#218838] hover:shadow-[0_6px_16px_rgba(40,167,69,0.35)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Voir nos programmes
          </Link>
        </div>
      </div>
    </>
  )
}
