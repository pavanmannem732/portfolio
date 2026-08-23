# Deployment Guide

## 1. Portfolio (host first)

### Frontend → Vercel
1. Push `e:\portfolio` to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Set env var: `NEXT_PUBLIC_API_URL=https://your-api.railway.app`
4. Deploy

### Backend → Railway or Render
1. Create new service, root directory: `backend`
2. Set env vars from `backend/.env.example` (Neon `DATABASE_URL`, SMTP, CORS with Vercel URL)
3. Deploy and copy the public URL

---

## 2. Your projects (host after portfolio)

| Project | Path | Stack | Suggested host |
|---|---|---|---|
| Celebrations | `E:\Celebrations_project` | FastAPI + React | Railway (backend) + Vercel (frontend) |
| Dialect | `E:\Dialect` | FastAPI + Next.js | Docker on Railway or VPS |
| CA-OS | `E:\CA_Project` | FastAPI + Next.js | Railway + Vercel |
| FillTheGap | `A:\FILLTHEGAP` | Django | Railway or Render |

### Before pushing each project to GitHub
- [ ] Remove `.env` files with real secrets
- [ ] Add `.env.example` with placeholder values
- [ ] Rotate any credentials that were shared in chat
- [ ] Test `docker compose up` or local run
- [ ] Update GitHub URLs in `src/data/portfolio.ts` after pushing

### Celebrations
- See `E:\Celebrations_project\DEPLOYMENT.md`
- Rotate JWT, DATABASE_URL, Mistral keys before public deploy

### Dialect
- See `E:\Dialect\docs/deployment.md`
- Use `docker compose -f infra/docker/docker-compose.yml up`

### CA-OS
- Backend: `fastapi dev main.py` in `backend/`
- Frontend: `npm run dev` in `frontend/`

### FillTheGap
- Switch from SQLite to PostgreSQL for production
- Set `DEBUG=False`, proper `SECRET_KEY`, and `ALLOWED_HOSTS`
- Use `gunicorn results_portal.wsgi` behind a reverse proxy

---

## Security reminder

**Rotate your Neon database password** — it was shared in chat. In Neon dashboard: Settings → Reset password → update `DATABASE_URL` everywhere.
