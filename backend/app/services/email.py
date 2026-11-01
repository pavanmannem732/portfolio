import json
import logging
import smtplib
import urllib.error
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings
from app.models.contact import ContactMessage

logger = logging.getLogger(__name__)


class EmailService:
    def send_contact_notification(self, contact: ContactMessage) -> bool:
        if not settings.smtp_configured:
            logger.warning("Email service not configured — skipping notification")
            return False

        # Option A: Send via Resend HTTP API (Port 443 — 100% bypasses port blocking)
        if settings.resend_api_key:
            try:
                payload = json.dumps({
                    "from": "Acme <onboarding@resend.dev>",
                    "to": [settings.contact_to_email],
                    "subject": f"Portfolio Contact: {contact.name}",
                    "html": f"<p><strong>Name:</strong> {contact.name}</p><p><strong>Email:</strong> {contact.email}</p><p><strong>Message:</strong><br>{contact.message}</p>"
                }).encode("utf-8")

                req = urllib.request.Request(
                    "https://api.resend.com/emails",
                    data=payload,
                    headers={
                        "Authorization": f"Bearer {settings.resend_api_key.strip()}",
                        "Content-Type": "application/json",
                        "User-Agent": "FastAPI-Portfolio/1.0"
                    },
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=10) as response:
                    if response.status in (200, 201):
                        logger.info("Successfully sent email via Resend HTTP API to %s", settings.contact_to_email)
                        return True
            except urllib.error.HTTPError as e:
                err_body = e.read().decode("utf-8", errors="ignore")
                logger.error("Resend HTTP API error status=%s: %s", e.code, err_body)
            except Exception as e:
                logger.exception("Resend HTTP API failed: %s", e)

        # Option B: Send via SMTP SSL (Port 465) or STARTTLS (Port 587)
        if settings.smtp_user and settings.smtp_password:
            subject = f"Portfolio contact from {contact.name}"
            body = (
                f"New message via your portfolio contact form\n\n"
                f"Name: {contact.name}\n"
                f"Email: {contact.email}\n\n"
                f"Message:\n{contact.message}\n"
            )

            msg = MIMEMultipart()
            msg["From"] = settings.smtp_from or settings.smtp_user
            msg["To"] = settings.contact_to_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            # Try SMTP_SSL (Port 465) first, then fallback to STARTTLS (Port 587)
            try:
                with smtplib.SMTP_SSL(settings.smtp_host, 465, timeout=10) as server:
                    server.login(settings.smtp_user, settings.smtp_password)
                    server.send_message(msg)
                logger.info("Successfully sent contact email via SMTP_SSL (Port 465) to %s", settings.contact_to_email)
                return True
            except Exception as ssl_err:
                logger.warning("SMTP_SSL (465) failed: %s. Trying STARTTLS (587)...", ssl_err)

            try:
                with smtplib.SMTP(settings.smtp_host, 587, timeout=10) as server:
                    server.starttls()
                    server.login(settings.smtp_user, settings.smtp_password)
                    server.send_message(msg)
                logger.info("Successfully sent contact email via STARTTLS (Port 587) to %s", settings.contact_to_email)
                return True
            except Exception as tls_err:
                logger.exception("Failed to send contact email via SMTP 587: %s", tls_err)

        return False
