from sqlmodel import Session, select
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
import uuid
import json

from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem
from app.models.approval_log import ApprovalLog
from app.models.purchase_order import PurchaseOrder
from app.schemas.invoice import InvoiceCreate, InvoiceUpdate
from app.agents.matching_agent import matching_agent
from app.agents.fraud_anomaly_agent import fraud_anomaly_agent
from app.agents.tax_validation_agent import tax_validation_agent

def get_now() -> str:
    return datetime.now(timezone.utc).isoformat()

def get_due(days: int = 30) -> str:
    return (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()

class InvoiceService:
    @staticmethod
    def get_all(session: Session, status: Optional[str] = None) -> List[Invoice]:
        stmt = select(Invoice)
        if status:
            stmt = stmt.where(Invoice.status == status)
        return session.exec(stmt.order_by(Invoice.created_at.desc())).all()

    @staticmethod
    def get_by_id(session: Session, invoice_id: str) -> Optional[Invoice]:
        return session.get(Invoice, invoice_id)

    @staticmethod
    def get_items(session: Session, invoice_id: str) -> List[InvoiceItem]:
        return session.exec(select(InvoiceItem).where(InvoiceItem.invoice_id == invoice_id)).all()

    @staticmethod
    def create(session: Session, data: InvoiceCreate) -> Invoice:
        inv_id = f"inv_{uuid.uuid4().hex[:8]}"
        
        subtotal = data.subtotal if data.subtotal is not None else round(data.total_amount * 0.92, 2)
        tax = data.tax_amount if data.tax_amount is not None else round(data.total_amount - subtotal, 2)
        due_date = data.due_date or get_due(30)
        
        invoice = Invoice(
            id=inv_id,
            invoice_number=data.invoice_number,
            vendor_name=data.vendor_name,
            po_number=data.po_number,
            total_amount=data.total_amount,
            subtotal=subtotal,
            tax_amount=tax,
            due_date=due_date,
            currency=data.currency,
            status="PENDING_EXTRACTION",
            extraction_confidence=97.5,
            created_at=get_now(),
            updated_at=get_now()
        )
        session.add(invoice)
        session.commit()
        session.refresh(invoice)
        
        # Add line items if provided
        if data.items:
            for idx, item in enumerate(data.items):
                item_obj = InvoiceItem(
                    id=f"item_{uuid.uuid4().hex[:8]}",
                    invoice_id=inv_id,
                    line_number=idx + 1,
                    description=item.description,
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                    tax_rate=item.tax_rate,
                    total_price=item.total_price
                )
                session.add(item_obj)
            session.commit()
            
        # Log event
        log = ApprovalLog(
            id=f"log_{uuid.uuid4().hex[:8]}",
            invoice_id=inv_id,
            action="EXTRACTED",
            actor="AI_AGENT",
            notes=f"Invoice {invoice.invoice_number} parsed with 97.5% confidence.",
            created_at=get_now()
        )
        session.add(log)
        session.commit()
        
        # Automatically run matching and fraud scan
        InvoiceService.run_reconciliation(session, inv_id)
        session.refresh(invoice)
        return invoice

    @staticmethod
    def run_reconciliation(session: Session, invoice_id: str) -> Invoice:
        invoice = session.get(Invoice, invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
            
        po = None
        if invoice.po_number:
            po = session.exec(select(PurchaseOrder).where(PurchaseOrder.po_number == invoice.po_number)).first()
            
        po_dict = {
            "po_number": po.po_number if po else None,
            "total_amount": po.total_amount if po else 0.0
        }
        
        match_result = matching_agent.perform_3way_match(
            {"invoice_number": invoice.invoice_number, "total_amount": invoice.total_amount},
            po_dict
        )
        
        # Fraud Assessment
        all_invoices = session.exec(select(Invoice)).all()
        fraud_result = fraud_anomaly_agent.assess_risk(
            {"id": invoice.id, "invoice_number": invoice.invoice_number, "total_amount": invoice.total_amount},
            [{"id": i.id, "invoice_number": i.invoice_number, "total_amount": i.total_amount} for i in all_invoices]
        )
        
        invoice.match_score = match_result["match_score"]
        invoice.fraud_risk_score = fraud_result["fraud_risk_score"]
        invoice.anomaly_flags = json.dumps(match_result["discrepancies"] + fraud_result["flags"])
        invoice.status = match_result["status"]
        invoice.ai_summary = match_result["summary"]
        invoice.updated_at = get_now()
        
        session.add(invoice)
        session.commit()
        session.refresh(invoice)
        return invoice

    @staticmethod
    def approve(session: Session, invoice_id: str, actor: str = "FINANCE_OPS") -> Invoice:
        invoice = session.get(Invoice, invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
            
        invoice.status = "APPROVED"
        invoice.updated_at = get_now()
        session.add(invoice)
        
        log = ApprovalLog(
            id=f"log_{uuid.uuid4().hex[:8]}",
            invoice_id=invoice_id,
            action="APPROVED",
            actor=actor,
            notes=f"Invoice approved for disbursement by {actor}.",
            created_at=get_now()
        )
        session.add(log)
        session.commit()
        session.refresh(invoice)
        return invoice

    @staticmethod
    def pay(session: Session, invoice_id: str) -> Invoice:
        invoice = session.get(Invoice, invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
            
        invoice.status = "PAID"
        invoice.updated_at = get_now()
        session.add(invoice)
        
        log = ApprovalLog(
            id=f"log_{uuid.uuid4().hex[:8]}",
            invoice_id=invoice_id,
            action="PAID",
            actor="PAYMENT_GATEWAY",
            notes="Payment disbursed via Automated Clearing House (ACH).",
            created_at=get_now()
        )
        session.add(log)
        session.commit()
        session.refresh(invoice)
        return invoice

invoice_service = InvoiceService()
