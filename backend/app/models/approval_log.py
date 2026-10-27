from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

class ApprovalLog(SQLModel, table=True):
    __tablename__ = "approval_logs"
    
    id: Optional[str] = Field(default=None, primary_key=True)
    invoice_id: str = Field(index=True)
    action: str # EXTRACTED, AUTO_MATCHED, DISCREPANCY_FLAGGED, APPROVED, REJECTED, PAID
    actor: str # AI_AGENT, CFO, FINANCE_OPS, SYSTEM
    notes: Optional[str] = None
    created_at: str = Field(default_factory=get_utc_now)
