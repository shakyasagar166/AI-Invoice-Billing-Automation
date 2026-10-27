# AI Invoice & Billing Automation System - Architecture

## High-Level System Architecture

```
[ Vendor Email / EDI / Upload ]
                │
                ▼
      [ InvoiceParserAgent ]  <───> [ Multi-Engine OCR / LLM Client ]
                │ (Normalized JSON)
                ▼
      [ TaxValidationAgent ]  ───> [ Arithmetic & VAT/GST Audit ]
                │
                ▼
       [ MatchingAgent ]      <───> [ ERP Purchase Orders & GRN ]
        (3-Way Match)
                │
                ▼
    [ FraudAnomalyAgent ]     ───> [ Duplicate & Remittance Risk Analysis ]
                │
        ┌───────┴───────────────────────┐
        ▼                               ▼
 [ Match Score = 100% ]       [ Discrepancy Flagged ]
 [ Low Risk (<10%)    ]                 │
        │                               ▼
        ▼                      [ AP Exception Queue ]
 [ Straight-Through ]                   │ (Human in the Loop)
 [ Auto-Approval    ]                   ▼
        │                      [ Approval / Rejection ]
        └───────┬───────────────────────┘
                │
                ▼
   [ PaymentSchedulerAgent ]  ───> [ Cash Discount Optimizer ]
                │
                ▼
  [ Automated ERP & ACH Push ]───> [ SAP / NetSuite / NACHA ACH ]
```

## Component Breakdown

1. **Document Intake & OCR Layer**:
   - Parses multi-page PDF, TIFF, and scanned invoice formats.
   - Converts raw bounding-box text into validated JSON entities.

2. **Autonomous Multi-Agent Evaluation**:
   - **InvoiceParserAgent**: OCR cleansing, tabular data normalization.
   - **MatchingAgent**: 2-Way (PO vs Invoice) and 3-Way (PO vs Goods Receipt vs Invoice) variance calculation.
   - **FraudAnomalyAgent**: Duplicate check, round-number fraud detection, and bank account deviation flagging.
   - **TaxValidationAgent**: Mathematical validation of subtotal + taxes = total.
   - **PaymentSchedulerAgent**: Optimizes cash flow dispatch to claim early-payment discounts (e.g. 2/10 Net 30).

3. **ERP & Banking Connectors**:
   - Out-of-the-box support for SAP S/4HANA, NetSuite, and QuickBooks general ledger updates.
   - NACHA ACH and FedNow direct payment initiation.
