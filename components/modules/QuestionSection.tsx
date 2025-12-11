'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, User, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  user_id: string
  module_id: number
  question: string
  answer: string | null
  created_at: string
}

interface QuestionSectionProps {
  moduleId: number
  userId: string
  questions: Question[]
}

export function QuestionSection({ moduleId, userId, questions: initialQuestions }: QuestionSectionProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState(initialQuestions)
  const [newQuestion, setNewQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newQuestion.trim()) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.from('questions').insert({
        user_id: userId,
        module_id: moduleId,
        question: newQuestion.trim(),
      })

      if (!error) {
        setNewQuestion('')
        router.refresh()
      }
    } catch (err) {
      console.error('Error submitting question:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare size={24} />
          Questions et Réponses
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Posez vos questions sur ce module. Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </CardHeader>
      <CardBody className="space-y-6">
        {/* Ask Question Form */}
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <Input
            label="Votre question"
            placeholder="Posez votre question ici..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting || !newQuestion.trim()}
          >
            <Send size={16} />
            Envoyer ma question
          </Button>
        </form>

        {/* Questions List */}
        {questions.length > 0 ? (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900">Questions précédentes</h3>
            {questions.map((q) => (
              <Card key={q.id} className="bg-gray-50">
                <CardBody className="space-y-3">
                  {/* Question */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="text-blue" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        {formatDate(q.created_at)}
                      </p>
                      <p className="text-gray-900">{q.question}</p>
                    </div>
                  </div>

                  {/* Answer */}
                  {q.answer ? (
                    <div className="pl-11 pt-3 border-t border-gray-200">
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm font-semibold text-blue mb-2">
                          ⚓ Réponse de l'équipe NaviGuide
                        </p>
                        <p className="text-gray-700">{q.answer}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="pl-11 pt-2">
                      <p className="text-sm text-gray-500 italic">
                        En attente de réponse...
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
            <p>Aucune question pour le moment.</p>
            <p className="text-sm">Soyez le premier à poser une question !</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
