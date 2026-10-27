import pytest
from app.agents.matching_agent import matching_agent
from app.agents.fraud_anomaly_agent import fraud_anomaly_agent
from app.agents.tax_validation_agent import tax_validation_agent
from app.agents.payment_scheduler_agent import payment_scheduler_agent
from datetime import datetime

def test_matching_agent_exact_match():
    invoice = {"invoice_number": "INV-101", "total_amount": 1000.0}
    po = {"po_number": "PO-101", "total_amount": 1000.0}
    result = matching_agent.perform_3way_match(invoice, po)
    assert result["status"] == "MATCHED"
    assert result["match_score"] == 100.0
    assert len(result["discrepancies"]) == 0

def test_matching_agent_discrepancy():
    invoice = {"invoice_number": "INV-102", "total_amount": 1200.0}
    po = {"po_number": "PO-102", "total_amount": 1000.0}
    result = matching_agent.perform_3way_match(invoice, po)
    assert result["status"] == "DISCREPANCY"
    assert len(result["discrepancies"]) > 0

def test_fraud_anomaly_agent_duplicate():
    current_inv = {"id": "1", "invoice_number": "INV-DUP", "total_amount": 500.0}
    history = [{"id": "2", "invoice_number": "INV-DUP", "total_amount": 500.0}]
    res = fraud_anomaly_agent.assess_risk(current_inv, history)
    assert res["fraud_risk_score"] > 50.0
    assert "POTENTIAL_DUPLICATE_INVOICE_NUMBER" in res["flags"]

def test_tax_validation_agent():
    res = tax_validation_agent.validate_taxes(subtotal=100.0, tax_amount=8.0, total_amount=108.0)
    assert res["is_tax_computation_valid"] is True
    assert res["effective_tax_rate"] == 8.0

def test_payment_scheduler_agent():
    due = datetime(2026, 12, 1)
    res = payment_scheduler_agent.calculate_payment_schedule(due, 1000.0)
    assert res["potential_cash_discount_amount"] == 20.0
