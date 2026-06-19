import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VizButton, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* ------------------------ GIT BRANCHES ------------------------ */

const GIT_STEPS = [
  "main has two commits.",
  "Create a feature branch off main.",
  "Commit work on the feature branch.",
  "Commit more on the feature branch.",
  "Open a pull request and merge the feature back into main.",
];

export function GitBranchesViz() {
  const [step, setStep] = useState(0);

  const mainCommits = step >= 4 ? 3 : 2; // merge adds a commit to main
  const merged = step >= 4;
  const branched = step >= 1;
  const featureCommits = Math.max(0, Math.min(step, 3) - 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Step {step + 1} / {GIT_STEPS.length}
        </span>
        <div className="flex gap-2">
          <VizButton variant="ghost" onClick={() => setStep(0)} disabled={step === 0}>
            Reset
          </VizButton>
          <VizButton
            onClick={() => setStep((s) => Math.min(s + 1, GIT_STEPS.length - 1))}
            disabled={step === GIT_STEPS.length - 1}
          >
            Next step →
          </VizButton>
        </div>
      </div>

      <div className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        {/* feature lane */}
        <div className="flex h-8 items-center gap-2">
          <span className="w-16 text-right text-xs font-semibold text-violet-500">feature</span>
          <AnimatePresence>
            {branched &&
              Array.from({ length: featureCommits }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-4 w-4 rounded-full bg-violet-500"
                />
              ))}
            {branched && featureCommits === 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-400"
              >
                (branched)
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* main lane */}
        <div className="flex h-8 items-center gap-2">
          <span className="w-16 text-right text-xs font-semibold text-emerald-500">main</span>
          {Array.from({ length: mainCommits }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cx(
                "h-4 w-4 rounded-full",
                merged && i === mainCommits - 1 ? "bg-indigo-500 ring-2 ring-indigo-300" : "bg-emerald-500"
              )}
              title={merged && i === mainCommits - 1 ? "merge commit" : "commit"}
            />
          ))}
          {merged && <span className="text-xs text-indigo-500">← merged</span>}
        </div>
      </div>

      <VizOutput>{GIT_STEPS[step]}</VizOutput>
      <Hint>Step through a typical feature-branch workflow: branch → commit → commit → merge.</Hint>
    </div>
  );
}

/* ---------------------- WALKING SKELETON ---------------------- */

const LAYERS = ["UI", "Service", "Data", "External API"];

export function WalkingSkeletonViz() {
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "down" | "up">("idle");

  const run = () => {
    setPhase("down");
    LAYERS.forEach((_, i) => {
      window.setTimeout(() => setActive(i), i * 300);
    });
    // response travels back up
    LAYERS.forEach((_, i) => {
      window.setTimeout(() => setActive(LAYERS.length - 1 - i), (LAYERS.length + i) * 300);
    });
    window.setTimeout(() => {
      setActive(null);
      setPhase("idle");
    }, LAYERS.length * 2 * 300 + 200);
    window.setTimeout(() => setPhase("up"), LAYERS.length * 300);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <VizButton onClick={run} disabled={phase !== "idle"}>
          ▶ Run a request end-to-end
        </VizButton>
      </div>

      <div className="mx-auto flex max-w-xs flex-col gap-2">
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer}
            animate={active === i ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cx(
              "rounded-lg border-2 px-4 py-2 text-center text-sm font-semibold transition-colors",
              active === i
                ? "border-indigo-500 bg-indigo-100 text-indigo-800 dark:bg-indigo-500/25 dark:text-indigo-100"
                : "border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            {layer}
          </motion.div>
        ))}
      </div>

      <Hint>
        A walking skeleton wires a thin slice through every layer — even with trivial
        features — so the whole path is proven to work early.
      </Hint>
    </div>
  );
}
