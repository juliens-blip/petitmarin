export interface Module {
  id: number
  title: string
  description: string
  duration: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  icon: string
  downloadUrl?: string
  lessons: number
  isLocked: boolean
}

export const modules: Module[] = [
  {
    id: 1,
    title: 'Les fondamentaux de l\'achat de bateau',
    description: 'Découvrez les bases essentielles pour réussir votre premier achat de bateau. Types de bateaux, critères de sélection, et premiers pas.',
    duration: '2h30',
    difficulty: 'Débutant',
    icon: '⚓',
    lessons: 8,
    isLocked: false,
  },
  {
    id: 2,
    title: 'Budget et financement',
    description: 'Maîtrisez tous les aspects financiers de l\'achat. Budget global, options de financement, coûts cachés, et optimisation fiscale.',
    duration: '2h00',
    difficulty: 'Intermédiaire',
    icon: '💰',
    lessons: 6,
    isLocked: false,
  },
  {
    id: 3,
    title: 'L\'inspection technique',
    description: 'Apprenez à inspecter un bateau comme un professionnel. Checklist complète, points critiques, et quand faire appel à un expert.',
    duration: '3h00',
    difficulty: 'Intermédiaire',
    icon: '🔍',
    lessons: 10,
    isLocked: false,
  },
  {
    id: 4,
    title: 'Les aspects juridiques',
    description: 'Naviguez sereinement dans les démarches administratives. Contrats, immatriculation, assurances, et réglementations maritimes.',
    duration: '2h15',
    difficulty: 'Avancé',
    icon: '⚖️',
    lessons: 7,
    isLocked: false,
  },
  {
    id: 5,
    title: 'Négociation et achat',
    description: 'Techniques de négociation éprouvées pour obtenir le meilleur prix. Stratégies, pièges à éviter, et finalisation de l\'achat.',
    duration: '1h45',
    difficulty: 'Intermédiaire',
    icon: '🤝',
    lessons: 5,
    isLocked: false,
  },
  {
    id: 6,
    title: 'Post-achat et entretien',
    description: 'Assurez la pérennité de votre investissement. Entretien préventif, hivernage, équipement de sécurité, et mise à l\'eau.',
    duration: '2h30',
    difficulty: 'Débutant',
    icon: '🛠️',
    lessons: 9,
    isLocked: false,
  },
]

export function getModuleById(id: number): Module | undefined {
  return modules.find((module) => module.id === id)
}

export function getUnlockedModules(): Module[] {
  return modules.filter((module) => !module.isLocked)
}

export function getTotalLessons(): number {
  return modules.reduce((total, module) => total + module.lessons, 0)
}

export function getTotalDuration(): string {
  // Calcule la durée totale en minutes
  const totalMinutes = modules.reduce((total, module) => {
    const [hours, minutes] = module.duration.replace('h', ':').split(':').map(Number)
    return total + (hours * 60) + (minutes || 0)
  }, 0)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return minutes > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${hours}h00`
}
