import { Bot, Upload, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7" />
          <h1 className="text-xl font-bold">MY AI Chatbot</h1>
        </div>

        <div className="flex items-center pag-4">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-zinc-100">
            <Upload size={18} />
            Upload PDF
          </button>
          <UserCircle size={34} className="ml-4" />
        </div>
      </div>
    </header>
  );
}
