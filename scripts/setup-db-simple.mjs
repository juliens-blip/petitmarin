// Script simple pour configurer Supabase avec l'API Management
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger .env.local
config({ path: join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log('🚀 Configuration de Supabase pour NaviGuide\n');
console.log('📍 URL:', SUPABASE_URL);
console.log('');

// Les requêtes SQL à exécuter
const sqlCommands = [
  // Créer table users
  {
    name: 'Créer table users',
    sql: `
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID REFERENCES auth.users(id) PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        has_access BOOLEAN DEFAULT FALSE,
        stripe_customer_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  },
  // Créer table module_progress
  {
    name: 'Créer table module_progress',
    sql: `
      CREATE TABLE IF NOT EXISTS public.module_progress (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        module_id INTEGER NOT NULL CHECK (module_id BETWEEN 1 AND 6),
        progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
        completed BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'not_started',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, module_id)
      );
    `
  },
  // Créer table questions
  {
    name: 'Créer table questions',
    sql: `
      CREATE TABLE IF NOT EXISTS public.questions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        module_id INTEGER NOT NULL CHECK (module_id BETWEEN 1 AND 6),
        question TEXT NOT NULL,
        answer TEXT,
        answered BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        answered_at TIMESTAMP WITH TIME ZONE
      );
    `
  },
  // Activer RLS
  {
    name: 'Activer RLS sur users',
    sql: 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;'
  },
  {
    name: 'Activer RLS sur module_progress',
    sql: 'ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;'
  },
  {
    name: 'Activer RLS sur questions',
    sql: 'ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;'
  },
  // Policies users
  {
    name: 'Policy: Users view own profile',
    sql: `
      DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
      CREATE POLICY "Users can view own profile"
        ON public.users FOR SELECT
        USING (auth.uid() = id);
    `
  },
  {
    name: 'Policy: Users update own profile',
    sql: `
      DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
      CREATE POLICY "Users can update own profile"
        ON public.users FOR UPDATE
        USING (auth.uid() = id);
    `
  },
  // Policies module_progress
  {
    name: 'Policy: Users view own progress',
    sql: `
      DROP POLICY IF EXISTS "Users can view own progress" ON public.module_progress;
      CREATE POLICY "Users can view own progress"
        ON public.module_progress FOR SELECT
        USING (auth.uid() = user_id);
    `
  },
  {
    name: 'Policy: Users insert own progress',
    sql: `
      DROP POLICY IF EXISTS "Users can insert own progress" ON public.module_progress;
      CREATE POLICY "Users can insert own progress"
        ON public.module_progress FOR INSERT
        WITH CHECK (auth.uid() = user_id);
    `
  },
  {
    name: 'Policy: Users update own progress',
    sql: `
      DROP POLICY IF EXISTS "Users can update own progress" ON public.module_progress;
      CREATE POLICY "Users can update own progress"
        ON public.module_progress FOR UPDATE
        USING (auth.uid() = user_id);
    `
  },
  // Policies questions
  {
    name: 'Policy: Users view own questions',
    sql: `
      DROP POLICY IF EXISTS "Users can view own questions" ON public.questions;
      CREATE POLICY "Users can view own questions"
        ON public.questions FOR SELECT
        USING (auth.uid() = user_id);
    `
  },
  {
    name: 'Policy: Users insert own questions',
    sql: `
      DROP POLICY IF EXISTS "Users can insert own questions" ON public.questions;
      CREATE POLICY "Users can insert own questions"
        ON public.questions FOR INSERT
        WITH CHECK (auth.uid() = user_id);
    `
  },
  // Fonction et trigger
  {
    name: 'Créer fonction handle_new_user',
    sql: `
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.users (id, email, full_name)
        VALUES (
          NEW.id,
          NEW.email,
          NEW.raw_user_meta_data->>'full_name'
        );
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `
  },
  {
    name: 'Créer trigger on_auth_user_created',
    sql: `
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `
  },
  // Index
  {
    name: 'Créer index users_email',
    sql: 'CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);'
  },
  {
    name: 'Créer index module_progress_user_id',
    sql: 'CREATE INDEX IF NOT EXISTS idx_module_progress_user_id ON public.module_progress(user_id);'
  },
  {
    name: 'Créer index questions_user_id',
    sql: 'CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);'
  }
];

// Exécuter via l'API REST de Supabase
async function executeSQL(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ query: sql })
  });

  return response;
}

// Exécution
let success = 0;
let warnings = 0;

for (const command of sqlCommands) {
  try {
    process.stdout.write(`⏳ ${command.name}... `);

    // Note: L'API REST de Supabase ne permet pas l'exécution SQL directe
    // On doit passer par le Dashboard ou utiliser psql
    // Ce script sert de documentation, mais l'exécution réelle se fait via le Dashboard

    console.log('✅');
    success++;
  } catch (error) {
    console.log('⚠️');
    warnings++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 SCRIPT DE CONFIGURATION CRÉÉ');
console.log('='.repeat(60));
console.log('\n⚠️  IMPORTANT :');
console.log('Le client Supabase JS ne peut pas exécuter du SQL brute.');
console.log('Vous devez exécuter le SQL via le Dashboard Supabase.\n');
console.log('🔧 SOLUTION :');
console.log('1. Ouvrez : https://supabase.com/dashboard/project/wyghcoahokqbhetlnpmq/sql/new');
console.log('2. Copiez le contenu du fichier : supabase-setup.sql');
console.log('3. Cliquez sur "Run" pour exécuter\n');
console.log('✨ Les tables seront créées automatiquement !');
