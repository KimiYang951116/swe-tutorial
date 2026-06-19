import type { Lesson } from "../types";

export const architecture: Lesson[] = [
  {
    slug: "mvc",
    title: "Model–View–Controller (MVC)",
    category: "architecture",
    tagline: "Separate data, presentation, and input handling into three roles.",
    difficulty: "Intermediate",
    intro:
      "MVC splits an application into three connected parts: the Model (data and business rules), the View (what the user sees), and the Controller (handles input and updates the model). This separation keeps UI concerns out of business logic and vice versa.",
    body: [
      { type: "heading", text: "The three roles" },
      {
        type: "list",
        items: [
          "Model — owns data and the rules that govern it; knows nothing about the UI.",
          "View — renders the model for the user; stays free of business logic.",
          "Controller — translates user input into actions on the model.",
        ],
      },
      {
        type: "callout",
        variant: "key",
        title: "Watch the data flow",
        text: "User acts → Controller updates the Model → Model notifies the View → View re-renders. Follow the arrows in the visualization.",
      },
    ],
    viz: "mvc",
    beforeAfter: {
      before: `// one blob mixes data, rendering, and input handling
function onClick() {
  count++;                                   // data
  document.querySelector("#c").innerText = count; // view
  fetch("/save?c=" + count);                 // logic
}`,
      after: `const model = { count: 0, listeners: [],
  inc(){ this.count++; this.listeners.forEach((l) => l(this.count)); },
  onChange(l){ this.listeners.push(l); } };
const view = (n) => console.log("render:", n);     // View
model.onChange(view);
const controller = () => model.inc();              // Controller`,
      notes: [
        "Model owns state and notifies on change.",
        "View only renders; Controller only handles input.",
        "Each role is testable on its own.",
      ],
    },
    playground: {
      code: `const model = {
  count: 0, listeners: [],
  inc(){ this.count++; this.listeners.forEach((l) => l(this.count)); },
  onChange(l){ this.listeners.push(l); },
};
const view = (n) => console.log("View renders count =", n);
model.onChange(view);

const controller = { click(){ model.inc(); } };
controller.click();
controller.click();`,
    },
    keyPoints: [
      "Three roles: Model, View, Controller.",
      "Keeps business logic out of the UI.",
      "Each part can be developed and tested independently.",
    ],
    related: ["mvp", "mvvm", "observer", "separation-of-concerns"],
  },
  {
    slug: "layered-architecture",
    title: "Layered Architecture",
    category: "architecture",
    tagline: "Organize code into stacked layers, each depending only on the one below.",
    difficulty: "Beginner",
    also: "N-tier architecture",
    intro:
      "Layered architecture organizes a system into horizontal layers — typically presentation, application/business, and data — where each layer uses only the layer directly beneath it. It's the most common starting structure for applications.",
    body: [
      {
        type: "paragraph",
        text: "Clear layering enforces separation of concerns and makes the codebase easy to navigate. The main risk is the 'sinkhole' anti-pattern, where requests pass through layers that add no value.",
      },
    ],
    beforeAfter: {
      before: `// UI reaches straight into the database
function page() {
  const rows = db.query("SELECT * FROM orders WHERE total > 100");
  return render(rows);
}`,
      after: `// presentation -> service -> repository -> db
const repo = { largeOrders: () => db.query("SELECT ... > 100") };
const service = { bigOrders: () => repo.largeOrders() };
const page = () => render(service.bigOrders());`,
      notes: [
        "Each layer talks only to the one below it.",
        "Swap the database without touching the UI.",
      ],
    },
    playground: {
      code: `const repository = { findOrders: () => [{ id: 1, total: 150 }] };
const service = { bigOrders: () => repository.findOrders().filter((o) => o.total > 100) };
const presentation = () => service.bigOrders().map((o) => "Order #" + o.id);

console.log(presentation());`,
    },
    keyPoints: [
      "Stack presentation, business, and data layers.",
      "Each layer depends only on the one below.",
      "Simple and ubiquitous; avoid pass-through 'sinkhole' layers.",
    ],
    related: ["separation-of-concerns", "repository", "hexagonal"],
  },
  {
    slug: "mvp",
    title: "Model–View–Presenter (MVP)",
    category: "architecture",
    tagline: "A passive view delegates all logic to a presenter.",
    difficulty: "Intermediate",
    intro:
      "MVP is an MVC derivative where the View is 'passive' — it does almost nothing on its own and forwards events to a Presenter. The Presenter contains the presentation logic, updates the Model, and pushes results back to the View through an interface.",
    body: [
      {
        type: "paragraph",
        text: "Because the View is a thin, interface-driven shell, the Presenter can be unit-tested without any UI. This makes MVP popular where view testability matters.",
      },
    ],
    beforeAfter: {
      before: `// view holds logic, hard to test without a real UI
input.onSubmit = () => {
  if (input.value.length < 3) showError();
  else model.save(input.value);
};`,
      after: `// presenter holds logic; view is a passive interface
class Presenter {
  constructor(view, model){ this.view = view; this.model = model; }
  submit(value){
    if (value.length < 3) this.view.showError("too short");
    else this.model.save(value);
  }
}`,
      notes: [
        "Presentation logic lives in the testable Presenter.",
        "The View just forwards events and renders what it's told.",
      ],
    },
    playground: {
      code: `class Presenter {
  constructor(view, model){ this.view = view; this.model = model; }
  submit(value){
    if (value.length < 3) this.view.showError("too short");
    else { this.model.save(value); this.view.showOk(); }
  }
}
const view = { showError: (m) => console.log("error:", m), showOk: () => console.log("saved!") };
const model = { save: (v) => console.log("model stored:", v) };
const p = new Presenter(view, model);

p.submit("ab");
p.submit("hello");`,
    },
    keyPoints: [
      "View is passive; Presenter holds the logic.",
      "Presenter is testable without a UI.",
      "View and Presenter talk through an interface.",
    ],
    related: ["mvc", "mvvm", "dip"],
  },
  {
    slug: "mvvm",
    title: "Model–View–ViewModel (MVVM)",
    category: "architecture",
    tagline: "Bind the view to a view-model via automatic data binding.",
    difficulty: "Intermediate",
    intro:
      "MVVM introduces a ViewModel that exposes data and commands the View binds to. Thanks to data binding, when the ViewModel changes, the View updates automatically (and vice versa). It's the model behind many modern reactive UI frameworks.",
    body: [
      {
        type: "paragraph",
        text: "The View declares what to show via bindings; the ViewModel holds presentation state and logic but knows nothing about specific UI widgets. This is the spiritual ancestor of reactive frameworks like Vue and Angular.",
      },
    ],
    beforeAfter: {
      before: `// manual, error-prone DOM syncing
firstName.oninput = () => { fullName.value = firstName.value + " " + lastName.value; };
lastName.oninput  = () => { fullName.value = firstName.value + " " + lastName.value; };`,
      after: `// a reactive view-model; the view binds to fullName
function ViewModel() {
  const vm = { first: "", last: "",
    get full(){ return (this.first + " " + this.last).trim(); } };
  return vm; // bindings re-read full() whenever first/last change
}`,
      notes: [
        "Derived state (full name) is computed by the ViewModel.",
        "Bindings keep the View in sync automatically.",
      ],
    },
    playground: {
      code: `function makeViewModel(){
  return {
    first: "", last: "",
    get full(){ return (this.first + " " + this.last).trim(); },
  };
}
const vm = makeViewModel();
vm.first = "Ada"; vm.last = "Lovelace";
console.log("view shows:", vm.full);
vm.last = "Byte";
console.log("view shows:", vm.full);`,
    },
    keyPoints: [
      "ViewModel exposes bindable state and commands.",
      "Data binding syncs View and ViewModel automatically.",
      "Foundation of modern reactive UI frameworks.",
    ],
    related: ["mvc", "mvp", "observer"],
  },
  {
    slug: "microservices",
    title: "Microservices",
    category: "architecture",
    tagline: "Build an app as a suite of small, independently deployable services.",
    difficulty: "Advanced",
    intro:
      "Microservices structure an application as a collection of small services, each owning a single business capability, running in its own process, and communicating over the network. Each can be developed, deployed, and scaled independently.",
    body: [
      { type: "heading", text: "Benefits and costs" },
      {
        type: "paragraph",
        text: "You gain independent deployability, targeted scaling, and team autonomy. You pay with operational complexity: network failures, distributed data, monitoring, and eventual consistency. Don't reach for microservices before a monolith hurts.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Start with a monolith",
        text: "Most systems should begin as a well-structured monolith. Extract microservices only when scaling or team boundaries demand it.",
      },
    ],
    beforeAfter: {
      before: `// monolith: one deploy, one database, everything coupled
app.post("/order", () => { /* inventory + billing + shipping all here */ });`,
      after: `// independent services with their own data + APIs
orderService.create(order);            // calls...
await inventoryService.reserve(order); // separate service, own DB
await billingService.charge(order);    // separate service, own DB`,
      notes: [
        "Each service owns one capability and its own data.",
        "Services deploy and scale independently.",
        "Communication is over the network (with its trade-offs).",
      ],
    },
    playground: {
      code: `// simulate services communicating via async calls
const inventory = { reserve: async (id) => "reserved " + id };
const billing   = { charge: async (id) => "charged " + id };

async function createOrder(id){
  console.log(await inventory.reserve(id));
  console.log(await billing.charge(id));
  return "order " + id + " complete";
}
createOrder("A1").then((r) => console.log(r));`,
    },
    keyPoints: [
      "Small services, each one capability, own data store.",
      "Independent deploy and scale; team autonomy.",
      "High operational complexity — start with a monolith.",
    ],
    related: ["event-driven", "client-server", "cqrs"],
  },
  {
    slug: "event-driven",
    title: "Event-Driven Architecture",
    category: "architecture",
    tagline: "Components react to events instead of calling each other directly.",
    difficulty: "Advanced",
    intro:
      "In event-driven architecture, components communicate by producing and consuming events. A producer emits an event ('OrderPlaced') without knowing who handles it; consumers react independently. This yields extreme decoupling and natural scalability.",
    body: [
      {
        type: "paragraph",
        text: "Events flow through a broker or stream (e.g., Kafka, a message queue). New consumers can subscribe without changing producers, but you trade synchronous certainty for eventual consistency and harder debugging.",
      },
    ],
    beforeAfter: {
      before: `// producer must call every consumer explicitly
function placeOrder(o){
  saveOrder(o);
  emailService.send(o);     // tightly coupled
  analytics.track(o);
  warehouse.notify(o);
}`,
      after: `function placeOrder(o){
  saveOrder(o);
  bus.emit("OrderPlaced", o); // fire and forget
}
// consumers subscribe independently
bus.on("OrderPlaced", emailService.send);
bus.on("OrderPlaced", analytics.track);`,
      notes: [
        "Producers don't know their consumers.",
        "Add consumers without touching producers.",
        "Trades immediacy for eventual consistency.",
      ],
    },
    playground: {
      code: `function createBus(){
  const handlers = {};
  return {
    on(e, fn){ (handlers[e] ||= []).push(fn); },
    emit(e, data){ (handlers[e] || []).forEach((fn) => fn(data)); },
  };
}
const bus = createBus();
bus.on("OrderPlaced", (o) => console.log("email for", o.id));
bus.on("OrderPlaced", (o) => console.log("analytics for", o.id));

bus.emit("OrderPlaced", { id: "A1" });`,
    },
    keyPoints: [
      "Producers emit events; consumers react.",
      "Extreme decoupling and easy extensibility.",
      "Eventual consistency and harder debugging are the costs.",
    ],
    related: ["pub-sub", "observer", "microservices", "cqrs"],
  },
  {
    slug: "service-oriented-architecture",
    title: "Service-Oriented Architecture (SOA)",
    category: "architecture",
    tagline: "Build systems by combining independently accessible services.",
    difficulty: "Advanced",
    also: "SOA",
    intro:
      "Service-Oriented Architecture builds systems by combining independently accessible services. Each service exposes a well-defined interface, and applications are assembled by orchestrating these services — even across organizations and technologies.",
    body: [
      { type: "heading", text: "Benefits" },
      {
        type: "list",
        items: [
          "Services can be reused across applications",
          "Systems can combine services written in different technologies",
          "External organizations can expose services to each other",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "SOA vs microservices",
        text: "Microservices are a fine-grained, independently deployable take on the service idea. SOA is the broader concept of composing systems from accessible services, often at enterprise scale.",
      },
    ],
    keyPoints: [
      "Compose systems from independently accessible services.",
      "Services are reusable and technology-agnostic.",
      "Microservices are a fine-grained evolution of the idea.",
    ],
    related: ["microservices", "client-server", "event-driven"],
  },
  {
    slug: "pub-sub",
    title: "Publish–Subscribe",
    category: "architecture",
    tagline: "Decouple senders and receivers through a message broker.",
    difficulty: "Intermediate",
    intro:
      "Publish–Subscribe routes messages from publishers to subscribers through an intermediary (a broker or topic channel). Unlike the classic Observer, publishers and subscribers never reference each other — they only know the channel.",
    body: [
      {
        type: "paragraph",
        text: "Subscribers express interest in topics; publishers post to topics. The broker handles delivery. This extra layer of indirection makes the two sides fully independent and supports many-to-many messaging.",
      },
    ],
    beforeAfter: {
      before: `// observer: subject directly holds references to observers
subject.subscribe(observerA);
subject.subscribe(observerB);`,
      after: `// pub/sub: a broker sits in the middle, by topic
broker.subscribe("news", (m) => console.log("A:", m));
broker.subscribe("news", (m) => console.log("B:", m));
broker.publish("news", "hello"); // publisher knows only the topic`,
      notes: [
        "Publishers and subscribers never reference each other.",
        "The broker decouples both sides by topic.",
      ],
    },
    playground: {
      code: `function createBroker(){
  const topics = {};
  return {
    subscribe(t, fn){ (topics[t] ||= []).push(fn); },
    publish(t, msg){ (topics[t] || []).forEach((fn) => fn(msg)); },
  };
}
const broker = createBroker();
broker.subscribe("news", (m) => console.log("Subscriber A got:", m));
broker.subscribe("news", (m) => console.log("Subscriber B got:", m));

broker.publish("news", "Breaking!");`,
    },
    keyPoints: [
      "Messages flow through a broker, by topic.",
      "Publishers and subscribers are fully decoupled.",
      "Supports many-to-many communication.",
    ],
    related: ["observer", "event-driven", "mediator"],
  },
  {
    slug: "client-server",
    title: "Client–Server",
    category: "architecture",
    tagline: "Split responsibilities between requesting clients and a shared server.",
    difficulty: "Beginner",
    intro:
      "The client–server model divides a system into clients that request services and a server that provides them. The server centralizes shared resources and logic; clients handle presentation and user interaction. It's the foundation of the web.",
    body: [
      {
        type: "paragraph",
        text: "Centralizing data and rules on the server enforces consistency and security; many clients can share one server. The trade-offs are network latency and the server as a potential bottleneck or single point of failure.",
      },
    ],
    beforeAfter: {
      before: `// fat client: business rules and data live on the device
function checkout(){
  if (localPrices[item] && localStock[item] > 0) { /* trust the client?! */ }
}`,
      after: `// client requests; server owns the authoritative rules + data
async function checkout(item){
  return fetch("/api/checkout", { method: "POST", body: item });
}
// server validates stock, price, and permissions centrally`,
      notes: [
        "Authoritative data and rules live on the server.",
        "Many clients share one consistent source.",
      ],
    },
    playground: {
      code: `// simulate a request/response round trip
const server = {
  handle(req){
    if (req.path === "/time") return { status: 200, body: "server time" };
    return { status: 404, body: "not found" };
  },
};
const client = (path) => server.handle({ path });

console.log(client("/time"));
console.log(client("/missing"));`,
    },
    keyPoints: [
      "Clients request; a server provides shared services.",
      "Centralizes data, rules, and security.",
      "Watch for latency and single-point-of-failure risk.",
    ],
    related: ["microservices", "layered-architecture"],
  },
  {
    slug: "hexagonal",
    title: "Hexagonal Architecture",
    category: "architecture",
    tagline: "Isolate core logic behind ports; plug in adapters at the edges.",
    difficulty: "Advanced",
    also: "Ports & Adapters",
    intro:
      "Hexagonal architecture (Ports & Adapters) puts your domain logic at the center, surrounded by 'ports' (interfaces it defines). External concerns — databases, web frameworks, message queues — connect through 'adapters' that implement those ports. The core never depends on infrastructure.",
    body: [
      {
        type: "paragraph",
        text: "Because the domain only knows abstractions (ports), you can swap a REST adapter for a CLI, or a Postgres adapter for an in-memory fake, without changing business rules. It's Dependency Inversion applied at the architectural scale.",
      },
    ],
    beforeAfter: {
      before: `// domain logic imports the database directly
import { postgres } from "./db";
function placeOrder(o){ postgres.insert("orders", o); }`,
      after: `// domain defines a port; adapters implement it
function makeOrderService(orderRepo /* a port */){
  return { placeOrder: (o) => orderRepo.save(o) };
}
const postgresAdapter = { save: (o) => {/* ... */} };
const inMemoryAdapter = { save: (o) => {/* test double */} };`,
      notes: [
        "Core logic depends on ports (interfaces), not infrastructure.",
        "Swap adapters (DB, UI, queue) without touching the core.",
        "Makes the domain trivially testable.",
      ],
    },
    playground: {
      code: `function makeOrderService(repo){
  return { placeOrder: (o) => { repo.save(o); return "placed " + o.id; } };
}
const inMemory = { save: (o) => console.log("saved to memory:", o.id) };
const fakeApi  = { save: (o) => console.log("POSTed to API:", o.id) };

console.log(makeOrderService(inMemory).placeOrder({ id: "A1" }));
console.log(makeOrderService(fakeApi).placeOrder({ id: "B2" }));`,
    },
    keyPoints: [
      "Domain core at center; infrastructure at the edges.",
      "Ports are interfaces; adapters implement them.",
      "Dependency Inversion at architectural scale.",
    ],
    related: ["dip", "layered-architecture", "repository", "adapter"],
  },
  {
    slug: "cqrs",
    title: "CQRS",
    category: "architecture",
    tagline: "Separate the model that writes data from the model that reads it.",
    difficulty: "Advanced",
    also: "Command Query Responsibility Segregation",
    intro:
      "CQRS splits a system into a write side (commands that change state) and a read side (queries that return data), each with its own model. This lets you optimize reads and writes independently — different schemas, scaling, and even data stores.",
    body: [
      {
        type: "paragraph",
        text: "It builds on the Command–Query Separation principle. CQRS pays off in high-scale or complex-domain systems, often paired with event sourcing, but adds significant complexity — avoid it for simple CRUD apps.",
      },
    ],
    beforeAfter: {
      before: `// one model strains to serve both writes and complex reads
class OrderModel {
  place(o){ /* write */ }
  getDashboardStats(){ /* heavy joins on the same schema */ }
}`,
      after: `// write side: commands mutate state
const commands = { placeOrder: (o) => writeStore.append(o) };
// read side: a separate, query-optimized model
const queries = { dashboard: () => readStore.materializedView() };`,
      notes: [
        "Reads and writes use separate, optimized models.",
        "Each side scales and evolves independently.",
      ],
    },
    playground: {
      code: `const writeStore = [];
const commands = { placeOrder: (o) => { writeStore.push(o); return "ok"; } };
const queries  = {
  totalRevenue: () => writeStore.reduce((s, o) => s + o.total, 0),
  count: () => writeStore.length,
};

commands.placeOrder({ id: "A1", total: 100 });
commands.placeOrder({ id: "A2", total: 250 });
console.log("count:", queries.count());
console.log("revenue:", queries.totalRevenue());`,
    },
    keyPoints: [
      "Separate write (command) and read (query) models.",
      "Optimize and scale each side independently.",
      "Powerful but complex — not for simple CRUD.",
    ],
    related: ["event-driven", "microservices", "repository"],
  },
  {
    slug: "repository",
    title: "Repository Pattern",
    category: "architecture",
    tagline: "Mediate data access behind a collection-like interface.",
    difficulty: "Intermediate",
    intro:
      "The Repository pattern provides a collection-like abstraction over data storage. Business code calls methods like findById() or save() without knowing whether the data lives in SQL, a document store, or memory — isolating persistence details.",
    body: [
      {
        type: "paragraph",
        text: "Repositories centralize query logic and decouple the domain from the database, which makes testing easy (swap in an in-memory repo) and keeps storage decisions changeable.",
      },
    ],
    beforeAfter: {
      before: `// SQL strings leak into business logic everywhere
function getActiveUsers(){
  return db.query("SELECT * FROM users WHERE active = 1 AND deleted = 0");
}`,
      after: `class UserRepository {
  constructor(db){ this.db = db; }
  active(){ return this.db.query("SELECT ... active = 1"); }
  save(user){ /* ... */ }
}
// business code: userRepo.active() — no SQL in sight`,
      notes: [
        "Query details live in one place.",
        "Business logic depends on the repository interface.",
        "Swap the store (or use a fake in tests) freely.",
      ],
    },
    playground: {
      code: `class UserRepository {
  #users = [{ id: 1, name: "Ada", active: true }, { id: 2, name: "Bob", active: false }];
  active(){ return this.#users.filter((u) => u.active); }
  findById(id){ return this.#users.find((u) => u.id === id); }
}
const repo = new UserRepository();
console.log("active:", repo.active());
console.log("by id:", repo.findById(2));`,
    },
    keyPoints: [
      "A collection-like interface over storage.",
      "Keeps query logic and the DB out of business code.",
      "Makes persistence swappable and testable.",
    ],
    related: ["dip", "hexagonal", "layered-architecture"],
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection",
    category: "architecture",
    tagline: "Supply a component's dependencies from outside instead of creating them inside.",
    difficulty: "Intermediate",
    also: "DI · Inversion of Control",
    intro:
      "Dependency Injection is the practice of passing a component its dependencies (services, repositories, config) from the outside rather than having it construct them itself. It's the concrete technique that makes the Dependency Inversion Principle practical.",
    body: [
      {
        type: "paragraph",
        text: "By injecting collaborators — via constructor, setter, or parameters — you decouple a class from concrete implementations, enable easy swapping, and make unit testing straightforward with test doubles.",
      },
    ],
    beforeAfter: {
      before: `class OrderService {
  constructor(){
    this.repo = new PostgresRepo();   // hard-wired, untestable
    this.mailer = new SmtpMailer();   // can't substitute a fake
  }
}`,
      after: `class OrderService {
  constructor(repo, mailer){ // injected from outside
    this.repo = repo;
    this.mailer = mailer;
  }
}
// production: new OrderService(new PostgresRepo(), new SmtpMailer())
// tests:      new OrderService(fakeRepo, fakeMailer)`,
      notes: [
        "Dependencies come from the caller, not `new` inside.",
        "Swap real services for fakes in tests instantly.",
        "Decouples the class from concrete implementations.",
      ],
    },
    playground: {
      code: `class OrderService {
  constructor(repo, mailer){ this.repo = repo; this.mailer = mailer; }
  place(order){
    this.repo.save(order);
    this.mailer.send("Order " + order.id + " placed");
  }
}
const fakeRepo = { save: (o) => console.log("saved", o.id) };
const fakeMailer = { send: (m) => console.log("mail:", m) };

new OrderService(fakeRepo, fakeMailer).place({ id: "A1" });`,
    },
    keyPoints: [
      "Pass dependencies in; don't construct them inside.",
      "Makes the Dependency Inversion Principle practical.",
      "Enables swapping and easy unit testing.",
    ],
    related: ["dip", "hexagonal", "singleton", "repository"],
  },
];
