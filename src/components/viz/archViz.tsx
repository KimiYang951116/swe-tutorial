import { useState } from "react";
import { motion } from "framer-motion";
import { VizButton, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* ----------------------------- MVC ----------------------------- */

type Step = 0 | 1 | 2 | 3;
const STEP_LABEL = ["idle", "Controller", "Model", "View"] as const;

export function MvcViz() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState<Step>(0);

  const fire = () => {
    setStep(1); // controller handles input
    window.setTimeout(() => {
      setStep(2); // model updates
      setCount((c) => c + 1);
    }, 600);
    window.setTimeout(() => setStep(3), 1200); // view renders
    window.setTimeout(() => setStep(0), 2000);
  };

  const node = (which: Step, title: string, sub: string) => (
    <motion.div
      animate={step === which ? { scale: [1, 1.12, 1] } : { scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cx(
        "w-32 rounded-xl border-2 px-3 py-2 text-center shadow-sm transition-colors",
        step === which
          ? "border-indigo-500 bg-indigo-100 text-indigo-800 dark:bg-indigo-500/25 dark:text-indigo-100"
          : "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      )}
    >
      <div className="text-sm font-bold">{title}</div>
      <div className="text-[11px] opacity-70">{sub}</div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <VizButton onClick={fire} disabled={step !== 0}>
          👆 User clicks “increment”
        </VizButton>
      </div>

      <div className="flex flex-col items-center gap-3">
        {node(2, "Model", `count = ${count}`)}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>↑ updates</span>
          <span className="mx-6">notifies ↓</span>
        </div>
        <div className="flex w-full max-w-sm justify-between">
          {node(1, "Controller", "handles input")}
          {node(3, "View", `renders ${count}`)}
        </div>
        <div className="text-xs text-slate-400">← user acts · re-renders →</div>
      </div>

      <VizOutput>
        <div className="text-slate-400">{"// data flow"}</div>
        <div>
          {step === 0
            ? "waiting for input…"
            : `→ ${STEP_LABEL[step]}${step === 2 ? ` (count = ${count})` : step === 3 ? ` shows ${count}` : ""}`}
        </div>
      </VizOutput>
      <Hint>
        Click the button and follow the flow: Controller → Model (updates state) → View
        (re-renders). Each role stays in its lane.
      </Hint>
    </div>
  );
}
