# Ty-Koad — V5.1

Site démo Next.js (paiement Stripe + préautorisation de caution, webhook, admin léger, export iCal).

## Installation
1. Copier `.env.example` vers `.env.local` et remplir vos clés.
2. Installer et lancer :

```bash
npm install
npm run dev
```

3. Webhook Stripe (terminal séparé) :

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```
