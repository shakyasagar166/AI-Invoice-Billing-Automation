from sqlmodel import SQLModel, Field
from typing import Optional

class InvoiceItem(SQLModel, table=True):
    __tablename__ = "invoice_items"
    
    id: Optional[str] = Field(default=None, primary_key=True)
    invoice_id: str = Field(index=True)
    line_number: int = Field(default=1)
    description: str
    quantity: float = Field(default=1.0)
    unit_price: float = Field(default=0.0)
    tax_rate: float = Field(default=0.0)
    total_price: float = Field(default=0.0)
    matched_po_item_id: Optional[str] = None
