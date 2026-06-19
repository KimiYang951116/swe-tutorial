import type { Lesson } from "../types";

export const errors: Lesson[] = [
  {
    slug: "exceptions",
    title: "Exceptions",
    category: "errors",
    tagline: "Signal unusual situations that disrupt normal control flow.",
    difficulty: "Beginner",
    intro:
      "An exception represents an unusual situation that disrupts normal control flow. Use exceptions for genuinely exceptional cases — not for routine branching that the normal logic should handle.",
    body: [
      {
        type: "paragraph",
        text: "When something happens that a function can't handle sensibly (a file is missing, input is invalid, a network call fails), throwing an exception lets the problem propagate to a place that can deal with it, instead of returning a misleading value.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Not for control flow",
        text: "Don't use exceptions for ordinary expected branches (e.g. 'item not found' in a lookup that often misses). Reserve them for the exceptional.",
      },
    ],
    playground: {
      code: `function parsePositiveInt(text) {
  const n = Number(text);
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("expected a positive integer, got: " + text);
  }
  return n;
}

console.log(parsePositiveInt("42"));
try { parsePositiveInt("-3"); } catch (e) { console.log("caught:", e.message); }`,
    },
    keyPoints: [
      "Exceptions signal exceptional, unhandleable situations.",
      "They propagate to a place that can handle them.",
      "Don't use them for routine branching.",
    ],
    related: ["assertions", "defensive-programming", "fail-fast"],
  },
  {
    slug: "assertions",
    title: "Assertions",
    category: "errors",
    tagline: "Document assumptions that must be true if the code is correct.",
    difficulty: "Intermediate",
    intro:
      "An assertion documents an assumption that should always be true if the code is correct. An assertion failure means there is a bug — not a recoverable runtime condition.",
    body: [
      { type: "heading", text: "Assertions vs exceptions" },
      {
        type: "table",
        headers: ["", "Assertion", "Exception"],
        rows: [
          ["Signals", "A programming bug", "An exceptional runtime situation"],
          ["Caused by", "Wrong code", "Bad input / environment"],
          ["Audience", "Developers", "Calling code / users"],
          ["Often disabled", "In production", "Never"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Assert the 'can't happen'",
        text: "Use assertions for conditions you believe are impossible if the code is right (an internal invariant). Use exceptions for conditions that can legitimately happen (bad input).",
      },
    ],
    playground: {
      code: `function assert(condition, message) {
  if (!condition) throw new Error("Assertion failed: " + message);
}

function midpoint(sortedLo, sortedHi) {
  assert(sortedLo <= sortedHi, "lo must be <= hi");
  return (sortedLo + sortedHi) >> 1;
}

console.log(midpoint(0, 10));
try { midpoint(10, 0); } catch (e) { console.log(e.message); }`,
    },
    keyPoints: [
      "An assertion documents an always-true assumption.",
      "Assertion failure = a bug, not a recoverable error.",
      "Assertions for invariants; exceptions for bad input.",
    ],
    related: ["exceptions", "defensive-programming", "fail-fast"],
  },
  {
    slug: "logging",
    title: "Logging",
    category: "errors",
    tagline: "Record runtime information for debugging and monitoring.",
    difficulty: "Beginner",
    intro:
      "Logging records useful runtime information for debugging and monitoring. Good logs are the difference between diagnosing a production problem in minutes versus days.",
    body: [
      { type: "heading", text: "Good logs help answer" },
      {
        type: "list",
        items: [
          "What happened?",
          "When did it happen?",
          "Which input or state caused it?",
          "Which component was involved?",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Use levels",
        text: "Log levels (debug, info, warn, error) let you keep detailed logs available while showing only what matters in production.",
      },
    ],
    playground: {
      code: `function log(level, message, context) {
  const time = "T+0ms"; // (timestamps omitted in the sandbox)
  console.log("[" + level + "] " + time + " " + message,
    context ? JSON.stringify(context) : "");
}

log("info", "user signed in", { userId: 7 });
log("error", "save failed", { pinId: 42, reason: "network" });`,
    },
    keyPoints: [
      "Logs capture what/when/which input/which component.",
      "Use log levels to control verbosity by environment.",
      "Include enough context to reproduce the issue.",
    ],
    related: ["exceptions", "defensive-programming", "static-analysis"],
  },
  {
    slug: "defensive-programming",
    title: "Defensive Programming",
    category: "errors",
    tagline: "Write code that prevents or limits damage from incorrect use.",
    difficulty: "Intermediate",
    intro:
      "Defensive programming means writing code that prevents or limits damage from incorrect use — validating inputs, rejecting invalid states early, and protecting internal data. Apply it where the risk justifies the overhead.",
    body: [
      { type: "heading", text: "Techniques" },
      {
        type: "list",
        items: [
          "Validate inputs at boundaries",
          "Reject invalid state early (fail fast)",
          "Return defensive copies of mutable internal data",
          "Enforce required associations",
          "Fail clearly when assumptions are violated",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Balance, don't over-do it",
        text: "Checking everything everywhere adds clutter and cost. Be defensive at trust boundaries (public APIs, external input); trust your own internal, already-validated code.",
      },
    ],
    beforeAfter: {
      before: `class Team {
  members = [];
  getMembers() { return this.members; } // caller can mutate internals!
}
const t = new Team();
t.getMembers().push("intruder"); // oops`,
      after: `class Team {
  #members = [];
  add(name) {
    if (!name) throw new Error("name required"); // validate
    this.#members.push(name);
  }
  getMembers() { return [...this.#members]; }      // defensive copy
}`,
      notes: [
        "Inputs are validated before use.",
        "A defensive copy stops callers from mutating internals.",
      ],
    },
    playground: {
      code: `class Team {
  #members = [];
  add(name) { if (!name) throw new Error("name required"); this.#members.push(name); }
  getMembers() { return [...this.#members]; }
}
const t = new Team();
t.add("Ada");
const copy = t.getMembers();
copy.push("intruder");                 // mutating the copy...
console.log("internal stays safe:", t.getMembers());`,
    },
    keyPoints: [
      "Guard against incorrect use; validate at boundaries.",
      "Return defensive copies of mutable internals.",
      "Be defensive where risk warrants; trust internal code.",
    ],
    related: ["fail-fast", "encapsulation", "exceptions", "assertions"],
  },
];
