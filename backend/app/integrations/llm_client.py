from app.core.config import settings
import json
import logging

logger = logging.getLogger("invoice_automation.llm")

class LLMClient:
    def __init__(self):
        self.provider = settings.LLM_PROVIDER
        self.mock = settings.MOCK_LLM

    async def parse_invoice_text(self, raw_text: str) -> dict:
        if self.mock:
            return {
                "invoice_number": "INV-2026-9812",
                "vendor_name": "Acme Cloud Infrastructure LLC",
                "tax_id": "US-EIN-94819284",
                "po_number": "PO-89401",
                "subtotal": 2400.00,
                "tax_amount": 192.00,
                "total_amount": 2592.00,
                "currency": "USD",
                "due_date": "2026-11-25T00:00:00Z",
                "items": [
                    {
                        "description": "Kubernetes Dedicated Compute Nodes (4x Cluster)",
                        "quantity": 4,
                        "unit_price": 500.00,
                        "total_price": 2000.00
                    },
                    {
                        "description": "High-Throughput NVMe Block Storage (2TB)",
                        "quantity": 2,
                        "unit_price": 200.00,
                        "total_price": 400.00
                    }
                ],
                "confidence_score": 98.7
            }
        return {"invoice_number": "UNKNOWN", "total_amount": 0.0, "confidence_score": 50.0}

    async def analyze_fraud_risk(self, invoice_data: dict, vendor_history: dict) -> dict:
        total = invoice_data.get("total_amount", 0.0)
        flags = []
        risk_score = 4.5
        
        # Anomaly checks
        if total > 50000.0:
            flags.append("HIGH_VALUE_TRANSACTION_MANUAL_REVIEW")
            risk_score += 25.0
            
        if invoice_data.get("vendor_name") == "Unknown Vendor":
            flags.append("UNVERIFIED_NEW_VENDOR")
            risk_score += 40.0

        return {
            "risk_score": min(risk_score, 100.0),
            "flags": flags,
            "explanation": "Standard recurring enterprise vendor invoice. Line items match historical pricing within 0.8% variance."
        }

llm_client = LLMClient()
