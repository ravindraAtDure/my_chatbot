// utils/wrapTreeBlocks.ts
const TREE_CHARS = /[├└│─]/;

export function autoFenceTrees(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inFence = false;
  let inTreeBlock = false;
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length > 0) {
      result.push("```text", ...buffer, "```");
      buffer = [];
    }
    inTreeBlock = false;
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      flushBuffer();
      inFence = !inFence;
      result.push(line);
      continue;
    }

    if (!inFence && TREE_CHARS.test(line)) {
      inTreeBlock = true;
      buffer.push(line);
      continue;
    }

    if (inTreeBlock && !TREE_CHARS.test(line) && line.trim() !== "") {
      flushBuffer();
    }

    if (!inTreeBlock) {
      result.push(line);
    }
  }

  flushBuffer();
  return result.join("\n");
}
