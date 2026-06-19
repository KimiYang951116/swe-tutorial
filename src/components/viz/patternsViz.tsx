import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SegmentedControl, VizButton, Chip, NodeBox, Hint, VizOutput } from "./primitives";
import { cx } from "../../lib/cx";

/* --------------------------- FACTORY --------------------------- */

type Channel = "email" | "sms" | "push";

export function FactoryViz() {
  const [type, setType] = useState<Channel>("email");
  const products: Record<Channel, { icon: string; cls: string; out: string }> = {
    email: { icon: "✉️", cls: "EmailNotifier", out: 'email: "Hello!"' },
    sms: { icon: "📱", cls: "SmsNotifier", out: 'sms: "Hello!"' },
    push: { icon: "🔔", cls: "PushNotifier", out: 'push: "Hello!"' },
  };
  const p = products[type];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={type}
          onChange={setType}
          options={[
            { value: "email", label: "email" },
            { value: "sms", label: "sms" },
            { value: "push", label: "push" },
          ]}
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <NodeBox tone="muted" title={`"${type}"`} subtitle="request" />
        <span className="text-2xl text-slate-300 dark:text-slate-600">→</span>
        <NodeBox tone="accent" title="createNotifier()" subtitle="factory" />
        <span className="text-2xl text-slate-300 dark:text-slate-600">→</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <NodeBox tone="good" title={`${p.icon} ${p.cls}`} subtitle="product" />
          </motion.div>
        </AnimatePresence>
      </div>

      <VizOutput>
        <div className="text-slate-400">{`// createNotifier("${type}").send("Hello!")`}</div>
        <div>{p.out}</div>
      </VizOutput>
      <Hint>The caller asks by intent; the factory decides which concrete class to build.</Hint>
    </div>
  );
}

/* -------------------------- SINGLETON -------------------------- */

