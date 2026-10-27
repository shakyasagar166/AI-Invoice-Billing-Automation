from datetime import datetime, timedelta
from typing import Dict, Any

class PaymentSchedulerAgent:
    """Agent that calculates optimal cash flow dispatch dates, capturing early payment discounts (e.g., 2% 10 Net 30)."""
    
    def calculate_payment_schedule(self, due_date: datetime, total_amount: float, discount_terms: str = "2/10 Net 30") -> Dict[str, Any]:
        early_pay_date = due_date - timedelta(days=20)
        potential_savings = total_amount * 0.02
        
        return {
            "due_date": due_date.isoformat(),
            "early_discount_date": early_pay_date.isoformat(),
            "potential_cash_discount_amount": round(potential_savings, 2),
            "recommended_execution_date": early_pay_date.isoformat(),
            "recommendation": f"Pay before {early_pay_date.strftime('%Y-%m-%d')} to capture a 2.0% cash discount saving of ${potential_savings:.2f}."
        }

payment_scheduler_agent = PaymentSchedulerAgent()
