from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # 1. Define variables and their data types

    # API
    api_title: str = Field(default="My Modular Ollama Chatbot API")
    api_description: str = Field(default="A multi-session local llm orchestration microservice.")
    api_version: str = Field(default="1.0.0")
    api_docs_url: str = Field(default="/docs")
    api_redoc_url: str = Field(default="/redoc")
    api_openapi_url: str = Field(default="/openapi.json")

    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True

    # Ollama
    ollama_host: str = "http://localhost:11434"
    model_name: str = "minimax-m3:cloud"
    temperature: float = 0.7
    max_tokens: int = 2048
    top_p: float = 0.95
    timeout: int = 120

    # Storage
    storage_dir: str = "sessions"
    
    # Database
    database_url: str = "postgresql+psycopg2://postgres:password@123@localhost:5432/bot_ollama"

    # CORS
    allowed_origins: list[str] = ["http://localhost:3000"]
    allowed_credentials: bool = True
    allowed_methods: list[str] = ["*"]
    allowed_headers: list[str] = ["*"]

    # JSON
    json_indent: int = 4

    # Timezone
    timezone: str = "Asia/Kolkata"

    # 2. Tell pydantic to look for a .env file automatically
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

# Instantiate the settings object to use globally
settings = Settings()