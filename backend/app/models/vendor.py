from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

class Vendor(SQLModel, table=True):
    __tablename__ = "vendors"
    
    id: Optional[str] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    tax_id: str = Field(unique=True, index=True) # e.g. EIN or GSTIN
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    bank_account: Optional[str] = None
    bank_routing: Optional[str] = None
    payment_terms_days: int = Field(default=30)
    risk_score: float = Field(default=0.0) # 0.0 to 100.0 (lower is safer)
    is_verified: bool = Field(default=True)
    created_at: str = Field(default_factory=get_utc_now)
