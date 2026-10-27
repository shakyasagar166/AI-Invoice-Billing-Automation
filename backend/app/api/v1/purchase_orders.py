from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List
from app.db.database import get_session
from app.schemas.purchase_order import PurchaseOrderCreate, PurchaseOrderRead
from app.services.po_service import po_service

router = APIRouter(prefix="/purchase-orders", tags=["Purchase Orders"])

@router.get("", response_model=List[PurchaseOrderRead])
def list_pos(session: Session = Depends(get_session)):
    return po_service.get_all(session)

@router.get("/{po_id}", response_model=PurchaseOrderRead)
def get_po(po_id: str, session: Session = Depends(get_session)):
    po = po_service.get_by_id(session, po_id)
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    return po

@router.post("", response_model=PurchaseOrderRead)
def create_po(data: PurchaseOrderCreate, session: Session = Depends(get_session)):
    return po_service.create(session, data)
