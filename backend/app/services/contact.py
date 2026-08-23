from sqlalchemy.orm import Session

from app.repository.contact import ContactRepository
from app.schemas.contact import ContactCreate, ContactSubmitResponse
from app.services.email import EmailService


class ContactService:
    def __init__(self, db: Session) -> None:
        self.repository = ContactRepository(db)
        self.email_service = EmailService()

    def submit(self, payload: ContactCreate) -> ContactSubmitResponse:
        record = self.repository.create(payload)
        email_sent = self.email_service.send_contact_notification(record)

        if email_sent:
            return ContactSubmitResponse(
                success=True,
                message="Message sent successfully. I'll get back to you soon.",
                id=record.id,
            )

        return ContactSubmitResponse(
            success=True,
            message="Message saved. Email notification pending SMTP setup.",
            id=record.id,
        )
