from sqlmodel import Session, select
from typing import List, Optional
import uuid
from app.models.purchase_order import PurchaseOrder
from app.schemas.purchase_order import PurchaseOrderCreate

class POService:
    @staticmethod
    def get_all(session: Session) -> List[PurchaseOrder]:
        return session.exec(select(PurchaseOrder)).all()

    @staticmethod
    def get_by_id(session: Session, po_id: str) -> Optional[PurchaseOrder]:
        return session.get(PurchaseOrder, po_id)

    @staticmethod
    def get_by_number(session: Session, po_number: str) -> Optional[PurchaseOrder]:
        return session.exec(select(PurchaseOrder).where(PurchaseOrder.po_number == po_number)).first()

    @staticmethod
    def create(session: Session, data: PurchaseOrderCreate) -> PurchaseOrder:
        po = PurchaseOrder(
            id=f"po_{uuid.uuid4().hex[:8]}",
            **data.model_dump()
        )
        session.add(po)
        session.commit()
        session.refresh(po)
        return po

po_service = POService()
