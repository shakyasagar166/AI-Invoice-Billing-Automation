from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.services.matching_service import matching_service

router = APIRouter(prefix="/matching", tags=["Reconciliation"])

@router.post("/reconcile/{invoice_id}")
def reconcile_invoice(invoice_id: str, session: Session = Depends(get_session)):
    return matching_service.match_invoice_to_po(session, invoice_id)
