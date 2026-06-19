import type { Lesson } from "../types";

export const solid: Lesson[] = [
  {
    slug: "srp",
    title: "Single Responsibility Principle",
    category: "solid",
    tagline: "A class should have only one reason to change.",
    difficulty: "Intermediate",
    also: "SRP — the S in SOLID",
    intro:
      "The Single Responsibility Principle states that a module should have one, and only one, reason to change. Each responsibility is an axis of change; when a class juggles several, a change to one can break the others, and the class becomes hard to understand and test.",
    body: [
      { type: "heading", text: "What counts as a 'responsibility'?" },
      {
        type: "paragraph",
        text: "Think in terms of who asks for changes. If the finance team, the formatting team, and the database team would all request changes to the same class, it has three responsibilities — and three reasons to change.",
      },
      {
        type: "callout",
        variant: "key",
        title: "One reason to change",
        text: "Split responsibilities so each class serves a single actor. The visualization shows a bloated class splitting into focused collaborators.",
      },
    ],
    viz: "srp",
    beforeAfter: {
      before: `class Report {
  constructor(data) { this.data = data; }
  calculateTotals() { /* business logic */ }
  formatHtml() { /* presentation */ }
  saveToFile(path) { /* persistence */ }
}`,
      after: `class Report {            // owns the data + calculations
  constructor(data) { this.data = data; }
  calculateTotals() { /* ... */ }
}
class ReportFormatter {  // owns presentation
  toHtml(report) { /* ... */ }
}
class ReportStore {      // owns persistence
  save(report, path) { /* ... */ }
}`,
      notes: [
        "Each class now has a single reason to change.",
        "Formatting changes never risk breaking persistence.",
        "Each piece can be tested and reused independently.",
      ],
    },
    playground: {
      code: `class Report {
  constructor(data) { this.data = data; }
  total() { return this.data.reduce((s, n) => s + n, 0); }
}
class ReportFormatter {
  toText(report) { return "Total: " + report.total(); }
}

const report = new Report([10, 20, 30]);
console.log(new ReportFormatter().toText(report));`,
    },
    keyPoints: [
      "One class, one reason to change.",
      "Separate business logic, presentation, and persistence.",
      "Smaller responsibilities are easier to test and reuse.",
    ],
    related: ["separation-of-concerns", "coupling-cohesion", "ocp"],
  },
  {
    slug: "ocp",
    title: "Open/Closed Principle",
    category: "solid",
    tagline: "Open for extension, closed for modification.",
    difficulty: "Intermediate",
    also: "OCP — the O in SOLID",
    intro:
      "The Open/Closed Principle says software entities should be open for extension but closed for modification. You should be able to add new behavior by adding new code, not by editing existing, tested code — which reduces the risk of breaking what already works.",
    body: [
      { type: "heading", text: "The growing switch statement" },
      {
        type: "paragraph",
        text: "A long if/else or switch that you edit every time a new case appears is the classic OCP smell. Each edit risks breaking the existing branches. Polymorphism lets you add a new type instead of modifying the old code.",
      },
    ],
    viz: "ocp",
    beforeAfter: {
      before: `function area(shape) {
  // must edit this function for every new shape
  switch (shape.kind) {
    case "circle": return Math.PI * shape.r ** 2;
    case "square": return shape.side ** 2;
    // add "triangle"? edit here and risk the rest
  }
}`,
      after: `class Circle { constructor(r){ this.r = r; } area(){ return Math.PI * this.r**2; } }
class Square { constructor(s){ this.s = s; } area(){ return this.s**2; } }
// New shape = new class. No existing code is touched.
class Triangle { constructor(b,h){ this.b=b; this.h=h; } area(){ return 0.5*this.b*this.h; } }

const totalArea = (shapes) => shapes.reduce((s, x) => s + x.area(), 0);`,
      notes: [
        "Adding a shape means adding a class, not editing a switch.",
        "Existing, tested shapes are never modified.",
        "Each shape owns its own area formula (high cohesion).",
      ],
    },
    playground: {
      code: `class Circle { constructor(r){ this.r = r; } area(){ return Math.PI*this.r**2; } }
class Square { constructor(s){ this.s = s; } area(){ return this.s**2; } }
class Triangle { constructor(b,h){ this.b=b; this.h=h; } area(){ return 0.5*this.b*this.h; } }

const shapes = [new Circle(2), new Square(3), new Triangle(4, 5)];
const total = shapes.reduce((sum, s) => sum + s.area(), 0);
console.log("total area:", total.toFixed(2));`,
    },
    keyPoints: [
      "Add features by adding code, not editing tested code.",
      "Replace growing switch statements with polymorphism.",
      "Reduces the risk of regressions.",
    ],
    related: ["srp", "strategy", "lsp"],
  },
  {
    slug: "lsp",
    title: "Liskov Substitution Principle",
    category: "solid",
    tagline: "Subtypes must be usable anywhere their base type is expected.",
    difficulty: "Advanced",
    also: "LSP — the L in SOLID",
    intro:
      "Named after Barbara Liskov, this principle says objects of a subclass should be substitutable for their superclass without breaking the program. A subtype must honor the contract of its base type — same expectations, no nasty surprises.",
    body: [
      { type: "heading", text: "The classic counter-example" },
      {
        type: "paragraph",
        text: "A Square 'is-a' Rectangle mathematically, but if Square forces width and height to stay equal, code that sets them independently breaks. The subtype violated the base type's contract — an LSP violation.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Symptoms of a violation",
        text: "Overrides that throw 'not supported', type checks like `if (x instanceof Penguin)`, or weakened guarantees all signal a broken substitution.",
      },
    ],
    viz: "lsp",
    beforeAfter: {
      before: `class Rectangle {
  setWidth(w){ this.w = w; }
  setHeight(h){ this.h = h; }
  area(){ return this.w * this.h; }
}
class Square extends Rectangle {
  setWidth(w){ this.w = this.h = w; }   // breaks caller expectations
  setHeight(h){ this.w = this.h = h; }
}
// code expecting a Rectangle now gets wrong areas`,
      after: `// Don't force a broken "is-a". Model the shared contract instead.
class Shape { area(){ throw new Error("abstract"); } }
class Rectangle extends Shape {
  constructor(w, h){ super(); this.w = w; this.h = h; }
  area(){ return this.w * this.h; }
}
class Square extends Shape {
  constructor(side){ super(); this.side = side; }
  area(){ return this.side ** 2; }
}`,
      notes: [
        "Square no longer pretends to be a mutable Rectangle.",
        "Any Shape can substitute for another via area().",
        "Callers get correct results regardless of the concrete type.",
      ],
    },
    playground: {
      code: `class Shape { area(){ throw new Error("abstract"); } }
class Rectangle extends Shape {
  constructor(w,h){ super(); this.w=w; this.h=h; }
  area(){ return this.w*this.h; }
}
class Square extends Shape {
  constructor(s){ super(); this.s=s; }
  area(){ return this.s**2; }
}

// works for ANY Shape subtype — substitution holds
const printArea = (shape) => console.log("area:", shape.area());
printArea(new Rectangle(3, 4));
printArea(new Square(5));`,
    },
    keyPoints: [
      "A subtype must honor its base type's contract.",
      "Don't weaken guarantees or throw on inherited methods.",
      "If substitution breaks, prefer composition or a shared abstraction.",
    ],
    related: ["composition-over-inheritance", "ocp", "isp"],
  },
  {
    slug: "isp",
    title: "Interface Segregation Principle",
    category: "solid",
    tagline: "Don't force clients to depend on methods they don't use.",
    difficulty: "Intermediate",
    also: "ISP — the I in SOLID",
    intro:
      "The Interface Segregation Principle says many small, focused interfaces are better than one large, general-purpose one. Clients should depend only on the methods they actually need, so changes to unrelated methods don't affect them.",
    body: [
      { type: "heading", text: "Fat interfaces leak" },
      {
        type: "paragraph",
        text: "A bloated interface forces every implementer to provide methods it may not support — often by throwing 'not implemented'. Splitting it lets each client depend on exactly the slice it uses.",
      },
    ],
    viz: "isp",
    beforeAfter: {
      before: `// one fat "Machine" interface
class Machine {
  print(doc){} scan(doc){} fax(doc){}
}
// a simple printer is forced to implement scan + fax
class SimplePrinter extends Machine {
  print(doc){ /* ok */ }
  scan(){ throw new Error("not supported"); }  // smell
  fax(){ throw new Error("not supported"); }
}`,
      after: `// small, focused roles
const Printer = { print(doc){} };
const Scanner = { scan(doc){} };

// implement only what you support
class SimplePrinter { print(doc){ /* ... */ } }
class AllInOne { print(doc){} scan(doc){} } // opts into both`,
      notes: [
        "A simple printer implements only print().",
        "No more 'not supported' stubs.",
        "Clients depend on just the role they need.",
      ],
    },
    playground: {
      code: `const makePrinter = () => ({ print: (d) => console.log("printing:", d) });
const makeScanner = () => ({ scan: (d) => console.log("scanning:", d) });

const simple = makePrinter();
const allInOne = { ...makePrinter(), ...makeScanner() };

simple.print("invoice.pdf");
allInOne.print("report.pdf");
allInOne.scan("photo.jpg");`,
    },
    keyPoints: [
      "Prefer several small interfaces over one large one.",
      "Clients should depend only on what they use.",
      "Eliminates 'not supported' stub methods.",
    ],
    related: ["srp", "encapsulation", "dip"],
  },
  {
    slug: "dip",
    title: "Dependency Inversion Principle",
    category: "solid",
    tagline: "Depend on abstractions, not on concrete implementations.",
    difficulty: "Advanced",
    also: "DIP — the D in SOLID",
    intro:
      "The Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions. This flips the usual dependency direction so policy code isn't chained to implementation details like a specific database or API.",
    body: [
      { type: "heading", text: "Inverting the arrow" },
      {
        type: "paragraph",
        text: "Normally high-level code calls low-level code directly, coupling the two. With DIP, the high-level module defines an abstraction it needs, and the low-level module implements it. Dependencies are injected, so you can swap implementations freely.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Enables testing & flexibility",
        text: "Because the high-level module depends on an interface, you can inject a real database in production and a fake in tests. Toggle the implementation in the visualization.",
      },
    ],
    viz: "dip",
    beforeAfter: {
      before: `class MySQLUsers {
  findAll(){ /* talks to MySQL */ }
}
class UserService {
  constructor(){ this.db = new MySQLUsers(); } // locked to MySQL
  list(){ return this.db.findAll(); }
}`,
      after: `// UserService depends on an abstraction it defines: { findAll() }
class UserService {
  constructor(repo){ this.repo = repo; } // injected
  list(){ return this.repo.findAll(); }
}
// low-level details implement the abstraction
class MySQLUsers { findAll(){ /* ... */ } }
class InMemoryUsers { findAll(){ return [{ name: "Ada" }]; } }`,
      notes: [
        "UserService no longer constructs its own dependency.",
        "Swap MySQL for an in-memory fake without changing UserService.",
        "Both sides depend on the abstraction, not each other.",
      ],
    },
    playground: {
      caption: "Inject any repository that satisfies the contract.",
      code: `class UserService {
  constructor(repo) { this.repo = repo; }
  list() { return this.repo.findAll(); }
}

const inMemory = { findAll: () => [{ name: "Ada" }, { name: "Linus" }] };
const fakeApi  = { findAll: () => [{ name: "Grace" }] };

console.log("memory:", new UserService(inMemory).list());
console.log("api:", new UserService(fakeApi).list());`,
    },
    keyPoints: [
      "High- and low-level modules both depend on abstractions.",
      "Inject dependencies instead of constructing them inside.",
      "Makes code swappable and easy to test.",
    ],
    related: ["coupling-cohesion", "dependency-injection", "isp"],
  },
];
