import { Link } from "react-router-dom";
import { categories, accentClasses } from "../content/categories";
import {
  lessonsByCategory,
  totalLessonCount,
  getLesson,
} from "../content/registry";
import { useProgress } from "../lib/progress";
import { cx } from "../lib/cx";

const FEATURED = ["dry", "srp", "strategy", "observer", "decorator", "mvc"];

const FEATURES = [
  {
    icon: "▶",
    title: "Live code playground",
    text: "Edit every example and run it in a sandboxed console — learn by tinkering, not just reading.",
  },
  {
    icon: "✨",
    title: "Animated visualizations",
    text: "Watch the Observer notify subscribers, coupling tighten and loosen, strategies swap at runtime.",
  },
  {
    icon: "⇄",
    title: "Before → after refactors",
    text: "See the messy version beside the principled one, with the reasons each change is an improvement.",
  },
];

export function Home() {
  return (
    <div className="animate-fade-in-up">
      {/* hero */}
      <section className="py-6 text-center sm:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
          {totalLessonCount} interactive lessons
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Learn software engineering
          <br />
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            principles &amp; patterns
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          An interactive playground for the ideas that make code maintainable — SOLID, the
          Gang of Four patterns, architecture, and the timeless principles behind them. Read
          less, experiment more.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/topic/dry"
            className="focus-ring rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Start with the basics →
          </Link>
          <Link
            to="/category/solid"
            className="focus-ring rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Jump to SOLID
          </Link>
        </div>
        <HeroProgress />
      </section>

      {/* feature highlights */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              {f.icon}
            </div>
            <h3 className="mt-3 font-semibold text-slate-800 dark:text-slate-100">
              {f.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.text}</p>
          </div>
        ))}
      </section>

      {/* categories */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Explore by category
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const accent = accentClasses[category.accent];
            const count = lessonsByCategory(category.id).length;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="focus-ring group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className={cx(
                    "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                    accent.gradient
                  )}
                />
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                      {category.title}
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        {count} lessons
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {category.blurb}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* featured topics */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Featured deep-dives
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Topics with bespoke animations, live playgrounds, and refactor walkthroughs.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {FEATURED.map((slug) => {
            const lesson = getLesson(slug);
            if (!lesson) return null;
            return (
              <Link
                key={slug}
                to={`/topic/${slug}`}
                className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
              >
                {lesson.title}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function HeroProgress() {
  const { understoodCount } = useProgress();
  const pct = Math.round((understoodCount / totalLessonCount) * 100);
  if (understoodCount === 0) return null;
  return (
    <div className="mx-auto mt-6 max-w-sm">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Your progress</span>
        <span className="font-semibold">
          {understoodCount} / {totalLessonCount} ({pct}%)
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
