import type { Lesson } from "../types";

export const testing: Lesson[] = [
  {
    slug: "testing-intro",
    title: "Testing & Developer Testing",
    category: "testing",
    tagline: "Execute software to find defects and build confidence.",
    difficulty: "Beginner",
    intro:
      "Testing executes software to find defects and build confidence that it works. Developer testing — testing performed by developers — should happen early, because bugs are far cheaper to fix when found close to where they were introduced.",
    body: [
      { type: "heading", text: "The testing pyramid" },
      {
        type: "paragraph",
        text: "A healthy test suite has many fast, isolated unit tests at the base, fewer integration tests in the middle, and a small number of slow end-to-end tests at the top. The visualization shows the trade-off.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Find bugs early",
        text: "A bug caught by a unit test costs minutes; the same bug caught in production can cost days. Push testing as early (and as low in the pyramid) as you can.",
      },
    ],
    viz: "testing-pyramid",
    keyPoints: [
      "Testing finds defects and builds confidence.",
      "Developer testing happens early, where bugs are cheap.",
      "Favor many unit tests, fewer integration, fewest E2E.",
    ],
    related: ["unit-testing", "testing-tdd", "test-coverage"],
  },
  {
    slug: "unit-testing",
    title: "Unit Testing & Test Doubles",
    category: "testing",
    tagline: "Test a small unit in isolation, replacing its dependencies.",
    difficulty: "Intermediate",
    intro:
      "Unit testing checks a small unit — a method, class, or component — in isolation. To isolate the Software Under Test (SUT) from its dependencies, you replace those dependencies with test doubles.",
    body: [
      { type: "heading", text: "Software Under Test (SUT)" },
      {
        type: "paragraph",
        text: "The SUT is the part you're currently testing. Everything else it touches should be controlled so a failure points squarely at the SUT, not at a flaky dependency.",
      },
      { type: "heading", text: "Kinds of test double" },
      {
        type: "table",
        headers: ["Double", "What it does"],
        rows: [
          ["Stub", "Returns hard-coded responses"],
          ["Mock", "Verifies expected interactions happened"],
          ["Fake", "A working but simplified implementation"],
          ["Dummy", "Passed only to satisfy a parameter; never used"],
          ["Spy", "Records how it was called for later inspection"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Doubles need seams",
        text: "You can only swap a dependency for a double if it's injected (see Dependency Injection). Testability and good design go hand in hand.",
      },
    ],
    playground: {
      caption: "A stub isolates the SUT (NotificationService) from a real mailer.",
      code: `class NotificationService {
  constructor(mailer) { this.mailer = mailer; }
  welcome(user) { return this.mailer.send(user + ": welcome!"); }
}

// stub: hard-coded behavior, records nothing
const mailerStub = { send: (msg) => "SENT(" + msg + ")" };

const svc = new NotificationService(mailerStub);
console.log(svc.welcome("ada"));`,
    },
    keyPoints: [
      "Unit tests check one unit (the SUT) in isolation.",
      "Test doubles: stub, mock, fake, dummy, spy.",
      "Injection provides the seam that makes doubles possible.",
    ],
    related: ["dependency-injection", "testing-intro", "integration-system-testing"],
  },
  {
    slug: "integration-system-testing",
    title: "Integration, System & Acceptance Testing",
    category: "testing",
    tagline: "Test how parts work together, the whole system, and stakeholder fit.",
    difficulty: "Intermediate",
    intro:
      "Beyond units, testing widens its scope: integration testing checks that components work together, system testing checks the complete system against its requirements, and acceptance testing checks that the system satisfies stakeholder expectations.",
    body: [
      { type: "heading", text: "Levels of scope" },
      {
        type: "table",
        headers: ["Level", "Checks"],
        rows: [
          ["Integration", "Components work together (glue code, data flow, contracts, API boundaries)"],
          ["System", "The complete integrated system against system requirements"],
          ["Acceptance", "The system satisfies stakeholder expectations"],
        ],
      },
      { type: "heading", text: "Alpha vs beta testing" },
      {
        type: "table",
        headers: ["", "Alpha testing", "Beta testing"],
        rows: [
          ["Users", "Selected users", "Selected real users"],
          ["Environment", "Controlled conditions", "Natural, real-world environment"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Integration finds contract bugs",
        text: "Integration testing is especially good at catching misunderstood contracts and glue-code mistakes that unit tests (which mock those boundaries) can't see.",
      },
    ],
    keyPoints: [
      "Integration: parts together. System: the whole vs requirements.",
      "Acceptance: meets stakeholder expectations.",
      "Alpha = controlled users; beta = real users in the wild.",
    ],
    related: ["unit-testing", "regression-testing", "use-cases"],
  },
  {
    slug: "regression-testing",
    title: "Regression Testing & Test Automation",
    category: "testing",
    tagline: "Make sure what worked yesterday still works today.",
    difficulty: "Beginner",
    intro:
      "Regression testing checks that previously working behavior still works after changes. It's most valuable when automated and run frequently — every change, ideally in CI.",
    body: [
      { type: "heading", text: "Why automate" },
      {
        type: "list",
        items: [
          "Reduces repeated manual effort",
          "Improves precision (no human skipping steps)",
          "Supports frequent regression testing",
          "Enables Continuous Integration",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Automation makes change safe",
        text: "An automated regression suite is what lets you refactor and add features without fear — it catches anything you accidentally break.",
      },
    ],
    playground: {
      caption: "A regression test pins behavior so future changes can't silently break it.",
      code: `function discount(total, isMember) {
  return isMember ? total * 0.9 : total;
}

function expect(actual, expected, name) {
  console.log((actual === expected ? "PASS" : "FAIL") + ": " + name);
}

expect(discount(100, true), 90, "member gets 10% off");
expect(discount(100, false), 100, "non-member pays full");`,
    },
    keyPoints: [
      "Regression testing protects existing behavior after changes.",
      "Automate it and run it often (ideally in CI).",
      "It's what makes refactoring and rapid change safe.",
    ],
    related: ["continuous-integration", "refactoring", "testing-tdd"],
  },
  {
    slug: "gui-testing",
    title: "GUI Testing",
    category: "testing",
    tagline: "Why testing through the UI is hard — and what to do about it.",
    difficulty: "Intermediate",
    intro:
      "Graphical User Interface (GUI) testing is harder than testing through an Application Programming Interface (API). The fix is to keep logic out of the GUI so most of it can be tested through stable APIs instead.",
    body: [
      { type: "heading", text: "Why GUI testing is hard" },
      {
        type: "list",
        items: [
          "Many user operations can happen in many orders",
          "Visual state can vary across devices and screen sizes",
          "Automation is more fragile than API-level tests",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Move logic out of the GUI",
        text: "Push as much behavior as possible behind testable APIs (see MVC/MVP/MVVM). A thin GUI over well-tested logic needs far less GUI testing.",
      },
    ],
    keyPoints: [
      "GUI testing is harder than API testing (order, devices, fragility).",
      "Keep logic out of the GUI so APIs can be tested instead.",
      "Thin views over tested logic minimize GUI testing.",
    ],
    related: ["mvc", "mvp", "unit-testing"],
  },
  {
    slug: "test-coverage",
    title: "Test Coverage",
    category: "testing",
    tagline: "How much of the code or behavior the tests exercise.",
    difficulty: "Intermediate",
    intro:
      "Test coverage measures how much of the code or behavior is exercised by tests. It's a useful signal — but high coverage does not guarantee high test quality.",
    body: [
      { type: "heading", text: "Common coverage types" },
      {
        type: "list",
        items: [
          "Function / method coverage",
          "Statement coverage",
          "Decision / branch coverage",
          "Condition coverage",
          "Path coverage",
          "Entry and exit coverage",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Coverage ≠ quality",
        text: "You can execute every line without actually asserting anything meaningful. Coverage finds untested code; it doesn't prove the tests are good.",
      },
    ],
    keyPoints: [
      "Coverage = how much code/behavior tests exercise.",
      "Types: function, statement, branch, condition, path, entry/exit.",
      "High coverage doesn't guarantee good tests.",
    ],
    related: ["unit-testing", "test-case-design", "testing-intro"],
  },
  {
    slug: "testing-tdd",
    title: "Test-Driven Development (TDD)",
    category: "testing",
    tagline: "Write the failing test first, then the code to pass it.",
    difficulty: "Intermediate",
    also: "TDD",
    intro:
      "Test-Driven Development writes tests before code: write a failing test, make it pass with the simplest code, then refactor — the 'Red, Green, Refactor' cycle. It turns testing into a design activity.",
    body: [
      { type: "heading", text: "Red, Green, Refactor" },
      {
        type: "list",
        ordered: true,
        items: [
          "Red — write a small test that fails (the behavior doesn't exist yet).",
          "Green — write the simplest code that makes it pass.",
          "Refactor — clean up while keeping the test green.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Tests enable everything else",
        text: "A good test suite is what makes refactoring, dependency injection, and fearless change practical. The principles on this site become far easier to apply when behavior is pinned down by tests.",
      },
    ],
    beforeAfter: {
      before: `// no tests: every change is a gamble
function slugify(s) { return s.toLowerCase().replace(/ /g, "-"); }
// does it handle punctuation? trailing spaces? who knows.`,
      after: `function slugify(s) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
// tests pin down the behavior:
// slugify("Hello World")   === "hello-world"
// slugify("  A B!! ")      === "a-b"`,
      notes: [
        "Tests document the intended behavior precisely.",
        "Edge cases are captured and protected against regressions.",
      ],
    },
    playground: {
      caption: "Write the tests first, then make them pass.",
      code: `function slugify(s){
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function expect(actual, expected){
  console.log((actual === expected ? "PASS" : "FAIL") + ": got '" + actual + "'");
}

expect(slugify("Hello World"), "hello-world");
expect(slugify("  A B!! "), "a-b");
expect(slugify("Clean   Code"), "clean-code");`,
    },
    keyPoints: [
      "TDD: Red → Green → Refactor.",
      "Tests are written before the code they verify.",
      "A good suite makes refactoring and change fearless.",
    ],
    related: ["regression-testing", "refactoring", "dependency-injection", "fail-fast"],
  },
];
