import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const results = []

    // 1. Créer table users
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .limit(1)

      if (userError && userError.code === '42P01') {
        // Table n'existe pas, on la crée
        results.push({ table: 'users', status: 'needs_manual_creation' })
      } else {
        results.push({ table: 'users', status: 'exists' })
      }
    } catch (error) {
      results.push({ table: 'users', status: 'error', error: String(error) })
    }

    // 2. Créer table module_progress
    try {
      const { data: progressData, error: progressError } = await supabase
        .from('module_progress')
        .select('id')
        .limit(1)

      if (progressError && progressError.code === '42P01') {
        results.push({ table: 'module_progress', status: 'needs_manual_creation' })
      } else {
        results.push({ table: 'module_progress', status: 'exists' })
      }
    } catch (error) {
      results.push({ table: 'module_progress', status: 'error', error: String(error) })
    }

    // 3. Créer table questions
    try {
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('id')
        .limit(1)

      if (questionsError && questionsError.code === '42P01') {
        results.push({ table: 'questions', status: 'needs_manual_creation' })
      } else {
        results.push({ table: 'questions', status: 'exists' })
      }
    } catch (error) {
      results.push({ table: 'questions', status: 'error', error: String(error) })
    }

    // Vérifier s'il y a des tables manquantes
    const needsSetup = results.some(r => r.status === 'needs_manual_creation')

    if (needsSetup) {
      return NextResponse.json({
        success: false,
        message: 'Les tables Supabase doivent être créées manuellement',
        instructions: {
          step1: 'Allez sur https://supabase.com/dashboard/project/wyghcoahokqbhetlnpmq/sql/new',
          step2: 'Copiez-collez le contenu du fichier supabase-setup.sql',
          step3: 'Cliquez sur "Run" pour exécuter',
          sqlFile: 'C:\\Users\\beatr\\Documents\\projets\\PETIT MARIN\\supabase-setup.sql'
        },
        results,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Toutes les tables existent déjà !',
      results,
    })
  } catch (error) {
    console.error('Error checking database:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la vérification de la base de données',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
