from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from contextlib import asynccontextmanager
from datetime import datetime, timezone, timedelta
import logging

from app.core.config import settings
from app.db.database import init_db, engine
from app.api.v1 import api_router
from app.models.vendor import Vendor
from app.models.purchase_order import PurchaseOrder
from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem
from app.models.approval_log import ApprovalLog

logger = logging.getLogger("invoice_automation")

def get_now() -> str:
    return datetime.now(timezone.utc).isoformat()

def get_due(days: int) -> str:
    return (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()

def seed_demo_data():
    with Session(engine) as session:
        existing_vendor = session.exec(select(Vendor)).first()
        if existing_vendor:
            return # Already seeded
            
        logger.info("Seeding initial enterprise demo vendors, purchase orders, and invoices...")
        
        # 1. Vendors
        v1 = Vendor(
            id="ven_cloudscale",
            name="CloudScale Networks Inc.",
            tax_id="US-EIN-11223344",
            email="billing@cloudscale.io",
            phone="+1-800-555-0199",
            address="750 Innovation Blvd, Austin, TX",
            bank_account="•••• 8821",
            bank_routing="121000358",
            payment_terms_days=30,
            risk_score=2.1,
            is_verified=True,
            created_at=get_now()
        )
        v2 = Vendor(
            id="ven_apex",
            name="Apex Office & Tech Supplies",
            tax_id="US-EIN-55667788",
            email="ap@apextechsupplies.com",
            phone="+1-800-555-0144",
            address="120 Market Street, Chicago, IL",
            bank_account="•••• 4310",
            bank_routing="071000013",
            payment_terms_days=15,
            risk_score=5.4,
            is_verified=True,
            created_at=get_now()
        )
        v3 = Vendor(
            id="ven_freight",
            name="Global Logistics & Freight Corp",
            tax_id="US-EIN-99887766",
            email="accounts@globallogistics.com",
            phone="+1-800-555-0177",
            address="45 Pier Terminal, Seattle, WA",
            bank_account="•••• 9920",
            bank_routing="125000024",
            payment_terms_days=45,
            risk_score=8.2,
            is_verified=True,
            created_at=get_now()
        )
        session.add_all([v1, v2, v3])
        session.commit()
        
        # 2. Purchase Orders
        po1 = PurchaseOrder(
            id="po_89401",
            po_number="PO-89401",
            vendor_id=v1.id,
            vendor_name=v1.name,
            total_amount=2592.00,
            currency="USD",
            status="OPEN",
            items_json='[{"sku": "K8S-01", "description": "Kubernetes Dedicated Compute Nodes", "qty": 4, "unit_price": 500.0, "total": 2000.0}, {"sku": "ST-02", "description": "NVMe Block Storage 2TB", "qty": 2, "unit_price": 200.0, "total": 400.0}]',
            issue_date=get_now(),
            created_at=get_now()
        )
        po2 = PurchaseOrder(
            id="po_89402",
            po_number="PO-89402",
            vendor_id=v2.id,
            vendor_name=v2.name,
            total_amount=1450.00,
            currency="USD",
            status="OPEN",
            items_json='[{"sku": "MON-4K", "description": "Ergonomic 32-inch 4K UHD Displays", "qty": 5, "unit_price": 290.0, "total": 1450.0}]',
            issue_date=get_now(),
            created_at=get_now()
        )
        po3 = PurchaseOrder(
            id="po_89403",
            po_number="PO-89403",
            vendor_id=v3.id,
            vendor_name=v3.name,
            total_amount=4200.00,
            currency="USD",
            status="FULFILLED",
            items_json='[{"sku": "FRT-EXP", "description": "Intercontinental Air Freight Carrier", "qty": 1, "unit_price": 4200.0, "total": 4200.0}]',
            issue_date=get_now(),
            created_at=get_now()
        )
        session.add_all([po1, po2, po3])
        session.commit()
        
        # 3. Invoices
        inv1 = Invoice(
            id="inv_9812",
            invoice_number="INV-2026-9812",
            vendor_id=v1.id,
            vendor_name=v1.name,
            po_id=po1.id,
            po_number=po1.po_number,
            subtotal=2400.00,
            tax_amount=192.00,
            total_amount=2592.00,
            currency="USD",
            invoice_date=get_now(),
            due_date=get_due(28),
            status="MATCHED",
            extraction_confidence=99.1,
            match_score=100.0,
            fraud_risk_score=2.5,
            anomaly_flags="[]",
            ai_summary="100% 3-Way Match Verified. Unit prices, line quantities, and tax align with Purchase Order PO-89401.",
            created_at=get_now(),
            updated_at=get_now()
        )
        inv2 = Invoice(
            id="inv_9815",
            invoice_number="INV-2026-9815",
            vendor_id=v2.id,
            vendor_name=v2.name,
            po_id=po2.id,
            po_number=po2.po_number,
            subtotal=1400.00,
            tax_amount=120.00,
            total_amount=1520.00,
            currency="USD",
            invoice_date=get_now(),
            due_date=get_due(12),
            status="DISCREPANCY",
            extraction_confidence=96.4,
            match_score=72.0,
            fraud_risk_score=18.0,
            anomaly_flags='["TOTAL_VARIANCE: Invoice amount ($1520.00) differs from PO ($1450.00) by 4.8%"]',
            ai_summary="Discrepancy Detected: Billed amount exceeds Purchase Order total by $70.00 (+4.8% variance). Requires manual approval.",
            created_at=get_now(),
            updated_at=get_now()
        )
        inv3 = Invoice(
            id="inv_9799",
            invoice_number="INV-2026-9799",
            vendor_id=v3.id,
            vendor_name=v3.name,
            po_id=po3.id,
            po_number=po3.po_number,
            subtotal=4200.00,
            tax_amount=0.00,
            total_amount=4200.00,
            currency="USD",
            invoice_date=get_now(),
            due_date=get_due(35),
            status="APPROVED",
            extraction_confidence=98.9,
            match_score=100.0,
            fraud_risk_score=3.0,
            anomaly_flags="[]",
            ai_summary="Approved for disbursement by Finance Director. Cash discount window eligible.",
            created_at=get_now(),
            updated_at=get_now()
        )
        inv4 = Invoice(
            id="inv_9701",
            invoice_number="INV-2026-9701",
            vendor_id=v1.id,
            vendor_name=v1.name,
            subtotal=1700.00,
            tax_amount=150.00,
            total_amount=1850.00,
            currency="USD",
            invoice_date=get_now(),
            due_date=get_due(-10),
            status="PAID",
            extraction_confidence=99.5,
            match_score=98.0,
            fraud_risk_score=1.5,
            anomaly_flags="[]",
            ai_summary="Cleared and paid via NACHA ACH network on Oct 17, 2026.",
            created_at=get_now(),
            updated_at=get_now()
        )
        session.add_all([inv1, inv2, inv3, inv4])
        session.commit()
        
        # 4. Line items for inv1
        item1 = InvoiceItem(
            id="item_01",
            invoice_id=inv1.id,
            line_number=1,
            description="Kubernetes Dedicated Compute Nodes (4x Cluster)",
            quantity=4.0,
            unit_price=500.00,
            tax_rate=8.0,
            total_price=2000.00
        )
        item2 = InvoiceItem(
            id="item_02",
            invoice_id=inv1.id,
            line_number=2,
            description="High-Throughput NVMe Block Storage (2TB)",
            quantity=2.0,
            unit_price=200.00,
            tax_rate=8.0,
            total_price=400.00
        )
        session.add_all([item1, item2])
        session.commit()
        logger.info("Seed data successfully inserted.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_demo_data()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "timestamp": get_now()
    }
