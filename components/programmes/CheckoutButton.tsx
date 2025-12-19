'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CheckoutButtonProps = {
  label?: string
  className?: string
}

export function CheckoutButton({ label = 'Commencer maintenant', className }: CheckoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    router.push('/paiement')
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
    </div>
  )
}
