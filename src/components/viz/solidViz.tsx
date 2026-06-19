import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SegmentedControl, VizButton, NodeBox, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* ----------------------------- SRP ----------------------------- */

export function SrpViz() {
  const [split, setSplit] = useState(false);
  const responsibilities = [
    { title: "Calculate", sub: "business logic" },
    { title: "Format", sub: "presentation" },
    { title: "Persist", sub: "storage" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={split ? "split" : "god"}
          onChange={(v) => setSplit(v === "split")}
          options={[
            { value: "god", label: "One big class" },
            { value: "split", label: "Apply SRP" },
          ]}
        />
      </div>

      {!split ? (
        <motion.div layout className="mx-auto max-w-sm rounded-xl border-2 border-rose-400 bg-rose-50 p-4 dark:border-rose-500/50 dark:bg-rose-500/10">
          <div className="mb-2 text-center text-sm font-bold text-rose-700 dark:text-rose-300">
            class Report
          </div>
          <div className="space-y-2">
            {responsibilities.map((r) => (
              <motion.div layout key={r.title}>
                <NodeBox tone="muted" title={r.title + "()"} subtitle={r.sub} />
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-rose-600 dark:text-rose-400">
            3 reasons to change ⚠️
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {responsibilities.map((r) => (
            <motion.div
              layout
              key={r.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NodeBox
                tone="good"
                title={`class Report${r.title}`}
                subtitle={`${r.sub} · 1 reason to change`}
              />
            </motion.div>
          ))}
        </div>
      )}

      <Hint>
        {split
          ? "Each class now has exactly one reason to change."
          : "One class doing calculation, formatting, and storage — three reasons to change."}
      </Hint>
    </div>
  );
}

/* ----------------------------- OCP ----------------------------- */

export function OcpViz() {
  const allShapes = ["Circle", "Square", "Triangle", "Hexagon", "Star"];
  const [count, setCount] = useState(2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {count} shape{count > 1 ? "s" : ""} · existing code untouched
        </span>
        <VizButton
          onClick={() => setCount((c) => Math.min(c + 1, allShapes.length))}
          disabled={count >= allShapes.length}
        >
          + Add a shape class
        </VizButton>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AnimatePresence>
          {allShapes.slice(0, count).map((s, i) => (
            <motion.div
              key={s}
              layout
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              <NodeBox
                tone={i === count - 1 && count > 2 ? "accent" : "good"}
                title={`class ${s}`}
                subtitle={i === count - 1 && count > 2 ? "newly added ✦" : "area() ✓ closed"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Hint>
        Each new shape is a new class. The existing shapes (and the totalArea loop) are
        never modified — open for extension, closed for modification.
      </Hint>
    </div>
  );
}

/* ----------------------------- LSP ----------------------------- */

type SubKind = "rect" | "square" | "badsquare";

export function LspViz() {
  const [kind, setKind] = useState<SubKind>("rect");

  // Test: setWidth(5); setHeight(4); expect area === 20
  const run = (k: SubKind) => {
    if (k === "rect") return { area: 20, ok: true, note: "5 × 4 = 20 ✓" };
    if (k === "square")
      return { area: 16, ok: true, note: "Square(side=4) → 16 (honest, no resize contract)" };
    // bad square: setWidth(5) sets both to 5, setHeight(4) sets both to 4 → 16
    return { area: 16, ok: false, note: "setWidth(5).setHeight(4) → 4×4 = 16 ✗ broke the Rectangle contract" };
  };

  const result = run(kind);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={kind}
          onChange={setKind}
          options={[
            { value: "rect", label: "Rectangle" },
            { value: "square", label: "Square (clean)" },
            { value: "badsquare", label: "Square extends Rect (bad)" },
          ]}
        />
      </div>

      <div className="flex items-center justify-center gap-3 text-sm">
        <NodeBox tone="accent" title="expects a Shape" subtitle="printArea(shape)" />
        <span className="text-2xl text-slate-300 dark:text-slate-600">←</span>
        <NodeBox
          tone={result.ok ? "good" : "bad"}
          title={
            kind === "rect" ? "Rectangle" : kind === "square" ? "Square" : "Square ⟵ Rectangle"
          }
          subtitle={`substituted`}
        />
      </div>

      <VizOutput>
        <div className={cx(result.ok ? "text-emerald-500" : "text-rose-500", "font-semibold")}>
          {result.ok ? "PASS" : "FAIL"}: {result.note}
        </div>
      </VizOutput>

      <Hint>
        A subtype must behave correctly wherever the base type is expected. The “bad”
        square silently breaks callers that set width and height independently.
      </Hint>
    </div>
  );
}

/* ----------------------------- ISP ----------------------------- */

export function IspViz() {
  const [fat, setFat] = useState(true);
  const methods = [
    { name: "print()", needed: true },
    { name: "scan()", needed: false },
    { name: "fax()", needed: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={fat ? "fat" : "seg"}
          onChange={(v) => setFat(v === "fat")}
          options={[
            { value: "fat", label: "Fat interface" },
            { value: "seg", label: "Segregated" },
          ]}
        />
      </div>

      <div className="mx-auto max-w-sm space-y-2">
        <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
          class SimplePrinter implements…
        </p>
        {methods.map((m) => {
          const show = fat || m.needed;
          if (!show) return null;
          const broken = fat && !m.needed;
          return (
            <motion.div layout key={m.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <NodeBox
                tone={broken ? "bad" : "good"}
                title={m.name}
                subtitle={broken ? 'throw "not supported" ✕' : "real implementation ✓"}
              />
            </motion.div>
          );
        })}
      </div>

      <Hint>
        {fat
          ? "Forced to implement scan() and fax() it doesn't support — so it throws. That's the smell."
          : "With small, focused interfaces it implements only print(). No useless stubs."}
      </Hint>
    </div>
  );
}

/* ----------------------------- DIP ----------------------------- */

type Impl = "memory" | "mysql" | "api";

export function DipViz() {
  const [impl, setImpl] = useState<Impl>("memory");
  const data: Record<Impl, { label: string; out: string }> = {
    memory: { label: "InMemoryUsers", out: '[{ name: "Ada" }, { name: "Linus" }]' },
    mysql: { label: "MySQLUsers", out: '[{ name: "Grace" }, { name: "Edsger" }]' },
    api: { label: "ApiUsers", out: '[{ name: "Margaret" }]' },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-1">
        <NodeBox tone="accent" title="UserService (high-level)" subtitle="depends on the abstraction" className="w-64" />
        <span className="text-xl text-slate-300 dark:text-slate-600">↓ depends on</span>
        <NodeBox tone="default" title="« interface » UserRepo" subtitle="findAll()" className="w-64" />
        <span className="text-xl text-slate-300 dark:text-slate-600">↑ implements</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={impl}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="w-64"
          >
            <NodeBox tone="good" title={data[impl].label + " (low-level)"} subtitle="injected" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <SegmentedControl
          value={impl}
          onChange={setImpl}
          options={[
            { value: "memory", label: "In-memory" },
            { value: "mysql", label: "MySQL" },
            { value: "api", label: "REST API" },
          ]}
        />
      </div>

      <VizOutput>
        <div className="text-slate-400">{"// new UserService(repo).list()"}</div>
        <div>{data[impl].out}</div>
      </VizOutput>

      <Hint>
        Swap the low-level implementation without changing UserService — both sides depend
        on the abstraction, not on each other.
      </Hint>
    </div>
  );
}
