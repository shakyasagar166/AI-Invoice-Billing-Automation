from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

class PurchaseOrder(SQLModel, table=True):
    __tablename__ = "purchase_orders"
    
    id: Optional[str] = Field(default=None, primary_key=True)
    po_number: str = Field(unique=True, index=True)
    vendor_id: str = Field(index=True)
    vendor_name: str
    issue_date: str = Field(default_factory=get_utc_now)
    expected_delivery: Optional[str] = None
    total_amount: float
    currency: str = Field(default="USD")
    status: str = Field(default="OPEN") # OPEN, FULFILLED, PARTIALLY_FULFILLED, CLOSED
    items_json: str = Field(default="[]") # JSON list of items: [{sku, description, qty, unit_price, total}]
    created_at: str = Field(default_factory=get_utc_now)
