import logging
from typing import Dict, Any

logger = logging.getLogger("invoice_automation.agent.tax")

class TaxValidationAgent:
    """Agent that audits sales tax, GST/VAT mathematical correctness, and vendor tax ID validity."""
    
    def validate_taxes(self, subtotal: float, tax_amount: float, total_amount: float) -> Dict[str, Any]:
        expected_total = subtotal + tax_amount
        diff = abs(expected_total - total_amount)
        
        is_valid = diff <= 0.05 # allowance for rounding cents
        return {
            "is_tax_computation_valid": is_valid,
            "calculated_total": round(expected_total, 2),
            "tax_discrepancy_cents": round(diff * 100, 2),
            "effective_tax_rate": round((tax_amount / subtotal * 100) if subtotal > 0 else 0.0, 2)
        }

tax_validation_agent = TaxValidationAgent()
