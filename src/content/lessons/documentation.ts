import type { Lesson } from "../types";

export const documentation: Lesson[] = [
  {
    slug: "documentation-overview",
    title: "Documentation",
    category: "documentation",
    tagline: "Help the reader do a job — written top-down.",
    difficulty: "Beginner",
    intro:
      "Documentation should help the reader do a job. Different readers have different jobs, so it helps to think about who the documentation is for and write it top-down — big picture first, details only when needed.",
    body: [
      { type: "heading", text: "Two audiences" },
      {
        type: "table",
        headers: ["Developer-as-user docs", "Developer-as-maintainer docs"],
        rows: [
          ["API reference", "Architecture overview"],
          ["Tutorials", "Design rationale"],
          ["How-to guides", "Component interaction diagrams"],
          ["", "Testing strategy"],
        ],
      },
      { type: "heading", text: "Guidelines" },
      {
        type: "list",
        items: [
          "Write top-down — start with the big picture, drill into details only when needed.",
          "Use diagrams for structure and interactions.",
          "Keep documentation close to the code when possible.",
          "Use text-based formats (Markdown, PlantUML) when version control matters.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Docs that live with the code stay alive",
        text: "Documentation kept next to the code (and in version control) is far more likely to be updated than a separate document nobody opens.",
      },
    ],
    keyPoints: [
      "Documentation helps a specific reader do a job.",
      "Serve both users (API, tutorials) and maintainers (architecture, rationale).",
      "Write top-down; keep docs near the code and in version control.",
    ],
    related: ["documentation-modes", "comments", "modeling"],
  },
  {
    slug: "documentation-modes",
    title: "The Four Documentation Modes",
    category: "documentation",
    tagline: "Tutorial, how-to, explanation, reference — each serves a different need.",
    difficulty: "Beginner",
    intro:
      "Useful documentation can be split into four modes, each oriented toward a different reader need. Mixing them in one document usually serves none of them well.",
    body: [
      {
        type: "table",
        headers: ["Mode", "Orientation", "Answers"],
        rows: [
          ["Tutorial", "Learning-oriented", "How do I get started, guided step by step?"],
          ["How-to guide", "Task-oriented", "How do I accomplish this specific task?"],
          ["Explanation", "Understanding-oriented", "Why does it work this way?"],
          ["Reference", "Information-oriented", "What exactly are the details/options?"],
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Don't blend the modes",
        text: "A reference cluttered with tutorials, or a tutorial padded with reference detail, frustrates everyone. Keep each piece in its mode.",
      },
    ],
    keyPoints: [
      "Tutorial (learn), How-to (do a task), Explanation (understand), Reference (look up).",
      "Each mode targets a distinct reader need.",
      "Keep the modes separate for clarity.",
    ],
    related: ["documentation-overview", "comments"],
  },
];
