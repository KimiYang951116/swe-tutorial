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
];
