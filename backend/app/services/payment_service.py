from sqlmodel import Session
from typing import Dict, Any
from app.models.invoice import Invoice
from app.integrations.payment_gateway import payment_gateway
from app.agents.payment_scheduler_agent import payment_scheduler_agent

class PaymentService:
    @staticmethod
    async def disburse_payment(session: Session, invoice_id: str) -> Dict[str, Any]:
        invoice = session.get(Invoice, invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
            
        res = await payment_gateway.schedule_payment(invoice.id, invoice.total_amount, "JPMorgan Chase ACH")
        invoice.status = "PAID"
        session.add(invoice)
        session.commit()
        session.refresh(invoice)
        return res

payment_service = PaymentService()
