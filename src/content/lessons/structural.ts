import type { Lesson } from "../types";

export const structural: Lesson[] = [
  {
    slug: "adapter",
    title: "Adapter",
    category: "structural",
    tagline: "Wrap an incompatible interface so it fits the one you expect.",
    difficulty: "Beginner",
    also: "Wrapper",
    intro:
      "The Adapter pattern lets two incompatible interfaces work together. You wrap an existing class in an adapter that exposes the interface your code expects, translating calls behind the scenes — like a travel plug that fits a foreign socket.",
    body: [
      { type: "heading", text: "When to use it" },
      {
        type: "paragraph",
        text: "Reach for an adapter when integrating a third-party library or legacy class whose interface you can't (or shouldn't) change, but which doesn't match what your code expects.",
      },
    ],
    viz: "adapter",
    beforeAfter: {
      before: `// our app expects logger.log(msg)
// but the vendor lib only offers writeEntry(level, text)
const vendor = new VendorLogger();
vendor.writeEntry("INFO", "started"); // app code can't use logger.log`,
      after: `class LoggerAdapter {
  constructor(vendor){ this.vendor = vendor; }
  log(msg){ this.vendor.writeEntry("INFO", msg); } // translate
}
const logger = new LoggerAdapter(new VendorLogger());
logger.log("started"); // app's expected interface, vendor under the hood`,
      notes: [
        "App code keeps using the interface it expects.",
        "The vendor class is untouched.",
        "Swap the vendor later by writing a new adapter.",
      ],
    },
    playground: {
      code: `class VendorLogger {
  writeEntry(level, text){ console.log("[" + level + "] " + text); }
}
class LoggerAdapter {
  constructor(vendor){ this.vendor = vendor; }
  log(msg){ this.vendor.writeEntry("INFO", msg); }
}

const logger = new LoggerAdapter(new VendorLogger());
logger.log("Adapter makes it fit!");`,
    },
    keyPoints: [
      "Translates one interface into another.",
      "Integrate incompatible or legacy code without changing it.",
      "Also called a Wrapper.",
    ],
    related: ["facade", "decorator", "bridge"],
  },
  {
    slug: "decorator",
    title: "Decorator",
    category: "structural",
    tagline: "Add behavior to an object by wrapping it, without subclassing.",
    difficulty: "Intermediate",
    intro:
      "The Decorator pattern attaches new responsibilities to an object dynamically by wrapping it in another object with the same interface. Stack decorators to combine behaviors — a flexible alternative to an explosion of subclasses.",
    body: [
      { type: "heading", text: "Wrapping, not inheriting" },
      {
        type: "paragraph",
        text: "Each decorator implements the same interface as the thing it wraps and adds a little behavior before or after delegating. Because they share an interface, you can nest them in any order and combination.",
      },
      {
        type: "callout",
        variant: "key",
        title: "Stack them up",
        text: "Coffee + milk + sugar + whip — each is a decorator wrapping the last. Add and remove layers in the visualization to see cost and description change.",
      },
    ],
    viz: "decorator",
    beforeAfter: {
      before: `// a subclass for every combination — combinatorial explosion
class Coffee {}
class CoffeeWithMilk extends Coffee {}
class CoffeeWithMilkAndSugar extends Coffee {}
class CoffeeWithMilkAndSugarAndWhip extends Coffee {}
// ...and on, and on`,
      after: `const coffee = () => ({ cost: 2, desc: "coffee" });
const milk  = (b) => ({ cost: b.cost + 0.5, desc: b.desc + " + milk" });
const sugar = (b) => ({ cost: b.cost + 0.2, desc: b.desc + " + sugar" });

const order = sugar(milk(coffee())); // stack any combination`,
      notes: [
        "Combine behaviors at runtime instead of predefining every subclass.",
        "Each decorator is small and single-purpose.",
        "Order and combination are fully flexible.",
      ],
    },
    playground: {
      code: `const coffee = () => ({ cost: 2.0, desc: "coffee" });
const milk  = (b) => ({ cost: b.cost + 0.5, desc: b.desc + " + milk" });
const sugar = (b) => ({ cost: b.cost + 0.2, desc: b.desc + " + sugar" });
const whip  = (b) => ({ cost: b.cost + 0.7, desc: b.desc + " + whip" });

const order = whip(sugar(milk(coffee())));
console.log(order.desc + " = $" + order.cost.toFixed(2));`,
    },
    keyPoints: [
      "Add behavior by wrapping, not subclassing.",
      "Stack decorators in any order/combination.",
      "Avoids a subclass-per-combination explosion.",
    ],
    related: ["composition-over-inheritance", "adapter", "proxy", "strategy"],
  },
  {
    slug: "facade",
    title: "Facade",
    category: "structural",
    tagline: "Offer a simple front door to a complex subsystem.",
    difficulty: "Beginner",
    intro:
      "The Facade pattern provides a single, simplified interface to a complicated set of classes or subsystems. Clients call one easy method instead of orchestrating many moving parts themselves.",
    body: [
      {
        type: "paragraph",
        text: "A facade doesn't hide the subsystem — advanced users can still reach in — but it makes the common case trivially easy and decouples clients from the subsystem's internal wiring.",
      },
    ],
    beforeAfter: {
      before: `// client must orchestrate every subsystem step
const codec = new VideoCodec("mp4");
const reader = new FileReader(file);
const buffer = reader.read();
const decoded = codec.decode(buffer);
const compressed = new Compressor().compress(decoded);
new FileWriter("out.mp4").write(compressed);`,
      after: `class VideoConverter {           // the facade
  convert(file, format){ /* orchestrates all the steps */ }
}
new VideoConverter().convert(file, "mp4"); // one simple call`,
      notes: [
        "Clients call one method instead of six.",
        "Subsystem internals can change behind the facade.",
      ],
    },
    playground: {
      code: `class VideoConverter {
  convert(name, format) {
    // hides the messy multi-step pipeline
    const steps = ["read", "decode", "compress", "write"];
    console.log("converting " + name + " -> ." + format);
    steps.forEach((s) => console.log("  " + s));
    return name.split(".")[0] + "." + format;
  }
}

console.log("result:", new VideoConverter().convert("clip.mov", "mp4"));`,
    },
    keyPoints: [
      "One simple entry point to a complex subsystem.",
      "Decouples clients from internal wiring.",
      "The subsystem stays accessible for advanced needs.",
    ],
    related: ["adapter", "facade", "layered-architecture"],
  },
  {
    slug: "bridge",
    title: "Bridge",
    category: "structural",
    tagline: "Split an abstraction from its implementation so both vary independently.",
    difficulty: "Advanced",
    intro:
      "The Bridge pattern separates an abstraction from its implementation so the two can change independently. Instead of a class hierarchy that multiplies (Shape × Renderer), you connect two separate hierarchies through a reference.",
    body: [
      {
        type: "paragraph",
        text: "Without Bridge, combining N shapes with M renderers tempts you into N×M subclasses. With Bridge, you have N shapes and M renderers and bridge them — N+M classes that combine freely.",
      },
    ],
    beforeAfter: {
      before: `// N shapes x M renderers => class explosion
class CircleSvg {} class CircleCanvas {}
class SquareSvg {} class SquareCanvas {}`,
      after: `class Shape {                 // abstraction
  constructor(renderer){ this.renderer = renderer; } // bridge
}
class Circle extends Shape {
  draw(){ return this.renderer.drawCircle(); }
}
// renderers (implementations) vary on their own axis
const svg = { drawCircle: () => "<circle/>" };
const canvas = { drawCircle: () => "ctx.arc(...)" };`,
      notes: [
        "Shapes and renderers vary on independent axes.",
        "Add a renderer once; every shape can use it.",
      ],
    },
    playground: {
      code: `class Circle {
  constructor(renderer){ this.renderer = renderer; }
  draw(){ return this.renderer.drawCircle(); }
}
const svg = { drawCircle: () => "<circle />" };
const canvas = { drawCircle: () => "ctx.arc(...)" };

console.log(new Circle(svg).draw());
console.log(new Circle(canvas).draw());`,
    },
    keyPoints: [
      "Separate abstraction from implementation.",
      "Both hierarchies vary independently.",
      "Avoids combinatorial subclass explosion.",
    ],
    related: ["adapter", "strategy", "composition-over-inheritance"],
  },
  {
    slug: "composite",
    title: "Composite",
    category: "structural",
    tagline: "Treat individual objects and groups of objects uniformly.",
    difficulty: "Intermediate",
    intro:
      "The Composite pattern lets you compose objects into tree structures and then treat individual objects (leaves) and compositions (branches) through the same interface. Think files and folders: both respond to size().",
    body: [
      {
        type: "paragraph",
        text: "Clients don't need to know whether they're dealing with a single item or a whole subtree — they call the same method, and the structure handles recursion internally.",
      },
    ],
    beforeAfter: {
      before: `// callers must branch on "is it a group or a single item?"
function size(node){
  if (node.type === "file") return node.size;
  if (node.type === "folder")
    return node.children.reduce((s, c) => s + size(c), 0);
}`,
      after: `class File {
  constructor(size){ this.size = size; }
  total(){ return this.size; }
}
class Folder {
  children = [];
  add(c){ this.children.push(c); return this; }
  total(){ return this.children.reduce((s, c) => s + c.total(), 0); }
}`,
      notes: [
        "Files and folders share one interface: total().",
        "Recursion is handled by the structure, not the caller.",
      ],
    },
    playground: {
      code: `class File {
  constructor(size){ this.size = size; }
  total(){ return this.size; }
}
class Folder {
  children = [];
  add(c){ this.children.push(c); return this; }
  total(){ return this.children.reduce((s, c) => s + c.total(), 0); }
}

const root = new Folder()
  .add(new File(100))
  .add(new Folder().add(new File(50)).add(new File(25)));

console.log("total size:", root.total());`,
    },
    keyPoints: [
      "Model part-whole hierarchies as trees.",
      "Treat leaves and branches uniformly.",
      "Callers ignore the recursion entirely.",
    ],
    related: ["decorator", "iterator"],
  },
  {
    slug: "proxy",
    title: "Proxy",
    category: "structural",
    tagline: "Stand in for another object to control access to it.",
    difficulty: "Intermediate",
    intro:
      "The Proxy pattern provides a placeholder that controls access to a real object. The proxy shares the real object's interface and can add lazy loading, caching, access control, or logging before delegating.",
    body: [
      {
        type: "paragraph",
        text: "Common flavors: a virtual proxy defers expensive creation until first use; a protection proxy enforces permissions; a caching proxy stores results. The client can't tell it's talking to a stand-in.",
      },
    ],
    beforeAfter: {
      before: `// every call hits the expensive service, even for repeats
const service = new ExpensiveService();
service.fetch("a");
service.fetch("a"); // recomputed needlessly`,
      after: `class CachingProxy {
  #cache = new Map();
  constructor(real){ this.real = real; }
  fetch(key){
    if (!this.#cache.has(key)) this.#cache.set(key, this.real.fetch(key));
    return this.#cache.get(key);
  }
}`,
      notes: [
        "Same interface — clients don't change.",
        "Repeated calls are served from cache.",
      ],
    },
    playground: {
      code: `class ExpensiveService {
  fetch(key){ console.log("computing " + key + "..."); return key.toUpperCase(); }
}
class CachingProxy {
  #cache = new Map();
  constructor(real){ this.real = real; }
  fetch(key){
    if (!this.#cache.has(key)) this.#cache.set(key, this.real.fetch(key));
    return this.#cache.get(key);
  }
}

const svc = new CachingProxy(new ExpensiveService());
console.log(svc.fetch("a"));
console.log(svc.fetch("a")); // served from cache, no recompute`,
    },
    keyPoints: [
      "A stand-in that controls access to a real object.",
      "Adds caching, lazy loading, access control, or logging.",
      "Shares the real object's interface transparently.",
    ],
    related: ["decorator", "adapter", "facade"],
  },
  {
    slug: "flyweight",
    title: "Flyweight",
    category: "structural",
    tagline: "Share common state across many objects to save memory.",
    difficulty: "Advanced",
    intro:
      "The Flyweight pattern minimizes memory use by sharing as much data as possible between similar objects. It splits state into intrinsic (shared, context-free) and extrinsic (unique, passed in) parts, so thousands of objects reuse a handful of shared cores.",
    body: [
      {
        type: "paragraph",
        text: "Classic example: rendering a forest of 10,000 trees. The mesh and texture (intrinsic) are shared by tree type; only position (extrinsic) differs per tree. Memory drops dramatically.",
      },
    ],
    beforeAfter: {
      before: `// each tree carries its own copy of heavy shared data
const trees = positions.map((p) =>
  ({ x: p.x, y: p.y, mesh: bigMesh, texture: bigTexture }));`,
      after: `const typeFactory = (() => {
  const cache = new Map();
  return (kind) => {
    if (!cache.has(kind)) cache.set(kind, { mesh: bigMesh, texture: bigTexture });
    return cache.get(kind); // shared intrinsic state
  };
})();
const trees = positions.map((p) => ({ x: p.x, y: p.y, type: typeFactory("oak") }));`,
      notes: [
        "Heavy shared data exists once per type, not per object.",
        "Only the lightweight position varies per instance.",
      ],
    },
    playground: {
      code: `const treeType = (() => {
  const cache = new Map();
  return (kind) => {
    if (!cache.has(kind)) cache.set(kind, { kind, mesh: "heavy-mesh" });
    return cache.get(kind);
  };
})();

const a = treeType("oak");
const b = treeType("oak");
const c = treeType("pine");
console.log("oak shared?", a === b);
console.log("oak vs pine shared?", a === c);`,
    },
    keyPoints: [
      "Share intrinsic state across many objects.",
      "Pass per-object extrinsic state in from outside.",
      "Huge memory savings at scale.",
    ],
    related: ["prototype", "singleton", "proxy"],
  },
];
