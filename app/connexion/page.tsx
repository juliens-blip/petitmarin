'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function ConnexionPage() {
  const router = useRouter()
  const [nextPath, setNextPath] = useState('/dashboard')
  const nextQuery = `?next=${encodeURIComponent(nextPath)}`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rawNext = params.get('next')
    if (rawNext && rawNext.startsWith('/')) {
      setNextPath(rawNext)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError('Email ou mot de passe incorrect. Veuillez réessayer.')
        setIsLoading(false)
        return
      }

      router.push(nextPath)
      router.refresh()
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Header */}
              <div
                className="p-8 text-white text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.9), rgba(25, 195, 125, 0.9))',
                }}
              >
                <h1 className="text-3xl font-bold mb-2">Connexion</h1>
                <p className="text-white/90">Accédez à votre espace de formation</p>
              </div>

              {/* Form */}
              <div className="p-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="text-right">
                    <Link
                      href="/mot-de-passe-oublie"
                      className="text-sm text-[#007bff] hover:text-[#0056b3] font-medium"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link
                      href={`/inscription${nextQuery}`}
                      className="text-[#007bff] hover:text-[#0056b3] font-semibold"
                    >
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
