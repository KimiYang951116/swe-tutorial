import type { Lesson } from "../types";

export const integration: Lesson[] = [
  {
    slug: "integration",
    title: "Integration",
    category: "integration",
    tagline: "Combine the parts and make sure they work together.",
    difficulty: "Intermediate",
    intro:
      "Integration is the process of combining software parts and making sure they work together. How and when you integrate has a big effect on how hard the bugs are to find.",
    body: [
      { type: "heading", text: "Big-bang vs incremental" },
      {
        type: "table",
        headers: ["", "Big-bang integration", "Incremental integration"],
        rows: [
          ["When", "All parts integrated late", "Small pieces integrated frequently"],
          ["Bug search space", "Huge — everything at once", "Small — just the latest piece"],
          ["Verdict", "Avoid", "Prefer"],
        ],
      },
      { type: "heading", text: "Incremental integration" },
      {
        type: "list",
        items: [
          "Integrate small pieces frequently",
          "Test after each integration",
          "Find interaction bugs early, while the cause is obvious",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Avoid big-bang integration",
        text: "Integrating everything at the end creates a huge debugging search space — when something breaks, the cause could be anywhere.",
      },
    ],
    keyPoints: [
      "Integration = combining parts so they work together.",
      "Avoid big-bang; integrate incrementally and test each step.",
      "Frequent integration keeps the bug search space small.",
    ],
    related: ["walking-skeleton", "continuous-integration", "integration-system-testing"],
  },
  {
    slug: "walking-skeleton",
    title: "Walking Skeleton",
    category: "integration",
    tagline: "A minimal end-to-end version that exercises the whole technical path.",
    difficulty: "Intermediate",
    intro:
      "A walking skeleton is a minimal end-to-end version of the system. It may have tiny features, but it exercises the full technical path — proving the architecture works before you build out features.",
    body: [
      { type: "heading", text: "Example end-to-end path" },
      {
        type: "list",
        ordered: true,
        items: [
          "User interface opens",
          "App calls a service",
          "Service returns data",
          "Data appears on screen",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "De-risk the architecture first",
        text: "By wiring the whole path early — even with trivial features — you discover integration problems while they're cheap to fix, and every later feature has a proven track to run on.",
      },
    ],
    viz: "walking-skeleton",
    keyPoints: [
      "A thin slice through every layer, end to end.",
      "Proves the architecture and integration early.",
      "Features get fleshed out on a working skeleton.",
    ],
    related: ["integration", "continuous-integration", "agile-design"],
  },
  {
    slug: "build-automation",
    title: "Build Automation",
    category: "integration",
    tagline: "Let tools do the repetitive build tasks.",
    difficulty: "Beginner",
    intro:
      "Build automation uses tools to automate repetitive tasks so they happen the same way every time — no forgotten steps, no 'works on my machine'.",
    body: [
      { type: "heading", text: "Tasks worth automating" },
      {
        type: "list",
        items: [
          "Compiling",
          "Testing",
          "Packaging",
          "Dependency management",
          "Deployment",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Automation is the foundation of CI/CD",
        text: "Once the build is a single reliable command, a CI server can run it on every change — see Continuous Integration.",
      },
    ],
    keyPoints: [
      "Automate compiling, testing, packaging, deps, deployment.",
      "Repeatable builds eliminate forgotten steps.",
      "It's the basis for CI/CD.",
    ],
    related: ["continuous-integration", "reuse"],
  },
  {
    slug: "continuous-integration",
    title: "Continuous Integration & Deployment",
    category: "integration",
    tagline: "Build, integrate, and test automatically on every change.",
    difficulty: "Intermediate",
    also: "CI / CD",
    intro:
      "Continuous Integration (CI) means building, integrating, and testing automatically after code changes. Continuous Deployment (CD) extends it by automatically deploying changes that pass all checks.",
    body: [
      { type: "heading", text: "Why CI helps" },
      {
        type: "list",
        items: [
          "Finds integration problems early",
          "Keeps the main branch healthier",
          "Makes regression testing regular and automatic",
        ],
      },
      {
        type: "table",
        headers: ["", "Continuous Integration", "Continuous Deployment"],
        rows: [
          ["Does", "Build + integrate + test on each change", "Also deploys passing changes automatically"],
          ["Goal", "Catch problems early", "Ship safely and often"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "This very site uses CI",
        text: "The repository's GitHub Actions workflow type-checks and builds on every push and pull request — a concrete example of CI.",
      },
    ],
    keyPoints: [
      "CI: automatic build/integrate/test on every change.",
      "CD: automatically deploy changes that pass checks.",
      "Keeps the main branch healthy and integration painless.",
    ],
    related: ["build-automation", "integration", "regression-testing", "revision-control"],
  },
  {
    slug: "reuse",
    title: "Reuse, Libraries & Frameworks",
    category: "integration",
    tagline: "Standing on others' code — and the strings attached.",
    difficulty: "Beginner",
    intro:
      "Reuse means using existing code, libraries, frameworks, platforms, or services instead of writing your own. It can save time and improve reliability — but it brings real risks worth weighing.",
    body: [
      { type: "heading", text: "Benefits vs risks" },
      {
        type: "table",
        headers: ["Benefits", "Costs & risks"],
        rows: [
          ["Saves time", "Dependency may be too large/complex"],
          ["Uses tested components", "Dependency may be unstable or unmaintained"],
          ["Can improve reliability", "License may be unsuitable"],
          ["", "Security vulnerabilities may be introduced"],
          ["", "Performance may suffer"],
        ],
      },
      { type: "heading", text: "Library vs framework" },
      {
        type: "table",
        headers: ["", "Library", "Framework"],
        rows: [
          ["Who calls whom", "Your code calls the library", "The framework calls your code"],
          ["Control", "You're in control", "Inversion of control"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Inversion of control",
        text: "A framework defines the overall flow and calls your code at the right moments — 'don't call us, we'll call you'. A library is the opposite: you call it when you need it.",
      },
    ],
    keyPoints: [
      "Reuse saves time and leverages tested code — but adds risk.",
      "Weigh size, stability, license, security, performance.",
      "Library: you call it. Framework: it calls you (inversion of control).",
    ],
    related: ["build-automation", "dependency-injection"],
  },
];
