import { CodeView } from "./CodeView";
import { cx } from "../lib/cx";
import type { Block } from "../content/types";

const calloutStyles: Record<
  string,
  { wrap: string; icon: string; title: string }
> = {
  tip: {
    wrap: "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    icon: "💡",
    title: "text-emerald-800 dark:text-emerald-300",
  },
  warning: {
    wrap: "border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10",
    icon: "⚠️",
    title: "text-amber-800 dark:text-amber-300",
  },
  info: {
    wrap: "border-sky-300 bg-sky-50 dark:border-sky-500/30 dark:bg-sky-500/10",
    icon: "ℹ️",
    title: "text-sky-800 dark:text-sky-300",
  },
  key: {
    wrap: "border-indigo-300 bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/10",
    icon: "🔑",
    title: "text-indigo-800 dark:text-indigo-300",
  },
};

/** Render lightweight markdown-ish emphasis: **bold** and `code`. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-700 dark:bg-slate-800 dark:text-indigo-300"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="pt-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-300">
                <RichText text={block.text} />
              </p>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={cx(
                  "space-y-1.5 pl-1 text-slate-600 dark:text-slate-300",
                  block.ordered ? "list-none" : "list-none"
                )}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span
                      className={cx(
                        "mt-1 shrink-0 text-xs font-semibold",
                        block.ordered
                          ? "text-indigo-500"
                          : "text-indigo-400"
                      )}
                    >
                      {block.ordered ? `${j + 1}.` : "▸"}
                    </span>
                    <span className="leading-relaxed">
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ListTag>
            );
          }
          case "callout": {
            const s = calloutStyles[block.variant];
            return (
              <div
                key={i}
                className={cx("rounded-xl border p-4", s.wrap)}
              >
                <div className="flex gap-3">
                  <span className="text-lg leading-none">{s.icon}</span>
                  <div className="space-y-1">
                    {block.title && (
                      <p className={cx("text-sm font-bold", s.title)}>
                        {block.title}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      <RichText text={block.text} />
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          case "code":
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <CodeView code={block.code} />
                {block.caption && (
                  <p className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/40">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      {block.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-slate-100 last:border-0 dark:border-slate-800/60"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-2 align-top text-slate-600 dark:text-slate-300"
                          >
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.caption && (
                  <p className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/40">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
