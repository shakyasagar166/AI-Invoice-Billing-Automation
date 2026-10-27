from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List
from app.db.database import get_session
from app.schemas.vendor import VendorCreate, VendorRead
from app.services.vendor_service import vendor_service

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.get("", response_model=List[VendorRead])
def list_vendors(session: Session = Depends(get_session)):
    return vendor_service.get_all(session)

@router.get("/{vendor_id}", response_model=VendorRead)
def get_vendor(vendor_id: str, session: Session = Depends(get_session)):
    vendor = vendor_service.get_by_id(session, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return vendor

@router.post("", response_model=VendorRead)
def create_vendor(data: VendorCreate, session: Session = Depends(get_session)):
    return vendor_service.create(session, data)
