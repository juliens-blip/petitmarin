# Stripe API (test)

## POST /api/stripe/checkout
- Authentification: session Supabase requise (cookies via middleware).
- Entrée: pas de payload, utilise l'utilisateur courant; lit `email` et `stripe_customer_id` depuis `public.users`.
- Comportement: crée une session Checkout `mode=subscription` sur `STRIPE_PRICE_ID` avec metadata `supabase_user_id` (copiée sur la subscription).
- Réponse: `200 { "url": "<checkout_url>" }` à rediriger côté client; `401` si non authentifié, `400/500` sur erreurs de profil/Stripe.

## POST /api/stripe/webhook
- Authentification: en-tête `stripe-signature` avec `STRIPE_WEBHOOK_SECRET` (mode test).
- Événements gérés: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
- Filtrage: ignore les events qui ne ciblent pas `STRIPE_PRICE_ID` ou dont le statut n'est pas `active/trialing` (pour l'activation).
- Effets: résout l'utilisateur par `supabase_user_id` (metadata), fallback `stripe_customer_id` ou `email`, met à jour `users.has_access` et `users.stripe_customer_id` via client admin (service role).
- Réponses: `200 { received: true }` si traité, `400` sur signature manquante/incorrecte, `500` si mise à jour Supabase échoue.

## Environnement requis
- `STRIPE_PRICE_ID=price_1Sg8KwRTMuPglkUN3eeDIPgX`
- `STRIPE_WEBHOOK_SECRET=whsec_1XfmwegBp5nnWOk2K1RkwFAz6Srs87GJ`
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Test local (Stripe CLI)
```bash
stripe listen --events checkout.session.completed,customer.subscription.updated,customer.subscription.deleted ^
  --forward-to http://localhost:3000/api/stripe/webhook
```
Lancer un checkout depuis l'app, puis vérifier dans Supabase `users.has_access` et `stripe_customer_id` après réception des events.
