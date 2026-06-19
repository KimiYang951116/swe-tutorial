import { useState } from "react";
import { cx } from "../lib/cx";
import type { QuizQuestion } from "../content/types";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  return (
    <div className="not-prose space-y-4">
      {questions.map((q, i) => (
        <QuizItem key={i} q={q} index={i} total={questions.length} />
      ))}
    </div>
  );
}

function QuizItem({ q, index, total }: { q: QuizQuestion; index: number; total: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === q.answer;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-start gap-2">
        <span className="mt-0.5 shrink-0 rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
          Q{index + 1}/{total}
        </span>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{q.question}</p>
      </div>

      <div className="space-y-2">
        {q.options.map((option, oi) => {
          const isAnswer = oi === q.answer;
          const isPicked = oi === picked;
          let tone =
            "border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-500/50";
          if (answered && isAnswer)
            tone = "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10";
          else if (answered && isPicked && !isAnswer)
            tone = "border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10";
          return (
            <button
              key={oi}
              disabled={answered}
              onClick={() => setPicked(oi)}
              className={cx(
                "focus-ring flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition disabled:cursor-default",
                tone
              )}
            >
              <span
                className={cx(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                  answered && isAnswer
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : answered && isPicked
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-slate-300 text-slate-400 dark:border-slate-600"
                )}
              >
                {answered && isAnswer ? "✓" : answered && isPicked ? "✕" : String.fromCharCode(65 + oi)}
              </span>
              <span className="text-slate-700 dark:text-slate-200">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={cx(
            "mt-3 rounded-lg px-3 py-2 text-sm",
            correct
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300"
          )}
        >
          <span className="font-semibold">{correct ? "Correct! " : "Not quite. "}</span>
          {q.explanation}
          {!correct && (
            <button
              onClick={() => setPicked(null)}
              className="ml-2 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
