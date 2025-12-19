# Stripe <> Supabase - Abonnement (test)

## Contexte
- Abonnement unique autorisé: `STRIPE_PRICE_ID` = `price_1Sg8KwRTMuPglkUN3eeDIPgX` (mode test).
- Webhook sécurisé par `STRIPE_WEBHOOK_SECRET` (`whsec_1XfmwegBp5nnWOk2K1RkwFAz6Srs87GJ`).
- Mapping Supabase sur la table `public.users` (`has_access`, `stripe_customer_id`, `email`, `id`).
- Service key Supabase (`SUPABASE_SERVICE_ROLE_KEY`) utilisée côté serveur pour contourner la RLS dans le webhook uniquement.

## Flux d'abonnement
1) **Checkout** (`POST /api/stripe/checkout`): utilisateur authentifié via Supabase Auth, récupération de `email` + `stripe_customer_id`, création d'une session Stripe `mode: subscription` avec `priceId` imposé, metadata `supabase_user_id` propagée à la subscription.
2) **Webhook** (`POST /api/stripe/webhook`):
   - Vérifie la signature Stripe.
   - Charge la subscription (expand `items.data.price`, `customer`), filtre sur `STRIPE_PRICE_ID` et statut `active`/`trialing`.
   - Résout l'utilisateur Supabase par `supabase_user_id` (metadata) puis fallback `stripe_customer_id` ou `email`.
   - Met à jour `users.has_access=true` et `stripe_customer_id` via client admin (service role).
3) **Synchronisation continue** (`customer.subscription.updated|deleted`): même filtrage de price, `has_access` mis à jour selon le statut (`active`/`trialing` -> true, sinon false).

## Sécurité & garde-fous
- Signature Stripe obligatoire, corps brut `request.text()`.
- Service role utilisé uniquement dans le webhook pour dépasser la RLS tout en limitant la surface.
- Filtre strict sur le price empêche d'autres produits d'ouvrir l'accès.
- Metadata `supabase_user_id` pour un mapping déterministe; fallback sur `stripe_customer_id`/`email` pour robustesse.

## Variables d'environnement clés
- `STRIPE_PRICE_ID`: price autorisé.
- `STRIPE_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Points à vérifier en recette (mode test)
- Webhook Stripe pointé sur `/api/stripe/webhook` avec le secret fourni.
- Un checkout avec `price_1Sg8KwRTMuPglkUN3eeDIPgX` passe `has_access=true` et stocke `stripe_customer_id`.
- Un event `customer.subscription.deleted` remet `has_access=false`.
- Les pages protégées lisent déjà `has_access` (`dashboard`, `modules`), donc l'accès reflète l'état Stripe.
