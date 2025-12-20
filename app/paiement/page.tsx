'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaiementPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const startCheckout = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', { method: 'POST' })

      if (response.status === 401) {
        router.replace(`/inscription?next=${encodeURIComponent('/paiement')}`)
        return
      }

      if (!response.ok) {
        let message = 'Impossible de creer la session de paiement.'
        try {
          const payload = await response.json()
          if (payload?.error) {
            message = String(payload.error)
          }
        } catch (parseError) {
          // Ignore JSON parse errors and keep default message.
        }
        setError(message)
        setIsLoading(false)
        return
      }

      const data = await response.json()

      if (!data?.url) {
        setError('URL de paiement introuvable.')
        setIsLoading(false)
        return
      }

      window.location.href = data.url
    } catch (err) {
      setError('Erreur inattendue lors du demarrage du paiement.')
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    startCheckout()
  }, [startCheckout])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {error ? 'Paiement indisponible' : 'Redirection vers le paiement'}
        </h1>
        <p className="text-gray-600 mb-6">
          {error
            ? error
            : 'Merci de patienter, nous preparons votre session Stripe.'}
        </p>

        {error && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={startCheckout}
              className="w-full px-6 py-3 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition-colors font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Redirection...' : 'Reessayer'}
            </button>
            <Link
              href="/programmes"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Retour aux programmes
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
