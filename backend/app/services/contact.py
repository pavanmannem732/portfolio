from fastapi import BackgroundTasks
from sqlalchemy.orm import Session

from app.repository.contact import ContactRepository
from app.schemas.contact import ContactCreate, ContactSubmitResponse
from app.services.email import EmailService


class ContactService:
    def __init__(self, db: Session) -> None:
        self.repository = ContactRepository(db)
        self.email_service = EmailService()

    def submit(
        self, payload: ContactCreate, background_tasks: BackgroundTasks
    ) -> ContactSubmitResponse:
        record = self.repository.create(payload)
        background_tasks.add_task(
            self.email_service.send_contact_notification, record
        )

        return ContactSubmitResponse(
            success=True,
            message="Message sent successfully! I'll get back to you soon.",
            id=record.id,
        )
