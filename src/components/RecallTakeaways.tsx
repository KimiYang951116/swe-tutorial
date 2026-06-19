import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RecallTakeaways({ points }: { points: string[] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="not-prose mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">🎯 Key takeaways</h2>
        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="focus-ring rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            🧠 Reveal
          </button>
        )}
      </div>

      {!revealed ? (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Before revealing — can you recall the{" "}
          <strong>{points.length}</strong> main point{points.length === 1 ? "" : "s"} from
          this lesson?
        </p>
      ) : (
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-3 space-y-2"
        >
          <AnimatePresence>
            {points.map((point, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="mt-0.5 text-indigo-500">→</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
