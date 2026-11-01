# 🚀 Portfolio Deployment Guide (Vercel + Railway)

This repository contains:
1. **Frontend (Next.js)** - Root directory (`E:\portfolio`)
2. **Backend (FastAPI)** - `backend/` directory (`E:\portfolio\backend`)

---

## Part 1: Deploy Backend to Railway

### Option A: Via GitHub (Recommended)
1. Push your repository `portfolio` to GitHub.
2. Log into [Railway.app](https://railway.app).
3. Click **New Project** → **Deploy from GitHub repo**.
4. Select your `portfolio` repository.
5. In **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: Leave default or `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. In **Variables**, add:
   - `ENV` = `production`
   - `DATABASE_URL` = `<your-neon-postgresql-connection-string>`
   - `CORS_ORIGINS` = `http://localhost:3000,https://<your-vercel-domain>.vercel.app`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `pavanmannem42@gmail.com`
   - `SMTP_PASSWORD` = `<your-gmail-app-password>`
   - `SMTP_FROM` = `pavanmannem42@gmail.com`
   - `CONTACT_TO_EMAIL` = `pavanmannem42@gmail.com`
7. Click **Generate Domain** under Networking. Copy your Railway API URL (e.g. `https://pavan-portfolio-api.up.railway.app`).

### Option B: Via Railway CLI
```bash
cd E:\portfolio\backend
railway login
railway init
railway up
```

---

## Part 2: Deploy Frontend to Vercel

### Option A: Via GitHub (Recommended)
1. Log into [Vercel.com](https://vercel.com).
2. Click **Add New** → **Project**.
3. Import your `portfolio` GitHub repository.
4. Framework Preset: **Next.js** (Root Directory: `./`).
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = `https://<your-railway-backend-domain>.up.railway.app`
6. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
cd E:\portfolio
npx vercel login
npx vercel --prod
```
*When prompted for `NEXT_PUBLIC_API_URL`, paste your Railway Backend URL.*

---

## Part 3: Final Checklist & Verification

- [x] Backend `Procfile` created (`web: uvicorn main:app --host 0.0.0.0 --port $PORT`)
- [x] Backend `railway.json` created
- [x] Frontend `vercel.json` configured
- [ ] Set `NEXT_PUBLIC_API_URL` on Vercel
- [ ] Set `CORS_ORIGINS` on Railway to match your Vercel URL
- [ ] Test the contact form on your live Vercel site
