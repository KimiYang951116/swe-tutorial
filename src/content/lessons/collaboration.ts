import type { Lesson } from "../types";

export const collaboration: Lesson[] = [
  {
    slug: "revision-control",
    title: "Revision Control",
    category: "collaboration",
    tagline: "Track changes over time — what changed, who, when, and why.",
    difficulty: "Beginner",
    intro:
      "Revision control tracks changes over time. For every change it records what changed, who changed it, when, and (through commit messages) why — giving you history, collaboration, and a safety net.",
    body: [
      { type: "heading", text: "What it records" },
      {
        type: "list",
        items: ["What changed", "Who changed it", "When it changed", "Why it changed"],
      },
      { type: "heading", text: "Benefits" },
      {
        type: "list",
        items: [
          "History you can browse and revert to",
          "Collaboration without overwriting each other",
          "Recovery from mistakes",
          "Branching and merging",
          "Conflict resolution",
        ],
      },
    ],
    keyPoints: [
      "Records what/who/when/why for every change.",
      "Enables history, collaboration, recovery, branching.",
      "The backbone of modern team development.",
    ],
    related: ["git", "code-review", "continuous-integration"],
  },
  {
    slug: "git",
    title: "Git",
    category: "collaboration",
    tagline: "A distributed revision control system — branches, merges, and pull requests.",
    difficulty: "Beginner",
    intro:
      "Git is a distributed revision control system. Every developer has a full copy of the history, and work happens on branches that are later merged — often via pull requests that allow review before integration.",
    body: [
      { type: "heading", text: "Core concepts" },
      {
        type: "table",
        headers: ["Concept", "Meaning"],
        rows: [
          ["Repository", "Stores the project history"],
          ["Working directory", "Your current files"],
          ["Commit", "A snapshot of changes"],
          ["Branch", "An independent line of development"],
          ["Merge", "Combine branches together"],
          ["Conflict", "Incompatible changes needing human resolution"],
          ["Pull request", "A proposed change, reviewed before merge"],
        ],
      },
      {
        type: "paragraph",
        text: "Branch off main, commit your work, open a pull request for review, then merge back. Watch a feature branch diverge and merge in the visualization.",
      },
    ],
    viz: "git-branches",
    keyPoints: [
      "Git is distributed — everyone has full history.",
      "Branch → commit → pull request → merge.",
      "Pull requests enable review before integration.",
    ],
    related: ["revision-control", "code-review", "continuous-integration"],
  },
  {
    slug: "project-planning",
    title: "Project Planning",
    category: "collaboration",
    tagline: "Estimate, schedule, track — and update as you learn.",
    difficulty: "Beginner",
    intro:
      "Project planning turns a goal into an achievable sequence of work. Good plans are living documents — they're updated as new information appears, not written once and ignored.",
    body: [
      { type: "heading", text: "Planning includes" },
      {
        type: "list",
        items: [
          "Estimating effort",
          "Scheduling tasks",
          "Identifying milestones",
          "Managing risks",
          "Tracking progress",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Plans are updated, not sacred",
        text: "Reality always differs from the plan. The value is in re-planning as you learn — a stale plan is worse than none.",
      },
    ],
    keyPoints: [
      "Estimate, schedule, set milestones, manage risk, track progress.",
      "Plans are living documents — update them as you learn.",
      "Re-planning beats clinging to an outdated plan.",
    ],
    related: ["requirement-prioritization", "scrum", "team-structures"],
  },
  {
    slug: "team-structures",
    title: "Team Structures",
    category: "collaboration",
    tagline: "How a team organizes ownership and decision-making.",
    difficulty: "Beginner",
    intro:
      "Teams can be organized in different ways. The best structure depends on project size, complexity, team experience, and the cost of communication.",
    body: [
      {
        type: "table",
        headers: ["Structure", "Characteristics"],
        rows: [
          ["Democratic / egoless", "Shared ownership and collective decisions"],
          ["Chief programmer", "A strong technical lead coordinates the work"],
          ["Strict hierarchy", "Clear reporting lines and task ownership"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "No single best structure",
        text: "Small experienced teams often thrive with egoless collaboration; large or junior teams may need more coordination. Match the structure to the context.",
      },
    ],
    keyPoints: [
      "Common structures: egoless, chief-programmer, strict hierarchy.",
      "The right one depends on size, complexity, and experience.",
      "Communication cost shapes the choice.",
    ],
    related: ["project-planning", "code-review", "scrum"],
  },
];
