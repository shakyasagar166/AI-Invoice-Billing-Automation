from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session
from typing import List, Optional
from app.db.database import get_session
from app.schemas.invoice import InvoiceCreate, InvoiceRead, InvoiceUpdate
from app.services.invoice_service import invoice_service
from app.agents.invoice_parser_agent import invoice_parser_agent

router = APIRouter(prefix="/invoices", tags=["Invoices"])

@router.get("", response_model=List[InvoiceRead])
def list_invoices(status: Optional[str] = None, session: Session = Depends(get_session)):
    invoices = invoice_service.get_all(session, status)
    result = []
    for inv in invoices:
        items = invoice_service.get_items(session, inv.id)
        inv_dict = inv.model_dump()
        inv_dict["items"] = [i.model_dump() for i in items]
        result.append(InvoiceRead(**inv_dict))
    return result

@router.get("/{invoice_id}", response_model=InvoiceRead)
def get_invoice(invoice_id: str, session: Session = Depends(get_session)):
    invoice = invoice_service.get_by_id(session, invoice_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    items = invoice_service.get_items(session, invoice_id)
    inv_dict = invoice.model_dump()
    inv_dict["items"] = [i.model_dump() for i in items]
    return InvoiceRead(**inv_dict)

@router.post("", response_model=InvoiceRead)
def create_invoice(data: InvoiceCreate, session: Session = Depends(get_session)):
    invoice = invoice_service.create(session, data)
    items = invoice_service.get_items(session, invoice.id)
    inv_dict = invoice.model_dump()
    inv_dict["items"] = [i.model_dump() for i in items]
    return InvoiceRead(**inv_dict)

@router.post("/{invoice_id}/approve", response_model=InvoiceRead)
def approve_invoice(invoice_id: str, session: Session = Depends(get_session)):
    invoice = invoice_service.approve(session, invoice_id)
    items = invoice_service.get_items(session, invoice_id)
    inv_dict = invoice.model_dump()
    inv_dict["items"] = [i.model_dump() for i in items]
    return InvoiceRead(**inv_dict)

@router.post("/{invoice_id}/pay", response_model=InvoiceRead)
def pay_invoice(invoice_id: str, session: Session = Depends(get_session)):
    invoice = invoice_service.pay(session, invoice_id)
    items = invoice_service.get_items(session, invoice_id)
    inv_dict = invoice.model_dump()
    inv_dict["items"] = [i.model_dump() for i in items]
    return InvoiceRead(**inv_dict)

@router.post("/extract-document")
async def extract_document(file: UploadFile = File(...)):
    content = await file.read()
    result = await invoice_parser_agent.process_document(file.filename, content)
    return result
