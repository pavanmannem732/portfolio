# Portfolio Deployment Guide (Vercel + Render)

This repository contains:

1. **Frontend (Next.js)** — repo root
2. **Backend (FastAPI)** — `backend/`

Live URLs:

- Frontend: https://portfolio-tan-eight-12.vercel.app
- API: https://pavan-portfolio-api-lr4f.onrender.com

---

## Backend on Render

Service: `pavan-portfolio-api` (Python web service, root directory `backend`).

Required environment variables:

- `ENV=production`
- `DATABASE_URL` — Neon PostgreSQL connection string
- `CORS_ORIGINS` — comma-separated frontend URLs
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER` / `SMTP_PASSWORD` — Gmail address + App Password
- `SMTP_FROM` / `CONTACT_TO_EMAIL`

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Health check: `GET /health`

---

## Frontend on Vercel

Set:

- `NEXT_PUBLIC_API_URL=https://pavan-portfolio-api-lr4f.onrender.com`

Redeploy after changing env vars (`vercel --prod` or a Git push).

---

## Notes

Render's free web service sleeps after idle time. The first request after sleep can take 30–60 seconds.
