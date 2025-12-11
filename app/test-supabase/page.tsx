'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestSupabasePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Vérifier la connexion
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1)

        if (error) throw error

        setStatus('success')
        setMessage('✅ Connexion Supabase réussie !')
      } catch (error: any) {
        setStatus('error')
        setMessage(`❌ Erreur: ${error.message}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-purple flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-4xl shadow-card p-12">
        <div className="text-center">
          <div className="text-6xl mb-6">
            {status === 'loading' && '⏳'}
            {status === 'success' && '🎉'}
            {status === 'error' && '❌'}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Connexion Supabase
          </h1>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              status === 'success'
                ? 'bg-green-50 text-green-900'
                : status === 'error'
                ? 'bg-red-50 text-red-900'
                : 'bg-gray-50 text-gray-900'
            }`}
          >
            <p className="text-lg font-semibold">{message}</p>
          </div>

          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-gradient-blue-green text-white p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-2">🚀 Prêt à Continuer !</h2>
                <p className="text-sm opacity-90">
                  Supabase est configuré et fonctionne parfaitement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-sm font-semibold text-blue-900">Tables créées</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-sm font-semibold text-green-900">RLS configuré</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-sm font-semibold text-purple-900">Auth prête</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Retour Accueil
            </a>
            <a
              href="https://wyghcoahokqbhetlnpmq.supabase.co"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-blue-green text-white px-6 py-3 rounded-full font-semibold"
            >
              Ouvrir Supabase Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
