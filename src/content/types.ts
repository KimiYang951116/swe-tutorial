export type CategoryId =
  | "overview"
  | "oop"
  | "requirements"
  | "design"
  | "architecture"
  | "principles"
  | "solid"
  | "creational"
  | "structural"
  | "behavioral"
  | "quality"
  | "errors"
  | "qa"
  | "testing"
  | "testdesign"
  | "integration"
  | "documentation"
  | "process"
  | "collaboration";

export interface Category {
  id: CategoryId;
  title: string;
  /** Short description shown on cards and category pages. */
  blurb: string;
  /** Emoji glyph used as a lightweight icon. */
  icon: string;
  /** Tailwind color family used for accents, e.g. "indigo". */
  accent: AccentColor;
}

export type AccentColor =
  | "indigo"
  | "violet"
  | "sky"
  | "emerald"
  | "amber"
  | "rose"
  | "teal";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/** Rich content blocks rendered in lesson bodies. */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "callout";
      variant: "tip" | "warning" | "info" | "key";
      title?: string;
      text: string;
    }
  | { type: "code"; code: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string };

export interface BeforeAfter {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Bullet reasons explaining why the "after" version is better. */
  notes?: string[];
}

export interface PlaygroundSpec {
  code: string;
  caption?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explanation?: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface OrderingExercise {
  prompt: string;
  /** Items in their CORRECT order; the UI shuffles them for the learner. */
  items: string[];
}

export interface Lesson {
  slug: string;
  title: string;
  category: CategoryId;
  /** One-line hook shown under the title and in lists. */
  tagline: string;
  difficulty: Difficulty;
  /** Optional "also known as" / expanded acronym. */
  also?: string;
  /** Lead paragraph. */
  intro: string;
  /** Main explanatory content. */
  body: Block[];
  /** Key of a bespoke animated visualization (see components/viz). */
  viz?: string;
  beforeAfter?: BeforeAfter;
  playground?: PlaygroundSpec;
  /** Multiple-choice self-check questions. */
  quiz?: QuizQuestion[];
  /** Flip cards for term/definition recall. */
  flashcards?: Flashcard[];
  /** A drag-to-order / sequencing exercise. */
  ordering?: OrderingExercise;
  /** Quick takeaways shown at the end. */
  keyPoints?: string[];
  /** Related lesson slugs. */
  related?: string[];
}
