import type { Lesson } from "../types";

export const behavioral: Lesson[] = [
  {
    slug: "strategy",
    title: "Strategy",
    category: "behavioral",
    tagline: "Make an algorithm swappable by encapsulating each variant.",
    difficulty: "Beginner",
    intro:
      "The Strategy pattern defines a family of interchangeable algorithms, each in its own object, and lets the client pick one at runtime. The context delegates the work to whichever strategy it's given, so behavior can change without changing the context.",
    body: [
      { type: "heading", text: "Behavior as a parameter" },
      {
        type: "paragraph",
        text: "Instead of a context full of if/else picking how to do something, you inject a strategy object (or function) that knows how. Adding a new behavior means adding a new strategy — never editing the context.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Swap at runtime",
        text: "Pick a sorting or pricing strategy from a dropdown and watch the same context produce different results. Try it in the visualization.",
      },
    ],
    viz: "strategy",
    beforeAfter: {
      before: `function checkout(cart, customer) {
  // context hard-codes every discount rule
  let total = cart.total;
  if (customer.type === "vip") total *= 0.8;
  else if (customer.type === "employee") total *= 0.6;
  else if (customer.type === "student") total *= 0.9;
  return total;
}`,
      after: `const discounts = {
  vip: (t) => t * 0.8,
  employee: (t) => t * 0.6,
  student: (t) => t * 0.9,
  none: (t) => t,
};
function checkout(cart, strategy) {
  return strategy(cart.total); // inject the algorithm
}`,
      notes: [
        "Each discount rule is an independent strategy.",
        "Add a rule without touching checkout (Open/Closed).",
        "The context just delegates.",
      ],
    },
    playground: {
      caption: "Swap the strategy passed to checkout and rerun.",
      code: `const discounts = {
  vip: (t) => t * 0.8,
  student: (t) => t * 0.9,
  none: (t) => t,
};
const checkout = (total, strategy) => strategy(total);

console.log("vip:", checkout(100, discounts.vip));
console.log("student:", checkout(100, discounts.student));
console.log("none:", checkout(100, discounts.none));`,
    },
    keyPoints: [
      "Encapsulate interchangeable algorithms.",
      "Select behavior at runtime by injecting a strategy.",
      "Add behaviors without modifying the context (OCP).",
    ],
    related: ["ocp", "composition-over-inheritance", "state", "dip"],
  },
  {
    slug: "observer",
    title: "Observer",
    category: "behavioral",
    tagline: "Notify many dependents automatically when one object changes.",
    difficulty: "Intermediate",
    also: "Publish–Subscribe (closely related)",
    intro:
      "The Observer pattern defines a one-to-many dependency: when a subject changes state, all its registered observers are notified automatically. It underpins event systems, reactive UIs, and the publish–subscribe model.",
    body: [
      { type: "heading", text: "Loose coupling between source and listeners" },
      {
        type: "paragraph",
        text: "The subject doesn't know what observers do — it just emits. Observers subscribe and react. You can add or remove listeners freely without changing the subject, keeping the two sides decoupled.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Observer vs. Pub/Sub",
        text: "Classic Observer wires subject directly to observers. Pub/Sub adds a broker/event channel in between, decoupling them further. See the Pub/Sub architecture lesson.",
      },
    ],
    viz: "observer",
    beforeAfter: {
      before: `class Stock {
  setPrice(p) {
    this.price = p;
    // subject is hard-wired to every consumer
    ui.refresh(p);
    logger.record(p);
    alerts.maybeFire(p);
  }
}`,
      after: `class Subject {
  #observers = new Set();
  subscribe(fn){ this.#observers.add(fn); return () => this.#observers.delete(fn); }
  notify(data){ this.#observers.forEach((fn) => fn(data)); }
}
class Stock extends Subject {
  setPrice(p){ this.price = p; this.notify(p); } // doesn't know who listens
}`,
      notes: [
        "The subject emits; it doesn't know its listeners.",
        "Add/remove observers without touching the subject.",
        "subscribe() returns an unsubscribe function.",
      ],
    },
    playground: {
      code: `class Subject {
  #observers = new Set();
  subscribe(fn){ this.#observers.add(fn); return () => this.#observers.delete(fn); }
  notify(data){ this.#observers.forEach((fn) => fn(data)); }
}

const stock = new Subject();
const off = stock.subscribe((p) => console.log("UI shows", p));
stock.subscribe((p) => console.log("Logger records", p));

stock.notify(101);
off(); // UI unsubscribes
stock.notify(102);`,
    },
    keyPoints: [
      "One subject, many auto-notified observers.",
      "Subject and observers stay loosely coupled.",
      "Foundation of events and reactive UIs.",
    ],
    related: ["pub-sub", "mediator", "mvc", "coupling-cohesion"],
  },
  {
    slug: "command",
    title: "Command",
    category: "behavioral",
    tagline: "Turn a request into a standalone object you can store and replay.",
    difficulty: "Intermediate",
    intro:
      "The Command pattern packages a request — the action plus its arguments — into an object. That object can be queued, logged, passed around, and (crucially) undone, decoupling the invoker from the thing that performs the work.",
    body: [
      {
        type: "paragraph",
        text: "Because each command is a first-class object with execute() (and often undo()), you get undo/redo, macros, queues, and transaction logs almost for free.",
      },
    ],
    beforeAfter: {
      before: `// the button knows exactly what to do — and can't undo it
button.onClick = () => document.text += "hello";`,
      after: `class InsertText {
  constructor(doc, text){ this.doc = doc; this.text = text; }
  execute(){ this.doc.text += this.text; }
  undo(){ this.doc.text = this.doc.text.slice(0, -this.text.length); }
}
// invoker just runs commands and keeps a history for undo`,
      notes: [
        "Requests become objects you can store and replay.",
        "undo() enables a history stack for free.",
        "Invoker is decoupled from the action's details.",
      ],
    },
    playground: {
      code: `class Editor { text = ""; }
class InsertText {
  constructor(doc, t){ this.doc = doc; this.t = t; }
  execute(){ this.doc.text += this.t; }
  undo(){ this.doc.text = this.doc.text.slice(0, -this.t.length); }
}

const doc = new Editor();
const history = [];
function run(cmd){ cmd.execute(); history.push(cmd); }

run(new InsertText(doc, "Hello "));
run(new InsertText(doc, "World"));
console.log("text:", doc.text);
history.pop().undo();
console.log("after undo:", doc.text);`,
    },
    keyPoints: [
      "Encapsulate a request as an object.",
      "Enables undo/redo, queues, logging, and macros.",
      "Decouples the invoker from the receiver.",
    ],
    related: ["memento", "strategy"],
  },
  {
    slug: "state",
    title: "State",
    category: "behavioral",
    tagline: "Let an object change its behavior when its internal state changes.",
    difficulty: "Intermediate",
    intro:
      "The State pattern lets an object alter its behavior as its internal state changes, as if it switched classes. Each state is its own object that knows how to handle events and which state to transition to next — replacing sprawling conditionals.",
    body: [
      {
        type: "paragraph",
        text: "Instead of giant if/else blocks scattered across methods checking the current mode, each state encapsulates its own behavior and transitions. It's a finite state machine expressed in objects.",
      },
    ],
    beforeAfter: {
      before: `function next(doc) {
  if (doc.state === "draft") doc.state = "review";
  else if (doc.state === "review") doc.state = "published";
  else if (doc.state === "published") throw new Error("done");
}`,
      after: `const states = {
  draft:     { next: () => "review" },
  review:    { next: () => "published" },
  published: { next: () => { throw new Error("already published"); } },
};
function next(doc){ doc.state = states[doc.state].next(); }`,
      notes: [
        "Each state owns its own transition logic.",
        "Adding a state doesn't touch the others.",
      ],
    },
    playground: {
      code: `const states = {
  draft:     { next: () => "review" },
  review:    { next: () => "published" },
  published: { next: () => { throw new Error("already published"); } },
};
const doc = { state: "draft" };
const advance = () => { doc.state = states[doc.state].next(); };

advance(); console.log(doc.state);
advance(); console.log(doc.state);
try { advance(); } catch (e) { console.log("blocked:", e.message); }`,
    },
    keyPoints: [
      "Behavior changes with internal state.",
      "Each state is its own object (a finite state machine).",
      "Replaces large mode-checking conditionals.",
    ],
    related: ["strategy", "ocp"],
  },
  {
    slug: "template-method",
    title: "Template Method",
    category: "behavioral",
    tagline: "Define an algorithm's skeleton, deferring some steps to subclasses.",
    difficulty: "Intermediate",
    intro:
      "The Template Method pattern defines the overall structure of an algorithm in a base method while letting subclasses override specific steps. The shared sequence stays in one place; only the varying steps are customized.",
    body: [
      {
        type: "paragraph",
        text: "It captures the 'don't call us, we'll call you' (Hollywood) principle: the base class controls the flow and calls down into the steps subclasses provide.",
      },
    ],
    beforeAfter: {
      before: `// each parser duplicates the same open/parse/close sequence
class CsvParser { run(){ this.open(); this.parseCsv(); this.close(); } }
class XmlParser { run(){ this.open(); this.parseXml(); this.close(); } }`,
      after: `class Parser {
  run(){ this.open(); this.parse(); this.close(); } // template (fixed)
  open(){ console.log("open"); }
  close(){ console.log("close"); }
  parse(){ throw new Error("override me"); }         // step (varies)
}
class CsvParser extends Parser { parse(){ console.log("parse csv"); } }`,
      notes: [
        "The shared sequence lives in one place.",
        "Subclasses fill in only the step that differs.",
      ],
    },
    playground: {
      code: `class Parser {
  run(){ this.open(); this.parse(); this.close(); }
  open(){ console.log("open"); }
  close(){ console.log("close"); }
  parse(){ throw new Error("override me"); }
}
class CsvParser extends Parser { parse(){ console.log("parse CSV rows"); } }
class JsonParser extends Parser { parse(){ console.log("parse JSON tree"); } }

new CsvParser().run();
new JsonParser().run();`,
    },
    keyPoints: [
      "Fix the algorithm's skeleton; vary specific steps.",
      "Eliminates duplicated control flow.",
      "Base class drives; subclasses fill in the gaps.",
    ],
    related: ["strategy", "ocp"],
  },
  {
    slug: "iterator",
    title: "Iterator",
    category: "behavioral",
    tagline: "Traverse a collection without exposing its internal structure.",
    difficulty: "Beginner",
    intro:
      "The Iterator pattern provides a standard way to walk through the elements of a collection without revealing how it stores them. Clients ask for 'the next element' through a uniform interface, whatever the underlying structure.",
    body: [
      {
        type: "paragraph",
        text: "Most languages bake this in. In JavaScript, implementing Symbol.iterator makes any object work with for...of, the spread operator, and destructuring.",
      },
    ],
    beforeAfter: {
      before: `// callers must know it's backed by an array AND a tree
for (let i = 0; i < list.items.length; i++) { use(list.items[i]); }`,
      after: `class Range {
  constructor(start, end){ this.start = start; this.end = end; }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i;
  }
}
for (const n of new Range(1, 5)) { /* uniform traversal */ }`,
      notes: [
        "Callers traverse without knowing the internal storage.",
        "Works with for...of, spread, and destructuring.",
      ],
    },
    playground: {
      code: `class Range {
  constructor(start, end){ this.start = start; this.end = end; }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i;
  }
}

console.log([...new Range(1, 5)]);
for (const n of new Range(8, 10)) console.log("n =", n);`,
    },
    keyPoints: [
      "Uniform traversal independent of storage.",
      "Hides the collection's internal structure.",
      "In JS, implement Symbol.iterator for for...of support.",
    ],
    related: ["composite", "encapsulation"],
  },
  {
    slug: "mediator",
    title: "Mediator",
    category: "behavioral",
    tagline: "Centralize communication so objects don't refer to each other directly.",
    difficulty: "Intermediate",
    intro:
      "The Mediator pattern introduces an object that coordinates interactions between a set of components. Instead of many-to-many references, components talk only to the mediator, which routes the communication — reducing tangled dependencies.",
    body: [
      {
        type: "paragraph",
        text: "Think of an air-traffic control tower: planes don't negotiate with each other, they all talk to the tower. The mediator turns a chaotic mesh into a clean hub-and-spoke.",
      },
    ],
    beforeAfter: {
      before: `// every widget references every other widget
checkbox.onChange = () => { button.enabled = checkbox.checked; label.update(); };
button.onClick   = () => { checkbox.reset(); label.update(); };`,
      after: `class FormMediator {
  notify(sender, event){
    // one place coordinates all widget interactions
    if (event === "toggle") this.button.enabled = sender.checked;
  }
}`,
      notes: [
        "Widgets know only the mediator, not each other.",
        "Interaction rules live in one coordinating object.",
      ],
    },
    playground: {
      code: `class Mediator {
  register(name, comp){ this[name] = comp; comp.mediator = this; }
  notify(sender, event){
    if (event === "toggle") {
      this.button.enabled = sender.checked;
      console.log("button enabled:", this.button.enabled);
    }
  }
}
const m = new Mediator();
m.register("checkbox", { checked: false });
m.register("button", { enabled: false });

m.checkbox.checked = true;
m.notify(m.checkbox, "toggle");`,
    },
    keyPoints: [
      "Components communicate via a central mediator.",
      "Turns many-to-many links into hub-and-spoke.",
      "Reduces tangled inter-object dependencies.",
    ],
    related: ["observer", "facade"],
  },
  {
    slug: "chain-of-responsibility",
    title: "Chain of Responsibility",
    category: "behavioral",
    tagline: "Pass a request along a chain until a handler deals with it.",
    difficulty: "Intermediate",
    intro:
      "The Chain of Responsibility pattern lets you pass a request through a chain of handlers. Each handler decides either to process the request or to forward it to the next one — decoupling the sender from the specific receiver.",
    body: [
      {
        type: "paragraph",
        text: "Middleware pipelines (web servers, validation, logging) are the everyday incarnation: each link can handle, transform, short-circuit, or pass the request onward.",
      },
    ],
    beforeAfter: {
      before: `function handle(req) {
  // one function checks every concern in sequence
  if (!authenticated(req)) return "401";
  if (!authorized(req)) return "403";
  if (!validBody(req)) return "400";
  return process(req);
}`,
      after: `const auth     = (req, next) => authenticated(req) ? next(req) : "401";
const validate = (req, next) => validBody(req) ? next(req) : "400";
const pipeline = [auth, validate].reduceRight(
  (next, mw) => (req) => mw(req, next), process);`,
      notes: [
        "Each handler is independent and reorderable.",
        "Any link can short-circuit the chain.",
      ],
    },
    playground: {
      code: `const handlers = [
  (req, next) => req.user ? next(req) : "401 unauthenticated",
  (req, next) => req.body ? next(req) : "400 empty body",
];
const finalHandler = (req) => "200 ok for " + req.user;
const chain = handlers.reduceRight(
  (next, h) => (req) => h(req, next), finalHandler);

console.log(chain({ user: "ada", body: "hi" }));
console.log(chain({ body: "hi" }));`,
    },
    keyPoints: [
      "Requests flow through a chain of handlers.",
      "Each handler processes or forwards.",
      "The basis of middleware pipelines.",
    ],
    related: ["command", "decorator"],
  },
  {
    slug: "memento",
    title: "Memento",
    category: "behavioral",
    tagline: "Capture and restore an object's state without breaking encapsulation.",
    difficulty: "Intermediate",
    intro:
      "The Memento pattern captures an object's internal state into a snapshot that can be restored later, without exposing the object's internals. It's the engine behind undo, checkpoints, and save/restore.",
    body: [
      {
        type: "paragraph",
        text: "The originator creates a memento of its current state; a caretaker holds onto snapshots and hands one back to restore. The internal structure stays hidden from the caretaker.",
      },
    ],
    beforeAfter: {
      before: `// caller pokes at internals to save/restore — leaks structure
const saved = { x: editor.x, y: editor.y, sel: editor.selection };
editor.x = saved.x; editor.y = saved.y; editor.selection = saved.sel;`,
      after: `class Editor {
  #state = { content: "" };
  type(t){ this.#state.content += t; }
  save(){ return JSON.stringify(this.#state); }   // memento
  restore(m){ this.#state = JSON.parse(m); }
  get content(){ return this.#state.content; }
}`,
      notes: [
        "State is captured without exposing internals.",
        "Caretaker stores opaque snapshots only.",
      ],
    },
    playground: {
      code: `class Editor {
  #state = { content: "" };
  type(t){ this.#state.content += t; return this; }
  save(){ return JSON.stringify(this.#state); }
  restore(m){ this.#state = JSON.parse(m); }
  get content(){ return this.#state.content; }
}

const ed = new Editor();
ed.type("Hello");
const checkpoint = ed.save();
ed.type(" World");
console.log("now:", ed.content);
ed.restore(checkpoint);
console.log("restored:", ed.content);`,
    },
    keyPoints: [
      "Snapshot and restore state safely.",
      "Doesn't expose the object's internals.",
      "Powers undo, checkpoints, and save systems.",
    ],
    related: ["command", "encapsulation"],
  },
  {
    slug: "visitor",
    title: "Visitor",
    category: "behavioral",
    tagline: "Add new operations to a structure without changing its classes.",
    difficulty: "Advanced",
    intro:
      "The Visitor pattern lets you define a new operation over a set of object types without modifying those types. You move the operation into a 'visitor' object, and each element accepts a visitor that performs the right action for its type.",
    body: [
      {
        type: "paragraph",
        text: "It's the trade-off opposite of OCP-by-subclassing: Visitor makes adding operations easy (one new visitor) but adding element types hard (update every visitor). Great when the type set is stable but operations keep growing.",
      },
    ],
    beforeAfter: {
      before: `// every new operation means editing every node class
class Circle { area(){} perimeter(){} toSvg(){} export(){} /* ... */ }
class Square { area(){} perimeter(){} toSvg(){} export(){} /* ... */ }`,
      after: `class Circle { accept(v){ return v.circle(this); } constructor(r){ this.r = r; } }
class Square { accept(v){ return v.square(this); } constructor(s){ this.s = s; } }

const areaVisitor = {
  circle: (c) => Math.PI * c.r ** 2,
  square: (s) => s.s ** 2,
};`,
      notes: [
        "Add an operation by writing one new visitor.",
        "Node classes stay closed to modification.",
      ],
    },
    playground: {
      code: `class Circle { constructor(r){ this.r = r; } accept(v){ return v.circle(this); } }
class Square { constructor(s){ this.s = s; } accept(v){ return v.square(this); } }

const area = { circle: (c) => Math.PI*c.r**2, square: (s) => s.s**2 };
const name = { circle: () => "circle", square: () => "square" };

const shapes = [new Circle(2), new Square(3)];
for (const s of shapes)
  console.log(s.accept(name), "area =", s.accept(area).toFixed(2));`,
    },
    keyPoints: [
      "Add operations without touching element classes.",
      "Best when types are stable but operations grow.",
      "Adding a new type means updating each visitor.",
    ],
    related: ["composite", "ocp"],
  },
  {
    slug: "interpreter",
    title: "Interpreter",
    category: "behavioral",
    tagline: "Represent a small language's grammar and evaluate its expressions.",
    difficulty: "Advanced",
    intro:
      "The Interpreter pattern defines a representation for a simple language's grammar along with an interpreter that evaluates sentences in it. Each grammar rule becomes a class/node with an interpret() method.",
    body: [
      {
        type: "paragraph",
        text: "It fits small, well-defined languages — search filters, formula evaluators, rule engines. For anything large, a real parser/compiler toolchain is the better tool.",
      },
    ],
    beforeAfter: {
      before: `// ad-hoc string parsing scattered through the code
if (rule === "2 + 3") return 5; // brittle, not general`,
      after: `const num = (n) => ({ interpret: () => n });
const add = (a, b) => ({ interpret: () => a.interpret() + b.interpret() });
const mul = (a, b) => ({ interpret: () => a.interpret() * b.interpret() });
// build an expression tree, then evaluate it
const expr = add(num(2), mul(num(3), num(4)));`,
      notes: [
        "Each grammar rule is a small composable node.",
        "Expressions become trees you can evaluate or transform.",
      ],
    },
    playground: {
      code: `const num = (n) => ({ interpret: () => n });
const add = (a, b) => ({ interpret: () => a.interpret() + b.interpret() });
const mul = (a, b) => ({ interpret: () => a.interpret() * b.interpret() });

// 2 + 3 * 4
const expr = add(num(2), mul(num(3), num(4)));
console.log("result:", expr.interpret());`,
    },
    keyPoints: [
      "Model a small language's grammar as objects.",
      "Each rule has an interpret() method.",
      "Good for small DSLs; use real parsers for big ones.",
    ],
    related: ["composite", "visitor"],
  },
];
