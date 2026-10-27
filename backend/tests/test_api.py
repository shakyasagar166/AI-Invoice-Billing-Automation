import pytest

def test_health_check(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"

def test_api_list_invoices(client):
    res = client.get("/api/v1/invoices")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_api_create_invoice(client):
    payload = {
        "invoice_number": "INV-API-TEST",
        "vendor_name": "Testing Vendor Ltd",
        "total_amount": 999.0
    }
    res = client.post("/api/v1/invoices", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["invoice_number"] == "INV-API-TEST"
    assert data["total_amount"] == 999.0

def test_api_analytics(client):
    res = client.get("/api/v1/analytics/dashboard")
    assert res.status_code == 200
    data = res.json()
    assert "total_invoices" in data
    assert "stp_automation_rate" in data
