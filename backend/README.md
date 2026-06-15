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

### 2. Railway settings (backend service)

| Setting | Value |
|---------|--------|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

`npm run build` runs `prisma generate`.  
`npm start` runs `prisma migrate deploy` then starts the server.

### 3. Environment variables

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | Reference from Railway Postgres (`${{Postgres.DATABASE_URL}}`) |
| `NODE_ENV` | `production` |

`PORT` is set automatically by Railway.  
Do **not** use `npx prisma dev` or `prisma+postgres://` URLs in production.

Optional for a deployed frontend:

| Variable | Value |
|----------|--------|
| `FRONTEND_URL` | Your frontend origin (e.g. `https://your-app.vercel.app`) |

### 4. Verify deployment

```bash
curl https://YOUR-RAILWAY-URL/health
# {"status":"ok"}
```

### 5. Frontend connection

Set the frontend env var:

```env
VITE_API_URL=https://YOUR-RAILWAY-URL/api
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Generate Prisma client |
| `npm start` | Apply migrations and start server |
| `npm test` | Run profile calculator unit tests |
