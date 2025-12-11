'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function InscriptionPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Un compte existe déjà avec cet email.')
        } else {
          setError('Une erreur est survenue lors de l\'inscription.')
        }
        setIsLoading(false)
        return
      }

      if (data.user && !data.session) {
        setSuccess(true)
        setIsLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vérifiez votre email</h2>
                <p className="text-gray-600 mb-6">
                  Nous avons envoyé un lien de confirmation à <strong>{email}</strong>.
                  Cliquez sur le lien pour activer votre compte.
                </p>
                <Link
                  href="/connexion"
                  className="inline-block px-6 py-3 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-bold"
                >
                  Retour à la connexion
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div
                className="p-8 text-white text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.9), rgba(25, 195, 125, 0.9))',
                }}
              >
                <h1 className="text-3xl font-bold mb-2">Inscription</h1>
                <p className="text-white/90">Créez votre compte gratuitement</p>
              </div>

              <div className="p-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"
                    />
                  </div>

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
                    <p className="text-sm text-gray-500 mt-1">Minimum 8 caractères</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="text-xs text-gray-600 pt-2">
                    En créant un compte, vous acceptez nos{' '}
                    <Link href="/cgv" className="text-[#007bff] hover:underline">
                      conditions générales
                    </Link>{' '}
                    et notre{' '}
                    <Link href="/confidentialite" className="text-[#007bff] hover:underline">
                      politique de confidentialité
                    </Link>.
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Déjà un compte ?{' '}
                    <Link
                      href="/connexion"
                      className="text-[#007bff] hover:text-[#0056b3] font-semibold"
                    >
                      Se connecter
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
