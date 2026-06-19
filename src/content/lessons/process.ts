import type { Lesson } from "../types";

export const process: Lesson[] = [
  {
    slug: "sdlc",
    title: "Software Development Life Cycle",
    category: "process",
    tagline: "The stages software passes through, and the models that order them.",
    difficulty: "Beginner",
    also: "SDLC",
    intro:
      "The Software Development Life Cycle (SDLC) describes the stages software passes through — requirements, analysis, design, implementation, testing, and deployment. Process models differ mainly in how they order and repeat these stages.",
    body: [
      {
        type: "list",
        items: [
          "Requirements",
          "Analysis",
          "Design",
          "Implementation",
          "Testing",
          "Deployment",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Models reorder the same stages",
        text: "Waterfall runs the stages once in sequence; iterative and agile models repeat them in cycles. The stages are similar — the rhythm differs.",
      },
    ],
    keyPoints: [
      "SDLC = the stages from requirements to deployment.",
      "Process models differ in how they order/repeat those stages.",
      "Choose a model to fit the project's uncertainty and change.",
    ],
    related: ["waterfall", "iterative-incremental", "agile-models"],
  },
  {
    slug: "waterfall",
    title: "Waterfall Model",
    category: "process",
    tagline: "Sequential stages — finish one before the next begins.",
    difficulty: "Beginner",
    intro:
      "The waterfall model is sequential: each stage is completed before the next begins. It works best when requirements are stable and the problem is well understood.",
    body: [
      { type: "heading", text: "Works best when" },
      {
        type: "list",
        items: [
          "Requirements are stable",
          "The problem is well understood",
          "Change is unlikely",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The main weakness: change",
        text: "Real-world requirements usually change. Because waterfall commits to each stage before moving on, late changes are expensive and disruptive.",
      },
    ],
    keyPoints: [
      "Sequential: complete each stage before the next.",
      "Good when requirements are stable and well understood.",
      "Weak when requirements change — which they usually do.",
    ],
    related: ["iterative-incremental", "agile-models", "sdlc"],
  },
  {
    slug: "iterative-incremental",
    title: "Iterative & Incremental Development",
    category: "process",
    tagline: "Deliver in repeated cycles; learn and adjust each time.",
    difficulty: "Intermediate",
    intro:
      "Iterative and incremental development delivers the product in repeated cycles. Each iteration can include requirements refinement, design, implementation, testing, and feedback — so working software appears early and improves over time.",
    body: [
      { type: "heading", text: "Benefits" },
      {
        type: "list",
        items: [
          "Working software appears earlier",
          "Feedback improves later iterations",
          "Risk is discovered sooner",
        ],
      },
      { type: "heading", text: "Breadth-first vs depth-first" },
      {
        type: "table",
        headers: ["", "Breadth-first", "Depth-first"],
        rows: [
          ["Evolves", "Many major components together", "Specific components fully"],
          ["Example", "One full feature across UI, logic, and storage", "Backend support before the UI is ready"],
        ],
      },
    ],
    keyPoints: [
      "Deliver in repeated cycles, refining each time.",
      "Early working software + feedback + earlier risk discovery.",
      "Breadth-first grows many parts; depth-first fleshes out specific parts.",
    ],
    related: ["waterfall", "agile-models", "walking-skeleton"],
  },
  {
    slug: "agile-models",
    title: "Agile Models",
    category: "process",
    tagline: "Value working software, collaboration, and responding to change.",
    difficulty: "Intermediate",
    intro:
      "Agile models emphasize individuals and interactions, working software, customer collaboration, and responding to change. Development proceeds through prioritized requirements, evolving design, and frequent feedback.",
    body: [
      { type: "heading", text: "Agile development usually uses" },
      {
        type: "list",
        items: [
          "Prioritized requirements",
          "Evolving design",
          "Frequent feedback",
          "Transparency",
          "Shared team responsibility",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Agile is a family, not a single method",
        text: "Scrum, Extreme Programming, and others are all agile. They share values but differ in specific practices.",
      },
    ],
    keyPoints: [
      "Value working software, collaboration, and responding to change.",
      "Prioritized requirements + evolving design + frequent feedback.",
      "Scrum and XP are specific agile methods.",
    ],
    related: ["extreme-programming", "scrum", "agile-design", "iterative-incremental"],
  },
  {
    slug: "extreme-programming",
    title: "Extreme Programming (XP)",
    category: "process",
    tagline: "Communication, simplicity, feedback, respect, courage.",
    difficulty: "Intermediate",
    also: "XP",
    intro:
      "Extreme Programming (XP) is an agile method emphasizing five values — communication, simplicity, feedback, respect, and courage — supported by a set of disciplined engineering practices.",
    body: [
      { type: "heading", text: "Common practices" },
      {
        type: "list",
        items: [
          "Pair programming",
          "Test-first development",
          "Continuous integration",
          "Simple design",
          "Frequent releases",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Engineering-focused agile",
        text: "Where Scrum focuses on project management, XP focuses on the technical practices that keep code healthy enough to change frequently.",
      },
    ],
    keyPoints: [
      "Values: communication, simplicity, feedback, respect, courage.",
      "Practices: pairing, test-first, CI, simple design, frequent releases.",
      "XP emphasizes engineering discipline.",
    ],
    related: ["agile-models", "scrum", "testing-tdd", "continuous-integration"],
  },
  {
    slug: "scrum",
    title: "Scrum",
    category: "process",
    tagline: "Fixed-length sprints with clear roles, artifacts, and events.",
    difficulty: "Intermediate",
    intro:
      "Scrum organizes work into fixed-length iterations called sprints. It defines a small set of roles, artifacts, and events that give the team a predictable rhythm and regular opportunities to inspect and adapt.",
    body: [
      { type: "heading", text: "Roles" },
      {
        type: "table",
        headers: ["Role", "Responsibility"],
        rows: [
          ["Product Owner", "Represents stakeholders; prioritizes the work"],
          ["Scrum Master", "Supports the process; removes obstacles"],
          ["Development Team", "Builds the product"],
        ],
      },
      { type: "heading", text: "Artifacts & events" },
      {
        type: "list",
        items: [
          "Artifacts: product backlog, sprint backlog, product increment",
          "Events: sprint planning, daily scrum, sprint review, sprint retrospective",
        ],
      },
    ],
    keyPoints: [
      "Work happens in fixed-length sprints.",
      "Roles: Product Owner, Scrum Master, Development Team.",
      "Artifacts (backlogs, increment) + events (planning, daily, review, retro).",
    ],
    related: ["agile-models", "extreme-programming", "requirement-prioritization"],
  },
];
