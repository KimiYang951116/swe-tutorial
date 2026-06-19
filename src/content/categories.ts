import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "principles",
    title: "Core Principles",
    blurb:
      "The foundational rules of thumb — DRY, KISS, YAGNI, coupling & cohesion, and more — that keep code maintainable.",
    icon: "🧭",
    accent: "indigo",
  },
  {
    id: "solid",
    title: "SOLID Principles",
    blurb:
      "Five object-oriented design principles for building flexible, decoupled, and testable systems.",
    icon: "🧱",
    accent: "violet",
  },
  {
    id: "creational",
    title: "Creational Patterns",
    blurb:
      "Gang of Four patterns concerned with how objects are created, decoupling construction from use.",
    icon: "🏗️",
    accent: "sky",
  },
  {
    id: "structural",
    title: "Structural Patterns",
    blurb:
      "Patterns for composing classes and objects into larger structures while keeping them flexible.",
    icon: "🧩",
    accent: "emerald",
  },
  {
    id: "behavioral",
    title: "Behavioral Patterns",
    blurb:
      "Patterns that define how objects communicate and distribute responsibility at runtime.",
    icon: "🔁",
    accent: "amber",
  },
  {
    id: "architecture",
    title: "Architectural Patterns",
    blurb:
      "High-level patterns for structuring whole applications — MVC, layers, microservices, and more.",
    icon: "🏛️",
    accent: "rose",
  },
  {
    id: "practices",
    title: "Quality & Practices",
    blurb:
      "Cross-cutting craft: clean code, refactoring code smells, and testing your way to confidence.",
    icon: "✨",
    accent: "teal",
  },
];

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c])
) as Record<Category["id"], Category>;

/** Tailwind classes per accent — declared statically so the JIT compiler keeps them. */
export const accentClasses: Record<
  Category["accent"],
  {
    text: string;
    bg: string;
    bgSoft: string;
    border: string;
    ring: string;
    gradient: string;
  }
> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-500/30",
    ring: "ring-indigo-500",
    gradient: "from-indigo-500 to-violet-500",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-600",
    bgSoft: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-500/30",
    ring: "ring-violet-500",
    gradient: "from-violet-500 to-purple-500",
  },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-600",
    bgSoft: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-200 dark:border-sky-500/30",
    ring: "ring-sky-500",
    gradient: "from-sky-500 to-cyan-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/30",
    ring: "ring-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-600",
    bgSoft: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
    ring: "ring-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/30",
    ring: "ring-rose-500",
    gradient: "from-rose-500 to-pink-500",
  },
  teal: {
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-600",
    bgSoft: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-200 dark:border-teal-500/30",
    ring: "ring-teal-500",
    gradient: "from-teal-500 to-emerald-500",
  },
};
