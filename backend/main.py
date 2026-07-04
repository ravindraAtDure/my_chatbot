from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
from app.routes.chat_routes import router

app = FastAPI(
    title=settings.api_title, 
    description=settings.api_description, 
    version=settings.api_version,
    docs_url=settings.api_docs_url,
    redoc_url=settings.api_redoc_url,
    openapi_url=settings.api_openapi_url
)

# Apply CORS configs
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=settings.allowed_credentials,
    allow_methods=settings.allowed_methods,
    allow_headers=settings.allowed_headers
)

# Include modular endpoints
app.include_router(router)

@app.get("/config-check")
def check_model():
    """Returns the current model name from settings."""
    return {"model_name": settings.model_name}

@app.get("/health", tags=["System Status"])
def health_check():
    """Simple health endpoint for system checks."""
    return {"status": "healthy", "service": "chatbot-backend"}