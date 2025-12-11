'use client'

import { useState } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  content: string
  duration: string
  completed?: boolean
}

// Sample lesson data - in production, this would come from your database
const getLessonsForModule = (moduleId: number): Lesson[] => {
  const lessonTemplates = [
    { title: 'Introduction', content: 'Présentation générale du module et objectifs d\'apprentissage.', duration: '10 min' },
    { title: 'Concepts fondamentaux', content: 'Les bases essentielles à connaître pour bien comprendre le sujet.', duration: '25 min' },
    { title: 'Exemples pratiques', content: 'Cas concrets et exemples réels pour mieux appréhender la théorie.', duration: '30 min' },
    { title: 'Erreurs à éviter', content: 'Les pièges courants et comment les éviter dans votre processus d\'achat.', duration: '20 min' },
    { title: 'Checklist et ressources', content: 'Liste de vérification complète et ressources supplémentaires.', duration: '15 min' },
  ]

  return lessonTemplates.map((lesson, index) => ({
    id: index + 1,
    ...lesson,
    completed: false,
  }))
}

interface LessonSectionProps {
  moduleId: number
}

export function LessonSection({ moduleId }: LessonSectionProps) {
  const lessons = getLessonsForModule(moduleId)
  const [expandedLessons, setExpandedLessons] = useState<number[]>([1])

  const toggleLesson = (lessonId: number) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">Leçons</h3>
      {lessons.map((lesson) => {
        const isExpanded = expandedLessons.includes(lesson.id)

        return (
          <Card
            key={lesson.id}
            variant="hover"
            className="cursor-pointer"
            onClick={() => toggleLesson(lesson.id)}
          >
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {lesson.completed ? (
                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                  ) : (
                    <Circle className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      Leçon {lesson.id}: {lesson.title}
                    </h4>
                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="text-gray-400" size={20} />
                ) : (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </div>

              {isExpanded && (
                <div className="pl-8 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">{lesson.content}</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-900">
                      📚 Cette leçon couvre les points essentiels que vous devez maîtriser.
                      Prenez le temps de bien comprendre chaque section avant de passer à la suivante.
                    </p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}
