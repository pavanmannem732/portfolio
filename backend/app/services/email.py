import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings
from app.models.contact import ContactMessage

logger = logging.getLogger(__name__)


class EmailService:
    def send_contact_notification(self, contact: ContactMessage) -> bool:
        if not settings.smtp_configured:
            logger.warning("SMTP not configured — skipping email notification")
            return False

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

        try:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
                server.starttls()
                server.login(settings.smtp_user, settings.smtp_password)
                server.send_message(msg)
            return True
        except Exception:
            logger.exception("Failed to send contact email")
            return False
