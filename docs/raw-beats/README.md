# Raw Beats

A full-featured beat marketplace where producers sell licenses and buyers discover, preview, and purchase instrumentals.

**Production:** [rawbeats.ro](https://rawbeats.ro) · API at `api.rawbeats.ro`  
**Stack:** Nuxt 3 frontend + Express API · PostgreSQL · Railway

---

## Features

### Marketplace & discovery

- Browse and search published beats (title, description, tags)
- Filter by genre, BPM, and mood; sort by newest, oldest, popularity, or trending
- Beat detail pages with SEO-friendly slugs
- Global audio player with waveform visualization (WaveSurfer.js)
- Producer directory and public storefront pages
- Follow producers and view their catalogs

### For producers

- Upload beats with cover art and metadata (BPM, key, scale, genre, mood, tags)
- **Audio normalization to -14 LUFS** on upload via ffmpeg (see [api/README.md](api/README.md))
- Draft, publish, and archive beats
- Multiple license types per beat: **MP3**, **WAV**, **STEMS**, **EXCLUSIVE**
- Configurable license pricing, terms, and usage flags (commercial use, distribution)
- Replace audio or cover art after upload
- Sales dashboard and per-beat / per-user analytics (plays, likes, downloads, revenue)
- Stripe Connect-ready producer accounts (`stripeAccountId`)

### For buyers

- Preview beats in-browser before purchase
- Stripe checkout (payment intents + webhooks)
- Purchase history and secure license downloads
- Favorites and likes
- Comments on beat pages

### Accounts & auth

- Email/password registration and login
- **Google OAuth** sign-in
- Password reset via email (SMTP)
- Roles: **Producer**, **Buyer**, **Admin**
- Profile management (avatar, bio, social links, display name)

### Messaging & notifications

- Real-time direct messages via **Socket.io** (typing indicators, read receipts)
- In-app notifications (read / mark all read)
- Conversation list and per-user threads

### Producer dashboard

- Overview, beat list, upload & edit flows
- Analytics, sales, favorites, messages, notifications
- Profile and account settings

### Platform admin

- Admin API: user/beat moderation, sales overview, system settings
- Platform settings UI (color scheme theming, access control)
- Beat status management (published, draft, archived, banned)

### Security & ops

- JWT authentication, rate limiting, Helmet, CORS
- Health checks (`/health`, `/health/ffmpeg`)
- File storage on Railway volumes (`/storage`, `/audio`)
- Prisma migrations on API deploy (`start:migrate`)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Nuxt 3, Vue 3, Tailwind CSS, Pinia |
| API | Express, TypeScript, Prisma |
| Database | PostgreSQL |
| Payments | Stripe |
| Realtime | Socket.io |
| Audio | Howler.js, WaveSurfer.js, ffmpeg (server) |
| Hosting | [Railway](https://railway.com) (frontend + API + Postgres) |

---

## Project structure

```
rawbeats/
├── api/                 # Express API (port 3001)
│   ├── src/routes/      # auth, beats, users, purchases, messages, …
│   ├── prisma/          # schema & migrations
│   └── README.md        # API-specific docs (audio normalization)
├── pages/               # Nuxt routes
├── components/          # Vue UI components
├── composables/         # useAuth, useApi, useSocket, useGlobalAudio, …
├── prisma/              # Root Prisma schema (if used for tooling)
├── env.example          # Environment variable template
└── railway.json         # Frontend Railway deploy config
```

---

## Getting started

### Prerequisites

- Node.js **≥ 20.19** (see `.nvmrc`)
- PostgreSQL (local or Railway)
- [ffmpeg](https://ffmpeg.org/) for beat upload normalization (API)
- Stripe account (test keys for development)

### 1. Install dependencies

```bash
npm install
cd api && npm install && cd ..
```

### 2. Environment

```bash
cp env.example .env
# Also copy or symlink vars into api/.env if needed
```

See `env.example` for all variables (`DATABASE_URL`, `JWT_SECRET`, Stripe, Google OAuth, SMTP, `RAILWAY_PUBLIC_URL`, etc.).

### 3. Database

```bash
cd api && ./setup-local-db.sh   # optional helper
cd api && npx prisma migrate deploy
```

### 4. Run locally

**Frontend only** (API must be running separately):

```bash
npm run dev
```

**Frontend + API:**

```bash
npm run dev:full
```

- App: http://localhost:3000  
- API: http://localhost:3001  

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Nuxt dev server |
| `npm run dev:full` | API + Nuxt together |
| `npm run build` | Production Nuxt build |
| `npm run start` | Run Nuxt production server (`.output`) |
| `npm run api:dev` | API dev with hot reload |
| `npm run api:build` | Build API |
| `npm run api:start` | Run API production server |

---

## Deployment (Railway)

The repo is set up for two Railway services:

| Service | Config | Start command |
|---------|--------|---------------|
| **Frontend** | `railway.json` (repo root) | `npm run start` |
| **API** | `api/railway.json` | `npm run start:migrate` |

Set environment variables in Railway for each service. Production URLs (example):

- `APP_URL=https://rawbeats.ro`
- `NUXT_PUBLIC_API_BASE=https://api.rawbeats.ro`
- `RAILWAY_PUBLIC_URL=https://api.rawbeats.ro`
- `ALLOWED_ORIGINS=https://rawbeats.ro,https://www.rawbeats.ro`

Attach a **Volume** to the API service if you need persistent beat/audio file storage.

---

## API overview

Base path: `/api`

| Route prefix | Purpose |
|--------------|---------|
| `/api/auth` | Register, login, profile, Google OAuth, password reset |
| `/api/beats` | CRUD, upload, licenses, publish, like/favorite |
| `/api/users` | Producers, follows, analytics, purchases, sales |
| `/api/purchases` | Checkout intents, confirm, downloads, Stripe webhooks |
| `/api/payments` | Stripe config & payment helpers |
| `/api/messages` | Conversations, send, notifications |
| `/api/comments` | Beat comments |
| `/api/admin` | Platform administration |

Static assets: `/storage/*`, `/audio/*`

---

## License

Private project. All rights reserved unless otherwise specified.
