import { useState } from "react";
import { motion } from "framer-motion";
import { cx } from "../lib/cx";
import type { OrderingExercise } from "../content/types";

function shuffled(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // avoid the already-correct order for a non-trivial start
  if (arr.every((v, i) => v === i) && n > 1) [arr[0], arr[1]] = [arr[1], arr[0]];
  return arr;
}

export function Ordering({ exercise }: { exercise: OrderingExercise }) {
  const [order, setOrder] = useState<number[]>(() => shuffled(exercise.items.length));
  const [checked, setChecked] = useState(false);

  const move = (pos: number, delta: number) => {
    const next = [...order];
    const target = pos + delta;
    if (target < 0 || target >= next.length) return;
    [next[pos], next[target]] = [next[target], next[pos]];
    setOrder(next);
    setChecked(false);
  };

  const allCorrect = order.every((v, i) => v === i);

  return (
    <div className="not-prose space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{exercise.prompt}</p>
      <ul className="space-y-2">
        {order.map((itemIdx, pos) => {
          const correctHere = checked && itemIdx === pos;
          const wrongHere = checked && itemIdx !== pos;
          return (
            <motion.li
              key={itemIdx}
              layout
              className={cx(
                "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm",
                correctHere
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                  : wrongHere
                    ? "border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10"
                    : "border-slate-200 dark:border-slate-700"
              )}
            >
              <span className="font-mono text-xs text-slate-400">{pos + 1}.</span>
              <span className="flex-1 text-slate-700 dark:text-slate-200">
                {exercise.items[itemIdx]}
              </span>
              <span className="flex flex-col">
                <button
                  onClick={() => move(pos, -1)}
                  disabled={pos === 0}
                  className="focus-ring px-1 text-slate-400 hover:text-indigo-500 disabled:opacity-30"
                  aria-label="Move up"
                >
                  ▲
                </button>
                <button
                  onClick={() => move(pos, 1)}
                  disabled={pos === order.length - 1}
                  className="focus-ring px-1 text-slate-400 hover:text-indigo-500 disabled:opacity-30"
                  aria-label="Move down"
                >
                  ▼
                </button>
              </span>
            </motion.li>
          );
        })}
      </ul>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setChecked(true)}
          className="focus-ring rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Check order
        </button>
        {checked && (
          <span className={cx("text-sm font-semibold", allCorrect ? "text-emerald-600" : "text-rose-600")}>
            {allCorrect ? "Correct order! 🎉" : "Not yet — keep adjusting."}
          </span>
        )}
      </div>
    </div>
  );
}
