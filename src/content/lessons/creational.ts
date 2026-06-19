import type { Lesson } from "../types";

export const creational: Lesson[] = [
  {
    slug: "factory-method",
    title: "Factory Method",
    category: "creational",
    tagline: "Let a method decide which concrete class to instantiate.",
    difficulty: "Intermediate",
    intro:
      "The Factory Method pattern provides an interface for creating objects but lets the logic decide which concrete type to produce. Callers ask for a product by intent ('give me a notifier') without hard-coding `new ConcreteClass`, decoupling them from concrete implementations.",
    body: [
      { type: "heading", text: "Why not just use `new`?" },
      {
        type: "paragraph",
        text: "Scattering `new EmailNotifier()` across your code couples every call site to that concrete class. A factory centralizes creation in one place, so adding or swapping a product type is a single change.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Related patterns",
        text: "Abstract Factory creates families of related products; Builder constructs one complex object step by step. Factory Method is the simplest of the three.",
      },
    ],
    viz: "factory",
    beforeAfter: {
      before: `function notify(type, msg) {
  // caller is coupled to every concrete class
  if (type === "email") return new EmailNotifier().send(msg);
  if (type === "sms")   return new SmsNotifier().send(msg);
  if (type === "push")  return new PushNotifier().send(msg);
}`,
      after: `const notifiers = {
  email: () => new EmailNotifier(),
  sms:   () => new SmsNotifier(),
  push:  () => new PushNotifier(),
};
function createNotifier(type) {
  const make = notifiers[type];
  if (!make) throw new Error("unknown notifier: " + type);
  return make();
}`,
      notes: [
        "Creation logic lives in one place.",
        "Adding a channel is one entry in the map.",
        "Callers depend on the factory, not concrete classes.",
      ],
    },
    playground: {
      code: `class EmailNotifier { send(m){ return "email: " + m; } }
class SmsNotifier   { send(m){ return "sms: " + m; } }

const registry = { email: () => new EmailNotifier(), sms: () => new SmsNotifier() };
function createNotifier(type){
  const make = registry[type];
  if (!make) throw new Error("unknown: " + type);
  return make();
}

console.log(createNotifier("email").send("Hi"));
console.log(createNotifier("sms").send("Yo"));`,
    },
    keyPoints: [
      "Create objects by intent, not by hard-coded `new`.",
      "Centralizes and isolates construction logic.",
      "Adding a new product type is a localized change.",
    ],
    related: ["abstract-factory", "builder", "ocp", "dip"],
  },
  {
    slug: "singleton",
    title: "Singleton",
    category: "creational",
    tagline: "Ensure a class has exactly one instance with a global access point.",
    difficulty: "Beginner",
    intro:
      "The Singleton pattern guarantees a single shared instance of a class and provides one access point to it. It's used for things there should only ever be one of — a configuration store, a connection pool, a logger.",
    body: [
      { type: "heading", text: "Use with care" },
      {
        type: "paragraph",
        text: "Singletons are effectively global state, which can hide dependencies and make testing harder. Reach for one only when a single instance is genuinely required, and prefer injecting it over reaching for it globally.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "The hidden dependency trap",
        text: "Code that grabs a singleton directly hides what it depends on. Where possible, pass the shared instance in (dependency injection) so it stays testable.",
      },
    ],
    viz: "singleton",
    beforeAfter: {
      before: `// a new config object everywhere — settings can diverge
const a = new Config();
const b = new Config();
a.set("theme", "dark");
console.log(b.get("theme")); // undefined — different instance!`,
      after: `class Config {
  static #instance;
  #data = {};
  static get() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }
  set(k, v){ this.#data[k] = v; }
  read(k){ return this.#data[k]; }
}`,
      notes: [
        "Every caller shares one Config instance.",
        "Settings written in one place are visible everywhere.",
      ],
    },
    playground: {
      code: `class Config {
  static #instance;
  #data = {};
  static get() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }
  set(k, v){ this.#data[k] = v; return this; }
  read(k){ return this.#data[k]; }
}

Config.get().set("theme", "dark");
console.log("same instance?", Config.get() === Config.get());
console.log("theme:", Config.get().read("theme"));`,
    },
    keyPoints: [
      "Exactly one instance, shared globally.",
      "Good for config, loggers, connection pools.",
      "It's global state — inject it to keep code testable.",
    ],
    related: ["dependency-injection", "factory-method"],
  },
  {
    slug: "abstract-factory",
    title: "Abstract Factory",
    category: "creational",
    tagline: "Create families of related objects without naming their concrete classes.",
    difficulty: "Advanced",
    intro:
      "The Abstract Factory pattern provides an interface for creating families of related products. Pick a factory (say, a 'dark theme' factory) and it produces a matched set of components — buttons, inputs, panels — that are guaranteed to work together.",
    body: [
      {
        type: "paragraph",
        text: "Where Factory Method makes one product, Abstract Factory makes a coordinated family. Switching the factory swaps the entire family consistently, preventing mismatched combinations.",
      },
    ],
    beforeAfter: {
      before: `// risk of mixing incompatible parts by hand
const button = new DarkButton();
const input = new LightInput(); // oops — mismatched theme`,
      after: `function themeFactory(theme) {
  return theme === "dark"
    ? { button: () => new DarkButton(), input: () => new DarkInput() }
    : { button: () => new LightButton(), input: () => new LightInput() };
}
const ui = themeFactory("dark");
const button = ui.button();
const input = ui.input(); // guaranteed to match`,
      notes: [
        "One factory yields a consistent family of parts.",
        "Switching themes swaps everything together.",
      ],
    },
    playground: {
      code: `function themeFactory(theme) {
  return {
    button: () => ({ render: () => theme + " button" }),
    input:  () => ({ render: () => theme + " input" }),
  };
}

const ui = themeFactory("dark");
console.log(ui.button().render());
console.log(ui.input().render());`,
    },
    keyPoints: [
      "Creates families of related products.",
      "Guarantees the parts are compatible.",
      "Swap the whole family by swapping the factory.",
    ],
    related: ["factory-method", "builder"],
  },
  {
    slug: "builder",
    title: "Builder",
    category: "creational",
    tagline: "Construct a complex object step by step with a fluent API.",
    difficulty: "Intermediate",
    intro:
      "The Builder pattern separates the construction of a complex object from its representation. Instead of a constructor with a dozen parameters, you call small, named steps and finish with build() — readable, flexible, and order-independent.",
    body: [
      {
        type: "paragraph",
        text: "Builders shine when an object has many optional parts. They replace confusing 'telescoping constructors' (lots of positional, often-null arguments) with self-documenting method calls.",
      },
    ],
    beforeAfter: {
      before: `// what do these arguments even mean?
const burger = new Burger(true, false, true, false, 2, null);`,
      after: `const burger = new BurgerBuilder()
  .cheese()
  .bacon()
  .patties(2)
  .build();`,
      notes: [
        "Each step is named and self-documenting.",
        "Optional parts are added only when wanted.",
        "Order doesn't matter; intent is clear.",
      ],
    },
    playground: {
      code: `class BurgerBuilder {
  #parts = { patties: 1, toppings: [] };
  patties(n){ this.#parts.patties = n; return this; }
  add(topping){ this.#parts.toppings.push(topping); return this; }
  build(){ return this.#parts; }
}

const burger = new BurgerBuilder().patties(2).add("cheese").add("bacon").build();
console.log(JSON.stringify(burger));`,
    },
    keyPoints: [
      "Build complex objects step by step.",
      "Replaces unreadable multi-argument constructors.",
      "Fluent, self-documenting, order-independent.",
    ],
    related: ["factory-method", "abstract-factory"],
  },
  {
    slug: "prototype",
    title: "Prototype",
    category: "creational",
    tagline: "Create new objects by cloning an existing prototype.",
    difficulty: "Intermediate",
    intro:
      "The Prototype pattern creates new objects by copying a fully-configured existing instance instead of building one from scratch. It's handy when construction is expensive or when you want a new object pre-loaded with another's state.",
    body: [
      {
        type: "paragraph",
        text: "Rather than re-running costly setup, you clone a ready-made template and tweak the copy. Be mindful of shallow vs. deep copies when objects contain nested references.",
      },
    ],
    beforeAfter: {
      before: `// rebuild an expensive object from scratch each time
const enemy1 = buildEnemy("orc", 100, ["sword"], heavyAiConfig);
const enemy2 = buildEnemy("orc", 100, ["sword"], heavyAiConfig);`,
      after: `const orcPrototype = buildEnemy("orc", 100, ["sword"], heavyAiConfig);
const enemy1 = structuredClone(orcPrototype);
const enemy2 = structuredClone(orcPrototype);
enemy2.weapons.push("shield"); // tweak the copy`,
      notes: [
        "Expensive setup runs once on the prototype.",
        "Clones start from a known-good configuration.",
      ],
    },
    playground: {
      code: `const orcPrototype = { type: "orc", hp: 100, weapons: ["sword"] };

const a = structuredClone(orcPrototype);
const b = structuredClone(orcPrototype);
b.weapons.push("shield");

console.log("a:", JSON.stringify(a));
console.log("b:", JSON.stringify(b));`,
    },
    keyPoints: [
      "Clone existing objects instead of building anew.",
      "Useful when construction is expensive.",
      "Watch out for shallow vs. deep copies.",
    ],
    related: ["builder", "factory-method"],
  },
];
