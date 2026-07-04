const API_BASE_URL = "http://127.0.0.1:8000";

export interface ChatRequest {
    session_id: string;
    message: string;
}

export const askChatbot = async (payload: ChatRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/chat/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
    }

    return response.json();
}