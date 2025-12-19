# Journal d'intervention (Stripe <> Supabase, abonnement test)

## Contexte
- Objectif: exposer un webhook Stripe en mode test pour n’accorder l’accès qu’aux utilisateurs abonnés à `price_1Sg8KwRTMuPglkUN3eeDIPgX` et synchroniser `has_access`/`stripe_customer_id` dans Supabase.
- Stack concernée: Next.js (app router), Supabase (auth + table `users`), Stripe (checkout + webhooks).

## Détails des changements
- Checkout (`app/api/stripe/checkout/route.ts`): passe en `mode=subscription`, force le `price` via `STRIPE_PRICE_ID`, propage `metadata.supabase_user_id`, réutilise `stripe_customer_id` si déjà connu.
- Webhook (`app/api/stripe/webhook/route.ts`): vérifie signature, filtre sur le `price` autorisé et un statut actif/trialing, mappe l’utilisateur (metadata -> `stripe_customer_id` -> email), met à jour `users.has_access` et `users.stripe_customer_id` via le client admin (service role), gère `checkout.session.completed` + `customer.subscription.updated/deleted`.
- Client Stripe (`lib/stripe/client.ts`): centralise la création de session subscription avec metadata et reuse du customer.
- Client Supabase admin (`lib/supabase/admin.ts`): client service role sans persistance de session, utilisé uniquement côté webhook.
- Config: `.env.local` enrichi avec `STRIPE_WEBHOOK_SECRET=whsec_1XfmwegBp5nnWOk2K1RkwFAz6Srs87GJ` et `STRIPE_PRICE_ID=price_1Sg8KwRTMuPglkUN3eeDIPgX`; `.env.local.example` mis à jour en conséquence.
- Documentation: `docs/architecture/stripe-supabase.md` (flux + sécurité) et `docs/api/stripe.md` (endpoints + test Stripe CLI).

## Agents suivis (référence agent-overview)
- Research Orchestrator / Query Clarifier / Research Brief: cadrage du besoin (price unique, mode test, champs Supabase).
- Technical Researcher: choix implémentation (subscription, metadata supabase_user_id, filtre price, client admin Supabase).
- Research Synthesizer: consolidation des garde-fous (signature, price filter, statut actif).
- Report Generator: documentation architecture/API.

## Points à tester (mode test)
1. `stripe listen --events checkout.session.completed,customer.subscription.updated,customer.subscription.deleted --forward-to http://localhost:3000/api/stripe/webhook`
2. Lancer un checkout authentifié et vérifier dans Supabase que `has_access` passe à `true` et que `stripe_customer_id` est bien renseigné.
3. Simuler `customer.subscription.deleted` ou statut non actif: `has_access` doit repasser à `false`.

## Fichiers clés
- app/api/stripe/checkout/route.ts
- app/api/stripe/webhook/route.ts
- lib/stripe/client.ts
- lib/supabase/admin.ts
- .env.local, .env.local.example
- docs/architecture/stripe-supabase.md
- docs/api/stripe.md
