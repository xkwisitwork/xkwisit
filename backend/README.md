# Xkwisit Backend (MongoDB V1)

Express + Mongoose API for auth, organizations, Growth Assessment / X-Ray, and strategy-call bookings.

## Stack

- **Runtime:** Node 18+, Express, TypeScript (`tsx` in dev)
- **Database:** MongoDB 7 via Mongoose (no Prisma / SQL)
- **Auth:** bcrypt passwords, JWT access token + httpOnly refresh cookie

## Quick start

```bash
# 1. Start MongoDB (local) — or set MONGODB_URI to Atlas
docker compose up -d

# 2. Install & env
cp .env.example .env
npm install

# 3. Dev server (port 4000) — no seed; register from the app
npm run dev
```

Health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)

Point the frontend at this API:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api
API_URL=http://localhost:4000/api
```

## Seed credentials

Seed script is **disabled** — create accounts via `/register`. To make a user a platform super admin in MongoDB:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { isPlatformAdmin: true } })
```

## Platform (super admin)

| Route | Purpose |
|-------|--------|
| `GET /platform/stats` | Tenant counts |
| `GET /platform/workspaces` | List agencies |
| `GET /platform/workspaces/:id` | Workspace detail |
| `PATCH /platform/workspaces/:id` | Set plan / status / seats / trial end |
| `POST /platform/workspaces/:id/extend-trial` | Add trial days |

Requires `User.isPlatformAdmin === true`. Frontend: `/platform` and `/platform/workspaces`.

## API surface (V1)

All routes mount under `/api` and return `{ success, data }` or `{ success: false, error }`.

| Area | Routes |
|------|--------|
| Health | `GET /health` |
| Auth | `POST /auth/register`, `/login`, `/logout`, `/refresh`, `GET /auth/me`, forgot/reset/verify |
| Orgs | `GET /organizations/current`, `/organizations/current/members` |
| Platform | `/platform/*` (super admin) |
| Assessment | `POST/PUT /assessment`, `POST /assessment/score`, `GET /assessment/:token`, `GET /assessment/:token/report`, `GET /assessment/submissions` |
| Bookings | `POST /bookings`, `GET /bookings/:id` |

### Auth notes

- Register creates a **User**, default **Organization** (status `TRIAL`, plan `GROWTH`, 14-day window), and **OWNER** membership.
- Login / register return `{ user, billing?, accessToken }` and set auth cookies.
- `GET /auth/me` returns `{ user, billing }` with entitlements for nav gating.
- Password reset and email verify tokens are logged to the server console until email (Resend) is wired.

## Environment

See `.env.example`:

- `MONGODB_URI` — Atlas preferred (`…mongodb.net/xkwisit?…`). Always include the DB name in the path.
- `MONGODB_DB_NAME` — safety net (e.g. `xkwisit`) so Mongo never falls back to the default `test` database
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`
- `PORT=4000`, `CORS_ORIGIN=http://localhost:3000`

If Atlas fails with IP / TLS errors, whitelist your current IP (or `0.0.0.0/0` for dev) under Atlas → Network Access.

## Out of scope (later)

CRM/leads, approvals, invoices, Paystack, OAuth, Redis queues, MFA (routes return 501).

Empty module folders under `src/modules/*` are stubs for future verticals. The unused `prisma/` path is not part of this stack.
