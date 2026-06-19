import type { Lesson } from "../types";

export const quality: Lesson[] = [
  {
    slug: "clean-code",
    title: "Clean Code",
    category: "quality",
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
    related: ["readable-code", "naming", "refactoring", "kiss", "boy-scout-rule"],
  },
  {
    slug: "readable-code",
    title: "Readable Code",
    category: "quality",
    tagline: "Short methods, shallow nesting, simple expressions, no magic literals.",
    difficulty: "Beginner",
    intro:
      "Readable code is easier to maintain because developers spend more time reading code than writing it. A handful of concrete habits do most of the work: keep methods short, avoid deep nesting, avoid complicated expressions, and replace magic literals with names.",
    body: [
      { type: "heading", text: "Keep methods short" },
      {
        type: "paragraph",
        text: "Long methods are harder to understand and test. A method should usually do one clear thing. If it grows, extract helpers, split responsibilities, or move logic to a more appropriate class.",
      },
      { type: "heading", text: "Avoid deep nesting — use guard clauses" },
      {
        type: "code",
        code: `if (!isSignedIn) {
  return;
}
loadUserData();`,
        caption: "Returning early flattens the happy path and removes an indentation level.",
      },
      { type: "heading", text: "Avoid complicated expressions" },
      {
        type: "code",
        code: `const isOwner = pin.userId === currentUserId;
const canEdit = isOwner && !pin.isArchived;`,
        caption: "Name the intermediate values; the condition now reads like prose.",
      },
      { type: "heading", text: "Avoid magic literals" },
      {
        type: "paragraph",
        text: "A magic literal is a number or string whose meaning isn't obvious. Give it a named constant so the meaning is explicit and there's a single place to change it.",
      },
      {
        type: "code",
        code: `const MAX_RATING = 5;`,
      },
    ],
    beforeAfter: {
      before: `function grade(score) {
  if (score != null) {
    if (score >= 0) {
      if (score <= 100) {
        if (score >= 50) {
          return "pass";
        } else {
          return "fail";
        }
      }
    }
  }
  throw new Error("bad score");
}`,
      after: `const PASS_MARK = 50;

function grade(score) {
  if (score == null || score < 0 || score > 100) {
    throw new Error("bad score");
  }
  return score >= PASS_MARK ? "pass" : "fail";
}`,
      beforeLabel: "Deep nesting + magic number",
      afterLabel: "Guard clause + named constant",
      notes: [
        "Guard clause handles the invalid case first, flattening the rest.",
        "PASS_MARK names the 50 — meaning is explicit and centralized.",
        "The happy path is now a single readable line.",
      ],
    },
    playground: {
      code: `const PASS_MARK = 50;
function grade(score) {
  if (score == null || score < 0 || score > 100) throw new Error("bad score");
  return score >= PASS_MARK ? "pass" : "fail";
}
for (const s of [49, 50, 100]) console.log(s, "=>", grade(s));`,
    },
    keyPoints: [
      "Short, single-purpose methods.",
      "Guard clauses beat deep nesting.",
      "Name intermediate values and magic literals.",
    ],
    related: ["clean-code", "slap", "kiss", "naming"],
  },
  {
    slug: "slap",
    title: "Single Level of Abstraction Principle (SLAP)",
    category: "quality",
    tagline: "Each method should mix statements from only one abstraction level.",
    difficulty: "Intermediate",
    also: "SLAP",
    intro:
      "The Single Level of Abstraction Principle says each method should contain statements at roughly the same level of abstraction. Mixing a high-level workflow with low-level details in one method makes it hard to read.",
    body: [
      {
        type: "paragraph",
        text: "When a method jumps between a high-level workflow, a raw database query, string parsing, and UI updates, the reader has to constantly shift mental gears. Keep the workflow at one level and push the details into helper methods.",
      },
    ],
    beforeAfter: {
      before: `function checkout(cart) {
  // high level + low level all mixed together
  const rows = db.query("SELECT price FROM items WHERE id IN (...)");
  let total = 0;
  for (const r of rows) total += r.price;
  document.querySelector("#total").innerText = "$" + total.toFixed(2);
}`,
      after: `function checkout(cart) {           // all one level: the workflow
  const items = loadItems(cart);
  const total = sumPrices(items);
  showTotal(total);
}
// details live in helpers: loadItems(), sumPrices(), showTotal()`,
      notes: [
        "The top method reads as a clear sequence of steps.",
        "Low-level details are named and tucked into helpers.",
      ],
    },
    keyPoints: [
      "One method, one level of abstraction.",
      "Push details down into well-named helpers.",
      "The top-level method should read like a summary.",
    ],
    related: ["readable-code", "clean-code", "srp"],
  },
  {
    slug: "naming",
    title: "Naming",
    category: "quality",
    tagline: "Names should reveal intent.",
    difficulty: "Beginner",
    intro:
      "Names are the most pervasive form of documentation. Good names reveal intent so the reader doesn't have to decode the code or hunt for comments.",
    body: [
      { type: "heading", text: "Guidelines" },
      {
        type: "list",
        items: [
          "Use nouns for classes and variables; verbs for action methods.",
          "Avoid misleading names and names that differ only slightly.",
          "Use standard words consistently across the codebase.",
          "Don't abbreviate unless the abbreviation is widely known in the project.",
          "If you use an abbreviation in docs, write the full form first.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Rename before you comment",
        text: "If you're about to write a comment explaining what something is, first try renaming it so the comment becomes unnecessary.",
      },
    ],
    keyPoints: [
      "Names should reveal intent.",
      "Nouns for things, verbs for actions; be consistent.",
      "Avoid cryptic abbreviations and near-identical names.",
    ],
    related: ["clean-code", "readable-code", "comments"],
  },
  {
    slug: "comments",
    title: "Comments",
    category: "quality",
    tagline: "Code explains the how; comments explain the what and why.",
    difficulty: "Beginner",
    intro:
      "Good code should explain the how on its own. Comments are best spent on the what and the why — the things code can't express: contracts, rationale, constraints, and assumptions.",
    body: [
      { type: "heading", text: "Use comments for" },
      {
        type: "list",
        items: [
          "Public behavior contracts (what a function promises)",
          "Non-obvious rationale (why this approach)",
          "External constraints (API limits, legal/biz rules)",
          "Important assumptions",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Avoid comments that repeat the code",
        text: "`i = i + 1; // add one to i` adds noise, not value. If a comment merely restates the code, delete it or improve the code instead.",
      },
    ],
    keyPoints: [
      "Code says how; comments say what/why.",
      "Document contracts, rationale, constraints, assumptions.",
      "Never write comments that just echo the code.",
    ],
    related: ["naming", "clean-code", "documentation-overview"],
  },
  {
    slug: "coding-standards",
    title: "Coding Standards",
    category: "quality",
    tagline: "Consistency makes a codebase feel like one author wrote it.",
    difficulty: "Beginner",
    intro:
      "Coding standards make a codebase feel consistent. When everyone formats and structures code the same way, reviewers and readers can focus on substance instead of style.",
    body: [
      { type: "heading", text: "Benefits" },
      {
        type: "list",
        items: [
          "Less time spent debating style",
          "Easier code reviews",
          "Easier onboarding for new developers",
          "Less visual noise across the codebase",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Automate it",
        text: "Formatters and linters enforce standards automatically, so the rules never become a manual chore or a review argument.",
      },
    ],
    keyPoints: [
      "Standards make the codebase consistent.",
      "They speed up reviews and onboarding.",
      "Automate with formatters/linters (see Static Analysis).",
    ],
    related: ["clean-code", "static-analysis", "code-review"],
  },
  {
    slug: "premature-optimization",
    title: "Avoid Premature Optimization",
    category: "quality",
    tagline: "Don't add complexity for hypothetical performance gains.",
    difficulty: "Beginner",
    intro:
      "Premature optimization makes code complex for performance that may never matter. Optimize based on measurement, not guesses — clarity first, speed where it's proven necessary.",
    body: [
      { type: "heading", text: "A better flow" },
      {
        type: "list",
        ordered: true,
        items: [
          "Make it work.",
          "Make it correct and readable.",
          "Measure performance.",
          "Optimize only where the measurement shows it's needed.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Most code isn't the bottleneck",
        text: "Profilers routinely show that the slow part isn't where developers guessed. Measure before you trade readability for speed.",
      },
    ],
    keyPoints: [
      "Don't complicate code for unproven performance.",
      "Work → correct/readable → measure → optimize.",
      "Let profiling decide where to optimize.",
    ],
    related: ["kiss", "yagni", "readable-code"],
  },
  {
    slug: "unsafe-shortcuts",
    title: "Avoid Unsafe Shortcuts",
    category: "quality",
    tagline: "The little hacks that quietly create bugs.",
    difficulty: "Beginner",
    intro:
      "Some coding shortcuts save a moment now and cost hours later. Avoiding them keeps code predictable and safe to change.",
    body: [
      { type: "heading", text: "Shortcuts to avoid" },
      {
        type: "list",
        items: [
          "Reusing a variable for unrelated purposes",
          "Modifying parameters unexpectedly",
          "Empty `catch` blocks that swallow errors",
          "Dead code left lying around",
          "Overly broad variable scope",
          "Duplicate rules or duplicated knowledge",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Empty catch blocks are the worst offender",
        text: "Swallowing an exception hides the very information you need to debug. At minimum, log it; usually, handle or rethrow it. See Fail Fast.",
      },
    ],
    keyPoints: [
      "Don't reuse variables or mutate parameters unexpectedly.",
      "Never swallow errors in empty catch blocks.",
      "Remove dead code; keep scope tight; avoid duplicated knowledge.",
    ],
    related: ["fail-fast", "dry", "readable-code"],
  },
  {
    slug: "refactoring",
    title: "Refactoring & Code Smells",
    category: "quality",
    tagline: "Improve a program's structure without changing its behavior.",
    difficulty: "Intermediate",
    intro:
      "Refactoring is the disciplined practice of restructuring existing code — improving its design, readability, and structure — without altering its external behavior. 'Code smells' are surface symptoms that hint at deeper design problems worth refactoring away.",
    body: [
      { type: "heading", text: "Refactoring is NOT" },
      {
        type: "list",
        items: [
          "Rewriting from scratch",
          "Fixing a bug",
          "Adding a feature",
        ],
      },
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
      { type: "heading", text: "Common refactorings" },
      {
        type: "list",
        items: [
          "Extract Method / Inline Method",
          "Decompose Conditional · Consolidate Duplicate Conditional Fragments",
          "Replace Magic Literal · Replace Nested Conditional with Guard Clauses",
          "Split Loop · Split Temporary Variable",
          "Rename Method, Variable, or Class",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Refactor under a green test suite",
        text: "Refactoring must preserve behavior. Run regression tests after each small step so you can restructure fearlessly and catch any accidental change.",
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
      "Refactor in small steps behind a passing test suite.",
    ],
    related: ["clean-code", "dry", "srp", "testing-tdd", "regression-testing"],
  },
];
