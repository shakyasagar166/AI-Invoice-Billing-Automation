import logging
from typing import Dict, Any
from app.integrations.llm_client import llm_client
from app.integrations.ocr_client import ocr_client

logger = logging.getLogger("invoice_automation.agent.parser")

class InvoiceParserAgent:
    """Agent responsible for OCR extraction, unstructured text cleansing, and structured entity normalization."""
    
    async def process_document(self, filename: str, content: bytes) -> Dict[str, Any]:
        logger.info(f"Extracting text from invoice document: {filename}")
        raw_text = await ocr_client.extract_text_from_file(filename, content)
        parsed = await llm_client.parse_invoice_text(raw_text)
        
        return {
            "raw_text": raw_text,
            "entities": parsed,
            "confidence": parsed.get("confidence_score", 95.0),
            "status": "EXTRACTED"
        }

invoice_parser_agent = InvoiceParserAgent()
