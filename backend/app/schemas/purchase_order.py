from pydantic import BaseModel
from typing import Optional

class PurchaseOrderBase(BaseModel):
    po_number: str
    vendor_id: str
    vendor_name: str
    total_amount: float
    currency: str = "USD"
    expected_delivery: Optional[str] = None
    items_json: str = "[]"
    status: str = "OPEN"

class PurchaseOrderCreate(PurchaseOrderBase):
    pass

class PurchaseOrderRead(PurchaseOrderBase):
    id: str
    issue_date: str
    created_at: str
