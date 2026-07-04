from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database.json_storage import load_session_memory, save_session_memory
from app.services.llm_service import generate_completion

API_PREFIX = "/api/v1"

CHAT_PREFIX = "/chat"

HEALTH_PREFIX = "/health"

# Create a clean router instance
router = APIRouter(prefix=f"{API_PREFIX}{CHAT_PREFIX}", tags=["Chatbot Engine"])

# Data models
class ChatMessage(BaseModel):
    session_id: str
    message: str

@router.post("/ask")
def ask_chatbot(payload: ChatMessage):
    """Handles as incoming message, checks session history, and replies."""
    # 1. Fetch memory for this specific user session
    history = load_session_memory(payload.session_id)

    # 2. Append new user prompt
    history.append({
        "role": "user",
        "content": payload.message
    })

    try: 
        # 3. call LLM
        reply = generate_completion(history)

        # 4. Save entire log back to file system
        history.append({
            "role": "assistant",
            "content": reply
        })
        save_session_memory(payload.session_id, history)

        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/clear/{session_id}")
def clear_chat(session_id: str):
    """Wipes out history records for a single target session."""
    save_session_memory(session_id, [])
    return {"status": f"session {session_id} memory cleaned successfully!"}

