import type { Lesson } from "../types";

export const practices: Lesson[] = [
  {
    slug: "clean-code",
    title: "Clean Code",
    category: "practices",
    tagline: "Write code that's easy for humans to read, change, and trust.",
    difficulty: "Beginner",
    intro:
      "Clean code is code optimized for the reader, not just the compiler. Since code is read far more often than it's written, clarity — good names, small functions, honest behavior — is one of the highest-leverage investments you can make.",
    body: [
      { type: "heading", text: "Habits of clean code" },
      {
        type: "list",
        items: [
          "Intention-revealing names: getActiveUsers(), not gau().",
          "Small functions that do one thing at one level of abstraction.",
          "Few parameters; prefer objects or splitting the function.",
          "Comments explain why, not what the code already says.",
          "Consistent formatting and no dead code.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Names are documentation",
        text: "A well-named variable or function removes the need for a comment. If you need a comment to explain what something does, try renaming it first.",
      },
    ],
    beforeAfter: {
      before: `function calc(d) {
  let r = 0;
  for (let i = 0; i < d.length; i++) {
    if (d[i].s === 1) r += d[i].a; // what is s? a?
  }
  return r;
}`,
      after: `function totalOfPaidInvoices(invoices) {
  return invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((total, invoice) => total + invoice.amount, 0);
}`,
      notes: [
        "Names reveal intent — no decoding required.",
        "The transformation reads like a sentence.",
        "No comment needed to explain what it does.",
      ],
    },
    playground: {
      code: `function totalOfPaidInvoices(invoices) {
  return invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
}

const invoices = [
  { status: "paid", amount: 100 },
  { status: "unpaid", amount: 50 },
  { status: "paid", amount: 25 },
];
console.log("total paid:", totalOfPaidInvoices(invoices));`,
    },
    keyPoints: [
      "Optimize for the reader — code is read more than written.",
      "Good names beat explanatory comments.",
      "Small, single-purpose functions with clear intent.",
    ],
    related: ["refactoring", "kiss", "least-astonishment", "boy-scout-rule"],
  },
  {
    slug: "refactoring",
    title: "Refactoring & Code Smells",
    category: "practices",
    tagline: "Improve a program's structure without changing its behavior.",
    difficulty: "Intermediate",
    intro:
      "Refactoring is the disciplined practice of restructuring existing code — improving its design, readability, and structure — without altering its external behavior. 'Code smells' are surface symptoms that hint at deeper design problems worth refactoring away.",
    body: [
      { type: "heading", text: "Common code smells" },
      {
        type: "list",
        items: [
          "Long Method / Large Class — doing too much; split it.",
          "Duplicated Code — violates DRY; extract a shared function.",
          "Long Parameter List — pass an object or split responsibilities.",
          "Feature Envy — a method more interested in another class's data.",
          "Primitive Obsession — using raw strings/ints instead of small types.",
          "Shotgun Surgery — one change forces edits in many places.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Refactor under a green test suite",
        text: "Refactoring must preserve behavior. Lean on tests so you can restructure fearlessly and catch any accidental change.",
      },
    ],
    beforeAfter: {
      before: `// Long Method doing validation, calculation, and formatting at once
function process(order) {
  if (!order.items) throw new Error("no items");
  let total = 0;
  for (const i of order.items) total += i.price * i.qty;
  if (order.coupon) total *= 0.9;
  return "$" + total.toFixed(2);
}`,
      after: `const validate = (order) => { if (!order.items) throw new Error("no items"); };
const subtotal = (order) => order.items.reduce((s, i) => s + i.price * i.qty, 0);
const applyCoupon = (t, order) => (order.coupon ? t * 0.9 : t);
const format = (t) => "$" + t.toFixed(2);

function process(order) {
  validate(order);
  return format(applyCoupon(subtotal(order), order));
}`,
      notes: [
        "Extracted small, named, testable steps.",
        "Behavior is identical; structure is clearer.",
        "Each step can change independently.",
      ],
    },
    playground: {
      code: `const subtotal = (order) => order.items.reduce((s, i) => s + i.price * i.qty, 0);
const applyCoupon = (t, order) => (order.coupon ? t * 0.9 : t);
const format = (t) => "$" + t.toFixed(2);

const order = { items: [{ price: 10, qty: 2 }, { price: 5, qty: 4 }], coupon: true };
console.log(format(applyCoupon(subtotal(order), order)));`,
    },
    keyPoints: [
      "Change structure, preserve behavior.",
      "Code smells flag deeper design issues.",
      "Always refactor behind a passing test suite.",
    ],
    related: ["clean-code", "dry", "srp", "testing-tdd"],
  },
  {
    slug: "testing-tdd",
    title: "Testing & TDD",
    category: "practices",
    tagline: "Use automated tests — and write them first — to design with confidence.",
    difficulty: "Intermediate",
    intro:
      "Automated tests verify that code behaves as intended and stays correct as it changes. Test-Driven Development (TDD) takes it further: write a failing test first, make it pass with the simplest code, then refactor — the 'Red, Green, Refactor' cycle.",
    body: [
      { type: "heading", text: "The testing pyramid" },
      {
        type: "list",
        items: [
          "Many fast unit tests at the base (single functions/classes).",
          "Fewer integration tests (components working together).",
          "A small number of slow end-to-end tests at the top.",
        ],
      },
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
      caption: "A tiny hand-rolled test runner — write tests first, then the code.",
      code: `function slugify(s){
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function expect(actual, expected){
  const ok = actual === expected;
  console.log((ok ? "PASS" : "FAIL") + ": got '" + actual + "'");
}

expect(slugify("Hello World"), "hello-world");
expect(slugify("  A B!! "), "a-b");
expect(slugify("Clean   Code"), "clean-code");`,
    },
    keyPoints: [
      "Automated tests keep code correct as it changes.",
      "TDD: Red, Green, Refactor.",
      "Favor many fast unit tests over few slow E2E tests.",
    ],
    related: ["refactoring", "dip", "dependency-injection", "fail-fast"],
  },
];
