import { useCallback, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { runCode, type RunResult } from "./runner/runCode";
import { useTheme } from "../lib/theme";
import { cx } from "../lib/cx";
import type { PlaygroundSpec } from "../content/types";

const setup = {
  lineNumbers: true,
  foldGutter: false,
  highlightActiveLine: true,
  highlightActiveLineGutter: true,
  autocompletion: false,
  searchKeymap: false,
} as const;

const levelColor: Record<string, string> = {
  log: "text-slate-700 dark:text-slate-200",
  info: "text-sky-600 dark:text-sky-400",
  warn: "text-amber-600 dark:text-amber-400",
  error: "text-rose-600 dark:text-rose-400",
};

export function Playground({ spec }: { spec: PlaygroundSpec }) {
  const { isDark } = useTheme();
  const [code, setCode] = useState(spec.code);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const dirty = useMemo(() => code !== spec.code, [code, spec.code]);

  const run = useCallback(async () => {
    setRunning(true);
    const res = await runCode(code);
    setResult(res);
    setRunning(false);
  }, [code]);

  const reset = useCallback(() => {
    setCode(spec.code);
    setResult(null);
  }, [spec.code]);

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="ml-1">playground.js</span>
          {dirty && (
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
              edited
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            disabled={!dirty && !result}
            className="focus-ring rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Reset
          </button>
          <button
            onClick={run}
            disabled={running}
            className="focus-ring inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {running ? (
              <>
                <Spinner /> Running
              </>
            ) : (
              <>
                <PlayIcon /> Run
              </>
            )}
          </button>
        </div>
      </div>

      {spec.caption && (
        <p className="border-b border-slate-200 bg-amber-50/60 px-3 py-1.5 text-xs text-amber-800 dark:border-slate-800 dark:bg-amber-500/5 dark:text-amber-300/80">
          💡 {spec.caption}
        </p>
      )}

      <CodeMirror
        value={code}
        onChange={setCode}
        basicSetup={setup}
        extensions={[javascript(), EditorView.lineWrapping]}
        theme={isDark ? oneDark : "light"}
        className="text-[13px]"
      />

      <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="flex items-center gap-2 px-3 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Console
        </div>
        <div className="min-h-[3rem] max-h-60 overflow-auto px-3 py-2 font-mono text-[12.5px] leading-relaxed">
          {!result && (
            <p className="text-slate-400 dark:text-slate-600">
              Press <span className="font-semibold">Run</span> to execute. Try editing the code first.
            </p>
          )}
          {result && result.logs.length === 0 && (
            <p className="text-slate-400 dark:text-slate-600">
              (no console output)
            </p>
          )}
          {result?.logs.map((entry, i) => (
            <div
              key={i}
              className={cx("whitespace-pre-wrap", levelColor[entry.level])}
            >
              <span className="mr-2 select-none text-slate-300 dark:text-slate-700">
                ›
              </span>
              {entry.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M6.3 3.7a1 1 0 0 1 1.5-.87l8 5.3a1 1 0 0 1 0 1.74l-8 5.3a1 1 0 0 1-1.5-.87V3.7Z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
