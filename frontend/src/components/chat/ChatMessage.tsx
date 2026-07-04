// ChatMessage.tsx
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";

interface Props {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const language = /language-(\w+)/.exec(className || "")?.[1] || "text";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400">
        <span className="font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-100">
        <code className={`${className || ""} !text-zinc-100`}>{children}</code>
      </pre>
    </div>
  );
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end px-4 py-2">
        <div className="max-w-2xl rounded-3xl bg-zinc-800 px-5 py-3 text-[15px] leading-7 text-white">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start px-4 py-3">
      <div className="min-w-0 max-w-2xl flex-1">
        <div
          className="
            prose prose-zinc max-w-none dark:prose-invert
            text-[15px] leading-7
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
            prose-p:my-3 prose-p:leading-7
            prose-li:my-1
            prose-strong:font-semibold
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
            prose-code:before:content-none prose-code:after:content-none
            [&_:not(pre)>code]:bg-zinc-100 [&_:not(pre)>code]:text-zinc-800
            dark:[&_:not(pre)>code]:bg-zinc-800 dark:[&_:not(pre)>code]:text-zinc-100
            [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5
            [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:text-[13px]
            [&_:not(pre)>code]:font-mono
            prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700
            prose-table:text-sm
            prose-th:border prose-th:border-zinc-200 dark:prose-th:border-zinc-700
            prose-td:border prose-td:border-zinc-200 dark:prose-td:border-zinc-700
            prose-a:text-orange-600 dark:prose-a:text-orange-400
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // pre only ever wraps BLOCK code — never inline code.
              // So anything reaching here is a real fenced code block,
              // language tag or not.
              pre: ({ children }: any) => {
                const codeElement = children;
                const codeClassName = codeElement?.props?.className || "";
                const codeContent = codeElement?.props?.children;
                return (
                  <CodeBlock className={codeClassName}>{codeContent}</CodeBlock>
                );
              },
              // code here only fires for genuine INLINE code spans
              // (backticks within a sentence), since block code is
              // intercepted by the `pre` override above.
              code: ({ className, children, ...props }) => (
                <code className={className} {...props}>
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
