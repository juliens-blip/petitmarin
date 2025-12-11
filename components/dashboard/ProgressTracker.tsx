import { Card, CardBody } from '@/components/ui/Card'
import { Trophy, Target, Clock } from 'lucide-react'

interface ProgressTrackerProps {
  completedModules: number
  totalModules: number
  totalLessons: number
  completedLessons: number
  totalDuration: string
}

export function ProgressTracker({
  completedModules,
  totalModules,
  totalLessons,
  completedLessons,
  totalDuration,
}: ProgressTrackerProps) {
  const overallProgress = Math.round((completedModules / totalModules) * 100)
  const lessonProgress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <Card className="bg-gradient-to-br from-blue to-green text-white">
      <CardBody className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Votre progression</h2>
            <p className="text-blue-100 mt-1">Continuez comme ça !</p>
          </div>
          <div className="text-5xl">
            <Trophy />
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progression globale</span>
            <span className="font-bold text-lg">{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          {/* Modules */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target size={20} />
            </div>
            <div className="text-2xl font-bold">{completedModules}/{totalModules}</div>
            <div className="text-xs text-blue-100 mt-1">Modules</div>
          </div>

          {/* Lessons */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div className="text-2xl font-bold">{completedLessons}/{totalLessons}</div>
            <div className="text-xs text-blue-100 mt-1">Leçons</div>
          </div>

          {/* Duration */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock size={20} />
            </div>
            <div className="text-2xl font-bold">{totalDuration}</div>
            <div className="text-xs text-blue-100 mt-1">Contenu</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
