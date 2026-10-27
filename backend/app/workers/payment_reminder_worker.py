import logging
import asyncio

logger = logging.getLogger("invoice_automation.worker.reminders")

class PaymentReminderWorker:
    """Scans pending approvals and approaching net-30 terms to avoid late fees and claim cash discounts."""
    def __init__(self):
        self.is_running = False

    async def start(self):
        self.is_running = True
        logger.info("Payment Terms & Early Discount Monitor active.")

    async def stop(self):
        self.is_running = False
        logger.info("Payment Terms Monitor stopped.")

reminder_worker = PaymentReminderWorker()
