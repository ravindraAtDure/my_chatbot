import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EmptyState from "@/components/chat/EmptyState";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import type { ChatMessage } from "@/features/chat/types";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto">
          {messages.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            <ChatMessages messages={messages} loading={loading} />
          )}
        </div>
        <ChatInput
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </MainLayout>
  );
}
