from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.contact import ContactCreate, ContactSubmitResponse
from app.services.contact import ContactService

router = APIRouter(prefix="/api/v1/contact", tags=["contact"])


@router.post("", response_model=ContactSubmitResponse)
def submit_contact(
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> ContactSubmitResponse:
    service = ContactService(db)
    return service.submit(payload, background_tasks)
