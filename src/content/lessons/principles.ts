import type { Lesson } from "../types";

export const principles: Lesson[] = [
  {
    slug: "dry",
    title: "DRY — Don't Repeat Yourself",
    category: "principles",
    tagline: "Every piece of knowledge should have a single, authoritative home.",
    difficulty: "Beginner",
    also: "Don't Repeat Yourself · Single Source of Truth for behavior",
    intro:
      "DRY says that every piece of knowledge in a system should have one unambiguous representation. When a rule lives in exactly one place, you change it once and everything that depends on it stays correct. Duplication is dangerous not because typing twice is slow, but because the copies drift apart over time.",
    body: [
      { type: "heading", text: "Why duplication hurts" },
      {
        type: "paragraph",
        text: "Copied logic looks harmless until a requirement changes. Now you must find every copy and update all of them identically. Miss one and you have a bug that only appears in some code paths — the worst kind to track down.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "DRY is about knowledge, not text",
        text: "Two snippets that look identical today but represent different decisions should stay separate. Forcing unrelated code to share just because it looks similar creates false coupling — a different kind of pain.",
      },
      { type: "heading", text: "How to apply it" },
      {
        type: "list",
        items: [
          "Extract repeated logic into a well-named function or module.",
          "Centralize constants, configuration, and validation rules.",
          "Generate derived data instead of hand-maintaining parallel copies.",
          "Pause before extracting: are these really the same rule, or do they just look alike right now?",
        ],
      },
    ],
    viz: "dry",
    beforeAfter: {
      before: `function priceWithTaxUS(amount) {
  return amount + amount * 0.07;
}
function priceWithTaxEU(amount) {
  return amount + amount * 0.20;
}
function shippingWithTax(amount) {
  // tax rate copied again — easy to forget when it changes
  return amount + amount * 0.07;
}`,
      after: `const TAX_RATES = { US: 0.07, EU: 0.2 };

function priceWithTax(amount, region) {
  const rate = TAX_RATES[region];
  return amount + amount * rate;
}`,
      beforeLabel: "Repeated knowledge",
      afterLabel: "Single source of truth",
      notes: [
        "The tax rate now lives in exactly one place.",
        "Adding a new region is a one-line data change, not new code.",
        "No risk of one copy drifting out of sync with another.",
      ],
    },
    playground: {
      caption: "Change the tax rate once — every region recalculates. Edit and Run.",
      code: `const TAX_RATES = { US: 0.07, EU: 0.2, JP: 0.1 };

function priceWithTax(amount, region) {
  const rate = TAX_RATES[region];
  return (amount + amount * rate).toFixed(2);
}

for (const region of Object.keys(TAX_RATES)) {
  console.log(region, "=>", priceWithTax(100, region));
}`,
    },
    keyPoints: [
      "One rule, one place. Change it once.",
      "Duplication's real cost is copies drifting apart.",
      "Don't over-DRY: only unify code that shares the same reason to change.",
    ],
    related: ["kiss", "single-source-of-truth", "srp"],
  },
  {
    slug: "kiss",
    title: "KISS — Keep It Simple",
    category: "principles",
    tagline: "Prefer the simplest design that solves the problem in front of you.",
    difficulty: "Beginner",
    also: "Keep It Simple, Stupid",
    intro:
      "KISS is a reminder that simplicity is a feature. Clever, layered, 'flexible' solutions are expensive to read, debug, and change. The best code is usually the most boring code that clearly does the job.",
    body: [
      { type: "heading", text: "Simple is not the same as short" },
      {
        type: "paragraph",
        text: "KISS is about clarity, not character count. A few extra explicit lines that any teammate can read at a glance beat a dense one-liner that takes ten minutes to decode.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Ask before adding complexity",
        text: "Every abstraction, config flag, and indirection layer is a tax future readers pay. Add it only when a concrete need justifies the cost.",
      },
      { type: "heading", text: "Signals you've drifted from KISS" },
      {
        type: "list",
        items: [
          "You need a diagram to explain a function that does one thing.",
          "Generic 'frameworks' built for a single caller.",
          "Configuration options nobody has ever changed.",
          "Deep inheritance or callback chains you trace with a finger.",
        ],
      },
    ],
    beforeAfter: {
      before: `function isEven(n) {
  return n % 2 === 0
    ? true
    : n % 2 === 1
      ? false
      : (() => { throw new Error("?"); })();
}`,
      after: `function isEven(n) {
  return n % 2 === 0;
}`,
      beforeLabel: "Cleverer than needed",
      afterLabel: "Boring and obvious",
      notes: [
        "The simple version is correct, readable, and impossible to misunderstand.",
        "No nested ternaries or unreachable branches to reason about.",
      ],
    },
    playground: {
      caption: "Simple code is easy to verify at a glance.",
      code: `function isEven(n) {
  return n % 2 === 0;
}

for (const n of [0, 1, 2, 7, 10]) {
  console.log(n, isEven(n));
}`,
    },
    keyPoints: [
      "Simplicity is a deliberate design goal, not laziness.",
      "Readability beats cleverness every time.",
      "Add complexity only when a real requirement demands it (see YAGNI).",
    ],
    related: ["yagni", "dry", "least-astonishment"],
  },
  {
    slug: "yagni",
    title: "YAGNI — You Aren't Gonna Need It",
    category: "principles",
    tagline: "Build what's needed now, not what you imagine you'll need later.",
    difficulty: "Beginner",
    also: "You Aren't Gonna Need It",
    intro:
      "YAGNI warns against building features and flexibility on speculation. Code written for an imagined future still has to be read, tested, and maintained today — and the future rarely arrives exactly as predicted.",
    body: [
      { type: "heading", text: "The cost of 'just in case'" },
      {
        type: "paragraph",
        text: "Speculative generality adds surface area: more branches, more abstractions, more ways to be wrong. When the anticipated need never materializes, you're left maintaining complexity that pays for nothing.",
      },
      {
        type: "callout",
        variant: "info",
        title: "YAGNI vs. good design",
        text: "YAGNI is not an excuse for sloppy code. Keep the code clean and easy to change so that when a real need appears, adding it is cheap.",
      },
    ],
    beforeAfter: {
      before: `// We only ever export CSV today, but "maybe later"...
class Exporter {
  export(data, format = "csv", opts = {}) {
    if (format === "csv") return this.csv(data, opts);
    if (format === "xml") return this.xml(data, opts);   // unused
    if (format === "pdf") return this.pdf(data, opts);   // unused
    throw new Error("unknown format");
  }
  csv() {/* ... */}
  xml() {/* dead, untested */}
  pdf() {/* dead, untested */}
}`,
      after: `function exportCsv(data) {
  // exactly what's needed today, easy to extend later
  return data.map((row) => row.join(",")).join("\\n");
}`,
      afterLabel: "Built for today",
      beforeLabel: "Built for a guessed future",
      notes: [
        "No dead, untested branches to maintain.",
        "Adding XML later is easy — and you'll know the real requirements then.",
      ],
    },
    playground: {
      code: `function exportCsv(rows) {
  return rows.map((r) => r.join(",")).join("\\n");
}

console.log(exportCsv([["name", "age"], ["Ada", 36], ["Linus", 54]]));`,
    },
    keyPoints: [
      "Implement features when they're actually required.",
      "Speculative flexibility is complexity you pay for now and may never use.",
      "Keep code easy to change so the future is cheap to add.",
    ],
    related: ["kiss", "dry"],
  },
  {
    slug: "separation-of-concerns",
    title: "Separation of Concerns",
    category: "principles",
    tagline: "Split a system into parts that each address one distinct concern.",
    difficulty: "Beginner",
    also: "SoC",
    intro:
      "Separation of Concerns means organizing code so that each part deals with one aspect of the problem — data access, business rules, presentation — without tangling them together. Concerns that change for different reasons should live in different places.",
    body: [
      { type: "heading", text: "Why separate?" },
      {
        type: "paragraph",
        text: "When concerns are mixed, a change to one (say, swapping the database) forces you to touch unrelated code (your UI). Separating them lets each evolve independently and be understood in isolation.",
      },
      {
        type: "list",
        items: [
          "Presentation should not contain business rules.",
          "Business logic should not know about HTTP or SQL details.",
          "Each layer talks to the next through a narrow, well-defined interface.",
        ],
      },
    ],
    beforeAfter: {
      before: `function handleRequest(req, res) {
  const rows = db.query("SELECT * FROM users");        // data
  const adults = rows.filter((u) => u.age >= 18);      // logic
  res.send("<ul>" + adults.map((u) =>                  // view
    "<li>" + u.name + "</li>").join("") + "</ul>");
}`,
      after: `// data
const getUsers = () => db.query("SELECT * FROM users");
// logic
const adultsOf = (users) => users.filter((u) => u.age >= 18);
// view
const renderList = (users) =>
  "<ul>" + users.map((u) => "<li>" + u.name + "</li>").join("") + "</ul>";

function handleRequest(_req, res) {
  res.send(renderList(adultsOf(getUsers())));
}`,
      notes: [
        "Each function has one concern and can be tested in isolation.",
        "Swap the data source or the view without touching the others.",
      ],
    },
    playground: {
      code: `const adultsOf = (users) => users.filter((u) => u.age >= 18);
const renderList = (users) =>
  users.map((u) => "- " + u.name).join("\\n");

const users = [
  { name: "Ada", age: 36 },
  { name: "Kid", age: 12 },
  { name: "Linus", age: 54 },
];

console.log(renderList(adultsOf(users)));`,
    },
    keyPoints: [
      "One part, one concern.",
      "Concerns that change for different reasons belong apart.",
      "Narrow interfaces between layers keep them independent.",
    ],
    related: ["coupling-cohesion", "srp", "layered-architecture"],
  },
  {
    slug: "coupling-cohesion",
    title: "Coupling & Cohesion",
    category: "principles",
    tagline: "Aim for low coupling between modules and high cohesion within them.",
    difficulty: "Intermediate",
    intro:
      "Coupling measures how much modules depend on each other; cohesion measures how strongly the responsibilities inside a module belong together. Good design pushes for low coupling (modules can change independently) and high cohesion (each module has a clear, focused purpose).",
    body: [
      { type: "heading", text: "Low coupling" },
      {
        type: "paragraph",
        text: "When modules are loosely coupled, a change in one rarely ripples into others. They communicate through small, stable interfaces rather than reaching into each other's internals.",
      },
      { type: "heading", text: "High cohesion" },
      {
        type: "paragraph",
        text: "A cohesive module does one job well. Everything inside it relates to that job, so it's easy to name, understand, reuse, and test.",
      },
      {
        type: "callout",
        variant: "key",
        title: "The goal",
        text: "Low coupling + high cohesion = modules you can reason about, replace, and reuse independently. Drag the slider in the visualization to feel the difference.",
      },
    ],
    viz: "coupling",
    beforeAfter: {
      before: `class Order {
  save() {
    // Order reaches directly into MySQL internals — tight coupling
    const conn = new MySQLConnection("localhost", 3306);
    conn.rawQuery("INSERT INTO orders ...");
    new SmtpClient("smtp.acme.com").send("Order saved");
  }
}`,
      after: `class Order {
  // depends on small abstractions, not concrete services
  constructor(repo, notifier) {
    this.repo = repo;
    this.notifier = notifier;
  }
  save() {
    this.repo.add(this);
    this.notifier.notify("Order saved");
  }
}`,
      beforeLabel: "Tightly coupled",
      afterLabel: "Loosely coupled",
      notes: [
        "Order no longer knows about MySQL or SMTP specifics.",
        "Swap the repository or notifier without editing Order.",
        "Order is now trivial to unit-test with fakes.",
      ],
    },
    playground: {
      caption: "Low coupling lets you swap collaborators freely.",
      code: `class Order {
  constructor(repo, notifier) {
    this.repo = repo;
    this.notifier = notifier;
  }
  save() {
    this.repo.add("order#1");
    this.notifier.notify("Order saved");
  }
}

const fakeRepo = { add: (x) => console.log("stored", x) };
const fakeNotifier = { notify: (m) => console.log("notified:", m) };

new Order(fakeRepo, fakeNotifier).save();`,
    },
    keyPoints: [
      "Coupling = how much modules depend on each other (want it low).",
      "Cohesion = how focused a module is (want it high).",
      "Depend on interfaces, not concrete internals, to reduce coupling.",
    ],
    related: ["separation-of-concerns", "dip", "composition-over-inheritance"],
  },
  {
    slug: "composition-over-inheritance",
    title: "Composition over Inheritance",
    category: "principles",
    tagline: "Build behavior by combining small parts, not deep class hierarchies.",
    difficulty: "Intermediate",
    intro:
      "Inheritance models an 'is-a' relationship and locks subclasses to their parent's implementation. Composition models 'has-a' / 'uses-a' and assembles behavior from interchangeable pieces. Favoring composition keeps designs flexible and sidesteps the fragile base-class problem.",
    body: [
      { type: "heading", text: "Why inheritance gets rigid" },
      {
        type: "paragraph",
        text: "Deep hierarchies create tight coupling between parent and child. A change to the base class can break every subclass, and you can't easily mix capabilities that live on different branches of the tree.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Rule of thumb",
        text: "Use inheritance for genuine, stable 'is-a' relationships. Reach for composition whenever you want to mix and match behaviors.",
      },
    ],
    viz: "composition",
    beforeAfter: {
      before: `class Bird { fly() { return "flap"; } }
class Duck extends Bird { swim() { return "paddle"; } }
// Now we need a Penguin: it's a Bird but CANNOT fly.
class Penguin extends Bird {
  fly() { throw new Error("penguins can't fly"); } // LSP violation
}`,
      after: `const canFly = () => ({ fly: () => "flap" });
const canSwim = () => ({ swim: () => "paddle" });

const makeDuck = () => ({ ...canFly(), ...canSwim() });
const makePenguin = () => ({ ...canSwim() }); // simply no fly()`,
      beforeLabel: "Rigid hierarchy",
      afterLabel: "Composed abilities",
      notes: [
        "Abilities are mixed in only where they apply.",
        "No more throwing from inherited methods you don't support.",
        "Adding 'canDive' is a new part, not a new branch of the tree.",
      ],
    },
    playground: {
      caption: "Compose abilities like LEGO bricks.",
      code: `const canFly = () => ({ fly: () => "flap, flap" });
const canSwim = () => ({ swim: () => "paddle" });

const duck = { ...canFly(), ...canSwim() };
const penguin = { ...canSwim() };

console.log("duck flies:", duck.fly());
console.log("duck swims:", duck.swim());
console.log("penguin swims:", penguin.swim());
console.log("penguin can fly?", typeof penguin.fly === "function");`,
    },
    keyPoints: [
      "Prefer 'has-a' composition to deep 'is-a' inheritance.",
      "Composition lets you mix capabilities without rigid trees.",
      "It avoids the fragile base-class and forced-method problems.",
    ],
    related: ["coupling-cohesion", "strategy", "decorator", "lsp"],
  },
  {
    slug: "law-of-demeter",
    title: "Law of Demeter",
    category: "principles",
    tagline: "Only talk to your immediate friends — don't reach through objects.",
    difficulty: "Intermediate",
    also: "Principle of Least Knowledge",
    intro:
      "The Law of Demeter says a method should only call methods on: itself, its parameters, objects it creates, and its direct components. Chains like a.getB().getC().doThing() couple you to the entire object graph and break when any link changes.",
    body: [
      { type: "heading", text: "Spotting a violation" },
      {
        type: "paragraph",
        text: "Long dotted chains ('train wrecks') are the tell-tale sign. Each '.' past the first reaches into a stranger's internals, so a change anywhere along the chain can break your code.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Tell, don't ask",
        text: "Instead of pulling data out to act on it, ask the object that owns the data to do the work. This is closely related to the Tell-Don't-Ask principle.",
      },
    ],
    beforeAfter: {
      before: `// reaches through three objects
function chargeCustomer(order) {
  order.getCustomer().getWallet().getCard().charge(order.total);
}`,
      after: `// ask the object that owns the data to act
function chargeCustomer(order) {
  order.charge(order.total); // Order delegates internally
}`,
      notes: [
        "Callers no longer depend on Customer → Wallet → Card structure.",
        "Order can change how it charges without breaking callers.",
      ],
    },
    playground: {
      code: `class Order {
  constructor(total) { this.total = total; }
  charge(amount) { console.log("charged", amount); }
}

const order = new Order(42);
order.charge(order.total); // talk only to your immediate friend`,
    },
    keyPoints: [
      "Avoid long a.b().c().d() chains.",
      "Talk only to direct collaborators.",
      "Delegate work to the object that owns the data.",
    ],
    related: ["tell-dont-ask", "coupling-cohesion", "encapsulation"],
  },
  {
    slug: "tell-dont-ask",
    title: "Tell, Don't Ask",
    category: "principles",
    tagline: "Tell objects what to do instead of querying their state and deciding for them.",
    difficulty: "Intermediate",
    intro:
      "Tell-Don't-Ask encourages bundling data with the behavior that operates on it. Rather than pulling an object's state out and making decisions on its behalf, tell the object to perform the operation itself — keeping logic next to the data it needs.",
    body: [
      { type: "heading", text: "Behavior belongs with data" },
      {
        type: "paragraph",
        text: "When callers inspect an object's fields and then act, business rules leak out across many call sites. Moving that decision inside the object centralizes the rule and protects invariants.",
      },
    ],
    beforeAfter: {
      before: `// caller asks for state, then decides
if (account.balance >= amount) {
  account.balance -= amount;
} else {
  throw new Error("insufficient funds");
}`,
      after: `// caller tells the object to act; rule lives inside
account.withdraw(amount);`,
      notes: [
        "The overdraft rule lives in one place, not at every call site.",
        "Account can enforce its own invariants.",
      ],
    },
    playground: {
      code: `class Account {
  constructor(balance) { this.balance = balance; }
  withdraw(amount) {
    if (amount > this.balance) throw new Error("insufficient funds");
    this.balance -= amount;
    return this.balance;
  }
}

const acc = new Account(100);
console.log("after withdraw:", acc.withdraw(30));
try { acc.withdraw(1000); } catch (e) { console.log("blocked:", e.message); }`,
    },
    keyPoints: [
      "Keep behavior next to the data it uses.",
      "Tell objects to do things; don't pull their state out to decide.",
      "Centralizes rules and protects invariants.",
    ],
    related: ["law-of-demeter", "encapsulation"],
  },
  {
    slug: "encapsulation",
    title: "Encapsulation & Information Hiding",
    category: "principles",
    tagline: "Hide internal details behind a stable interface.",
    difficulty: "Beginner",
    intro:
      "Encapsulation bundles data with the operations that act on it and hides the internals behind a public interface. Callers depend only on what an object does, not how it does it, so you can change the implementation freely.",
    body: [
      { type: "heading", text: "Protecting invariants" },
      {
        type: "paragraph",
        text: "By controlling all access through methods, an object can guarantee its state always stays valid. Exposing raw fields lets anyone put the object into an inconsistent state.",
      },
    ],
    beforeAfter: {
      before: `class Stack {
  items = [];      // public — anyone can corrupt it
}
const s = new Stack();
s.items.length = -1; // oops, broken state`,
      after: `class Stack {
  #items = [];               // private field
  push(x) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }
}`,
      notes: [
        "Internal storage is hidden behind a small interface.",
        "The stack controls every mutation, protecting its invariants.",
        "You can swap the internal representation without breaking callers.",
      ],
    },
    playground: {
      code: `class Stack {
  #items = [];
  push(x) { this.#items.push(x); return this; }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }
}

const s = new Stack();
s.push(1).push(2).push(3);
console.log("size:", s.size);
console.log("pop:", s.pop());
console.log("size:", s.size);`,
    },
    keyPoints: [
      "Expose behavior; hide representation.",
      "Control access to protect invariants.",
      "Hidden internals are free to change.",
    ],
    related: ["tell-dont-ask", "coupling-cohesion", "isp"],
  },
  {
    slug: "single-source-of-truth",
    title: "Single Source of Truth",
    category: "principles",
    tagline: "Each fact should be stored and edited in exactly one place.",
    difficulty: "Beginner",
    also: "SSOT",
    intro:
      "A Single Source of Truth means every piece of data has one authoritative location. Derived values are computed from it rather than copied, so the data can never contradict itself.",
    body: [
      {
        type: "paragraph",
        text: "When the same fact is stored in several places, those copies inevitably disagree. SSOT eliminates a whole class of 'which value is correct?' bugs by computing everything else from the one canonical source.",
      },
    ],
    beforeAfter: {
      before: `const cart = {
  items: [{ price: 10 }, { price: 5 }],
  total: 15,      // duplicated — must be kept in sync by hand
};
cart.items.push({ price: 20 }); // total is now wrong!`,
      after: `const cart = { items: [{ price: 10 }, { price: 5 }] };
const total = (c) => c.items.reduce((s, i) => s + i.price, 0);

cart.items.push({ price: 20 });
// total is always derived, never stale`,
      notes: [
        "The total is computed, so it can never disagree with the items.",
        "One source of truth: the items array.",
      ],
    },
    playground: {
      code: `const cart = { items: [{ price: 10 }, { price: 5 }] };
const total = (c) => c.items.reduce((s, i) => s + i.price, 0);

console.log("total:", total(cart));
cart.items.push({ price: 20 });
console.log("total after add:", total(cart));`,
    },
    keyPoints: [
      "Store each fact once; derive the rest.",
      "Eliminates contradictory copies.",
      "Closely related to DRY, applied to data.",
    ],
    related: ["dry", "encapsulation"],
  },
  {
    slug: "fail-fast",
    title: "Fail Fast",
    category: "principles",
    tagline: "Detect and report errors as early as possible, close to their cause.",
    difficulty: "Beginner",
    intro:
      "Fail Fast means validating assumptions immediately and raising a clear error the moment something is wrong, instead of letting bad data flow deeper into the system where the eventual failure is confusing and hard to trace.",
    body: [
      {
        type: "paragraph",
        text: "A loud, early failure points straight at the cause. A silent one lets corruption spread until a distant, unrelated part of the system breaks in a way that's nearly impossible to debug.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Guard clauses",
        text: "Validate inputs at the top of a function and return or throw early. This keeps the happy path flat and readable.",
      },
    ],
    beforeAfter: {
      before: `function setAge(user, age) {
  user.age = age; // -5? "thirty"? undefined? all silently accepted
}`,
      after: `function setAge(user, age) {
  if (!Number.isInteger(age) || age < 0) {
    throw new Error("age must be a non-negative integer, got: " + age);
  }
  user.age = age;
}`,
      notes: [
        "Bad input is rejected immediately, with a clear message.",
        "The error points at the real cause, not a distant symptom.",
      ],
    },
    playground: {
      code: `function setAge(user, age) {
  if (!Number.isInteger(age) || age < 0) {
    throw new Error("age must be a non-negative integer, got: " + age);
  }
  user.age = age;
  return user;
}

console.log(setAge({}, 30));
try { setAge({}, -5); } catch (e) { console.log("rejected:", e.message); }`,
    },
    keyPoints: [
      "Validate assumptions early and loudly.",
      "Errors near the cause are far easier to debug.",
      "Use guard clauses to keep the happy path clean.",
    ],
    related: ["least-astonishment", "encapsulation"],
  },
  {
    slug: "least-astonishment",
    title: "Principle of Least Astonishment",
    category: "principles",
    tagline: "Code should behave the way its users reasonably expect.",
    difficulty: "Beginner",
    also: "POLA",
    intro:
      "The Principle of Least Astonishment says a component should behave in a way that least surprises the people who use it. Names, signatures, and side effects should match intuition — surprising behavior is a magnet for bugs.",
    body: [
      {
        type: "paragraph",
        text: "If a function named getUser() also deletes records, every caller is a future bug. Predictable, honestly-named behavior lets people use your code correctly without reading its source.",
      },
    ],
    beforeAfter: {
      before: `// surprising: a "getter" mutates and logs
function getTotal(cart) {
  cart.lastAccessed = Date.now(); // side effect!
  sendAnalytics(cart);            // surprise network call!
  return cart.items.reduce((s, i) => s + i.price, 0);
}`,
      after: `// honest: pure, does exactly what its name says
function getTotal(cart) {
  return cart.items.reduce((s, i) => s + i.price, 0);
}`,
      notes: [
        "A getter only reads — no hidden mutations or I/O.",
        "Behavior matches the name, so callers aren't surprised.",
      ],
    },
    playground: {
      code: `function getTotal(cart) {
  return cart.items.reduce((s, i) => s + i.price, 0);
}

const cart = { items: [{ price: 10 }, { price: 32 }] };
console.log("total:", getTotal(cart));
console.log("cart unchanged:", JSON.stringify(cart));`,
    },
    keyPoints: [
      "Match names and signatures to behavior.",
      "Avoid hidden side effects.",
      "Predictable code needs less documentation.",
    ],
    related: ["fail-fast", "kiss", "clean-code"],
  },
  {
    slug: "boy-scout-rule",
    title: "The Boy Scout Rule",
    category: "principles",
    tagline: "Always leave the code a little cleaner than you found it.",
    difficulty: "Beginner",
    intro:
      "Borrowed from scouting ('leave the campground cleaner than you found it'), this rule says make a small improvement every time you touch the code. Tiny, continuous cleanups compound and keep a codebase from rotting.",
    body: [
      {
        type: "paragraph",
        text: "You don't need a big refactoring project. Rename one unclear variable, delete dead code, add a missing test, clarify a comment. Done consistently, the codebase trends toward health instead of decay.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Keep it small and safe",
        text: "Boy-scout improvements should be low-risk and ideally separate from feature changes, so reviews stay easy and regressions stay rare.",
      },
    ],
    playground: {
      caption: "A tiny cleanup: a clear name and an early return.",
      code: `// before: cryptic
function f(a) { let r; if (a.length > 0) { r = a[0]; } return r; }

// after: clearer
function firstOrUndefined(items) {
  if (items.length === 0) return undefined;
  return items[0];
}

console.log(firstOrUndefined([10, 20]));
console.log(firstOrUndefined([]));`,
    },
    keyPoints: [
      "Improve code incrementally whenever you touch it.",
      "Small, safe cleanups compound over time.",
      "Prevents gradual codebase decay.",
    ],
    related: ["clean-code", "refactoring", "kiss"],
  },
];
