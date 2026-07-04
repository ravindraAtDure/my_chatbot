import { Plus, FileText, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className=" hidden md:flex w-72 flex-col border-r bg-zinc-950 text-white">
      <div className="p-4">
        <button className="flex w-full items-center gap-2 rounded-xl border border-zinc-700 p-3 hover:bg-zinc-900">
          <Plus size={18} />
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        {["Employee Handbook.pdf", "HR Policy.pdf", "Finance Report.pdf"].map(
          (doc) => (
            <button
              key={doc}
              className="mb-2 flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-zinc-900"
            >
              <FileText size={18} />
              <span className="truncate text-sm">{doc}</span>
            </button>
          ),
        )}
      </div>
      <div className="border-t border-zinc-800 p-4">
        <button className="flex items-center gap-2 text-sm text-zinc-400">
          <MessageSquare size={18} />
          Chat History
        </button>
      </div>
    </aside>
  );
}
