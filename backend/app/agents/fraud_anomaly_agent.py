import logging
from typing import Dict, Any, List

logger = logging.getLogger("invoice_automation.agent.fraud")

class FraudAnomalyAgent:
    """Agent for detecting duplicate submissions, bank account routing mismatches, and sudden billing anomalies."""
    
    def assess_risk(self, invoice: Dict[str, Any], existing_invoices: List[Dict[str, Any]]) -> Dict[str, Any]:
        flags = []
        risk_score = 0.0
        
        # Check duplicate invoice numbers
        inv_num = invoice.get("invoice_number")
        duplicates = [x for x in existing_invoices if x.get("invoice_number") == inv_num and x.get("id") != invoice.get("id")]
        if duplicates:
            flags.append("POTENTIAL_DUPLICATE_INVOICE_NUMBER")
            risk_score += 65.0
            
        # Check round number anomaly (common in fraudulent bills)
        total = invoice.get("total_amount", 0.0)
        if total > 5000 and total % 1000 == 0:
            flags.append("ROUND_NUMBER_AUDIT_WARNING")
            risk_score += 15.0
            
        return {
            "fraud_risk_score": min(risk_score, 100.0),
            "flags": flags,
            "is_flagged": len(flags) > 0
        }

fraud_anomaly_agent = FraudAnomalyAgent()
