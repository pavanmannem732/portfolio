from sqlalchemy.orm import Session

from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate


class ContactRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create(self, payload: ContactCreate) -> ContactMessage:
        record = ContactMessage(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            message=payload.message.strip(),
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record
