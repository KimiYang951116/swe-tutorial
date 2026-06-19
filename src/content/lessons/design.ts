import type { Lesson } from "../types";

export const design: Lesson[] = [
  {
    slug: "software-design",
    title: "Software Design: External & Internal",
    category: "design",
    tagline: "Deciding how the system should be structured to satisfy requirements.",
    difficulty: "Beginner",
    intro:
      "Software design is the activity of deciding how the system should be structured to satisfy its requirements. It has two faces: external design (what users see and experience) and internal design (how the software is organized inside).",
    body: [
      {
        type: "table",
        headers: ["External design", "Internal design"],
        rows: [
          ["Features", "Components"],
          ["User-interface behavior", "Classes"],
          ["User workflows", "Data models"],
          ["Error messages", "APIs"],
          ["", "Storage format"],
          ["", "Error handling"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Both matter",
        text: "External design shapes the user's experience; internal design shapes the team's ability to change the system. A great product needs both.",
      },
    ],
    keyPoints: [
      "Design = how to structure the system to meet requirements.",
      "External design = what users see; internal design = how it's built.",
      "Both the user experience and the internal structure need deliberate design.",
    ],
    related: ["modeling", "domain-model", "layered-architecture"],
  },
  {
    slug: "modeling",
    title: "Modeling",
    category: "design",
    tagline: "Build simplified representations to think, communicate, and document.",
    difficulty: "Beginner",
    intro:
      "Modeling means creating simplified representations of a system. A model deliberately leaves out detail so you can reason about one aspect at a time — structure, behavior, or data.",
    body: [
      { type: "heading", text: "Why model" },
      {
        type: "list",
        items: [
          "Think through a design before coding",
          "Communicate structure and behavior to others",
          "Document important decisions",
          "Find gaps or contradictions early",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Models are tools, not deliverables",
        text: "A model is useful when it helps you think or communicate. Don't model for its own sake — model the parts that are risky or unclear.",
      },
    ],
    keyPoints: [
      "A model is a simplified representation of the system.",
      "Use models to think, communicate, document, and find gaps.",
      "Model the risky/unclear parts; don't model everything.",
    ],
    related: ["domain-model", "software-design", "multi-level-design"],
  },
  {
    slug: "domain-model",
    title: "Domain Model",
    category: "design",
    tagline: "Represent real-world concepts of the problem, not technical details.",
    difficulty: "Intermediate",
    intro:
      "A domain model represents the real-world concepts in the problem domain and the relationships between them. It focuses on domain entities — not databases, HTTP, or screens.",
    body: [
      {
        type: "table",
        headers: ["Belongs in a domain model", "Usually does NOT belong"],
        rows: [
          ["User", "Database client"],
          ["Place", "HTTP request"],
          ["Pin", "JSON parser"],
          ["Review", "Screen widget"],
          ["Friendship", ""],
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Speak the domain's language",
        text: "A domain model captures how stakeholders think about the problem. Keep technical mechanisms out of it — they belong in the implementation, not the model of the problem.",
      },
    ],
    keyPoints: [
      "Models real-world domain concepts and their relationships.",
      "Excludes technical details (DB, HTTP, JSON, widgets).",
      "Uses the stakeholders' vocabulary (see Glossary).",
    ],
    related: ["modeling", "associations", "supplementary-glossary"],
  },
  {
    slug: "multi-level-design",
    title: "Multi-Level Design: Top-Down & Bottom-Up",
    category: "design",
    tagline: "Describe a system at several levels, working broad-to-narrow or the reverse.",
    difficulty: "Intermediate",
    intro:
      "Large systems should be described at multiple levels — architecture, component, class, and method. You can work down from the big picture (top-down) or up from existing pieces (bottom-up); most real design mixes both.",
    body: [
      { type: "heading", text: "Levels of design" },
      {
        type: "list",
        ordered: true,
        items: [
          "System architecture",
          "Component design",
          "Class design",
          "Method-level logic",
        ],
      },
      { type: "heading", text: "Top-down vs bottom-up" },
      {
        type: "table",
        headers: ["Approach", "Starts from", "Good when"],
        rows: [
          [
            "Top-down",
            "High-level structure first",
            "The system is large; the architecture must be stable; many people need a shared direction",
          ],
          [
            "Bottom-up",
            "Low-level components first",
            "Reusing existing components; extending a system; prototyping from known building blocks",
          ],
        ],
      },
    ],
    keyPoints: [
      "Describe big systems at multiple levels (architecture → method).",
      "Top-down: structure first, details later.",
      "Bottom-up: assemble from existing/known components.",
    ],
    related: ["software-design", "agile-design", "layered-architecture"],
  },
  {
    slug: "agile-design",
    title: "Agile Design",
    category: "design",
    tagline: "Design enough to proceed, then let it evolve intentionally.",
    difficulty: "Intermediate",
    intro:
      "Agile design avoids excessive upfront detail. It starts with just enough architecture and modeling to proceed, then evolves the design as requirements and understanding improve — deliberately, not accidentally.",
    body: [
      {
        type: "paragraph",
        text: "The goal is emergent-but-intentional design: you don't try to foresee everything, but you also don't let the structure drift. Each iteration refactors the design to fit what you've learned.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Emergent, not accidental",
        text: "Evolving the design is healthy; letting it rot is not. Pair agile design with refactoring and tests so the structure stays clean as it grows.",
      },
    ],
    keyPoints: [
      "Start with enough design to proceed, not a complete blueprint.",
      "Evolve the design as understanding grows.",
      "Keep it intentional — lean on refactoring and tests.",
    ],
    related: ["multi-level-design", "refactoring", "agile-models", "yagni"],
  },
];
