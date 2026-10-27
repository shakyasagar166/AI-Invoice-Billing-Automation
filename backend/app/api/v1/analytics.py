from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/dashboard")
def get_dashboard_metrics(session: Session = Depends(get_session)):
    return analytics_service.get_dashboard_metrics(session)
