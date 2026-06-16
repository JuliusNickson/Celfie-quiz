# Digital Superpower — Frontend

React + Vite quiz UI for the Celfie activation.

## Local development

```bash
npm install
npm run dev
```

API defaults to `http://localhost:3001/api` in dev. Start the backend locally first.

## Deploy on Vercel

### 1. Import project

- Root Directory: `frontend`
- Framework: Vite

`vercel.json` rewrites all routes to `index.html` so React Router paths like `/admin`, `/register`, and `/quiz` work on refresh and direct links.

### 2. Environment variable (required)

Vite bakes env vars in at **build time**. You must set this in Vercel **before** deploying:

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://your-backend.up.railway.app` |

Use your **Railway backend public URL** including `https://`. Do **not** use a path-only value like `your-app.up.railway.app` without the protocol — that sends requests to Vercel instead of Railway. `/api` is appended automatically if omitted.

### 3. Redeploy

After adding `VITE_API_URL`, trigger a **new deployment** (Settings → Deployments → Redeploy).  
Changing env vars does not update an already-built bundle.

### 4. Railway backend CORS

On your Railway **backend** service, set:

| Variable | Value |
|----------|--------|
| `FRONTEND_URL` | `https://celfie-quiz.vercel.app` |

Redeploy the backend after adding this.

## Troubleshooting

**Error: requests to `http://localhost:3001`**  
`VITE_API_URL` was not set when Vercel built the app. Add it and redeploy.

**CORS / blocked requests**  
Ensure `FRONTEND_URL` on Railway matches your exact Vercel URL (including `https://`).
