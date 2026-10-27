from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Invoice & Billing Automation System"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = "invoice-secret-key-super-secure-2026"
    API_KEY: str = "invoice-api-key-2026"
    
    DATABASE_URL: str = "sqlite:///./invoices.db"
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000"
    ]
    
    LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str = "demo-gemini-key"
    MOCK_LLM: bool = True
    
    # Matching thresholds
    PRICE_TOLERANCE_PERCENT: float = 2.0  # 2% variance allowed
    AUTO_APPROVE_LIMIT_USD: float = 1500.0  # Below $1500 auto-approves if 3-way match is 100%
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
