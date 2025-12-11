'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardBody } from '@/components/ui/Card'
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })

      if (resetError) {
        setError('Une erreur est survenue. Veuillez réessayer.')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue via-blue-600 to-green flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card>
            <CardBody className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Email envoyé !
                </h2>
                <p className="text-gray-600">
                  Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Vérifiez également votre dossier spam.
                </p>
              </div>
              <Link href="/connexion">
                <Button variant="primary" className="w-full">
                  <ArrowLeft size={16} />
                  Retour à la connexion
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue via-blue-600 to-green flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">⚓</div>
          <h1 className="text-3xl font-bold text-white mb-2">NaviGuide</h1>
          <p className="text-blue-100">Réinitialisation du mot de passe</p>
        </div>

        {/* Reset Password Card */}
        <Card>
          <CardBody className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-blue" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h2>
              <p className="text-gray-600 mt-2">
                Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Envoyer le lien de réinitialisation
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center pt-2">
              <Link href="/connexion" className="text-sm text-blue hover:text-blue-700 font-medium inline-flex items-center gap-1">
                <ArrowLeft size={16} />
                Retour à la connexion
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-blue-100">
          <Link href="/" className="hover:text-white">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
