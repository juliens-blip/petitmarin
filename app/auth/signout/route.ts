import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Sign out the user
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect to login page
  return NextResponse.redirect(new URL('/connexion', request.url))
}
