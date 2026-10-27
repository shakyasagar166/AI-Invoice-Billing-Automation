class OCRClient:
    """Simulates multi-engine OCR (Tesseract / Google Document AI / AWS Textract)"""
    async def extract_text_from_file(self, filename: str, content: bytes) -> str:
        return f"""
        INVOICE
        Acme Cloud Infrastructure LLC
        100 Technology Way, Silicon Valley, CA
        Tax ID / EIN: US-EIN-94819284
        
        Bill To: Enterprise Corp Global
        PO Number: PO-89401
        Invoice Number: INV-2026-9812
        Invoice Date: October 26, 2026
        Payment Due Date: November 25, 2026
        
        Items:
        1. Kubernetes Dedicated Compute Nodes (4x Cluster) - Qty: 4 - Rate: $500.00 - Total: $2,000.00
        2. High-Throughput NVMe Block Storage (2TB) - Qty: 2 - Rate: $200.00 - Total: $400.00
        
        Subtotal: $2,400.00
        Sales Tax (8%): $192.00
        TOTAL AMOUNT DUE: $2,592.00 USD
        Payment Terms: Net 30
        """

ocr_client = OCRClient()
