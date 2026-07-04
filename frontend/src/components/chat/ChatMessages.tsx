import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import LoadingBubble from "./LoadingBubble";
import type { ChatMessage as Message } from "@/features/chat/types";

interface Props {
  messages: Message[];
  loading?: boolean;
}

export default function ChatMessages({ messages, loading = false }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {loading && <LoadingBubble />}
      <div ref={bottomRef}></div>
    </div>
  );
}
