import logging
import asyncio

logger = logging.getLogger("invoice_automation.worker.processor")

class InvoiceProcessorWorker:
    """Asynchronous background worker polling incoming vendor email inbox or EDI feed for invoices."""
    def __init__(self):
        self.is_running = False

    async def start(self):
        self.is_running = True
        logger.info("Invoice Intake Worker background service initialized.")

    async def stop(self):
        self.is_running = False
        logger.info("Invoice Intake Worker stopped.")

invoice_worker = InvoiceProcessorWorker()
