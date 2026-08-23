# Portfolio Backend API

FastAPI backend for the portfolio contact form — stores messages in Neon PostgreSQL and sends email via SMTP.

## Structure

```
backend/
├── main.py                 # FastAPI entrypoint
├── app/
│   ├── core/               # Config, database
│   ├── models/             # SQLAlchemy ORM
│   ├── schemas/            # Pydantic validation
│   ├── repository/         # Data access layer
│   ├── services/           # Business logic + SMTP
│   └── routes/             # API endpoints
```

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # Fill in DATABASE_URL and SMTP
python main.py
```

API runs at `http://localhost:8000` — docs at `/docs` in development.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `CORS_ORIGINS` | Comma-separated frontend URLs |
| `SMTP_USER` | Gmail address |
| `SMTP_PASSWORD` | Gmail App Password (not regular password) |
| `CONTACT_TO_EMAIL` | Where contact form emails go |

### Gmail SMTP setup

1. Enable 2FA on your Google account
2. Create an App Password at https://myaccount.google.com/apppasswords
3. Set `SMTP_PASSWORD` to that 16-character app password

## Deploy (Railway / Render)

1. Connect this repo, set root directory to `backend`
2. Add all env vars from `.env.example`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Copy the deployed URL into frontend `NEXT_PUBLIC_API_URL`

## Endpoints

- `GET /health` — health check
- `POST /api/v1/contact` — submit contact form `{ name, email, message }`
