from sqlmodel import Session, select
from typing import Dict, Any
from app.models.invoice import Invoice
from app.models.purchase_order import PurchaseOrder
from app.agents.matching_agent import matching_agent

class MatchingService:
    @staticmethod
    def match_invoice_to_po(session: Session, invoice_id: str) -> Dict[str, Any]:
        invoice = session.get(Invoice, invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
            
        po = session.exec(select(PurchaseOrder).where(PurchaseOrder.po_number == invoice.po_number)).first() if invoice.po_number else None
        
        po_dict = {
            "po_number": po.po_number if po else None,
            "total_amount": po.total_amount if po else 0.0
        }
        
        return matching_agent.perform_3way_match(
            {"invoice_number": invoice.invoice_number, "total_amount": invoice.total_amount},
            po_dict
        )

matching_service = MatchingService()
