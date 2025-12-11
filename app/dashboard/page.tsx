import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { modules, getTotalLessons, getTotalDuration } from '@/lib/data/modules'
import { ModuleCard } from '@/components/dashboard/ModuleCard'
import { ProgressTracker } from '@/components/dashboard/ProgressTracker'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { LogOut, User } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  // Fetch user profile with access status
  const { data: profile } = await supabase
    .from('users')
    .select('full_name, email, has_access')
    .eq('id', user.id)
    .single()

  // If user doesn't have access, show access denied
  if (!profile?.has_access) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div className="text-6xl">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900">Accès restreint</h1>
          <p className="text-gray-600">
            Vous n'avez pas encore accès aux modules de formation. Veuillez effectuer un achat pour débloquer le contenu.
          </p>
          <div className="space-y-3 pt-4">
            <Link href="/programmes" className="block w-full">
              <Button variant="primary" className="w-full">
                Voir les programmes
              </Button>
            </Link>
            <form action="/auth/signout" method="post" className="w-full">
              <Button type="submit" variant="ghost" className="w-full">
                <LogOut size={16} />
                Se déconnecter
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Fetch module progress for user
  const { data: progressData } = await supabase
    .from('module_progress')
    .select('module_id, progress, completed')
    .eq('user_id', user.id)

  // Create a map of module progress
  const progressMap = new Map(
    progressData?.map((p) => [p.module_id, p.progress]) || []
  )

  // Calculate completed modules and lessons
  const completedModulesCount = progressData?.filter((p) => p.completed).length || 0
  const completedLessonsCount = progressData?.reduce((acc, p) => {
    const module = modules.find((m) => m.id === p.module_id)
    if (module && p.completed) {
      return acc + module.lessons
    }
    return acc
  }, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-white">⚓ NaviGuide</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <User size={20} />
                <span className="font-medium">{profile?.full_name || profile?.email}</span>
              </div>
              <form action="/auth/signout" method="post">
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut size={16} />
                  Déconnexion
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center text-white space-y-2">
            <h1 className="text-4xl font-bold">
              Bienvenue {profile?.full_name || 'à bord'} ! 👋
            </h1>
            <p className="text-xl text-purple-100">
              Votre formation complète pour réussir l'achat de votre bateau
            </p>
          </div>

          {/* Progress Tracker */}
          <ProgressTracker
            completedModules={completedModulesCount}
            totalModules={modules.length}
            totalLessons={getTotalLessons()}
            completedLessons={completedLessonsCount}
            totalDuration={getTotalDuration()}
          />

          {/* Modules Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Vos modules de formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  progress={progressMap.get(module.id) || 0}
                />
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center pt-8">
            <p className="text-purple-100 mb-4">Besoin d'aide ?</p>
            <Link href="/contact">
              <Button variant="ghost" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Contactez le support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
