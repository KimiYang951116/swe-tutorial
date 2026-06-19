import { useState } from "react";
import { CodeView } from "./CodeView";
import { cx } from "../lib/cx";
import type { BeforeAfter as BeforeAfterSpec } from "../content/types";

type View = "split" | "before" | "after";

export function BeforeAfter({ spec }: { spec: BeforeAfterSpec }) {
  const [view, setView] = useState<View>("split");
  const [showWhy, setShowWhy] = useState(true);

  const beforeLabel = spec.beforeLabel ?? "Before";
  const afterLabel = spec.afterLabel ?? "After";

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Refactor
        </span>
        <div className="flex rounded-lg bg-slate-200/70 p-0.5 text-xs font-medium dark:bg-slate-800">
          {(["split", "before", "after"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cx(
                "focus-ring rounded-md px-2.5 py-1 capitalize transition",
                view === v
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              {v === "split" ? "Side by side" : v}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cx(
          "grid",
          view === "split" ? "md:grid-cols-2" : "grid-cols-1"
        )}
      >
        {view !== "after" && (
          <Pane
            tone="bad"
            label={beforeLabel}
            icon="✕"
            code={spec.before}
            bordered={view === "split"}
          />
        )}
        {view !== "before" && (
          <Pane tone="good" label={afterLabel} icon="✓" code={spec.after} />
        )}
      </div>

      {spec.notes && spec.notes.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setShowWhy((s) => !s)}
            className="focus-ring flex w-full items-center justify-between px-3 py-2 text-left text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50/50 dark:text-emerald-400 dark:hover:bg-emerald-500/5"
          >
            <span>Why the “{afterLabel}” version is better</span>
            <span className={cx("transition", showWhy && "rotate-180")}>⌄</span>
          </button>
          {showWhy && (
            <ul className="space-y-1.5 px-4 pb-3 pt-1 text-sm text-slate-600 dark:text-slate-300">
              {spec.notes.map((note, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Pane({
  tone,
  label,
  icon,
  code,
  bordered,
}: {
  tone: "bad" | "good";
  label: string;
  icon: string;
  code: string;
  bordered?: boolean;
}) {
  const toneClasses =
    tone === "bad"
      ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";
  return (
    <div
      className={cx(
        bordered &&
          "md:border-r border-slate-200 dark:border-slate-800"
      )}
    >
      <div
        className={cx(
          "flex items-center gap-2 px-3 py-1.5 text-xs font-semibold",
          toneClasses
        )}
      >
        <span
          className={cx(
            "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
            tone === "bad" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
          )}
        >
          {icon}
        </span>
        {label}
      </div>
      <CodeView code={code} />
    </div>
  );
}
