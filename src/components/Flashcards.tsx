import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cx } from "../lib/cx";
import type { Flashcard } from "../content/types";

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };

  const card = cards[index];

  return (
    <div className="not-prose space-y-3">
      <div className="relative h-44">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="focus-ring h-full w-full"
          aria-label="Flip card"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index + (flipped ? "-back" : "-front")}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cx(
                "flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 p-6 text-center shadow-sm",
                flipped
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                  : "border-indigo-300 bg-indigo-50 dark:border-indigo-500/40 dark:bg-indigo-500/10"
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {flipped ? "Answer" : "Prompt"}
              </span>
              <span className="text-lg font-medium text-slate-800 dark:text-slate-100">
                {flipped ? card.back : card.front}
              </span>
              {!flipped && (
                <span className="text-xs text-slate-400">click to flip</span>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="focus-ring rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          ← Prev
        </button>
        <span className="text-xs text-slate-400">
          {index + 1} / {cards.length}
        </span>
        <button
          onClick={() => go(1)}
          className="focus-ring rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
