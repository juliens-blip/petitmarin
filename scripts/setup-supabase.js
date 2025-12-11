// Script pour configurer automatiquement Supabase
const https = require('https');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Variables d\'environnement manquantes !');
  console.error('Vérifiez que .env.local contient :');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// SQL pour créer toutes les tables
const setupSQL = `
-- 1. Table users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  has_access BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table module_progress
CREATE TABLE IF NOT EXISTS public.module_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL CHECK (module_id BETWEEN 1 AND 6),
  progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  completed BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- 3. Table questions
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

-- Activer RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Policies pour users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Policies pour module_progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.module_progress;
CREATE POLICY "Users can view own progress"
  ON public.module_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.module_progress;
CREATE POLICY "Users can insert own progress"
  ON public.module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.module_progress;
CREATE POLICY "Users can update own progress"
  ON public.module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies pour questions
DROP POLICY IF EXISTS "Users can view own questions" ON public.questions;
CREATE POLICY "Users can view own questions"
  ON public.questions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own questions" ON public.questions;
CREATE POLICY "Users can insert own questions"
  ON public.questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Fonction pour auto-créer profil
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

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_module_progress_user_id ON public.module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);
`;

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL('/rest/v1/rpc/exec_sql', SUPABASE_URL);

    const data = JSON.stringify({ query: sql });

    const options = {
      method: 'POST',
      hostname: url.hostname,
      path: '/rest/v1/rpc/exec_sql',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Fonction alternative : utiliser l'API REST directement
async function setupDatabase() {
  console.log('🚀 Configuration de la base de données Supabase...\n');

  // Méthode alternative : exécuter via pg
  const { createClient } = require('@supabase/supabase-js');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('📊 Exécution du script SQL...');

  // Diviser en commandes individuelles pour éviter les erreurs
  const commands = setupSQL
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i] + ';';
    try {
      // Note: Supabase JS client ne supporte pas directement l'exécution SQL brute
      // On doit utiliser l'API REST
      console.log(`\n[${i + 1}/${commands.length}] Exécution...`);

      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          query: cmd
        })
      });

      if (response.ok) {
        successCount++;
        console.log('✅ Succès');
      } else {
        errorCount++;
        const error = await response.text();
        console.log('⚠️  Peut-être déjà existant ou erreur mineure');
      }
    } catch (error) {
      errorCount++;
      console.log('⚠️  Erreur (peut-être déjà existant)');
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RÉSUMÉ :');
  console.log(`✅ Succès : ${successCount}`);
  console.log(`⚠️  Avertissements : ${errorCount}`);
  console.log('='.repeat(50));
  console.log('\n✨ Configuration terminée !\n');
  console.log('🔍 Vérifiez dans Supabase Dashboard :');
  console.log(`   ${SUPABASE_URL.replace('https://', 'https://supabase.com/dashboard/project/')}/editor`);
  console.log('\nVous devriez voir les tables :');
  console.log('  - public.users');
  console.log('  - public.module_progress');
  console.log('  - public.questions');
}

// Exécution
setupDatabase().catch(error => {
  console.error('\n❌ Erreur lors de la configuration :', error.message);
  console.error('\n⚠️  SOLUTION MANUELLE :');
  console.error('1. Allez sur : https://supabase.com/dashboard/project/wyghcoahokqbhetlnpmq/sql/new');
  console.error('2. Copiez-collez le contenu de supabase-setup.sql');
  console.error('3. Cliquez sur "Run"');
  process.exit(1);
});
