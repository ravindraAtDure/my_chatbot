import json 
import os
from config.settings import settings

def _get_session_path(session_id: str) -> str:
    return os.path.join(settings.storage_dir, f"chat_{session_id}.json")

def load_session_memory(session_id: str) -> list:
    """Loads historical chat logs for a specific session ID."""
    file_path = _get_session_path(session_id)
    if not os.path.exists(file_path):
        return []
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return []
    
def save_session_memory(session_id: str, memory_data: list) -> None:
    """Saves updated chat history for a specific session ID."""
    file_path = _get_session_path(session_id)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(memory_data, f, indent=settings.json_indent, ensure_ascii=False) 