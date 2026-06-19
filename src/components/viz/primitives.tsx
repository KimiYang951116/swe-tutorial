import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

export function VizButton({
  children,
  onClick,
  variant = "primary",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "focus-ring rounded-lg px-3 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary"
          ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      )}
    >
      {children}
    </button>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-lg bg-slate-200/70 p-0.5 text-sm font-medium dark:bg-slate-800">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "focus-ring rounded-md px-3 py-1 transition",
            value === o.value
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Chip({
  label,
  active,
  onClick,
  color = "indigo",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: "indigo" | "emerald" | "amber" | "sky" | "rose";
}) {
  const activeColors: Record<string, string> = {
    indigo: "bg-indigo-600 text-white border-indigo-600",
    emerald: "bg-emerald-600 text-white border-emerald-600",
    amber: "bg-amber-500 text-white border-amber-500",
    sky: "bg-sky-600 text-white border-sky-600",
    rose: "bg-rose-600 text-white border-rose-600",
  };
  return (
    <button
      onClick={onClick}
      className={cx(
        "focus-ring rounded-full border px-3 py-1 text-sm font-medium transition",
        active
          ? activeColors[color]
          : "border-slate-300 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-600 dark:text-slate-400"
      )}
    >
      {active ? "✓ " : "+ "}
      {label}
    </button>
  );
}

/** A small labeled output / console area used inside visualizations. */
export function VizOutput({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-[12.5px] leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
      {children}
    </div>
  );
}

/** Generic node box used across many diagrams. */
export function NodeBox({
  title,
  subtitle,
  tone = "default",
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "default" | "good" | "bad" | "accent" | "muted";
  className?: string;
}) {
  const tones: Record<string, string> = {
    default:
      "border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
    good: "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/15 dark:text-emerald-200",
    bad: "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500/50 dark:bg-rose-500/15 dark:text-rose-200",
    accent:
      "border-indigo-400 bg-indigo-50 text-indigo-800 dark:border-indigo-500/50 dark:bg-indigo-500/15 dark:text-indigo-200",
    muted:
      "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400",
  };
  return (
    <div
      className={cx(
        "rounded-xl border px-3 py-2 text-center shadow-sm",
        tones[tone],
        className
      )}
    >
      <div className="text-sm font-semibold leading-tight">{title}</div>
      {subtitle && <div className="mt-0.5 text-xs opacity-80">{subtitle}</div>}
    </div>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs text-slate-400 dark:text-slate-500">
      {children}
    </p>
  );
}
