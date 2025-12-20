import Link from 'next/link'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Module } from '@/lib/data/modules'
import { Clock, BookOpen, Lock } from 'lucide-react'

interface ModuleCardProps {
  module: Module
  progress?: number
}

export function ModuleCard({ module, progress = 0 }: ModuleCardProps) {
  const isCompleted = progress === 100
  const isStarted = progress > 0 && progress < 100

  const difficultyVariant = {
    'Débutant': 'success' as const,
    'Intermédiaire': 'warning' as const,
    'Avancé': 'danger' as const,
  }

  const card = (
    <Card
      variant={module.isLocked ? 'default' : 'hover'}
      className="relative overflow-hidden"
    >
      <CardBody className="space-y-4">
        {/* Icon et Lock */}
        <div className="flex items-start justify-between">
          <div className="text-5xl">{module.icon}</div>
          {module.isLocked && (
            <div className="flex items-center gap-1 text-gray-400">
              <Lock size={16} />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 min-h-[3.5rem] line-clamp-2">
          {module.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[4rem]">
          {module.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{module.lessons} leçons</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div>
          <Badge variant={difficultyVariant[module.difficulty]} size="sm">
            {module.difficulty}
          </Badge>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progression</span>
              <span className="font-semibold text-blue">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue to-green h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        {module.isLocked ? (
          <Button variant="ghost" disabled className="w-full" type="button">
            <Lock size={16} />
            Module verrouillé
          </Button>
        ) : (
          <Button
            variant={isCompleted ? 'success' : 'primary'}
            className="w-full"
            type="button"
          >
            {isCompleted ? 'Revoir' : isStarted ? 'Continuer' : 'Commencer'}
          </Button>
        )}
      </CardBody>
    </Card>
  )

  if (module.isLocked) {
    return card
  }

  return (
    <Link href={`/modules/${module.id}`} className="block h-full">
      {card}
    </Link>
  )
}
