import { useState } from "react";
import { motion } from "framer-motion";
import { SegmentedControl, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* ----------------------- TESTING PYRAMID ----------------------- */

const TIERS = [
  {
    key: "unit",
    label: "Unit tests",
    width: "w-full",
    tone: "bg-emerald-500",
    count: "Many",
    speed: "Fast (ms)",
    desc: "Test a single function/class in isolation. Cheap, fast, run constantly.",
  },
  {
    key: "integration",
    label: "Integration tests",
    width: "w-2/3",
    tone: "bg-sky-500",
    count: "Some",
    speed: "Medium",
    desc: "Test components working together — glue code, contracts, API boundaries.",
  },
  {
    key: "e2e",
    label: "End-to-end tests",
    width: "w-1/3",
    tone: "bg-rose-500",
    count: "Few",
    speed: "Slow",
    desc: "Drive the whole system like a user. Valuable but slow and more fragile.",
  },
] as const;

export function TestingPyramidViz() {
  const [active, setActive] = useState<string>("unit");
  const tier = TIERS.find((t) => t.key === active)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-1.5">
        {TIERS.map((t) => (
          <motion.button
            key={t.key}
            onClick={() => setActive(t.key)}
            whileHover={{ scale: 1.02 }}
            className={cx(
              "flex h-12 items-center justify-center rounded-md text-sm font-semibold text-white shadow-sm transition",
              t.width,
              t.tone,
              active === t.key ? "ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900" : "opacity-80"
            )}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      <VizOutput>
        <div className="font-semibold text-slate-700 dark:text-slate-100">{tier.label}</div>
        <div className="text-slate-500">
          count: <strong>{tier.count}</strong> · speed: <strong>{tier.speed}</strong>
        </div>
        <div className="mt-1 text-slate-600 dark:text-slate-300">{tier.desc}</div>
      </VizOutput>
      <Hint>Click a tier. The base is wide (many fast unit tests); the top is narrow (few slow E2E tests).</Hint>
    </div>
  );
}

/* ------------------------- PARTITIONS -------------------------- */

type Mode = "ep" | "bva";

function partitionOf(n: number): "low" | "valid" | "high" {
  if (n <= 0) return "low";
  if (n <= 12) return "valid";
  return "high";
}

const EP_REPRESENTATIVES = new Set([0, 6, 13]);
const BVA_VALUES = new Set([0, 1, 2, 11, 12, 13]);

export function PartitionsViz() {
  const [mode, setMode] = useState<Mode>("ep");
  const [picked, setPicked] = useState<number | null>(null);

  const cells = Array.from({ length: 16 }, (_, i) => i - 1); // -1..14
  const highlighted = mode === "ep" ? EP_REPRESENTATIVES : BVA_VALUES;

  const toneFor = (n: number) => {
    const p = partitionOf(n);
    if (p === "valid") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={mode}
          onChange={(m) => {
            setMode(m);
            setPicked(null);
          }}
          options={[
            { value: "ep", label: "Equivalence partitions" },
            { value: "bva", label: "Boundary values" },
          ]}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {cells.map((n) => {
          const isHL = highlighted.has(n);
          return (
            <button
              key={n}
              onClick={() => setPicked(n)}
              className={cx(
                "h-9 w-9 rounded-md border text-xs font-semibold transition",
                toneFor(n),
                isHL ? "border-indigo-500 ring-2 ring-indigo-400" : "border-transparent opacity-60",
                picked === n && "scale-110"
              )}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-400" />invalid (≤0 or ≥13)</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />valid (1–12)</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-indigo-500" />a test value</span>
      </div>

      {picked !== null && (
        <VizOutput>
          <div className="text-slate-400">{`// isValidMonth(${picked})`}</div>
          <div className={cx(partitionOf(picked) === "valid" ? "text-emerald-500" : "text-rose-500", "font-semibold")}>
            {String(partitionOf(picked) === "valid")} — partition: {partitionOf(picked)}
          </div>
        </VizOutput>
      )}

      <Hint>
        {mode === "ep"
          ? "One representative per partition (0, 6, 13) covers every group."
          : "Boundary values cluster at the edges (0,1,2 and 11,12,13) where off-by-one bugs hide."}
      </Hint>
    </div>
  );
}
