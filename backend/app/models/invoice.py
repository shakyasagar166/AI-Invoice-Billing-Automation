from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

class Invoice(SQLModel, table=True):
    __tablename__ = "invoices"
    
    id: Optional[str] = Field(default=None, primary_key=True)
    invoice_number: str = Field(index=True)
    vendor_id: Optional[str] = Field(default=None, index=True)
    vendor_name: str
    po_id: Optional[str] = Field(default=None, index=True)
    po_number: Optional[str] = None
    
    invoice_date: str = Field(default_factory=get_utc_now)
    due_date: str = Field(default_factory=get_utc_now)
    
    subtotal: float = Field(default=0.0)
    tax_amount: float = Field(default=0.0)
    total_amount: float = Field(default=0.0)
    currency: str = Field(default="USD")
    
    # Status lifecycle: PENDING_EXTRACTION, MATCHED, DISCREPANCY, APPROVED, PAID, REJECTED
    status: str = Field(default="PENDING_EXTRACTION", index=True)
    
    # AI Extraction & Matching Telemetry
    extraction_confidence: float = Field(default=0.0) # 0.0 to 100.0%
    match_score: float = Field(default=0.0) # 0.0 to 100.0%
    fraud_risk_score: float = Field(default=0.0) # 0.0 to 100.0%
    anomaly_flags: str = Field(default="[]") # JSON list of flags e.g. ["PRICE_VARIANCE_3.5%", "TAX_MISMATCH"]
    
    ai_summary: Optional[str] = None
    file_url: Optional[str] = None
    
    created_at: str = Field(default_factory=get_utc_now)
    updated_at: str = Field(default_factory=get_utc_now)
