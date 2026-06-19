import { Link, useParams } from "react-router-dom";
import { categories, categoryById, accentClasses } from "../content/categories";
import { lessonsByCategory } from "../content/registry";
import type { CategoryId } from "../content/types";
import { NotFound } from "./NotFound";
import { cx } from "../lib/cx";

const difficultyDot: Record<string, string> = {
  Beginner: "bg-emerald-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-rose-400",
};

export function CategoryPage() {
  const { categoryId = "" } = useParams();
  const valid = categories.some((c) => c.id === categoryId);
  if (!valid) return <NotFound />;

  const category = categoryById[categoryId as CategoryId];
  const accent = accentClasses[category.accent];
  const lessons = lessonsByCategory(categoryId as CategoryId);

  return (
    <div className="animate-fade-in-up">
      <header className="mb-8">
        <div className="text-4xl">{category.icon}</div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {category.title}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
          {category.blurb}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            to={`/topic/${lesson.slug}`}
            className={cx(
              "focus-ring group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
              "hover:border-transparent hover:ring-2",
              accent.ring
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                {lesson.title}
              </h3>
              <span
                className={cx("h-2 w-2 shrink-0 rounded-full", difficultyDot[lesson.difficulty])}
                title={lesson.difficulty}
              />
            </div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {lesson.tagline}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
