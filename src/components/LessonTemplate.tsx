import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Lesson } from "../content/types";
import { categoryById, accentClasses } from "../content/categories";
import { getLesson } from "../content/registry";
import { ContentBlocks } from "./ContentBlocks";
import { BeforeAfter } from "./BeforeAfter";
import { Playground } from "./Playground";
import { Quiz } from "./Quiz";
import { Flashcards } from "./Flashcards";
import { Ordering } from "./Ordering";
import { RecallTakeaways } from "./RecallTakeaways";
import { LessonProgress } from "./LessonProgress";
import { ReadingProgress } from "./ReadingProgress";
import { Visualization, hasViz } from "./viz";
import { cx } from "../lib/cx";

const difficultyStyle: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Advanced: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      {children}
    </h2>
  );
}

export function LessonTemplate({ lesson }: { lesson: Lesson }) {
  const category = categoryById[lesson.category];
  const accent = accentClasses[category.accent];

  return (
    <article className="animate-fade-in-up">
      <ReadingProgress />
      {/* header */}
      <header className="mb-8">
        <Link
          to={`/category/${category.id}`}
          className={cx(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            accent.text
          )}
        >
          <span>{category.icon}</span> {category.title}
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          {lesson.tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={cx(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              difficultyStyle[lesson.difficulty]
            )}
          >
            {lesson.difficulty}
          </span>
          {lesson.also && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {lesson.also}
            </span>
          )}
        </div>
      </header>

      {/* intro */}
      <p className="border-l-4 border-indigo-400 pl-4 text-lg leading-relaxed text-slate-700 dark:border-indigo-500/50 dark:text-slate-200">
        {lesson.intro}
      </p>

      {/* visualization */}
      {hasViz(lesson.viz) && (
        <>
          <SectionLabel>See it in action</SectionLabel>
          <Visualization name={lesson.viz!} />
        </>
      )}

      {/* body */}
      {lesson.body.length > 0 && (
        <div className="mt-8">
          <ContentBlocks blocks={lesson.body} />
        </div>
      )}

      {/* before / after */}
      {lesson.beforeAfter && (
        <>
          <SectionLabel>Before → after</SectionLabel>
          <BeforeAfter spec={lesson.beforeAfter} />
        </>
      )}

      {/* playground */}
      {lesson.playground && (
        <>
          <SectionLabel>Try it yourself</SectionLabel>
          <Playground spec={lesson.playground} />
        </>
      )}

      {/* ordering exercise */}
      {lesson.ordering && (
        <>
          <SectionLabel>Put it in order</SectionLabel>
          <Ordering exercise={lesson.ordering} />
        </>
      )}

      {/* flashcards */}
      {lesson.flashcards && lesson.flashcards.length > 0 && (
        <>
          <SectionLabel>Flashcards</SectionLabel>
          <Flashcards cards={lesson.flashcards} />
        </>
      )}

      {/* quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <>
          <SectionLabel>Check yourself</SectionLabel>
          <Quiz questions={lesson.quiz} />
        </>
      )}

      {/* key points (recall-first) */}
      {lesson.keyPoints && lesson.keyPoints.length > 0 && (
        <RecallTakeaways points={lesson.keyPoints} />
      )}

      {/* mark understood + confidence */}
      <LessonProgress slug={lesson.slug} />

      {/* related */}
      {lesson.related && lesson.related.length > 0 && (
        <div className="mt-8">
          <SectionLabel>Related topics</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {lesson.related.map((slug) => {
              const rel = getLesson(slug);
              if (!rel) return null;
              return (
                <Link
                  key={slug}
                  to={`/topic/${slug}`}
                  className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                >
                  {rel.title} →
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
