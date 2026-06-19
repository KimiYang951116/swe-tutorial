import { useProgress } from "../lib/progress";
import { cx } from "../lib/cx";

export function LessonProgress({ slug }: { slug: string }) {
  const { isUnderstood, toggleUnderstood, confidence, setConfidence } = useProgress();
  const understood = isUnderstood(slug);
  const rating = confidence[slug] ?? 0;

  return (
    <div className="not-prose mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <button
        onClick={() => toggleUnderstood(slug)}
        className={cx(
          "focus-ring inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
          understood
            ? "bg-emerald-600 text-white hover:bg-emerald-500"
            : "border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        )}
      >
        <span>{understood ? "✓" : "○"}</span>
        {understood ? "Understood" : "Mark as understood"}
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Confidence:
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setConfidence(slug, n)}
              className="focus-ring text-lg leading-none transition hover:scale-110"
              aria-label={`Confidence ${n} of 5`}
            >
              <span className={n <= rating ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
