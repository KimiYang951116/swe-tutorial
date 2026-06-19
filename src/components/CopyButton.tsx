import { useState } from "react";
import { cx } from "../lib/cx";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={copy}
      className={cx(
        "focus-ring rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200",
        className
      )}
      aria-label="Copy code"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
