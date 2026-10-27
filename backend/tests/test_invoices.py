import pytest
from app.services.invoice_service import invoice_service
from app.schemas.invoice import InvoiceCreate, InvoiceItemSchema

def test_create_and_reconcile_invoice(session):
    data = InvoiceCreate(
        invoice_number="INV-TEST-001",
        vendor_name="Acme Corp",
        total_amount=1500.0,
        subtotal=1400.0,
        tax_amount=100.0,
        items=[
            InvoiceItemSchema(
                description="Cloud Computing Server",
                quantity=1.0,
                unit_price=1400.0,
                total_price=1400.0
            )
        ]
    )
    inv = invoice_service.create(session, data)
    assert inv.id is not None
    assert inv.invoice_number == "INV-TEST-001"
    assert inv.total_amount == 1500.0
    
    # Test approval
    approved = invoice_service.approve(session, inv.id)
    assert approved.status == "APPROVED"
    
    # Test payment
    paid = invoice_service.pay(session, inv.id)
    assert paid.status == "PAID"
