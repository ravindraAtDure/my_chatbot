import { Bot } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-4xl flex-col items-center">
        <div className="mb-6 rounded-full bg-black p-5 text-white">
          <Bot size={42} />
        </div>
        <h2 className="mb-2 text-4xl font-bold">MY AI Chatbot</h2>
        <p className="mb-10 text-gray-500">Upload a PDF and ask anything.</p>
        <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            📄 Upload Employee handbook
          </div>
          <div className="rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            📊 Summarize Financial Report
          </div>

          <div className="rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            ❓ Explain Leave Policy
          </div>

          <div className="rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            💬 Ask Questions
          </div>
        </div>
      </div>
    </div>
  );
}
