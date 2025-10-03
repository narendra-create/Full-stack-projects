# Get Me A Coffee

A simple creator-support platform built with Next.js (App Router). Fans can donate “a coffee” to creators via Cashfree. Includes OAuth login, creator pages, a dashboard, and payment status tracking.

## Tech Stack
- Next.js 15 (App Router), React 19
- Tailwind CSS v4
- NextAuth (GitHub, Google)
- MongoDB + Mongoose
- Cashfree JS SDK (v3)
- React Toastify

## Project Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run ESLint

---

## Frontend

### Structure (key pages)
- `app/page.js` – Landing page
- `app/Login/page.js` – OAuth login (GitHub/Google)
- `app/Dashboard/page.js` – Creator profile + Cashfree credentials form
- `app/[username]/page.js` – Dynamic creator route (renders `PaymentPage`)
- `app/PaymentPage/page.js` – Creator profile, supporters list, donation form
- `app/payment-status/page.js` – Payment status/result screen
- `app/Navbar/page.js`, `app/Footer/page.js` – Layout components
- `app/HelperWrapper/SessionWrapper.js` – NextAuth session provider

### Styling
- Tailwind v4 with App Router. Base styles target mobile; desktop overrides are applied with `sm:`.
- Fonts via `next/font` (Geist): configured in `app/layout.js`.

### UI Notes
- Mobile-first responsive adjustments keep desktop styles unchanged.
- Toast notifications for success/error states.

---

## Backend

### Database & Models
- Connection: `lib/dbconnect.js`
- Models: `app/Models/User.js`, `app/Models/Payment.js`

### Authentication
- NextAuth route: `app/api/auth/[...nextauth]/route.js`
- Providers: GitHub, Google (configure OAuth keys)
- Client wrapper: `SessionWrapper`

### Payments (Cashfree)
- Client SDK loaded in `PaymentPage` via `<Script src="https://sdk.cashfree.com/js/v3/cashfree.js" />`
- Create order: `POST /api/create-order`
- Verify payment: `POST /api/pay/verify`
- Payment status polling: `GET /api/payment/status`
- Webhook (if used): `POST /api/webhook`

### Users & Data
- Fetch user: `GET /api/fetchuser?email=...`
- Update user: `POST /api/updateuser`
- Fetch payments: `GET /api/fetchpayments?creator_id=...`

### Environment Variables
Create a `.env.local` with at least:

```bash
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_URL=http://localhost:3000

# OAuth (NextAuth)
GITHUB_ID=...
GITHUB_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Cashfree (per creator or app level)
CASHFREE_ID=...
CASHFREE_SECRET=...
```

Notes:
- In this app, creators store their Cashfree credentials in the dashboard. Ensure server routes pass the correct keys.
- `NEXT_PUBLIC_URL` is used by some client routes to call server endpoints (e.g. status checks).

---

## Hosting

### 1) Vercel (Frontend + Serverless API)
1. Push the repo to GitHub.
2. Import into Vercel.
3. Set the Environment Variables (same as `.env.local`).
4. Configure the following build settings (defaults are fine):
   - Framework: Next.js
   - Build Command: `next build`
   - Output: `.vercel/output` (handled by Vercel automatically)
5. Deploy.

### 2) MongoDB Atlas
1. Create a free cluster.
2. Create a database user and whitelist IPs (or set 0.0.0.0/0 for development).
3. Put the connection string in `MONGODB_URI`.

### 3) Cashfree
1. Create a Cashfree account and app (Sandbox for testing).
2. Configure allowed domains (your Vercel domain) and webhook URL if used:
   - Webhook: `https://<your-domain>/api/webhook`
3. Put sandbox/production keys in environment variables and/or dashboard as required.
4. Ensure `PaymentPage` can load the Cashfree v3 SDK on your domain.

### Test Checklist
- OAuth login works on the deployed domain (GitHub/Google callback URLs updated).
- Creator dashboard loads and updates profile.
- Creator page renders with cover/profile and accepts payments.
- Payment status screen resolves correctly after checkout.
- Webhooks (if enabled) are received by your `/api/webhook`.

---

## Local Development
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Repository Structure (partial)
```
app/
  api/
    auth/[...nextauth]/route.js
    create-order/route.js
    fetchuser/route.js
    fetchpayments/route.js
    pay/verify/route.js
    payment/status/route.js
    updateuser/route.js
    webhook/route.js
  [username]/page.js
  Dashboard/page.js
  Login/page.js
  Navbar/page.js
  PaymentPage/page.js
  payment-status/page.js
  page.js
lib/dbconnect.js
```

---

## License
This project is for learning/demonstration purposes. Use at your own discretion.
