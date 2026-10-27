from sqlmodel import Session, select
from typing import List, Optional
import uuid
from app.models.vendor import Vendor
from app.schemas.vendor import VendorCreate

class VendorService:
    @staticmethod
    def get_all(session: Session) -> List[Vendor]:
        return session.exec(select(Vendor)).all()

    @staticmethod
    def get_by_id(session: Session, vendor_id: str) -> Optional[Vendor]:
        return session.get(Vendor, vendor_id)

    @staticmethod
    def create(session: Session, data: VendorCreate) -> Vendor:
        vendor = Vendor(
            id=f"ven_{uuid.uuid4().hex[:8]}",
            **data.model_dump()
        )
        session.add(vendor)
        session.commit()
        session.refresh(vendor)
        return vendor

vendor_service = VendorService()
