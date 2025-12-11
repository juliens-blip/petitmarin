'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Mail, MessageSquare, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSuccess(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue via-blue-600 to-green flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card>
            <CardBody className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Message envoyé !
                </h2>
                <p className="text-gray-600">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
              </div>
              <Link href="/">
                <Button variant="primary" className="w-full">
                  <ArrowLeft size={16} />
                  Retour à l'accueil
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue">
              ⚓ NaviGuide
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="text-blue" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Une question ? Notre équipe est là pour vous aider
            </p>
          </div>

          {/* Contact Form */}
          <Card>
            <CardBody className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  label="Nom complet"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isSubmitting}
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isSubmitting}
                />

                <Input
                  type="text"
                  label="Sujet"
                  placeholder="Question sur la formation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  disabled={isSubmitting}
                />

                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed min-h-[150px]"
                    placeholder="Votre message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Mail size={16} />
                  Envoyer le message
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">Vous pouvez également nous contacter par email :</p>
            <a href="mailto:contact@naviguide.fr" className="text-blue hover:underline font-semibold">
              contact@naviguide.fr
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
