# Digital Superpower API

Express + Prisma + PostgreSQL backend for the Celfie quiz activation.

## Local development

```bash
# Terminal 1 — local Postgres (dev only)
npx prisma dev

# Terminal 2 — API
npm install
npm run dev
```

Copy `.env` and set `DATABASE_URL` / `DIRECT_DATABASE_URL` from `npx prisma dev` output.

Health check: `http://localhost:3001/health`

## Deploy on Railway

### 1. Create services

1. **PostgreSQL** — add a Postgres plugin in Railway.
2. **Backend** — deploy from this repo with **Root Directory** set to `backend`.

### 2. Link Postgres to the backend (required)

`prisma migrate deploy` and the API both need `DATABASE_URL`. Railway does **not** set this unless you link the database.

**Option A — Connect (recommended)**  
1. Open your **backend** service in Railway  
2. Click **+ New** → **Database** → **Add PostgreSQL** (or connect an existing one)  
3. Railway injects `DATABASE_URL` into the backend service automatically  

**Option B — Reference variable**  
1. Open your **backend** service → **Variables**  
2. **+ New Variable** → **Add Reference**  
3. Select your **PostgreSQL** service → choose **`DATABASE_URL`**  
4. Save and redeploy  

Confirm under **Variables** that `DATABASE_URL` shows a `postgresql://...` value (not empty).

### 3. Railway settings (backend service)

| Setting | Value |
|---------|--------|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

`backend/railway.toml` also configures build/start and runs `npm run migrate` before deploy.

| Script | What it does |
|--------|----------------|
| `npm run build` | `prisma generate` |
| `npm run migrate` | `prisma migrate deploy` (needs `DATABASE_URL`) |
| `npm start` | Starts the API server |

### 4. Environment variables

| Variable | Required | Value |
|----------|----------|--------|
| `DATABASE_URL` | **Yes** | From linked Railway Postgres (see step 2) |
| `NODE_ENV` | Recommended | `production` |

`PORT` is set automatically by Railway.  
Do **not** use `npx prisma dev` or `prisma+postgres://` URLs in production.

Copy `backend/.env.example` for local development only.

Optional for a deployed frontend:

| Variable | Value |
|----------|--------|
| `FRONTEND_URL` | Your Vercel URL (e.g. `https://celfie-quiz.vercel.app`) — required for CORS |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard — **required in production** |

### 6. Frontend connection (Vercel)

In **Vercel** → Project → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | `https://YOUR-RAILWAY-URL.up.railway.app` |

Then **redeploy** the frontend (env vars are baked in at build time).

### 5. Verify deployment

```bash
curl https://YOUR-RAILWAY-URL/health
# {"status":"ok"}
```

**Registration returns 500 / Internal server error**  
Usually means database tables were never created. `npm start` now runs `prisma migrate deploy` automatically. Redeploy the **backend** on Railway, then check:

```bash
curl https://YOUR-RAILWAY-URL/api/test/schema
# {"message":"Database schema is ready","participants":0,"quizResults":0}
```

If it still fails, confirm `DATABASE_URL` is set on the backend service (linked Postgres), then redeploy again.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Generate Prisma client |
| `npm run migrate` | Apply migrations (`DATABASE_URL` required) |
| `npm start` | Apply migrations, then start server |
| `npm test` | Run profile calculator unit tests |
