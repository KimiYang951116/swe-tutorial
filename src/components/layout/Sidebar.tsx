import { NavLink } from "react-router-dom";
import { groupedCatalog, totalLessonCount } from "../../content/registry";
import { useProgress } from "../../lib/progress";
import { cx } from "../../lib/cx";

export function Sidebar({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const { isUnderstood, understoodCount } = useProgress();
  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onNavigate}
          aria-hidden
        />
      )}

      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r border-slate-200 bg-white pb-10 pt-16 transition-transform dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 lg:pt-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="px-3 py-5">
          <NavLink
            to="/"
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              cx(
                "mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )
            }
          >
            🏠 Home
          </NavLink>

          {groupedCatalog.map((group) => (
            <div key={group.id} className="mt-5">
              <NavLink
                to={`/category/${group.id}`}
                onClick={onNavigate}
                className="mb-1 flex items-center justify-between px-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span>
                  {group.icon} {group.title}
                </span>
                <span className="font-mono text-[10px] font-normal text-slate-300 dark:text-slate-600">
                  {group.lessons.length}
                </span>
              </NavLink>
              <ul className="space-y-0.5">
                {group.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <NavLink
                      to={`/topic/${lesson.slug}`}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cx(
                          "block rounded-md py-1.5 pl-5 pr-3 text-sm transition",
                          isActive
                            ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        )
                      }
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cx(
                            "shrink-0 text-[11px]",
                            isUnderstood(lesson.slug)
                              ? "text-emerald-500"
                              : "text-transparent"
                          )}
                        >
                          ✓
                        </span>
                        <span>{shortTitle(lesson.title)}</span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="mt-8 px-3 text-xs text-slate-400 dark:text-slate-600">
            {understoodCount} / {totalLessonCount} understood · {groupedCatalog.length} categories
          </p>
        </nav>
      </aside>
    </>
  );
}

/** Trim "DRY — Don't Repeat Yourself" → "DRY — Don't Repeat Yourself" but drop redundant prefixes for nav. */
function shortTitle(title: string): string {
  // Keep it readable in the narrow sidebar.
  return title.replace(/ \(.*\)$/, "");
}
