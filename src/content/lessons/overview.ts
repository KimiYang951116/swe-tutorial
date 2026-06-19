import type { Lesson } from "../types";

export const overview: Lesson[] = [
  {
    slug: "what-is-software-engineering",
    title: "What Is Software Engineering?",
    category: "overview",
    tagline: "The disciplined development, operation, and maintenance of software.",
    difficulty: "Beginner",
    intro:
      "Software engineering is the disciplined development, operation, and maintenance of software. It is far more than coding: it is the whole practice of building software that is useful to real people and that stays cheap to change as the world around it changes.",
    body: [
      { type: "heading", text: "The useful mindset" },
      {
        type: "list",
        items: [
          "Build useful software for **real users**.",
          "**Expect change** — in requirements, design, code, and team context.",
          "Use **process and tools** to manage complexity.",
          "Prefer **working software**, feedback, and incremental improvement.",
          "Keep software **understandable** so future changes are cheaper.",
        ],
      },
      { type: "heading", text: "Software engineering is not only coding" },
      {
        type: "paragraph",
        text: "Writing code is one activity among many. A software engineer also spends time on the work that surrounds the code and makes it valuable and maintainable.",
      },
      {
        type: "list",
        items: [
          "Requirements gathering and specification",
          "Software design and architecture",
          "Implementation and refactoring",
          "Documentation",
          "Testing and quality assurance",
          "Version control and collaboration",
          "Project planning and delivery",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "The recurring theme: change",
        text: "Almost every principle, pattern, and practice in software engineering exists to make change safer and cheaper. Code is read and modified far more than it is written.",
      },
    ],
    keyPoints: [
      "Software engineering = disciplined build + operate + maintain.",
      "Expect change; optimize for understandability and cheap modification.",
      "Coding is one part of a much larger discipline.",
    ],
    related: ["kiss", "separation-of-concerns", "agile-models", "clean-code"],
  },
  {
    slug: "review-checklist",
    title: "The Unified Review Checklist",
    category: "overview",
    tagline: "A capstone checklist for reviewing any design or change.",
    difficulty: "Beginner",
    intro:
      "This checklist pulls the whole curriculum together into questions you can ask when reviewing code or a design. Use it as a final pass — most items link to the lesson that explains them in depth.",
    body: [
      { type: "heading", text: "Requirements" },
      {
        type: "list",
        items: [
          "Are the requirements clear and testable?",
          "Are non-functional requirements captured?",
          "Are requirements prioritized?",
          "Are user stories tied to real user value?",
        ],
      },
      { type: "heading", text: "Design" },
      {
        type: "list",
        items: [
          "Are responsibilities separated?",
          "Is the architecture understandable?",
          "Are dependencies flowing in a clean direction?",
          "Are abstractions useful rather than decorative?",
          "Are design patterns solving real recurring problems?",
        ],
      },
      { type: "heading", text: "Code quality" },
      {
        type: "list",
        items: [
          "Are names clear?",
          "Are methods short and focused?",
          "Is nesting controlled?",
          "Are magic literals removed?",
          "Is duplication avoided without forcing false abstraction?",
          "Do comments explain why, not repeat how?",
        ],
      },
      { type: "heading", text: "Testing" },
      {
        type: "list",
        items: [
          "Are important equivalence partitions covered?",
          "Are boundary values tested?",
          "Are unit tests isolated?",
          "Are integration points tested?",
          "Are regression tests automated?",
          "Is high-risk behavior tested more deeply?",
        ],
      },
      { type: "heading", text: "Maintainability" },
      {
        type: "list",
        items: [
          "Can this change be localized?",
          "Can this component be tested in isolation?",
          "Can this component be reused?",
          "Can a new developer understand the design from code and docs?",
        ],
      },
      { type: "heading", text: "Collaboration" },
      {
        type: "list",
        items: [
          "Are changes small enough to review?",
          "Is version-control history meaningful?",
          "Are pull requests focused?",
          "Do reviews check behavior, design, tests, and readability?",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Use it as a final pass",
        text: "You won't apply every item to every change — but running down the relevant sections catches the issues that matter most before they ship.",
      },
    ],
    keyPoints: [
      "A single checklist spanning requirements → collaboration.",
      "Run the relevant sections as a final review pass.",
      "Each area links back to its detailed lesson.",
    ],
    related: ["code-review", "clean-code", "test-case-design", "coupling-cohesion"],
  },
];
