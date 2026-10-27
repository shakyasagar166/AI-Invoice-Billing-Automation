from pydantic import BaseModel
from typing import Optional

class VendorBase(BaseModel):
    name: str
    tax_id: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    bank_account: Optional[str] = None
    bank_routing: Optional[str] = None
    payment_terms_days: int = 30
    risk_score: float = 0.0
    is_verified: bool = True

class VendorCreate(VendorBase):
    pass

class VendorRead(VendorBase):
    id: str
    created_at: str
