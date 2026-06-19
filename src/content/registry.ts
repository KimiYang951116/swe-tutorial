import type { CategoryId, Lesson } from "./types";
import { categories, categoryById } from "./categories";
import { overview } from "./lessons/overview";
import { oop } from "./lessons/oop";
import { requirements } from "./lessons/requirements";
import { design } from "./lessons/design";
import { principles } from "./lessons/principles";
import { solid } from "./lessons/solid";
import { creational } from "./lessons/creational";
import { structural } from "./lessons/structural";
import { behavioral } from "./lessons/behavioral";
import { architecture } from "./lessons/architecture";
import { quality } from "./lessons/quality";
import { errors } from "./lessons/errors";
import { qa } from "./lessons/qa";
import { testing } from "./lessons/testing";
import { testdesign } from "./lessons/testdesign";
import { integration } from "./lessons/integration";
import { documentation } from "./lessons/documentation";
import { process } from "./lessons/process";
import { collaboration } from "./lessons/collaboration";
import { interactiveBySlug } from "./quizzes";

const rawLessons: Lesson[] = [
  ...overview,
  ...oop,
  ...requirements,
  ...design,
  ...principles,
  ...solid,
  ...creational,
  ...structural,
  ...behavioral,
  ...architecture,
  ...quality,
  ...errors,
  ...qa,
  ...testing,
  ...testdesign,
  ...integration,
  ...documentation,
  ...process,
  ...collaboration,
];

// Merge in quiz / flashcard / ordering content (kept in a separate file so any
// lesson can gain interactive practice without editing its source file).
export const allLessons: Lesson[] = rawLessons.map((lesson) => {
  const extra = interactiveBySlug[lesson.slug];
  return extra ? { ...lesson, ...extra } : lesson;
});

const lessonBySlug = new Map(allLessons.map((l) => [l.slug, l]));

export function getLesson(slug: string): Lesson | undefined {
  return lessonBySlug.get(slug);
}

export function lessonsByCategory(category: CategoryId): Lesson[] {
  return allLessons.filter((l) => l.category === category);
}

/** Ordered, grouped structure used by the sidebar and category pages. */
export interface CategoryGroup {
  id: CategoryId;
  title: string;
  icon: string;
  lessons: Lesson[];
}

export const groupedCatalog: CategoryGroup[] = categories.map((c) => ({
  id: c.id,
  title: c.title,
  icon: c.icon,
  lessons: lessonsByCategory(c.id),
}));

/** Flat, ordered list of slugs matching sidebar order — drives prev/next. */
export const orderedSlugs: string[] = groupedCatalog.flatMap((g) =>
  g.lessons.map((l) => l.slug)
);

export function adjacentLessons(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const idx = orderedSlugs.indexOf(slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? getLesson(orderedSlugs[idx - 1]) : undefined,
    next:
      idx < orderedSlugs.length - 1
        ? getLesson(orderedSlugs[idx + 1])
        : undefined,
  };
}

export interface SearchHit {
  lesson: Lesson;
  score: number;
}

/** Lightweight fuzzy-ish search over titles, taglines, and aka text. */
export function searchLessons(query: string): Lesson[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const hits: SearchHit[] = [];

  for (const lesson of allLessons) {
    const haystack = [
      lesson.title,
      lesson.tagline,
      lesson.also ?? "",
      categoryById[lesson.category].title,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) {
        score = -1;
        break;
      }
      if (lesson.title.toLowerCase().includes(term)) score += 3;
      else score += 1;
      if (lesson.title.toLowerCase().startsWith(term)) score += 2;
    }
    if (score > 0) hits.push({ lesson, score });
  }

  return hits.sort((a, b) => b.score - a.score).map((h) => h.lesson);
}

export const totalLessonCount = allLessons.length;
