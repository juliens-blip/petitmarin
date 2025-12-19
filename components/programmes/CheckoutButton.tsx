'use client'

import { useState } from 'react'

type CheckoutButtonProps = {
  label?: string
  className?: string
}

export function CheckoutButton({ label = 'Commencer maintenant', className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
      })

      if (response.status === 401) {
        setError('Connectez-vous pour lancer le paiement.')
        return
      }

      if (!response.ok) {
        setError('Impossible de créer la session de paiement.')
        return
      }

      const data = await response.json()

      if (!data?.url) {
        setError('URL de paiement introuvable.')
        return
      }

      window.location.href = data.url
    } catch (err) {
      setError('Erreur inattendue lors du démarrage du paiement.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 bg-[#007bff] text-white hover:bg-[#0056b3] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${className || ''}`}
      >
        {loading ? 'Redirection…' : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
