import { useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { askChatbot } from "@/services/chat.service";
import type { ChatMessage } from "@/features/chat/types";

interface Props {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatInput({
  messages,
  setMessages,
  loading,
  setLoading,
}: Props) {
  const [message, setMessage] = useState("");

  const sessionId = localStorage.getItem("session_id") ?? crypto.randomUUID();
  localStorage.setItem("session_id", sessionId);

  const handleSend = async () => {
    if (message.trim() === "" || loading) return;
    const userMessage = message;
    setMessage("");

    const user: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, user]);
    setLoading(true);

    try {
      const response = await askChatbot({
        session_id: sessionId,
        message: userMessage,
      });
        
        console.log("RAW REPLY:", JSON.stringify(response.reply));

      const bot: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, bot]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t bg-white p-5">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border bg-white p-3 shadow-sm">
        <button
          className="rounded-full p-2 transition hover:bg-zinc-100"
          title="Upload PDF"
        >
          <Paperclip size={18} />
        </button>
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message My AI Chatbot..."
          className="max-h-40 flex-1 resize-none border-none bg-transparent p-2 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="rounded-full bg-black p-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