export function SingletonViz() {
  const [calls, setCalls] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          getInstance() called <strong>{calls}</strong> time{calls === 1 ? "" : "s"} ·
          instances created: <strong className="text-emerald-600 dark:text-emerald-400">{Math.min(calls, 1)}</strong>
        </span>
        <VizButton onClick={() => setCalls((c) => c + 1)}>Config.getInstance()</VizButton>
      </div>

      <div className="relative flex min-h-[8rem] items-center justify-center">
        <motion.div
          animate={calls > 0 ? { scale: [1, 1.06, 1] } : {}}
          key={calls}
          transition={{ duration: 0.3 }}
        >
          <NodeBox tone="accent" title="Config #0001" subtitle="the one instance" className="w-44" />
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <AnimatePresence>
          {Array.from({ length: calls }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-mono text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              caller {i + 1} → #0001
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Hint>
        Every call returns the <em>same</em> instance (#0001). No matter how many callers,
        only one object is ever created.
      </Hint>
    </div>
  );
}

/* -------------------------- DECORATOR -------------------------- */

const TOPPINGS = [
  { key: "milk", label: "milk", cost: 0.5 },
  { key: "sugar", label: "sugar", cost: 0.2 },
  { key: "whip", label: "whip", cost: 0.7 },
] as const;

type ToppingKey = (typeof TOPPINGS)[number]["key"];

export function DecoratorViz() {
  const [on, setOn] = useState<Record<ToppingKey, boolean>>({
    milk: true,
    sugar: false,
    whip: false,
  });

  const active = TOPPINGS.filter((t) => on[t.key]);
  const cost = 2 + active.reduce((s, t) => s + t.cost, 0);
  const desc = ["coffee", ...active.map((t) => t.label)].join(" + ");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TOPPINGS.map((t) => (
          <Chip
            key={t.key}
            label={`${t.label} (+$${t.cost})`}
            active={on[t.key]}
            onClick={() => setOn((o) => ({ ...o, [t.key]: !o[t.key] }))}
            color="amber"
          />
        ))}
      </div>

      {/* concentric wrapping layers */}
      <div className="flex justify-center py-2">
        <motion.div layout className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-2 dark:border-amber-500/40 dark:bg-amber-500/10">
          <AnimatePresence>
            {active.map((t) => (
              <motion.div
                key={t.key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-xl border border-amber-300/70 p-2 text-center text-xs font-medium text-amber-700 dark:border-amber-500/30 dark:text-amber-300"
              >
                {t.label} ▾
                <div className="mt-1 rounded-lg p-1">
                  {/* nested children render here */}
                  {t.key === active[active.length - 1]?.key && (
                    <div className="rounded-lg bg-amber-200/70 px-3 py-2 font-semibold text-amber-900 dark:bg-amber-500/30 dark:text-amber-100">
                      ☕ coffee
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {active.length === 0 && (
            <div className="rounded-lg bg-amber-200/70 px-4 py-3 font-semibold text-amber-900 dark:bg-amber-500/30 dark:text-amber-100">
              ☕ coffee
            </div>
          )}
        </motion.div>
      </div>

      <VizOutput>
        <div>{desc}</div>
        <div className="font-bold text-amber-600 dark:text-amber-400">= ${cost.toFixed(2)}</div>
      </VizOutput>
      <Hint>Each topping is a decorator that wraps the coffee and adds to its cost and description.</Hint>
    </div>
  );
}

/* --------------------------- ADAPTER --------------------------- */

export function AdapterViz() {
  const [adapter, setAdapter] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={adapter ? "yes" : "no"}
          onChange={(v) => setAdapter(v === "yes")}
          options={[
            { value: "no", label: "No adapter" },
            { value: "yes", label: "With adapter" },
          ]}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* round plug (vendor) */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-sky-400 bg-sky-50 text-xs font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
          vendor
        </div>

        <AnimatePresence>
          {adapter && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex h-12 items-center justify-center rounded-lg border-2 border-indigo-400 bg-indigo-50 px-3 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
            >
              Adapter
            </motion.div>
          )}
        </AnimatePresence>

        {/* square socket (our app) */}
        <div
          className={cx(
            "flex h-16 w-16 items-center justify-center rounded-md border-2 text-xs font-semibold transition-colors",
            adapter
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
              : "border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800"
          )}
        >
          app
        </div>
      </div>

      <VizOutput>
        {adapter ? (
          <span className="font-semibold text-emerald-500">
            ⚡ logger.log("hi") → adapter → vendor.writeEntry("INFO", "hi") ✓
          </span>
        ) : (
          <span className="font-semibold text-rose-500">
            ✕ logger.log is not a function — vendor only has writeEntry()
          </span>
        )}
      </VizOutput>
      <Hint>The adapter translates the interface your app expects into the one the vendor provides.</Hint>
    </div>
  );
}

/* --------------------------- STRATEGY --------------------------- */

type Strat = "az" | "za" | "len";

export function StrategyViz() {
  const [strat, setStrat] = useState<Strat>("az");
  const base = ["banana", "fig", "cherry", "date", "apple"];
  const sorted = [...base].sort((a, b) => {
    if (strat === "az") return a.localeCompare(b);
    if (strat === "za") return b.localeCompare(a);
    return a.length - b.length;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <SegmentedControl
          value={strat}
          onChange={setStrat}
          options={[
            { value: "az", label: "A → Z" },
            { value: "za", label: "Z → A" },
            { value: "len", label: "by length" },
          ]}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {sorted.map((word) => (
          <motion.div
            key={word}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-500/40 dark:bg-indigo-500/15 dark:text-indigo-200"
          >
            {word}
            <span className="ml-1.5 text-[10px] text-indigo-400">{word.length}</span>
          </motion.div>
        ))}
      </div>

      <Hint>
        Same context, same data — only the injected sorting <em>strategy</em> changes. The
        items animate into the new order.
      </Hint>
    </div>
  );
}

/* --------------------------- OBSERVER --------------------------- */

export function ObserverViz() {
  const [subs, setSubs] = useState(["UI", "Logger", "Analytics"]);
  const [active, setActive] = useState<number | null>(null);
  const [price, setPrice] = useState(100);
  const [log, setLog] = useState<string[]>([]);

  const emit = () => {
    const next = price + 1;
    setPrice(next);
    setLog([]);
    subs.forEach((s, i) => {
      window.setTimeout(() => {
        setActive(i);
        setLog((l) => [...l, `${s} received: ${next}`]);
        if (i === subs.length - 1) window.setTimeout(() => setActive(null), 400);
      }, i * 350);
    });
  };

  const removeSub = (i: number) => setSubs((s) => s.filter((_, j) => j !== i));
  const addSub = () =>
    setSubs((s) => [...s, ["Cache", "Mobile", "Email"][s.length % 3] + (s.length > 2 ? s.length : "")]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Stock price: <strong className="text-slate-800 dark:text-slate-100">${price}</strong>
        </span>
        <div className="flex gap-2">
          <VizButton variant="ghost" onClick={addSub} disabled={subs.length >= 5}>
            + subscriber
          </VizButton>
          <VizButton onClick={emit}>emit price change →</VizButton>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <NodeBox tone="accent" title="Subject" subtitle="Stock" className="w-28" />
        <div className="text-2xl text-slate-300 dark:text-slate-600">⇒</div>
        <div className="flex flex-wrap gap-2">
          {subs.map((s, i) => (
            <motion.div
              key={s + i}
              animate={active === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => removeSub(i)}
                title="click to unsubscribe"
                className={cx(
                  "rounded-xl border-2 px-3 py-2 text-sm font-medium transition-colors",
                  active === i
                    ? "border-emerald-500 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-200"
                    : "border-slate-300 bg-white text-slate-600 hover:border-rose-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                )}
              >
                {s}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {log.length > 0 && (
        <VizOutput>
          {log.map((l, i) => (
            <div key={i} className="text-emerald-500">
              {l}
            </div>
          ))}
        </VizOutput>
      )}
      <Hint>
        Press “emit” — every subscriber is notified automatically. Click a subscriber to
        unsubscribe; the subject never changes.
      </Hint>
    </div>
  );
}
