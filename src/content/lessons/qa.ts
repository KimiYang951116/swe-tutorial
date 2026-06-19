import type { Lesson } from "../types";

export const qa: Lesson[] = [
  {
    slug: "quality-assurance",
    title: "Quality Assurance",
    category: "qa",
    tagline: "Ensuring software has the required level of quality.",
    difficulty: "Beginner",
    intro:
      "Quality Assurance (QA) is the process of ensuring that software has the required level of quality. It is broader than testing — it includes testing, static analysis, code reviews, and (for critical systems) formal verification.",
    body: [
      { type: "heading", text: "Validation vs verification" },
      {
        type: "table",
        headers: ["", "Validation", "Verification"],
        rows: [
          ["Question", "Are we building the **right** system?", "Are we building the system **right**?"],
          ["Checks", "Requirements match user needs", "Implementation satisfies the requirements"],
        ],
      },
      { type: "heading", text: "QA activities" },
      {
        type: "list",
        items: [
          "Testing",
          "Static analysis",
          "Code reviews",
          "Formal verification (in critical systems)",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "You can build the wrong thing correctly",
        text: "Verification alone isn't enough — a perfectly implemented feature nobody needs still fails validation. Do both.",
      },
    ],
    keyPoints: [
      "QA = ensuring required quality, broader than testing.",
      "Validation: right system? Verification: system right?",
      "Combines testing, static analysis, reviews, and more.",
    ],
    related: ["static-analysis", "code-review", "testing-intro"],
  },
  {
    slug: "static-analysis",
    title: "Static Analysis",
    category: "qa",
    tagline: "Check code for problems without running it.",
    difficulty: "Beginner",
    intro:
      "Static analysis examines code without executing it. Linters, type checkers, and analyzers catch whole classes of problems early — before the code even runs.",
    body: [
      { type: "heading", text: "What it can detect" },
      {
        type: "list",
        items: [
          "Style violations",
          "Unused variables",
          "Possible null errors",
          "Possible memory leaks",
          "Suspicious code patterns",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Cheapest feedback loop",
        text: "Static analysis runs in milliseconds in your editor and in CI. It's the cheapest place to catch a bug — earlier even than a unit test.",
      },
    ],
    keyPoints: [
      "Analyzes code without running it.",
      "Catches style issues, unused vars, null/leak risks, bad patterns.",
      "The earliest, cheapest feedback in the QA toolkit.",
    ],
    related: ["coding-standards", "code-review", "continuous-integration"],
  },
  {
    slug: "code-review",
    title: "Code Review",
    category: "qa",
    tagline: "Humans systematically examining code.",
    difficulty: "Beginner",
    intro:
      "Code review is the systematic examination of code by humans. Where automated tools catch mechanical issues, reviewers catch the things only people can: unclear design, missing tests, and risky changes.",
    body: [
      { type: "heading", text: "Helps find" },
      {
        type: "list",
        items: [
          "Bugs",
          "Missing tests",
          "Bad design",
          "Code quality problems",
          "Inconsistent style",
          "Risky changes",
        ],
      },
      { type: "heading", text: "Review methods" },
      {
        type: "list",
        items: [
          "Pull request review",
          "Pair programming",
          "Formal inspection",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Reviews spread knowledge too",
        text: "Beyond catching defects, reviews share context across the team — fewer single points of failure, more shared ownership.",
      },
    ],
    keyPoints: [
      "Humans reviewing code catch what tools can't.",
      "Finds bugs, missing tests, design and quality issues.",
      "Methods: pull requests, pair programming, formal inspection.",
    ],
    related: ["static-analysis", "quality-assurance", "revision-control"],
  },
];
