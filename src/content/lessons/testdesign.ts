import type { Lesson } from "../types";

export const testdesign: Lesson[] = [
  {
    slug: "test-case-design",
    title: "Test Case Design",
    category: "testdesign",
    tagline: "Find more important bugs with less testing effort.",
    difficulty: "Intermediate",
    intro:
      "Good testing should be both efficient (find more bugs with less effort) and effective (find the bugs that matter). Test-case design techniques help you choose a small set of high-value tests instead of testing blindly.",
    body: [
      { type: "heading", text: "How much do you know about the internals?" },
      {
        type: "table",
        headers: ["Approach", "Designs tests from"],
        rows: [
          ["Black-box", "External behavior and specifications only"],
          ["White-box", "Implementation knowledge (the code's structure)"],
          ["Gray-box", "Some implementation knowledge, but focused on behavior"],
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Efficient and effective",
        text: "Exhaustive testing is impossible. Techniques like equivalence partitioning and boundary value analysis let you cover the important cases with few tests.",
      },
    ],
    keyPoints: [
      "Aim for efficient (less effort) and effective (important bugs).",
      "Black-box: behavior only; white-box: code; gray-box: a mix.",
      "Use techniques to pick a small, high-value test set.",
    ],
    related: ["equivalence-partitioning", "boundary-value-analysis", "test-coverage"],
  },
  {
    slug: "equivalence-partitioning",
    title: "Equivalence Partitioning",
    category: "testdesign",
    tagline: "Group inputs that are handled the same way, then test one of each.",
    difficulty: "Intermediate",
    also: "EP",
    intro:
      "Equivalence Partitioning (EP) groups inputs that are likely to be handled in the same way. If a partition is handled uniformly, testing one value from it is about as good as testing them all — so you avoid redundant tests while still covering every meaningful group.",
    body: [
      { type: "heading", text: "Example: isValidMonth(month)" },
      {
        type: "table",
        headers: ["Partition", "Range", "Sample"],
        rows: [
          ["Below valid", "month ≤ 0", "0"],
          ["Valid", "1 ≤ month ≤ 12", "6"],
          ["Above valid", "month ≥ 13", "13"],
        ],
      },
      {
        type: "paragraph",
        text: "Explore the partitions and their boundaries in the visualization — every group gets at least one test.",
      },
    ],
    viz: "partitions",
    playground: {
      code: `const isValidMonth = (m) => Number.isInteger(m) && m >= 1 && m <= 12;

// one representative from each partition
for (const m of [0, 6, 13]) {
  console.log("month " + m + " =>", isValidMonth(m));
}`,
    },
    keyPoints: [
      "Group inputs handled the same way into partitions.",
      "Test one representative per partition.",
      "Avoids redundant tests while covering every group.",
    ],
    related: ["boundary-value-analysis", "test-case-design", "combining-test-inputs"],
  },
  {
    slug: "boundary-value-analysis",
    title: "Boundary Value Analysis",
    category: "testdesign",
    tagline: "Bugs cluster at the edges — test on and around boundaries.",
    difficulty: "Intermediate",
    also: "BVA",
    intro:
      "Boundary Value Analysis (BVA) tests values at and near the boundaries of partitions, because off-by-one and comparison bugs cluster exactly there. It complements equivalence partitioning.",
    body: [
      { type: "heading", text: "Example: valid month 1..12" },
      {
        type: "paragraph",
        text: "For the valid range 1..12, useful boundary values cluster around each edge:",
      },
      {
        type: "table",
        headers: ["Boundary", "Values to test"],
        rows: [
          ["Lower edge (1)", "0, 1, 2"],
          ["Upper edge (12)", "11, 12, 13"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why the edges?",
        text: "Mistakes like `<` vs `<=` and off-by-one errors only show up right at the boundary. The middle of a partition rarely reveals them.",
      },
    ],
    viz: "partitions",
    playground: {
      code: `const isValidMonth = (m) => m >= 1 && m <= 12;

// boundary values around both edges
for (const m of [0, 1, 2, 11, 12, 13]) {
  console.log(m, "=>", isValidMonth(m));
}`,
    },
    keyPoints: [
      "Test on and just around each boundary.",
      "Edges expose off-by-one and < vs <= bugs.",
      "Use together with equivalence partitioning.",
    ],
    related: ["equivalence-partitioning", "test-case-design"],
  },
  {
    slug: "combining-test-inputs",
    title: "Combining Test Inputs",
    category: "testdesign",
    tagline: "When there are many inputs, choose combinations wisely.",
    difficulty: "Advanced",
    intro:
      "When multiple inputs exist, testing every combination is often too expensive. Several strategies trade thoroughness for cost, and a useful heuristic keeps negative tests meaningful.",
    body: [
      { type: "heading", text: "Combination strategies" },
      {
        type: "table",
        headers: ["Strategy", "Coverage", "Cost"],
        rows: [
          ["All combinations", "Strongest", "Most expensive"],
          ["Each valid input at least once", "Weaker", "Cheaper"],
          ["Pairwise", "Every pair of choices appears at least once", "Good balance"],
        ],
      },
      { type: "heading", text: "The invalid-input heuristic" },
      {
        type: "paragraph",
        text: "Avoid putting many invalid inputs in one test case. One invalid input can stop later inputs from being processed, hiding bugs behind the first failure.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "One invalid input per negative test",
        text: "Prefer a single invalid input per negative test case (unless there's a specific reason to combine), so each invalid case is actually exercised.",
      },
    ],
    keyPoints: [
      "All-combinations is strongest but costliest; pairwise balances well.",
      "'Each choice once' is cheap but weak.",
      "Keep one invalid input per negative test so none are masked.",
    ],
    related: ["equivalence-partitioning", "boundary-value-analysis"],
  },
  {
    slug: "scripted-exploratory",
    title: "Scripted vs Exploratory Testing",
    category: "testdesign",
    tagline: "Run predefined tests, or design tests while you learn the system.",
    difficulty: "Beginner",
    intro:
      "Scripted testing follows predefined test cases; exploratory testing designs and runs tests while learning about the system. They're complementary — use both.",
    body: [
      {
        type: "table",
        headers: ["", "Scripted", "Exploratory"],
        rows: [
          ["Tests are", "Defined in advance", "Designed while testing"],
          ["Strength", "Repeatable, great for regression, easy to document", "Finds unexpected issues; great when specs are incomplete"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Use both",
        text: "Scripted tests guard known behavior; exploratory testing discovers the unknown. A good QA process leans on each for what it does best.",
      },
    ],
    keyPoints: [
      "Scripted: predefined, repeatable, good for regression.",
      "Exploratory: designed on the fly, finds the unexpected.",
      "They complement each other — use both.",
    ],
    related: ["regression-testing", "test-case-design"],
  },
];
