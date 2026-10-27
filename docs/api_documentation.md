# API Documentation

Base URL: `http://localhost:8000/api/v1`

## Endpoints

### 1. Invoices
- `GET /invoices`: List all invoices with optional query parameter `?status=MATCHED|DISCREPANCY|APPROVED|PAID`
- `GET /invoices/{id}`: Retrieve single invoice with full line items and audit logs
- `POST /invoices`: Ingest a newly parsed invoice
- `POST /invoices/{id}/approve`: Manually or automatically approve an invoice
- `POST /invoices/{id}/pay`: Trigger payment clearing and mark invoice as paid
- `POST /invoices/extract-document`: Upload PDF or image document for OCR entity extraction

### 2. Purchase Orders
- `GET /purchase-orders`: List all buyer purchase orders
- `GET /purchase-orders/{id}`: Retrieve PO details and line item commitments
- `POST /purchase-orders`: Register a new purchase order

### 3. Vendors
- `GET /vendors`: List registered enterprise suppliers
- `GET /vendors/{id}`: Retrieve vendor tax ID and bank details
- `POST /vendors`: Onboard a new supplier

### 4. Reconciliation & Matching
- `POST /matching/reconcile/{invoice_id}`: Trigger automated 3-way match against referenced PO

### 5. Analytics
- `GET /analytics/dashboard`: Retrieve Straight-Through Processing (STP) rate, spend metrics, pending approval counts, and error rates
