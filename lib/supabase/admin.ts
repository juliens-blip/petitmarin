import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

function normalizeBase64(input: string) {
  let normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4
  if (padding) {
    normalized += '='.repeat(4 - padding)
  }
  return normalized
}

function getJwtRole(token: string | undefined) {
  if (!token) return undefined
  const parts = token.split('.')
  if (parts.length < 2) return undefined

  try {
    const payloadJson = Buffer.from(
      normalizeBase64(parts[1]),
      'base64'
    ).toString('utf8')
    const payload = JSON.parse(payloadJson) as { role?: unknown }
    return typeof payload.role === 'string' ? payload.role : undefined
  } catch {
    return undefined
  }
}

export function createAdminClient(): SupabaseClient<Database, 'public'> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for admin client')
  }

  const tokenRole = getJwtRole(supabaseServiceKey)
  if (tokenRole && tokenRole !== 'service_role') {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY must be a service_role key (role=${tokenRole}).`
    )
  }

  // Admin client used server-side (e.g. webhooks) to bypass RLS safely
  return createClient<Database, 'public'>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
