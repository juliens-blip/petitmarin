import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { modules, getModuleById } from '@/lib/data/modules'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Clock,
  BookOpen,
  CheckCircle2,
  MessageSquare,
  Award
} from 'lucide-react'
import { LessonSection } from '@/components/modules/LessonSection'
import { ProgressBar } from '@/components/modules/ProgressBar'
import { QuestionSection } from '@/components/modules/QuestionSection'

interface ModulePageProps {
  params: Promise<{ id: string }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params
  const moduleId = parseInt(id)

  // Get module data
  const module = getModuleById(moduleId)
  if (!module) {
    notFound()
  }

  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  // Check user access
  const { data: profile } = await supabase
    .from('users')
    .select('has_access')
    .eq('id', user.id)
    .single()

  if (!profile?.has_access) {
    redirect('/dashboard')
  }

  // Get module progress
  const { data: progressData } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single()

  const progress = progressData?.progress || 0
  const isCompleted = progressData?.completed || false

  // Get questions for this module
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('module_id', moduleId)
    .order('created_at', { ascending: false })

  // Find previous and next modules
  const currentIndex = modules.findIndex((m) => m.id === moduleId)
  const previousModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex - 1] : null

  const difficultyVariant = {
    'Débutant': 'success' as const,
    'Intermédiaire': 'warning' as const,
    'Avancé': 'danger' as const,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Retour au dashboard
              </Button>
            </Link>
            <div className="text-2xl font-bold text-blue">⚓ NaviGuide</div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Module Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">{module.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={difficultyVariant[module.difficulty]}>
                    {module.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen size={16} />
                    <span>{module.lessons} leçons</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-600">
                  <Award size={24} />
                  <span className="font-semibold">Complété</span>
                </div>
              )}
            </div>
            <p className="text-lg text-gray-600">{module.description}</p>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={progress} moduleId={moduleId} userId={user.id} />

          {/* Module Content */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Contenu du module</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <LessonSection moduleId={moduleId} />

              {/* Resources Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Download size={20} />
                  Ressources téléchargeables
                </h3>
                <div className="space-y-3">
                  <Card variant="hover" className="bg-blue-50">
                    <CardBody className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Download className="text-blue" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Guide PDF - {module.title}
                          </p>
                          <p className="text-sm text-gray-600">Document complet du module</p>
                        </div>
                      </div>
                      <Button variant="primary" size="sm">
                        Télécharger
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Questions Section */}
          <QuestionSection
            moduleId={moduleId}
            userId={user.id}
            questions={questions || []}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8">
            {previousModule ? (
              <Link href={`/modules/${previousModule.id}`}>
                <Button variant="ghost">
                  <ArrowLeft size={16} />
                  Module précédent
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextModule ? (
              <Link href={`/modules/${nextModule.id}`}>
                <Button variant="primary">
                  Module suivant
                  <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button variant="success">
                  <CheckCircle2 size={16} />
                  Retour au dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
