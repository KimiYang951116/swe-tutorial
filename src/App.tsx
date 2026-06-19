import { useTheme } from "./lib/theme";

/**
 * Scaffold placeholder. Routing, the lesson catalog, the interactive
 * components, and the visualizations are wired up in later PRs.
 */
export default function App() {
  const { isDark, toggle } = useTheme();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <button
        onClick={toggle}
        className="focus-ring absolute right-4 top-4 rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-bold text-white shadow-lg">
        {"</>"}
      </span>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          SWE<span className="text-indigo-500">Patterns</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
          An interactive playground for software engineering principles and design
          patterns. The scaffold is in place — lessons and interactivity are coming next.
        </p>
      </div>
    </div>
  );
}
