import { Link, useParams } from "react-router-dom";
import { getLesson, adjacentLessons } from "../content/registry";
import { LessonTemplate } from "../components/LessonTemplate";
import { NotFound } from "./NotFound";
import { cx } from "../lib/cx";

export function TopicPage() {
  const { slug = "" } = useParams();
  const lesson = getLesson(slug);

  if (!lesson) return <NotFound />;

  const { prev, next } = adjacentLessons(slug);

  return (
    <>
      <LessonTemplate lesson={lesson} />

      <nav className="mt-14 grid gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/topic/${prev.slug}`}
            className="focus-ring group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-500/50"
          >
            <span className="text-xs text-slate-400">← Previous</span>
            <span className="mt-1 block font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/topic/${next.slug}`}
            className={cx(
              "focus-ring group rounded-xl border border-slate-200 p-4 text-right transition hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-500/50"
            )}
          >
            <span className="text-xs text-slate-400">Next →</span>
            <span className="mt-1 block font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </>
  );
}
