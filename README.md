# 🚢 NaviGuide - Petit Marin App

Marketplace de formation nautique pour l'achat de bateaux de plaisance.

## 🏗️ Stack Technique

- **Frontend**: Next.js 16 + TypeScript
- **Styling**: Tailwind CSS 4
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Paiement**: Stripe
- **Admin/Backup**: Airtable
- **Hosting**: Vercel

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

1. Copier le fichier `.env.local.example` vers `.env.local`:
```bash
copy .env.local.example .env.local
```

2. Remplir les variables d'environnement dans `.env.local`:
   - Créer un projet Supabase: https://supabase.com
   - Créer un compte Stripe: https://dashboard.stripe.com
   - Airtable déjà configuré (clés incluses)

## 🚀 Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrage production
npm start

# Lint
npm run lint
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
petit-marin-app/
├── app/                        # Pages Next.js (App Router)
│   ├── (auth)/                 # Pages d'authentification
│   ├── (protected)/            # Pages protégées (require auth)
│   ├── api/                    # API Routes
│   ├── layout.tsx              # Layout global
│   └── page.tsx                # Page d'accueil
├── components/                 # Composants React
│   ├── auth/                   # Composants auth (login, signup)
│   ├── dashboard/              # Composants dashboard
│   ├── modules/                # Composants modules de formation
│   ├── layout/                 # Header, Footer, Sidebar
│   └── ui/                     # Composants UI réutilisables
├── lib/                        # Utilitaires et clients
│   ├── supabase/               # Client Supabase
│   ├── stripe/                 # Client Stripe
│   ├── airtable/               # Client Airtable
│   ├── data/                   # Données statiques (modules)
│   └── utils/                  # Fonctions utilitaires
├── types/                      # Types TypeScript
└── public/                     # Assets statiques
```

## 🎨 Design System

### Couleurs Principales
- **Bleu**: `#246BFD` / `#007bff`
- **Vert**: `#19C37D` / `#28a745`
- **Violet Dashboard**: `#667eea` → `#764ba2`

### Classes Tailwind Personnalisées
- `bg-gradient-blue-green` - Gradient bleu-vert
- `bg-gradient-purple` - Gradient violet dashboard
- `shadow-blue` / `shadow-green` - Ombres colorées

## 📚 Modules de Formation

1. **Module 1**: Budget & Financement
2. **Module 2**: Types de Bateaux
3. **Module 3**: Inspection Technique
4. **Module 4**: Négociation & Achat
5. **Module 5**: Aspects Juridiques
6. **Module 6**: Salons & Occasions

## 🔐 Authentification

- Inscription/Connexion via Supabase Auth
- Protection des routes avec middleware
- Vérification `has_access` pour accès aux modules

## 💳 Paiement

- Stripe Payment Links
- Webhooks pour activation automatique
- Sync avec Supabase + Airtable

## 📝 Prochaines Étapes

- [ ] Configuration Supabase (tables + RLS)
- [ ] Migration des pages HTML vers Next.js
- [ ] Création des composants UI
- [ ] API Routes (webhooks Stripe)
- [ ] Tests et optimisations
- [ ] Déploiement Vercel

## 🆘 Support

Pour toute question, consulter le fichier `MIGRATION_PLAN.md` ou `ARCHITECTURE.md`.
