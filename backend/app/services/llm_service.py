import ollama
from config.settings import settings

def generate_completion(chat_history: list) -> str:
    """Sends conversational strings to Ollama and returns the output string."""
    try:
        response = ollama.chat(
            model=settings.model_name,
            messages=chat_history,
            options={
                "temperature": settings.temperature,
                "top_p": settings.top_p,
                "max_tokens": settings.max_tokens,
                "timeout": settings.timeout
            }
        )

        return response["message"]["content"]
    except Exception as e:
        raise RuntimeError(f"Ollama failure: {str(e)}")