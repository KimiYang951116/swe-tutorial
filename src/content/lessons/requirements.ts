import type { Lesson } from "../types";

export const requirements: Lesson[] = [
  {
    slug: "software-requirements",
    title: "Software Requirements",
    category: "requirements",
    tagline: "A specification of a need the product must fulfill.",
    difficulty: "Beginner",
    intro:
      "A software requirement specifies a need that the product must fulfill. Requirements are the bridge between what stakeholders want and what developers build — getting them right is the cheapest place to prevent expensive mistakes.",
    body: [
      {
        type: "paragraph",
        text: "Requirements come in two broad kinds — functional (what the system does) and non-functional (the qualities and constraints under which it does it). Both matter, and both should be captured explicitly.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Cheapest place to fix mistakes",
        text: "An error caught in requirements costs far less than the same error caught in code or after release. Invest in clear, agreed requirements early.",
      },
    ],
    keyPoints: [
      "A requirement specifies a need the product must meet.",
      "Two kinds: functional and non-functional.",
      "Clarifying requirements early is the cheapest defect prevention.",
    ],
    related: ["functional-nonfunctional", "user-stories", "use-cases"],
  },
  {
    slug: "functional-nonfunctional",
    title: "Functional & Non-Functional Requirements",
    category: "requirements",
    tagline: "What the system does vs the qualities under which it operates.",
    difficulty: "Beginner",
    intro:
      "A functional requirement describes what the system should do. A non-functional requirement describes constraints or qualities under which the system operates — performance, reliability, security, and so on.",
    body: [
      { type: "heading", text: "Functional requirement" },
      {
        type: "paragraph",
        text: 'Describes a behavior or capability. Example: "The app allows a user to add a pin to the map."',
      },
      { type: "heading", text: "Non-functional requirements" },
      {
        type: "table",
        headers: ["Quality", "Example"],
        rows: [
          ["Performance", '"Search results should appear within two seconds."'],
          ["Reliability", '"Saved pins should persist after app restart."'],
          ["Security", '"Users can only access their own private data."'],
          ["Usability", '"A new user can complete onboarding without help."'],
          ["Maintainability", '"New pin types can be added without rewriting map rendering."'],
          ["Portability", '"The app runs on both Android and iOS."'],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Don't forget the non-functional ones",
        text: "Non-functional requirements are easy to overlook because no single feature represents them — yet they often decide whether users actually accept the product.",
      },
    ],
    keyPoints: [
      "Functional = what the system does.",
      "Non-functional = qualities/constraints (performance, security, usability…).",
      "Capture non-functional requirements explicitly; they're easy to miss.",
    ],
    related: ["software-requirements", "good-requirements", "supplementary-glossary"],
  },
  {
    slug: "good-requirements",
    title: "Qualities of Good Requirements",
    category: "requirements",
    tagline: "What makes individual requirements — and the whole set — good.",
    difficulty: "Intermediate",
    intro:
      "Good requirements share a set of qualities at two levels: each individual requirement should meet certain criteria, and the complete set of requirements should hold together as a whole.",
    body: [
      { type: "heading", text: "A good individual requirement is…" },
      {
        type: "list",
        items: [
          "Unambiguous",
          "Testable or verifiable",
          "Clear and concise",
          "Correct",
          "Understandable",
          "Feasible",
          "Independent",
          "Atomic — not divisible into smaller requirements",
          "Necessary",
          "Implementation-free (says what, not how)",
        ],
      },
      { type: "heading", text: "The complete requirement set should be…" },
      {
        type: "list",
        items: [
          "Consistent (no contradictions)",
          "Non-redundant",
          "Complete enough for the current stage",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Testable is the litmus test",
        text: "If you can't describe how you'd verify a requirement, it's probably ambiguous. Rewrite it until it's checkable.",
      },
    ],
    keyPoints: [
      "Individual: unambiguous, testable, atomic, necessary, implementation-free…",
      "Set: consistent, non-redundant, complete enough for now.",
      "If you can't test it, it isn't clear enough.",
    ],
    related: ["functional-nonfunctional", "requirement-prioritization"],
  },
  {
    slug: "requirement-prioritization",
    title: "Requirement Prioritization",
    category: "requirements",
    tagline: "Time, budget, and people are limited — rank what matters.",
    difficulty: "Beginner",
    intro:
      "Requirements should be prioritized because time, budget, and people are always limited. Prioritization makes sure the most valuable work happens first and the least valuable work can be dropped without drama.",
    body: [
      { type: "heading", text: "Common priority schemes" },
      {
        type: "table",
        headers: ["Scheme", "Levels"],
        rows: [
          ["MoSCoW", "Must-have · Should-have · Could-have · Will-not-have"],
          ["Value tiers", "Essential · Typical · Novel"],
          ["Simple", "High · Medium · Low"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Priorities guide scope cuts",
        text: "When the schedule tightens (and it will), an agreed prioritization tells everyone what to cut first — without re-litigating every feature.",
      },
    ],
    keyPoints: [
      "Resources are limited; prioritize to deliver value first.",
      "Schemes: MoSCoW, essential/typical/novel, high/medium/low.",
      "Priorities make scope cuts objective.",
    ],
    related: ["good-requirements", "agile-models", "scrum"],
  },
  {
    slug: "user-stories",
    title: "User Stories",
    category: "requirements",
    tagline: "Capture value from a stakeholder's point of view.",
    difficulty: "Beginner",
    intro:
      "A user story describes value from a stakeholder's point of view, in their language. It's deliberately short — a placeholder for a conversation, not a full specification.",
    body: [
      { type: "heading", text: "The standard format" },
      {
        type: "code",
        code: `As a <user type>, I want <goal>, so that <benefit>.`,
        caption: "The 'so that' clause captures the why — often the most important part.",
      },
      {
        type: "code",
        code: `As a traveler, I want to save interesting places on a map,
so that I can revisit them later.`,
      },
      {
        type: "callout",
        variant: "tip",
        title: "Focus on value, not UI",
        text: "A good user story states who, what, and why — not the buttons and screens. The design comes later.",
      },
    ],
    keyPoints: [
      "Format: As a <user>, I want <goal>, so that <benefit>.",
      "The 'so that' clause captures the value.",
      "Stories are conversation starters, not full specs.",
    ],
    related: ["use-cases", "requirement-prioritization", "agile-models"],
  },
  {
    slug: "use-cases",
    title: "Use Cases",
    category: "requirements",
    tagline: "Describe interactions between an actor and the system to reach a goal.",
    difficulty: "Intermediate",
    intro:
      "A use case describes the interactions between an actor and the system to achieve a goal. Where a user story is a brief value statement, a use case spells out the steps of the interaction, including alternatives and exceptions.",
    body: [
      { type: "heading", text: "Why write use cases" },
      {
        type: "list",
        items: [
          "Clarify behavior and step-by-step flows",
          "Find missing requirements (especially alternate/exception paths)",
          "Design system tests from the flows",
          "Communicate user flows to stakeholders",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Avoid UI detail",
        text: "Keep unnecessary user-interface details out of use cases unless the UI itself is the requirement. Describe intent and interaction, not pixels.",
      },
    ],
    keyPoints: [
      "A use case = actor + system interaction toward a goal.",
      "Great for finding alternate/exception flows and designing system tests.",
      "Avoid UI specifics unless the UI is the requirement.",
    ],
    related: ["user-stories", "system-testing", "software-requirements"],
  },
  {
    slug: "supplementary-glossary",
    title: "Supplementary Requirements & Glossary",
    category: "requirements",
    tagline: "Capture the leftovers and pin down a shared vocabulary.",
    difficulty: "Beginner",
    intro:
      "Not everything fits neatly into user stories or use cases. Supplementary requirements capture the rest — especially non-functional requirements — and a glossary makes sure everyone uses the same words to mean the same things.",
    body: [
      { type: "heading", text: "Supplementary requirements" },
      {
        type: "paragraph",
        text: "These hold requirements that don't fit cleanly into user stories or use cases: non-functional requirements, constraints, standards to comply with, and cross-cutting rules.",
      },
      { type: "heading", text: "Glossary" },
      {
        type: "paragraph",
        text: "A glossary defines important domain terms so stakeholders and developers share one vocabulary. It prevents the subtle, expensive miscommunication that comes from the same word meaning different things to different people.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "One word, one meaning",
        text: "Agreeing terms early (what exactly is a 'pin', a 'place', a 'review'?) removes a whole class of misunderstandings.",
      },
    ],
    keyPoints: [
      "Supplementary requirements catch what stories/use cases miss (often NFRs).",
      "A glossary gives everyone a shared, precise vocabulary.",
      "Shared terms prevent costly miscommunication.",
    ],
    related: ["functional-nonfunctional", "use-cases", "domain-model"],
  },
];
