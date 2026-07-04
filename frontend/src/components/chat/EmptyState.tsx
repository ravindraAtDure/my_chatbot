import { Bot, FileText, MessageCircle, Sparkle } from "lucide-react";

const suggestions = [
  {
    icon: FileText,
    title: "Summarize this document",
  },
  { icon: Sparkle, title: "Find key insights" },
  { icon: MessageCircle, title: "Ask any question" },
  { icon: FileText, title: "Generate a report" },
];

export default function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-6 rounded-full bg-black p-6 text-white">
            <Bot size={42} />
          </div>
          <h2 className="text-5xl font-bold">How can I help you today?</h2>
          <p className="mt-3 text-lg text-zinc-500">
            Upload a PDF and start asking
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((item) => (
            <button
              key={item.title}
              className="rounded-2xl border bg-white p-6 text-left transition hover:shadow-lg"
            >
              <item.icon className="mb-4 text-zinc-500" size={22} />
              <h3 className="font-semibold">{item.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
