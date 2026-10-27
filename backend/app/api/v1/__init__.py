from fastapi import APIRouter
from app.api.v1.invoices import router as invoices_router
from app.api.v1.purchase_orders import router as po_router
from app.api.v1.vendors import router as vendors_router
from app.api.v1.matching import router as matching_router
from app.api.v1.analytics import router as analytics_router

api_router = APIRouter()
api_router.include_router(invoices_router)
api_router.include_router(po_router)
api_router.include_router(vendors_router)
api_router.include_router(matching_router)
api_router.include_router(analytics_router)

__all__ = ["api_router"]
