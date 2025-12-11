-- ============================================
-- SUPABASE SETUP - NaviGuide / Petit Marin
-- ============================================

-- ============================================
-- TABLE 1: users
-- Stocke les informations des utilisateurs
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  has_access BOOLEAN DEFAULT false,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);

-- ============================================
-- TABLE 2: module_progress
-- Suit la progression de chaque utilisateur
-- ============================================
CREATE TABLE IF NOT EXISTS public.module_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL CHECK (module_id >= 1 AND module_id <= 6),
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_module_progress_user_id ON public.module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module_id ON public.module_progress(module_id);

-- ============================================
-- TABLE 3: questions
-- Système de Q&A pour chaque module
-- ============================================
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL CHECK (module_id >= 1 AND module_id <= 6),
  question TEXT NOT NULL,
  answer TEXT,
  answered_by UUID REFERENCES public.users(id),
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_module_id ON public.questions(module_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES - users
-- ============================================

-- Les utilisateurs peuvent voir leurs propres données
CREATE POLICY "Users can view own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Les utilisateurs peuvent créer leur propre profil (lors de l'inscription)
CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Les utilisateurs peuvent mettre à jour leurs propres données
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- POLICIES - module_progress
-- ============================================

-- Les utilisateurs peuvent voir leur propre progression
CREATE POLICY "Users can view own progress"
  ON public.module_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leur propre progression
CREATE POLICY "Users can insert own progress"
  ON public.module_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leur propre progression
CREATE POLICY "Users can update own progress"
  ON public.module_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- POLICIES - questions
-- ============================================

-- Tous les utilisateurs authentifiés peuvent voir toutes les questions
CREATE POLICY "Authenticated users can view all questions"
  ON public.questions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Les utilisateurs peuvent créer leurs propres questions
CREATE POLICY "Users can insert own questions"
  ON public.questions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Seulement le créateur peut supprimer sa question
CREATE POLICY "Users can delete own questions"
  ON public.questions
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS - Triggers auto-update
-- ============================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour users
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Trigger pour module_progress
CREATE TRIGGER update_module_progress_updated_at
    BEFORE UPDATE ON public.module_progress
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Trigger pour questions
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ============================================
-- FUNCTION - Créer automatiquement le profil user
-- ============================================

-- Cette fonction crée automatiquement un profil dans public.users
-- quand un nouveau user s'inscrit via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger qui s'active lors de l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- DONNÉES DE TEST (optionnel)
-- ============================================

-- Décommentez ces lignes pour créer un utilisateur de test
-- IMPORTANT: Changez l'UUID par un vrai UUID d'un user créé via Supabase Auth

-- INSERT INTO public.users (id, email, full_name, has_access)
-- VALUES (
--   'votre-uuid-user-ici',
--   'test@naviguide.fr',
--   'Utilisateur Test',
--   true
-- );

-- ============================================
-- FIN DU SETUP
-- ============================================

-- Pour vérifier que tout fonctionne :
SELECT 'Setup Supabase terminé avec succès !' AS message;
