import type { Lesson } from "../types";

export const oop: Lesson[] = [
  {
    slug: "objects",
    title: "Objects",
    category: "oop",
    tagline: "Bundles of state and behavior that interact by sending messages.",
    difficulty: "Beginner",
    intro:
      "Object-Oriented Programming organizes software as a set of interacting objects. An object combines state (the data it stores) and behavior (the operations it can perform), and objects collaborate by sending each other messages — usually method calls.",
    body: [
      { type: "heading", text: "Two halves of an object" },
      {
        type: "list",
        items: [
          "**State** — the data the object currently holds (its fields/attributes).",
          "**Behavior** — the operations it can perform (its methods).",
        ],
      },
      {
        type: "paragraph",
        text: "Objects don't reach into each other's data directly; they ask each other to do things. Sending the message `account.withdraw(20)` lets the account decide how to carry out the request.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Messages, not data access",
        text: "Thinking in terms of messages (what can I ask this object to do?) rather than data leads to better-encapsulated designs. See Tell, Don't Ask.",
      },
    ],
    playground: {
      caption: "An object carrying state and responding to messages.",
      code: `class Account {
  constructor(balance) { this.balance = balance; } // state
  deposit(amount) { this.balance += amount; }       // behavior
  withdraw(amount) {                                  // behavior
    if (amount > this.balance) throw new Error("insufficient funds");
    this.balance -= amount;
  }
}

const acc = new Account(100);
acc.deposit(50);   // send a message
acc.withdraw(30);  // send a message
console.log("balance:", acc.balance);`,
    },
    keyPoints: [
      "An object = state + behavior.",
      "Objects collaborate by sending messages (method calls).",
      "Prefer asking objects to act over reading their data.",
    ],
    related: ["classes", "encapsulation", "tell-dont-ask"],
  },
  {
    slug: "classes",
    title: "Classes & Class-Level Members",
    category: "oop",
    tagline: "A class is a blueprint for objects; class-level members belong to the class itself.",
    difficulty: "Beginner",
    intro:
      "A class defines how to create a kind of object — it specifies the object's data and behavior. Most members belong to each individual object (instance members), but some members belong to the class as a whole (class-level members, often called `static`).",
    body: [
      { type: "heading", text: "Instance vs class-level members" },
      {
        type: "table",
        headers: ["Member kind", "Belongs to", "Example"],
        rows: [
          ["Instance member", "Each object", "`account.balance`"],
          ["Class-level (static) member", "The class itself", "`Account.totalAccounts`"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Use class-level members carefully",
        text: "Static members are effectively global state. Overuse creates hidden dependencies, makes tests harder, and lets state leak between tests. Reach for them only when a value genuinely belongs to the class, not an instance.",
      },
    ],
    playground: {
      code: `class Account {
  static count = 0;            // class-level: shared by all
  constructor(owner) {
    this.owner = owner;        // instance-level: per object
    Account.count++;
  }
}

new Account("Ada");
new Account("Linus");
console.log("accounts created:", Account.count);`,
    },
    keyPoints: [
      "A class is a blueprint for creating objects.",
      "Instance members belong to objects; static members belong to the class.",
      "Static members are global state — use sparingly.",
    ],
    related: ["objects", "singleton", "encapsulation"],
  },
  {
    slug: "interface-implementation",
    title: "Interface vs Implementation",
    category: "oop",
    tagline: "What an object offers vs how it actually does it.",
    difficulty: "Beginner",
    intro:
      "Every object has an interface — what other objects can use — and an implementation — how it actually performs the work. Good design exposes a small, clear interface and hides implementation details so the internals can change freely.",
    body: [
      {
        type: "paragraph",
        text: "Callers should depend only on the interface. As long as the interface (the contract) stays stable, you can rewrite the implementation — swap a data structure, optimize an algorithm — without breaking anyone.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Stable interface, free implementation",
        text: "This split is the foundation of encapsulation, abstraction, and the Dependency Inversion Principle. Program to the interface, not the implementation.",
      },
    ],
    beforeAfter: {
      before: `// callers depend on HOW it stores data
class Bag {
  array = [];
}
const b = new Bag();
b.array.push("x");        // coupled to the array
console.log(b.array.length);`,
      after: `// callers depend on WHAT it offers
class Bag {
  #items = [];
  add(x) { this.#items.push(x); }
  get size() { return this.#items.length; }
}
const b = new Bag();
b.add("x");               // implementation can change freely`,
      notes: [
        "The interface (add/size) is stable; storage is hidden.",
        "Swap the array for a Set later without breaking callers.",
      ],
    },
    keyPoints: [
      "Interface = what callers use; implementation = how it works.",
      "Depend on the interface so the implementation can change.",
      "Keep the public interface small and clear.",
    ],
    related: ["abstraction", "encapsulation", "dip"],
  },
  {
    slug: "abstraction",
    title: "Abstraction",
    category: "oop",
    tagline: "Work at the right level of detail; suppress lower-level complexity.",
    difficulty: "Beginner",
    intro:
      "Abstraction means working at an appropriate level of detail and hiding the complexity below it. A good abstraction lets you use something by intent, without needing to understand its inner workings.",
    body: [
      {
        type: "paragraph",
        text: "A caller should be able to use `fetchAreaName(latitude, longitude)` without knowing how network requests, JSON parsing, retries, and fallback names work internally. Each layer of a system is an abstraction over the one below it.",
      },
      {
        type: "list",
        items: [
          "**Data abstraction** — hide how data is represented behind operations.",
          "**Control abstraction** — hide how a task is carried out behind a named call.",
          "Pick the level of detail that matters to the caller and hide the rest.",
        ],
      },
    ],
    playground: {
      code: `// the caller works at a high level of abstraction
function fetchAreaName(lat, lng) {
  // (pretend) network, parsing, retries, fallbacks all hidden here
  return lat > 0 ? "Northern Place" : "Southern Place";
}

console.log(fetchAreaName(1.35, 103.8));
console.log(fetchAreaName(-33.8, 151.2));`,
    },
    keyPoints: [
      "Abstraction = the right level of detail, complexity hidden below.",
      "Use things by intent, not by their internals.",
      "Layers of a system are layers of abstraction.",
    ],
    related: ["interface-implementation", "encapsulation", "facade"],
  },
  {
    slug: "inheritance",
    title: "Inheritance",
    category: "oop",
    tagline: "A subclass reuses and specializes the behavior of a superclass.",
    difficulty: "Intermediate",
    intro:
      "Inheritance lets a subclass reuse and specialize behavior from a superclass, modeling an 'is-a' relationship. Use it only when the subclass is genuinely substitutable for the superclass — not merely to share a few lines of code.",
    body: [
      { type: "heading", text: "Use it for true 'is-a'" },
      {
        type: "paragraph",
        text: "A `SavingsAccount` is-an `Account`, so inheritance fits. But reaching for inheritance just to reuse code often leads to fragile hierarchies and Liskov Substitution violations. When you only want to share behavior, prefer composition.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Don't inherit just to reuse code",
        text: "If the subclass isn't a faithful kind of the superclass, composition is usually the better tool. See Composition over Inheritance and the Liskov Substitution Principle.",
      },
    ],
    playground: {
      code: `class Account {
  constructor(balance) { this.balance = balance; }
  describe() { return "balance: " + this.balance; }
}
class SavingsAccount extends Account {  // is-an Account
  addInterest(rate) { this.balance += this.balance * rate; }
}

const s = new SavingsAccount(100);
s.addInterest(0.1);
console.log(s.describe()); // reused behavior + specialization`,
    },
    keyPoints: [
      "Inheritance models 'is-a' and enables reuse + specialization.",
      "Only inherit when the subtype is truly substitutable.",
      "Prefer composition when you just want to share behavior.",
    ],
    related: ["polymorphism", "composition-over-inheritance", "lsp"],
  },
  {
    slug: "polymorphism",
    title: "Polymorphism",
    category: "oop",
    tagline: "One interface, many behaviors chosen at runtime.",
    difficulty: "Intermediate",
    intro:
      "Polymorphism lets code use a common interface while different implementations provide different behavior. The caller works against the shared interface and doesn't need to know which concrete type it's dealing with.",
    body: [
      {
        type: "paragraph",
        text: "`Command.execute()` can run an `AddCommand`, `DeleteCommand`, or `ListCommand` without the caller knowing the concrete command type. This is what makes the Open/Closed Principle and many design patterns (Strategy, Command, State) possible.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Polymorphism replaces conditionals",
        text: "Instead of a switch that checks a type tag, give each type its own implementation and call the shared method. Adding a type no longer means editing existing code.",
      },
    ],
    beforeAfter: {
      before: `function run(cmd) {
  if (cmd.type === "add") return addItem(cmd);
  if (cmd.type === "delete") return deleteItem(cmd);
  if (cmd.type === "list") return listItems(cmd);
}`,
      after: `class AddCommand { execute() { return "added"; } }
class DeleteCommand { execute() { return "deleted"; } }
class ListCommand { execute() { return "listed"; } }

// caller is polymorphic — no type checks
const run = (cmd) => cmd.execute();`,
      notes: [
        "Each command owns its behavior behind a shared interface.",
        "Adding a command means adding a class, not editing run().",
      ],
    },
    playground: {
      code: `class AddCommand { execute() { return "added"; } }
class DeleteCommand { execute() { return "deleted"; } }

const run = (cmd) => cmd.execute();
for (const c of [new AddCommand(), new DeleteCommand()]) {
  console.log(run(c));
}`,
    },
    keyPoints: [
      "Same interface, different runtime behavior.",
      "Enables OCP and patterns like Strategy/Command/State.",
      "Replaces type-checking conditionals with method calls.",
    ],
    related: ["inheritance", "ocp", "strategy", "command"],
  },
  {
    slug: "associations",
    title: "Associations, Navigability & Multiplicity",
    category: "oop",
    tagline: "Long-term links between classes — who knows whom, and how many.",
    difficulty: "Intermediate",
    intro:
      "An association is a long-term link between objects or classes (e.g. a `UserProfile` is associated with many `Pin` objects). Two further properties describe an association: navigability (which class knows about the other) and multiplicity (how many objects participate).",
    body: [
      { type: "heading", text: "Navigability" },
      {
        type: "paragraph",
        text: "Navigability describes which class can reach the other. If `MapPage` holds a `PinService`, then `MapPage` can navigate to `PinService` — but that does not automatically mean `PinService` should know about `MapPage`. Keeping navigability one-directional reduces coupling.",
      },
      { type: "heading", text: "Multiplicity" },
      {
        type: "table",
        headers: ["Notation", "Meaning"],
        rows: [
          ["`0..1`", "Optional — zero or one"],
          ["`1`", "Exactly one"],
          ["`*`", "Zero or more"],
          ["`n..m`", "Between n and m"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Association vs dependency",
        text: "An association is a long-term link (a stored reference). A dependency is a temporary use relationship (a parameter used and forgotten). See the Dependencies lesson.",
      },
    ],
    keyPoints: [
      "Association = a long-term link between classes.",
      "Navigability = who knows about whom (prefer one-directional).",
      "Multiplicity = how many objects take part (0..1, 1, *, n..m).",
    ],
    related: ["dependencies", "coupling-cohesion", "domain-model"],
  },
  {
    slug: "dependencies",
    title: "Dependencies",
    category: "oop",
    tagline: "A temporary 'uses' relationship, not a long-term link.",
    difficulty: "Beginner",
    intro:
      "A dependency is a temporary use relationship rather than a long-term association. The classic example: a method receives an object as a parameter, uses it, and does not store it. When the method returns, the relationship is gone.",
    body: [
      {
        type: "paragraph",
        text: "Distinguishing dependencies from associations clarifies a design. A stored reference (field) is an association; a transient collaborator (parameter, local variable, return value) is a dependency. Fewer and looser dependencies mean lower coupling.",
      },
    ],
    playground: {
      code: `// 'formatter' is a dependency: used, then forgotten
function printReport(data, formatter) {
  return formatter.format(data); // not stored on 'this'
}

const upper = { format: (d) => d.toUpperCase() };
console.log(printReport("report ready", upper));`,
    },
    keyPoints: [
      "Dependency = temporary 'uses', often via a parameter.",
      "Association = long-term link via a stored reference.",
      "Fewer/looser dependencies → lower coupling.",
    ],
    related: ["associations", "coupling-cohesion", "dependency-injection"],
  },
  {
    slug: "enumerations",
    title: "Enumerations",
    category: "oop",
    tagline: "A fixed set of valid values that makes invalid states unrepresentable.",
    difficulty: "Beginner",
    intro:
      "An enumeration is a fixed set of possible values. Use one when only a limited set of values is valid — it documents the options and makes invalid values much harder to represent.",
    body: [
      {
        type: "paragraph",
        text: "Reach for an enumeration instead of free-form strings or magic numbers when the set is closed and known, such as priorities or statuses.",
      },
      {
        type: "list",
        items: [
          "`LOW`, `MEDIUM`, `HIGH`",
          "`PENDING`, `APPROVED`, `REJECTED`",
          "`RESTAURANT`, `ACTIVITY`, `CUSTOM`",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Make illegal states unrepresentable",
        text: "If a value can only be one of a few options, an enumeration stops the rest of the codebase from ever holding an invalid one.",
      },
    ],
    playground: {
      code: `const Priority = Object.freeze({ LOW: "LOW", MEDIUM: "MEDIUM", HIGH: "HIGH" });

function label(p) {
  if (!Object.values(Priority).includes(p)) throw new Error("invalid priority");
  return "Priority: " + p;
}

console.log(label(Priority.HIGH));
try { label("URGENT"); } catch (e) { console.log("rejected:", e.message); }`,
    },
    keyPoints: [
      "Enumerations model a fixed, closed set of valid values.",
      "They make invalid values hard to represent.",
      "Prefer them over magic strings/numbers for closed sets.",
    ],
    related: ["fail-fast", "least-astonishment"],
  },
];
