from pydantic import BaseModel
from typing import Optional, List

class InvoiceItemSchema(BaseModel):
    id: Optional[str] = None
    line_number: int = 1
    description: str
    quantity: float
    unit_price: float
    tax_rate: float = 0.0
    total_price: float
    matched_po_item_id: Optional[str] = None

class InvoiceBase(BaseModel):
    invoice_number: str
    vendor_id: Optional[str] = None
    vendor_name: str
    po_id: Optional[str] = None
    po_number: Optional[str] = None
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None
    subtotal: float = 0.0
    tax_amount: float = 0.0
    total_amount: float = 0.0
    currency: str = "USD"
    status: str = "PENDING_EXTRACTION"
    extraction_confidence: float = 0.0
    match_score: float = 0.0
    fraud_risk_score: float = 0.0
    anomaly_flags: str = "[]"
    ai_summary: Optional[str] = None
    file_url: Optional[str] = None

class InvoiceCreate(BaseModel):
    invoice_number: str
    vendor_name: str
    po_number: Optional[str] = None
    total_amount: float
    currency: str = "USD"
    subtotal: Optional[float] = None
    tax_amount: Optional[float] = None
    due_date: Optional[str] = None
    items: Optional[List[InvoiceItemSchema]] = None

class InvoiceUpdate(BaseModel):
    status: Optional[str] = None
    match_score: Optional[float] = None
    fraud_risk_score: Optional[float] = None
    anomaly_flags: Optional[str] = None
    ai_summary: Optional[str] = None

class InvoiceRead(InvoiceBase):
    id: str
    created_at: str
    updated_at: str
    items: Optional[List[InvoiceItemSchema]] = []
