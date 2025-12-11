'use client'

import { useState } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProgressBarProps {
  progress: number
  moduleId: number
  userId: string
}

export function ProgressBar({ progress: initialProgress, moduleId, userId }: ProgressBarProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(initialProgress)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleMarkComplete = async () => {
    setIsUpdating(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('module_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          progress: 100,
          completed: true,
        })

      if (!error) {
        setProgress(100)
        router.refresh()
      }
    } catch (err) {
      console.error('Error updating progress:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const isCompleted = progress === 100

  return (
    <Card className={isCompleted ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : ''}>
      <CardBody className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {isCompleted ? 'Module complété !' : 'Votre progression'}
            </h3>
            <p className="text-sm text-gray-600">
              {isCompleted
                ? 'Félicitations ! Vous pouvez maintenant passer au module suivant.'
                : 'Marquez ce module comme terminé une fois que vous avez tout consulté.'}
            </p>
          </div>
          {isCompleted && (
            <Trophy className="text-green-600" size={32} />
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-700">Progression</span>
            <span className="font-bold text-blue">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? 'bg-gradient-to-r from-green to-green-600'
                  : 'bg-gradient-to-r from-blue to-green'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mark Complete Button */}
        {!isCompleted && (
          <Button
            variant="primary"
            className="w-full"
            onClick={handleMarkComplete}
            isLoading={isUpdating}
            disabled={isUpdating}
          >
            <CheckCircle2 size={16} />
            Marquer comme terminé
          </Button>
        )}
      </CardBody>
    </Card>
  )
}
