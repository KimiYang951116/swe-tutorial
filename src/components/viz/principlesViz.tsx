import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SegmentedControl, VizButton, Chip, NodeBox, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* ----------------------------- DRY ----------------------------- */

export function DryViz() {
  const [mode, setMode] = useState<"dup" | "dry">("dup");
  const [changed, setChanged] = useState(false);

  // In duplicated mode, a change "forgets" the third copy -> drift bug.
  const dupRates = changed ? [0.09, 0.09, 0.07] : [0.07, 0.07, 0.07];
  const dryRate = changed ? 0.09 : 0.07;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          value={mode}
          onChange={(m) => {
            setMode(m);
            setChanged(false);
          }}
          options={[
            { value: "dup", label: "Duplicated" },
            { value: "dry", label: "DRY" },
          ]}
        />
        <VizButton onClick={() => setChanged(true)} disabled={changed}>
          Change tax rate → 0.09
        </VizButton>
      </div>

      {mode === "dup" ? (
        <div className="grid grid-cols-3 gap-3">
          {dupRates.map((r, i) => {
            const drift = changed && r === 0.07;
            return (
              <NodeBox
                key={i}
                tone={drift ? "bad" : changed ? "good" : "default"}
                title={`module ${i + 1}`}
                subtitle={`rate = ${r}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <motion.div layout className="w-48">
            <NodeBox
              tone={changed ? "good" : "accent"}
              title="TAX_RATE"
              subtitle={`= ${dryRate}`}
            />
          </motion.div>
          <div className="text-xl text-slate-300 dark:text-slate-600">▲ ▲ ▲</div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <NodeBox key={i} tone="muted" title={`module ${i}`} subtitle="reads rate" />
            ))}
          </div>
        </div>
      )}

      <Hint>
        {mode === "dup"
          ? changed
            ? "Oops — one copy was forgotten and now disagrees (red). That's the duplication bug."
            : "Three copies of the same knowledge. Now press “Change tax rate”."
          : changed
            ? "One change, and every module sees the new rate. No drift possible."
            : "One source of truth; every module reads from it. Now press “Change tax rate”."}
      </Hint>
    </div>
  );
}

/* --------------------------- COUPLING --------------------------- */

export function CouplingViz() {
  const [coupling, setCoupling] = useState(80);
  const [rippled, setRippled] = useState(false);

  const tight = coupling > 50;
  const lineOpacity = 0.15 + (coupling / 100) * 0.85;
  const lineWidth = 1 + (coupling / 100) * 3;

  const triggerChange = () => {
    setRippled(true);
    window.setTimeout(() => setRippled(false), 1400);
  };

  const affected = (idx: number) => rippled && (idx === 0 || tight);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex flex-1 items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="whitespace-nowrap">Coupling</span>
          <input
            type="range"
            min={0}
            max={100}
            value={coupling}
            onChange={(e) => setCoupling(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <span className="w-28 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">
            {tight ? "Tight 🔗" : "Loose 〰️"}
          </span>
        </label>
        <VizButton onClick={triggerChange}>Change module A</VizButton>
      </div>

      <div className="relative h-40">
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          {/* connections between the three nodes */}
          <line x1="18%" y1="50%" x2="50%" y2="50%" stroke="rgb(99 102 241)" strokeOpacity={lineOpacity} strokeWidth={lineWidth} />
          <line x1="50%" y1="50%" x2="82%" y2="50%" stroke="rgb(99 102 241)" strokeOpacity={lineOpacity} strokeWidth={lineWidth} />
          <line x1="18%" y1="50%" x2="82%" y2="50%" stroke="rgb(99 102 241)" strokeOpacity={lineOpacity * 0.6} strokeWidth={lineWidth} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {["A", "B", "C"].map((name, i) => (
            <motion.div
              key={name}
              animate={
                affected(i)
                  ? { scale: [1, 1.18, 1], y: [0, -6, 0] }
                  : { scale: 1, y: 0 }
              }
              transition={{ duration: 0.6, repeat: affected(i) ? 1 : 0 }}
            >
              <div
                className={cx(
                  "flex h-16 w-16 items-center justify-center rounded-xl border-2 text-lg font-bold shadow-sm transition-colors",
                  affected(i)
                    ? "border-rose-500 bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                    : "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                )}
              >
                {name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Hint>
        {rippled
          ? tight
            ? "Tightly coupled: changing A forces B and C to change too (red)."
            : "Loosely coupled: changing A leaves B and C untouched."
          : "Drag the slider, then press “Change module A” to see the ripple."}
      </Hint>
    </div>
  );
}

/* ------------------------- COMPOSITION ------------------------- */

const ABILITIES = [
  { key: "fly", label: "canFly", sound: "flap, flap 🪽" },
  { key: "swim", label: "canSwim", sound: "paddle 🌊" },
  { key: "walk", label: "canWalk", sound: "step, step 🐾" },
] as const;

type AbilityKey = (typeof ABILITIES)[number]["key"];

export function CompositionViz() {
  const [abilities, setAbilities] = useState<Record<AbilityKey, boolean>>({
    fly: true,
    swim: true,
    walk: false,
  });
  const [log, setLog] = useState<string[]>([]);

  const toggle = (k: AbilityKey) =>
    setAbilities((a) => ({ ...a, [k]: !a[k] }));

  const call = (k: AbilityKey) => {
    const ab = ABILITIES.find((a) => a.key === k)!;
    const line = abilities[k]
      ? `creature.${ab.label.replace("can", "").toLowerCase()}() → "${ab.sound}"`
      : `creature.${ab.label.replace("can", "").toLowerCase()}() → ✕ not supported`;
    setLog((l) => [line, ...l].slice(0, 4));
  };

  const active = ABILITIES.filter((a) => abilities[a.key]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ABILITIES.map((a) => (
          <Chip
            key={a.key}
            label={a.label}
            active={abilities[a.key]}
            onClick={() => toggle(a.key)}
            color="emerald"
          />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          🐦 creature = compose(
          <AnimatePresence>
            {active.map((a) => (
              <motion.span
                key={a.key}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="mx-0.5 inline-block rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-xs text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              >
                {a.label}
              </motion.span>
            ))}
          </AnimatePresence>
          {active.length === 0 && (
            <span className="text-slate-400"> /* no abilities */ </span>
          )}
          )
        </div>
        <div className="flex flex-wrap gap-2">
          {ABILITIES.map((a) => (
            <VizButton key={a.key} variant="ghost" onClick={() => call(a.key)}>
              {a.label.replace("can", "").toLowerCase()}()
            </VizButton>
          ))}
        </div>
      </div>

      {log.length > 0 && (
        <VizOutput>
          {log.map((l, i) => (
            <div key={i} className={cx(l.includes("✕") && "text-rose-500")}>
              {l}
            </div>
          ))}
        </VizOutput>
      )}
      <Hint>Mix abilities like building blocks — call a method to see if the composed creature supports it.</Hint>
    </div>
  );
}
