# Guide Stripe (Next.js + Supabase)

Ce guide documente la connexion Stripe <-> Supabase de ce projet et comment
la reutiliser. Il reprend des exemples reels (routes, chemins, variables), mais
ne met pas de secrets.

## Vue d'ensemble (chemins reels)
- `app/api/stripe/checkout/route.ts`: cree une session Checkout pour
  l'utilisateur Supabase connecte.
- `app/api/stripe/webhook/route.ts`: valide les webhooks Stripe et synchronise
  l'acces dans Supabase.
- `lib/stripe/client.ts`: wrapper Stripe qui pose les metadata.
- `lib/supabase/admin.ts`: client admin Supabase avec la cle service_role.
- `app/paiement/page.tsx`: declenche le checkout depuis l'UI.

Flux principal:
1) L'utilisateur ouvre `/paiement` -> `POST /api/stripe/checkout`.
2) Le serveur lit la session Supabase -> `user.id` + `email`.
3) Stripe cree la session avec `client_reference_id` et `metadata.supabase_user_id`.
4) Stripe envoie le webhook -> mapping vers un user -> update de `users.has_access`
   et `users.stripe_customer_id`.

## Supabase: schema requis
Base sur `supabase-setup.sql`.

Table `public.users`:
- `id` (UUID, PK, references auth.users.id)
- `email` (TEXT, UNIQUE)
- `full_name` (TEXT)
- `has_access` (BOOLEAN, default false)
- `stripe_customer_id` (TEXT, UNIQUE)

RLS: les users lisent/insert/update leur propre ligne. Les updates Stripe
passent par le client admin (service_role) pour contourner la RLS cote serveur.

## Stripe: configuration
1) Creer un Product et un Price dans Stripe.
2) Recuperer le Price ID (exemple reel de ce projet):
   - `STRIPE_PRICE_ID=price_1Sg8KwRTMuPglkUN3eeDIPgX`
3) Creer un webhook endpoint:
   - URL: `https://YOUR_DOMAIN/api/stripe/webhook`
   - Events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4) Copier le secret de webhook (`whsec_...`) dans `STRIPE_WEBHOOK_SECRET`.

## Variables d'environnement
Exemples (valeurs a remplacer; ne pas commit de secrets):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service_role key)

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

NEXT_PUBLIC_APP_URL=https://your-domain
```

Important:
- `SUPABASE_SERVICE_ROLE_KEY` doit etre une vraie cle service_role. Si c'est une
  cle anon, `lib/supabase/admin.ts` leve:
  `SUPABASE_SERVICE_ROLE_KEY must be a service_role key (role=anon).`
- Tous les secrets doivent etre definis dans Vercel (Settings -> Env Vars) puis
  redeploy.

## Checkout: comportement cote API
Endpoint: `POST /api/stripe/checkout`
- Necessite une session Supabase (`supabase.auth.getUser()`).
- Charge le profil depuis `public.users`.
- Si le profil manque, upsert `users` avec `id/email/full_name`.
- Cree la session Stripe via `createCheckoutSession()` dans
  `lib/stripe/client.ts`.

Exemple de reponse:
```json
{ "url": "https://checkout.stripe.com/c/pay/cs_test_..." }
```

Appel client (depuis `app/paiement/page.tsx`):
```ts
const response = await fetch('/api/stripe/checkout', { method: 'POST' })
```

Si l'utilisateur n'est pas connecte: `401 Unauthorized` et redirection vers
`/inscription?next=/paiement`.

## Webhook: comportement cote API
Endpoint: `POST /api/stripe/webhook`
- Valide `stripe-signature` avec `STRIPE_WEBHOOK_SECRET`.
- Utilise `createAdminClient()` pour bypass RLS.
- Ne traite que les events qui matchent `STRIPE_PRICE_ID`.

Mapping user (ordre):
1) `supabase_user_id` depuis metadata ou `client_reference_id`.
2) `stripe_customer_id` si connu.
3) Email utilisateur (match insensible a la casse).

Effets:
- Update `public.users.has_access`.
- Stocke `public.users.stripe_customer_id` quand dispo.

## Metadata: exemple reel (lib/stripe/client.ts)
- `client_reference_id = user.id`
- `metadata.supabase_user_id = user.id`
- Si le price est recurring:
  `subscription_data.metadata.supabase_user_id = user.id`

## Test local (Stripe CLI)
```bash
stripe listen --events checkout.session.completed,customer.subscription.updated,customer.subscription.deleted ^
  --forward-to http://localhost:3000/api/stripe/webhook
```
Puis ouvrir `/paiement` (user connecte). Verifier dans Supabase:
- `public.users.has_access = true`
- `public.users.stripe_customer_id` set

## Depannage rapide
- Webhook 500 + message service_role:
  - Corriger `SUPABASE_SERVICE_ROLE_KEY` (service_role, pas anon) et redeploy.
- 401 sur `/api/stripe/checkout`:
  - User non connecte ou cookies Supabase absents. Se connecter d'abord.
- Webhook 400 (signature):
  - Mauvais `STRIPE_WEBHOOK_SECRET` ou endpoint mal configure.
- Pas de sync Supabase:
  - Verifier les deliveries webhook dans Stripe.
  - Verifier que `STRIPE_PRICE_ID` correspond au checkout.

## Checklist reutilisation (nouveau projet)
- [ ] Appliquer `supabase-setup.sql` (ou schema equivalent).
- [ ] Creer le product + price; set `STRIPE_PRICE_ID`.
- [ ] Creer le webhook endpoint; set `STRIPE_WEBHOOK_SECRET`.
- [ ] Renseigner les env vars local + Vercel, puis redeploy.
- [ ] Tester checkout + webhook avec Stripe CLI.
