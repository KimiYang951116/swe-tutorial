import type { QuizQuestion, Flashcard, OrderingExercise } from "./types";

export interface InteractiveContent {
  quiz?: QuizQuestion[];
  flashcards?: Flashcard[];
  ordering?: OrderingExercise;
}

/**
 * Interactive practice content keyed by lesson slug, merged into lessons by the
 * registry. Add entries here to give any lesson a quiz / flashcards / ordering
 * exercise without editing the lesson file itself.
 */
export const interactiveBySlug: Record<string, InteractiveContent> = {
  /* ----------------------------- Foundations ----------------------------- */
  "what-is-software-engineering": {
    quiz: [
      {
        question: "Which statement best captures software engineering?",
        options: [
          "Writing as much code as quickly as possible",
          "The disciplined development, operation, and maintenance of software",
          "Choosing the fastest programming language",
          "Avoiding documentation to save time",
        ],
        answer: 1,
        explanation:
          "It's the whole discipline of building and maintaining useful software — coding is only one part.",
      },
      {
        question: "Why do most SE principles exist?",
        options: [
          "To make code run faster",
          "To make change safer and cheaper",
          "To reduce the number of files",
          "To impress reviewers",
        ],
        answer: 1,
        explanation:
          "Code is read and changed far more than written, so most practices target safe, cheap change.",
      },
    ],
    flashcards: [
      { front: "Is coding the whole of software engineering?", back: "No — it also includes requirements, design, testing, docs, collaboration, and delivery." },
      { front: "The recurring theme behind most SE practices?", back: "Managing change (and complexity)." },
    ],
  },

  /* -------------------------------- OOP --------------------------------- */
  objects: {
    quiz: [
      {
        question: "An object combines which two things?",
        options: ["Classes and functions", "State and behavior", "Input and output", "Files and folders"],
        answer: 1,
        explanation: "An object bundles state (data) with behavior (operations on that data).",
      },
      {
        question: "How do objects typically interact?",
        options: ["By reading each other's fields directly", "By sending messages (method calls)", "Through global variables", "They don't interact"],
        answer: 1,
        explanation: "Objects collaborate by sending messages — asking each other to do things.",
      },
    ],
  },
  polymorphism: {
    quiz: [
      {
        question: "Polymorphism lets you…",
        options: [
          "Use one interface with many different implementations",
          "Store more data per object",
          "Run code without compiling",
          "Avoid writing interfaces",
        ],
        answer: 0,
        explanation: "Callers use a shared interface; the concrete type supplies the behavior at runtime.",
      },
      {
        question: "Polymorphism most directly helps you avoid…",
        options: ["Comments", "Type-checking conditionals (switch on a type tag)", "Unit tests", "Variables"],
        answer: 1,
        explanation: "Each type implements the shared method, replacing switch-on-type with a method call.",
      },
    ],
    flashcards: [
      { front: "Polymorphism in one line", back: "One interface, many runtime behaviors." },
      { front: "Which principle does polymorphism enable?", back: "Open/Closed — add a type without editing callers." },
    ],
  },
  inheritance: {
    quiz: [
      {
        question: "When is inheritance the right tool?",
        options: [
          "Whenever two classes share any code",
          "When the subclass is genuinely a substitutable kind of the superclass",
          "To avoid writing functions",
          "Only for private fields",
        ],
        answer: 1,
        explanation: "Use inheritance for true 'is-a' relationships; prefer composition for mere code sharing.",
      },
    ],
  },

  /* ---------------------------- Requirements ---------------------------- */
  "functional-nonfunctional": {
    quiz: [
      {
        question: "'Search results should appear within two seconds' is a…",
        options: ["Functional requirement", "Non-functional requirement", "User story", "Glossary term"],
        answer: 1,
        explanation: "It constrains a quality (performance) rather than describing a behavior.",
      },
      {
        question: "'The app allows a user to add a pin' is a…",
        options: ["Non-functional requirement", "Functional requirement", "Constraint", "Test case"],
        answer: 1,
        explanation: "It describes what the system does — a functional requirement.",
      },
    ],
    flashcards: [
      { front: "Functional requirement", back: "What the system should do (a behavior/capability)." },
      { front: "Non-functional requirement", back: "A quality/constraint: performance, security, usability, etc." },
    ],
  },
  "user-stories": {
    quiz: [
      {
        question: "Which is the standard user-story format?",
        options: [
          "Given <state>, when <event>, then <result>",
          "As a <user>, I want <goal>, so that <benefit>",
          "The system shall <requirement>",
          "Input → Process → Output",
        ],
        answer: 1,
        explanation: "User stories capture who, what, and — crucially — why (the benefit).",
      },
    ],
  },

  /* ------------------------------- Design ------------------------------- */
  "domain-model": {
    quiz: [
      {
        question: "Which belongs in a domain model?",
        options: ["JSON parser", "HTTP request", "Pin", "Database client"],
        answer: 2,
        explanation: "Domain models capture real-world concepts (User, Pin, Review), not technical mechanisms.",
      },
    ],
  },

  /* --------------------------- Architecture ----------------------------- */
  mvc: {
    quiz: [
      {
        question: "In MVC, which part holds business data and rules?",
        options: ["View", "Controller", "Model", "Router"],
        answer: 2,
        explanation: "The Model owns data and rules; the View renders; the Controller handles input.",
      },
      {
        question: "What's the typical MVC data flow on user input?",
        options: [
          "View → Model → Controller",
          "Controller updates Model → Model notifies View → View re-renders",
          "Model → Controller → nothing",
          "View directly edits the database",
        ],
        answer: 1,
        explanation: "Input goes through the Controller to the Model, which notifies the View to re-render.",
      },
    ],
  },
  microservices: {
    quiz: [
      {
        question: "A common piece of advice about microservices is to…",
        options: [
          "Always start with microservices",
          "Start with a well-structured monolith and extract services when needed",
          "Never use a database",
          "Avoid networks",
        ],
        answer: 1,
        explanation: "Microservices add real operational complexity; most systems should start as a monolith.",
      },
    ],
  },

  /* ---------------------------- Principles ------------------------------ */
  dry: {
    quiz: [
      {
        question: "DRY is fundamentally about avoiding duplicated…",
        options: ["Lines of text", "Knowledge", "Files", "Variables"],
        answer: 1,
        explanation: "DRY targets duplicated knowledge/decisions, not merely similar-looking text.",
      },
      {
        question: "What's the main danger of duplicated knowledge?",
        options: [
          "It uses more disk space",
          "Copies drift out of sync when one changes",
          "It compiles slower",
          "It looks ugly",
        ],
        answer: 1,
        explanation: "The real cost is copies diverging over time, creating subtle bugs.",
      },
    ],
    flashcards: [
      { front: "DRY", back: "Every piece of knowledge has one authoritative representation." },
      { front: "Can you over-apply DRY?", back: "Yes — don't merge code that only looks alike but changes for different reasons." },
    ],
  },
  kiss: {
    quiz: [
      {
        question: "KISS means prefer…",
        options: ["The shortest code", "The simplest design that solves the problem", "The cleverest trick", "The most generic framework"],
        answer: 1,
        explanation: "Simplicity is about clarity, not character count.",
      },
    ],
  },
  "coupling-cohesion": {
    quiz: [
      {
        question: "Good design aims for…",
        options: ["High coupling, low cohesion", "Low coupling, high cohesion", "High coupling, high cohesion", "Low coupling, low cohesion"],
        answer: 1,
        explanation: "Modules should depend on each other little (low coupling) and be internally focused (high cohesion).",
      },
      {
        question: "Cohesion measures…",
        options: [
          "How many modules exist",
          "How strongly a module's responsibilities belong together",
          "How fast code runs",
          "How many tests pass",
        ],
        answer: 1,
        explanation: "High cohesion = one clear, focused purpose per module.",
      },
    ],
    flashcards: [
      { front: "Coupling", back: "How much modules depend on each other (want it low)." },
      { front: "Cohesion", back: "How focused a module's responsibilities are (want it high)." },
    ],
  },
  "composition-over-inheritance": {
    quiz: [
      {
        question: "Composition models which relationship?",
        options: ["is-a", "has-a / uses-a", "calls-once", "extends"],
        answer: 1,
        explanation: "Composition assembles behavior from parts (has-a); inheritance models is-a.",
      },
    ],
  },

  /* ------------------------------- SOLID -------------------------------- */
  srp: {
    quiz: [
      {
        question: "The Single Responsibility Principle says a class should have…",
        options: ["One method", "One reason to change", "One field", "One subclass"],
        answer: 1,
        explanation: "One responsibility = one axis of change.",
      },
    ],
    flashcards: [{ front: "SRP", back: "A class should have only one reason to change." }],
  },
  ocp: {
    quiz: [
      {
        question: "Open/Closed Principle: software should be open for ___ and closed for ___.",
        options: ["reading / writing", "extension / modification", "testing / deployment", "input / output"],
        answer: 1,
        explanation: "Add new behavior by adding code, not by editing existing, tested code.",
      },
    ],
    flashcards: [{ front: "OCP", back: "Open for extension, closed for modification." }],
  },
  lsp: {
    quiz: [
      {
        question: "Liskov Substitution Principle requires that…",
        options: [
          "Subtypes are usable anywhere the base type is expected",
          "Every class has a subclass",
          "Interfaces are large",
          "Subclasses add fields",
        ],
        answer: 0,
        explanation: "A subtype must honor the base type's contract without surprises.",
      },
    ],
  },
  isp: {
    quiz: [
      {
        question: "Interface Segregation favors…",
        options: ["One large general interface", "Many small focused interfaces", "No interfaces", "Only abstract classes"],
        answer: 1,
        explanation: "Clients should depend only on the methods they actually use.",
      },
    ],
  },
  dip: {
    quiz: [
      {
        question: "Dependency Inversion says modules should depend on…",
        options: ["Concrete implementations", "Abstractions", "Global variables", "The database"],
        answer: 1,
        explanation: "Both high- and low-level modules depend on abstractions; details depend on abstractions.",
      },
    ],
    flashcards: [{ front: "DIP", back: "Depend on abstractions, not concretions; inject dependencies." }],
  },

  /* ----------------------------- Patterns ------------------------------- */
  "factory-method": {
    quiz: [
      {
        question: "A Factory Method primarily helps you…",
        options: [
          "Avoid scattering `new ConcreteClass` across the code",
          "Run code in parallel",
          "Store more data",
          "Replace all interfaces",
        ],
        answer: 0,
        explanation: "It centralizes creation so callers ask by intent, decoupled from concrete classes.",
      },
    ],
  },
  singleton: {
    quiz: [
      {
        question: "A key downside of the Singleton pattern is that it…",
        options: ["Uses too much memory", "Acts as global state and hurts testability", "Can't be written in JS", "Requires a database"],
        answer: 1,
        explanation: "Singletons are global state; prefer injecting the shared instance to keep code testable.",
      },
    ],
  },
  adapter: {
    quiz: [
      {
        question: "The Adapter pattern is used to…",
        options: [
          "Add caching",
          "Make an incompatible interface fit the one you expect",
          "Notify observers",
          "Create families of objects",
        ],
        answer: 1,
        explanation: "An adapter wraps a class and translates calls to the interface your code expects.",
      },
    ],
  },
  decorator: {
    quiz: [
      {
        question: "Decorator adds behavior by…",
        options: ["Subclassing for each combination", "Wrapping an object with the same interface", "Editing the original class", "Using a database"],
        answer: 1,
        explanation: "Each decorator wraps the object and adds behavior, stackable in any combination.",
      },
    ],
    flashcards: [{ front: "Decorator vs subclassing", back: "Wrap to add behavior at runtime instead of a subclass per combination." }],
  },
  strategy: {
    quiz: [
      {
        question: "The Strategy pattern lets you…",
        options: ["Swap an algorithm at runtime", "Cache results", "Create singletons", "Traverse a tree"],
        answer: 0,
        explanation: "Encapsulate interchangeable algorithms and inject the one you want.",
      },
    ],
    flashcards: [{ front: "Strategy", back: "Encapsulate interchangeable algorithms; pick one at runtime." }],
  },
  observer: {
    quiz: [
      {
        question: "In the Observer pattern, the subject…",
        options: [
          "Knows exactly what each observer does",
          "Notifies registered observers without knowing their details",
          "Polls observers for changes",
          "Must be a singleton",
        ],
        answer: 1,
        explanation: "The subject just emits; observers subscribe and react — keeping them decoupled.",
      },
    ],
  },
  command: {
    quiz: [
      {
        question: "Turning a request into an object (Command) most directly enables…",
        options: ["Faster networks", "Undo/redo, queues, and logging", "Smaller files", "Type checking"],
        answer: 1,
        explanation: "A first-class command with execute()/undo() gives you history, queues, and macros.",
      },
    ],
  },

  /* --------------------------- Code Quality ----------------------------- */
  "clean-code": {
    quiz: [
      {
        question: "Clean code is primarily optimized for…",
        options: ["The compiler", "The reader", "The CPU", "The linter"],
        answer: 1,
        explanation: "Code is read far more than written; clarity for humans is the priority.",
      },
    ],
    flashcards: [{ front: "Best alternative to an explanatory comment?", back: "A better name." }],
  },
  refactoring: {
    quiz: [
      {
        question: "Refactoring changes a program's ___ without changing its ___.",
        options: ["behavior / structure", "structure / external behavior", "tests / code", "name / purpose"],
        answer: 1,
        explanation: "Refactoring improves internal structure while preserving external behavior.",
      },
      {
        question: "What makes refactoring safe?",
        options: ["Doing it quickly", "A passing (regression) test suite", "Skipping reviews", "Avoiding small steps"],
        answer: 1,
        explanation: "Tests let you restructure fearlessly and catch accidental behavior changes.",
      },
    ],
  },
  naming: {
    quiz: [
      {
        question: "Good names should primarily…",
        options: ["Be short", "Reveal intent", "Use abbreviations", "Match the language keyword"],
        answer: 1,
        explanation: "Intention-revealing names remove the need for comments.",
      },
    ],
  },

  /* ------------------------ Errors & Robustness ------------------------- */
  exceptions: {
    quiz: [
      {
        question: "Exceptions should be used for…",
        options: ["Routine branching", "Exceptional, unhandleable situations", "Loops", "Logging only"],
        answer: 1,
        explanation: "Reserve exceptions for genuinely exceptional cases, not ordinary expected flow.",
      },
    ],
  },
  "defensive-programming": {
    quiz: [
      {
        question: "Returning a copy of an internal list instead of the list itself is an example of…",
        options: ["Premature optimization", "A defensive copy", "A code smell", "Inheritance"],
        answer: 1,
        explanation: "Defensive copies stop callers from mutating your internal state.",
      },
    ],
  },

  /* -------------------------- Quality Assurance ------------------------- */
  "quality-assurance": {
    quiz: [
      {
        question: "'Are we building the right system?' is…",
        options: ["Verification", "Validation", "Integration", "Deployment"],
        answer: 1,
        explanation: "Validation checks fit to user needs; verification checks fit to requirements.",
      },
    ],
    flashcards: [
      { front: "Validation", back: "Are we building the RIGHT system? (matches user needs)" },
      { front: "Verification", back: "Are we building the system RIGHT? (matches requirements)" },
    ],
  },

  /* ------------------------------ Testing ------------------------------- */
  "testing-intro": {
    quiz: [
      {
        question: "In the testing pyramid, the base (most numerous) tests are…",
        options: ["End-to-end tests", "Integration tests", "Unit tests", "Manual tests"],
        answer: 2,
        explanation: "Many fast unit tests at the base; few slow E2E tests at the top.",
      },
    ],
  },
  "unit-testing": {
    quiz: [
      {
        question: "A test double that returns hard-coded responses is a…",
        options: ["Mock", "Stub", "Spy", "Dummy"],
        answer: 1,
        explanation: "A stub supplies canned responses; a mock verifies interactions; a spy records calls.",
      },
    ],
    flashcards: [
      { front: "SUT", back: "Software Under Test — the unit currently being tested." },
      { front: "Mock vs stub", back: "Mock verifies interactions; stub returns canned data." },
    ],
  },
  "testing-tdd": {
    quiz: [
      {
        question: "What is the TDD cycle?",
        options: ["Plan, Build, Ship", "Red, Green, Refactor", "Write, Run, Delete", "Design, Code, Document"],
        answer: 1,
        explanation: "Write a failing test (red), make it pass simply (green), then refactor.",
      },
    ],
    ordering: {
      prompt: "Put the TDD cycle in order:",
      items: [
        "Red — write a small failing test",
        "Green — write the simplest code to pass it",
        "Refactor — clean up while keeping it green",
      ],
    },
  },

  /* --------------------------- Test Case Design ------------------------- */
  "equivalence-partitioning": {
    quiz: [
      {
        question: "Equivalence partitioning lets you…",
        options: [
          "Test every possible input",
          "Test one representative per group of similarly-handled inputs",
          "Skip invalid inputs",
          "Only test boundaries",
        ],
        answer: 1,
        explanation: "Inputs in one partition are handled the same way, so one representative suffices.",
      },
    ],
  },
  "boundary-value-analysis": {
    quiz: [
      {
        question: "Why test boundary values specifically?",
        options: [
          "They're easiest to type",
          "Off-by-one and < vs <= bugs cluster at the edges",
          "They run faster",
          "They need no assertions",
        ],
        answer: 1,
        explanation: "Edge values reveal comparison and off-by-one mistakes the middle won't.",
      },
    ],
  },

  /* ------------------------- Integration & DevOps ----------------------- */
  "continuous-integration": {
    quiz: [
      {
        question: "Continuous Integration means…",
        options: [
          "Deploying once a year",
          "Automatically building, integrating, and testing on each change",
          "Manually merging at the end",
          "Skipping tests to move fast",
        ],
        answer: 1,
        explanation: "CI catches integration problems early and keeps the main branch healthy.",
      },
    ],
  },
  "walking-skeleton": {
    quiz: [
      {
        question: "A walking skeleton is…",
        options: [
          "A fully-featured release",
          "A minimal end-to-end slice that exercises the whole technical path",
          "A UI mockup",
          "A test suite",
        ],
        answer: 1,
        explanation: "It proves the architecture/integration early, before features are fleshed out.",
      },
    ],
  },

  /* ---------------------------- Documentation --------------------------- */
  "documentation-modes": {
    quiz: [
      {
        question: "Which documentation mode is learning-oriented?",
        options: ["Reference", "How-to guide", "Tutorial", "Explanation"],
        answer: 2,
        explanation: "Tutorials are learning-oriented; how-tos are task-oriented; references are info-oriented; explanations build understanding.",
      },
    ],
  },

  /* ----------------------------- Process -------------------------------- */
  waterfall: {
    quiz: [
      {
        question: "The waterfall model's main weakness is…",
        options: ["It's too fast", "It handles changing requirements poorly", "It has no stages", "It can't be documented"],
        answer: 1,
        explanation: "Committing to each stage before the next makes late changes expensive.",
      },
    ],
  },
  sdlc: {
    ordering: {
      prompt: "Order the typical SDLC stages:",
      items: ["Requirements", "Analysis", "Design", "Implementation", "Testing", "Deployment"],
    },
  },
  scrum: {
    quiz: [
      {
        question: "Who prioritizes the work in Scrum?",
        options: ["Scrum Master", "Product Owner", "Development Team", "The CEO"],
        answer: 1,
        explanation: "The Product Owner represents stakeholders and prioritizes the backlog.",
      },
    ],
    flashcards: [
      { front: "Scrum sprint", back: "A fixed-length iteration producing a product increment." },
      { front: "Scrum Master role", back: "Supports the process and removes obstacles (not a boss)." },
    ],
  },

  /* --------------------------- Collaboration ---------------------------- */
  git: {
    quiz: [
      {
        question: "A pull request is…",
        options: [
          "A way to delete history",
          "A proposed change, reviewed before merging",
          "A type of commit",
          "A branch that can't merge",
        ],
        answer: 1,
        explanation: "PRs let changes be reviewed before they're integrated into the main branch.",
      },
    ],
    flashcards: [
      { front: "Branch", back: "An independent line of development." },
      { front: "Merge conflict", back: "Incompatible changes that need a human to resolve." },
    ],
  },

  /* ============ remaining coverage: every other lesson ============ */

  /* Foundations */
  "review-checklist": {
    quiz: [
      {
        question: "How is the review checklist best used?",
        options: ["Memorize it", "As a final pass over the relevant areas before shipping", "Only by managers", "Instead of tests"],
        answer: 1,
        explanation: "Run the relevant sections as a final review pass; not every item applies to every change.",
      },
    ],
  },

  /* OOP */
  classes: {
    quiz: [
      {
        question: "A static (class-level) member belongs to…",
        options: ["Each instance", "The class itself, shared by all instances", "The first object created", "The garbage collector"],
        answer: 1,
        explanation: "Static members belong to the class — effectively global state, so use sparingly.",
      },
    ],
  },
  "interface-implementation": {
    quiz: [
      {
        question: "The advice 'program to the ___, not the ___' completes as…",
        options: ["class / object", "interface / implementation", "test / code", "view / model"],
        answer: 1,
        explanation: "Depend on the stable interface so the implementation can change freely.",
      },
    ],
  },
  abstraction: {
    quiz: [
      {
        question: "Abstraction means…",
        options: ["Adding more detail", "Working at the right level of detail and hiding complexity below", "Removing all comments", "Using inheritance"],
        answer: 1,
        explanation: "Use something by intent without needing to understand its internals.",
      },
    ],
  },
  associations: {
    quiz: [
      {
        question: "The multiplicity `*` means…",
        options: ["Exactly one", "Zero or one", "Zero or more", "Exactly many"],
        answer: 2,
        explanation: "`*` = zero or more; `0..1` = optional; `1` = exactly one; `n..m` = between n and m.",
      },
    ],
  },
  dependencies: {
    quiz: [
      {
        question: "A dependency (vs an association) is…",
        options: ["A stored long-term link", "A temporary 'uses' relationship (e.g. a parameter)", "A subclass", "A database table"],
        answer: 1,
        explanation: "Associations are stored references; dependencies are transient collaborators.",
      },
    ],
  },
  enumerations: {
    quiz: [
      {
        question: "Use an enumeration when…",
        options: ["Values are unlimited", "Only a fixed, limited set of values is valid", "You need a database", "You want inheritance"],
        answer: 1,
        explanation: "Enumerations make invalid values hard to represent for closed sets.",
      },
    ],
  },

  /* Requirements */
  "software-requirements": {
    quiz: [
      {
        question: "The cheapest place to catch a mistake is in…",
        options: ["Production", "Code review", "Requirements", "Deployment"],
        answer: 2,
        explanation: "Errors caught in requirements cost far less than the same error found later.",
      },
    ],
  },
  "good-requirements": {
    quiz: [
      {
        question: "Which is a quality of a good individual requirement?",
        options: ["Ambiguous", "Testable/verifiable", "Implementation-specific", "Divisible into many"],
        answer: 1,
        explanation: "If you can't describe how to verify it, it's probably too ambiguous.",
      },
    ],
  },
  "requirement-prioritization": {
    quiz: [
      {
        question: "In MoSCoW, the 'M' stands for…",
        options: ["Maybe", "Must-have", "Medium", "Minor"],
        answer: 1,
        explanation: "Must / Should / Could / Won't-have — priorities guide objective scope cuts.",
      },
    ],
  },
  "use-cases": {
    quiz: [
      {
        question: "A use case is especially good for…",
        options: ["Pixel-perfect UI specs", "Finding alternate/exception flows and designing system tests", "Database schemas", "Estimating effort"],
        answer: 1,
        explanation: "It spells out interaction steps, surfacing missing alternate and exception paths.",
      },
    ],
  },
  "supplementary-glossary": {
    quiz: [
      {
        question: "A glossary mainly provides…",
        options: ["A list of bugs", "A shared, precise vocabulary", "A test plan", "A deployment script"],
        answer: 1,
        explanation: "Agreeing terms early removes a whole class of miscommunication.",
      },
    ],
  },

  /* Design */
  "software-design": {
    quiz: [
      {
        question: "External design concerns…",
        options: ["Class structure and APIs", "What users see and experience", "Storage format", "Error handling internals"],
        answer: 1,
        explanation: "External = user-facing; internal = components, classes, data, APIs.",
      },
    ],
  },
  modeling: {
    quiz: [
      {
        question: "A model is…",
        options: ["The final code", "A simplified representation used to think and communicate", "A test suite", "A database"],
        answer: 1,
        explanation: "Model the risky or unclear parts; don't model for its own sake.",
      },
    ],
  },
  "multi-level-design": {
    quiz: [
      {
        question: "Top-down design starts from…",
        options: ["Low-level components", "High-level structure, filling in details later", "The database", "The UI widgets"],
        answer: 1,
        explanation: "Bottom-up instead assembles from existing/known components.",
      },
    ],
  },
  "agile-design": {
    quiz: [
      {
        question: "Agile design prefers…",
        options: ["A complete blueprint up front", "Enough design to proceed, evolving intentionally", "No design at all", "Design only after release"],
        answer: 1,
        explanation: "Emergent but intentional — paired with refactoring and tests to avoid rot.",
      },
    ],
  },

  /* Principles */
  yagni: {
    quiz: [
      {
        question: "YAGNI advises you to…",
        options: ["Build for every possible future need", "Build what's needed now, not speculative features", "Never refactor", "Always add config options"],
        answer: 1,
        explanation: "Speculative generality is complexity you pay for now and may never use.",
      },
    ],
  },
  "separation-of-concerns": {
    quiz: [
      {
        question: "Separation of concerns means…",
        options: ["One giant module", "Each part addresses one distinct concern", "No interfaces between layers", "Mixing UI and data access"],
        answer: 1,
        explanation: "Concerns that change for different reasons belong in different places.",
      },
    ],
  },
  "law-of-demeter": {
    quiz: [
      {
        question: "The Law of Demeter discourages…",
        options: ["Short methods", "Long chains like a.b().c().d()", "Using interfaces", "Unit tests"],
        answer: 1,
        explanation: "Talk only to immediate collaborators; don't reach through the object graph.",
      },
    ],
  },
  "tell-dont-ask": {
    quiz: [
      {
        question: "Tell-Don't-Ask means…",
        options: ["Query an object's state, then decide for it", "Tell the object to perform the operation itself", "Avoid all method calls", "Always use getters"],
        answer: 1,
        explanation: "Keep behavior next to the data; let the object enforce its own rules.",
      },
    ],
  },
  encapsulation: {
    quiz: [
      {
        question: "Encapsulation hides…",
        options: ["The interface", "The internal representation behind a stable interface", "All methods", "The class name"],
        answer: 1,
        explanation: "Expose behavior; hide representation so internals can change and invariants hold.",
      },
    ],
    flashcards: [{ front: "Encapsulation = ?", back: "Bundle data + behavior and hide internals behind an interface." }],
  },
  "single-source-of-truth": {
    quiz: [
      {
        question: "Single Source of Truth means each fact…",
        options: ["Is copied for speed", "Is stored and edited in exactly one place", "Lives in the UI", "Is never stored"],
        answer: 1,
        explanation: "Derive everything else from the one canonical source so copies can't disagree.",
      },
    ],
  },
  "fail-fast": {
    quiz: [
      {
        question: "Failing fast means…",
        options: ["Hiding errors", "Detecting and reporting errors early, near the cause", "Retrying forever", "Ignoring bad input"],
        answer: 1,
        explanation: "A loud early failure points at the cause; silent corruption is far harder to debug.",
      },
    ],
  },
  "least-astonishment": {
    quiz: [
      {
        question: "The Principle of Least Astonishment says code should…",
        options: ["Be clever", "Behave the way its users reasonably expect", "Hide side effects", "Use short names"],
        answer: 1,
        explanation: "A getter that also mutates or does I/O is a surprise — and a magnet for bugs.",
      },
    ],
  },
  "boy-scout-rule": {
    quiz: [
      {
        question: "The Boy Scout Rule is…",
        options: ["Rewrite everything", "Leave the code a little cleaner than you found it", "Never touch old code", "Comment every line"],
        answer: 1,
        explanation: "Small, safe, continuous cleanups compound and prevent decay.",
      },
    ],
  },

  /* Creational */
  "abstract-factory": {
    quiz: [
      {
        question: "Abstract Factory creates…",
        options: ["A single object", "Families of related, compatible objects", "Database rows", "Threads"],
        answer: 1,
        explanation: "Switch the factory to swap an entire matched family consistently.",
      },
    ],
  },
  builder: {
    quiz: [
      {
        question: "The Builder pattern is best when…",
        options: ["An object is trivial", "An object has many parts/options to assemble step by step", "You need a singleton", "You clone objects"],
        answer: 1,
        explanation: "It replaces confusing multi-argument constructors with named, fluent steps.",
      },
    ],
  },
  prototype: {
    quiz: [
      {
        question: "The Prototype pattern creates objects by…",
        options: ["Calling a factory", "Cloning an existing instance", "Subclassing", "Reading a file"],
        answer: 1,
        explanation: "Useful when construction is expensive; mind shallow vs deep copies.",
      },
    ],
  },

  /* Structural */
  facade: {
    quiz: [
      {
        question: "A Facade provides…",
        options: ["A new algorithm", "A simple interface over a complex subsystem", "A cache", "A clone"],
        answer: 1,
        explanation: "Clients call one easy method instead of orchestrating many parts.",
      },
    ],
  },
  bridge: {
    quiz: [
      {
        question: "The Bridge pattern separates…",
        options: ["Two unrelated apps", "An abstraction from its implementation so both vary independently", "Tests from code", "UI from CSS"],
        answer: 1,
        explanation: "Avoids the N×M subclass explosion by connecting two hierarchies.",
      },
    ],
  },
  composite: {
    quiz: [
      {
        question: "Composite lets clients treat…",
        options: ["Only single objects", "Individual objects and groups uniformly (trees)", "Only groups", "Strings as numbers"],
        answer: 1,
        explanation: "Leaves and branches share one interface; recursion is hidden from callers.",
      },
    ],
  },
  proxy: {
    quiz: [
      {
        question: "A Proxy is a stand-in that…",
        options: ["Changes the interface", "Controls access (caching, lazy load, permissions, logging)", "Merges objects", "Deletes data"],
        answer: 1,
        explanation: "It shares the real object's interface, so clients don't know it's a stand-in.",
      },
    ],
  },
  flyweight: {
    quiz: [
      {
        question: "Flyweight saves memory by…",
        options: ["Compressing files", "Sharing intrinsic state across many similar objects", "Deleting objects", "Using a database"],
        answer: 1,
        explanation: "Shared intrinsic state lives once per type; unique extrinsic state is passed in.",
      },
    ],
  },

  /* Behavioral */
  state: {
    quiz: [
      {
        question: "The State pattern…",
        options: ["Caches results", "Changes behavior as internal state changes (a state machine)", "Creates objects", "Adapts interfaces"],
        answer: 1,
        explanation: "Each state owns its behavior and transitions, replacing big mode conditionals.",
      },
    ],
  },
  "template-method": {
    quiz: [
      {
        question: "Template Method fixes the ___ and defers ___ to subclasses.",
        options: ["data / fields", "algorithm skeleton / specific steps", "tests / mocks", "UI / logic"],
        answer: 1,
        explanation: "The base class drives the flow ('don't call us, we'll call you').",
      },
    ],
  },
  iterator: {
    quiz: [
      {
        question: "The Iterator pattern lets you…",
        options: ["Sort data", "Traverse a collection without exposing its internal structure", "Clone a list", "Cache results"],
        answer: 1,
        explanation: "In JS, implement Symbol.iterator to support for...of, spread, and destructuring.",
      },
    ],
  },
  mediator: {
    quiz: [
      {
        question: "A Mediator turns many-to-many object links into…",
        options: ["A bigger mesh", "Hub-and-spoke through one coordinator", "A database", "An inheritance tree"],
        answer: 1,
        explanation: "Components talk only to the mediator, which routes interactions.",
      },
    ],
  },
  "chain-of-responsibility": {
    quiz: [
      {
        question: "Chain of Responsibility passes a request…",
        options: ["To all handlers at once", "Along handlers until one handles it (or it ends)", "Only to the first handler", "To the database"],
        answer: 1,
        explanation: "It's the basis of middleware pipelines; each link can handle or forward.",
      },
    ],
  },
  memento: {
    quiz: [
      {
        question: "The Memento pattern captures state…",
        options: ["By exposing all fields", "Without breaking encapsulation, for later restore", "Only for logging", "By copying the class"],
        answer: 1,
        explanation: "It powers undo/redo, checkpoints, and save/restore via opaque snapshots.",
      },
    ],
  },
  visitor: {
    quiz: [
      {
        question: "Visitor makes it easy to add ___ but harder to add ___.",
        options: ["fields / methods", "new operations / new element types", "tests / code", "classes / interfaces"],
        answer: 1,
        explanation: "Great when the type set is stable but operations keep growing.",
      },
    ],
  },
  interpreter: {
    quiz: [
      {
        question: "The Interpreter pattern fits…",
        options: ["Large general-purpose languages", "Small, well-defined languages / grammars", "Networking", "Caching"],
        answer: 1,
        explanation: "For anything large, use a real parser/compiler toolchain instead.",
      },
    ],
  },

  /* Architecture */
  "layered-architecture": {
    quiz: [
      {
        question: "In layered architecture, each layer depends on…",
        options: ["Every other layer", "Only the layer directly below it", "The UI", "Nothing"],
        answer: 1,
        explanation: "Higher layers use lower ones; watch out for pass-through 'sinkhole' layers.",
      },
    ],
  },
  mvp: {
    quiz: [
      {
        question: "In MVP, the View is…",
        options: ["Where the logic lives", "Passive — it forwards events to a testable Presenter", "The database", "The controller"],
        answer: 1,
        explanation: "A passive, interface-driven View lets the Presenter be unit-tested without a UI.",
      },
    ],
  },
  mvvm: {
    quiz: [
      {
        question: "MVVM keeps the View and ViewModel in sync via…",
        options: ["Manual DOM updates", "Data binding", "Polling", "Global variables"],
        answer: 1,
        explanation: "It's the model behind modern reactive UI frameworks.",
      },
    ],
  },
  "event-driven": {
    quiz: [
      {
        question: "In event-driven architecture, producers…",
        options: ["Call each consumer directly", "Emit events without knowing who consumes them", "Block until handled", "Must be singletons"],
        answer: 1,
        explanation: "Extreme decoupling — at the cost of eventual consistency and harder debugging.",
      },
    ],
  },
  "pub-sub": {
    quiz: [
      {
        question: "Pub/Sub differs from classic Observer by…",
        options: ["Being slower", "Routing via a broker so publishers/subscribers never reference each other", "Using inheritance", "Requiring a database"],
        answer: 1,
        explanation: "The broker/topic adds indirection that fully decouples both sides.",
      },
    ],
  },
  "client-server": {
    quiz: [
      {
        question: "In client-server, the server primarily…",
        options: ["Renders the UI", "Centralizes shared resources, data, and rules", "Stores nothing", "Runs on the phone"],
        answer: 1,
        explanation: "Many clients share one authoritative server; watch latency and single-point-of-failure.",
      },
    ],
  },
  hexagonal: {
    quiz: [
      {
        question: "Hexagonal (Ports & Adapters) keeps the domain core…",
        options: ["Tied to the database", "Independent of infrastructure via ports/adapters", "Inside the UI", "Stateless"],
        answer: 1,
        explanation: "It's the Dependency Inversion Principle applied at architectural scale.",
      },
    ],
  },
  cqrs: {
    quiz: [
      {
        question: "CQRS separates…",
        options: ["Frontend from backend", "The write (command) model from the read (query) model", "Tests from code", "Users from admins"],
        answer: 1,
        explanation: "Each side can be optimized/scaled independently — powerful but complex.",
      },
    ],
  },
  repository: {
    quiz: [
      {
        question: "The Repository pattern provides…",
        options: ["A UI component", "A collection-like abstraction over data storage", "A caching layer only", "A logger"],
        answer: 1,
        explanation: "It keeps query logic and the DB out of business code, and is easy to fake in tests.",
      },
    ],
  },
  "dependency-injection": {
    quiz: [
      {
        question: "Dependency injection supplies a component's dependencies…",
        options: ["By constructing them inside", "From the outside (constructor/params)", "Via globals", "At compile time only"],
        answer: 1,
        explanation: "It makes DIP practical and lets tests swap in fakes instantly.",
      },
    ],
  },
  "service-oriented-architecture": {
    quiz: [
      {
        question: "SOA builds systems by…",
        options: ["One big program", "Combining independently accessible, reusable services", "Avoiding networks", "Using one language only"],
        answer: 1,
        explanation: "Microservices are a fine-grained, independently deployable evolution of the idea.",
      },
    ],
  },

  /* Code Quality */
  "readable-code": {
    quiz: [
      {
        question: "A guard clause improves readability by…",
        options: ["Adding nesting", "Handling the invalid case early and flattening the happy path", "Removing functions", "Hiding errors"],
        answer: 1,
        explanation: "Early returns remove indentation levels and clarify the normal path.",
      },
    ],
  },
  slap: {
    quiz: [
      {
        question: "SLAP says a single method should…",
        options: ["Mix high- and low-level statements", "Stay at one level of abstraction", "Have one line", "Never call helpers"],
        answer: 1,
        explanation: "Keep the workflow at one level; push details into named helpers.",
      },
    ],
  },
  comments: {
    quiz: [
      {
        question: "Comments are best used to explain…",
        options: ["What the code literally does", "Why — rationale, constraints, assumptions", "Every variable", "The language syntax"],
        answer: 1,
        explanation: "Code says how; comments add the why. Never echo the code.",
      },
    ],
  },
  "coding-standards": {
    quiz: [
      {
        question: "Coding standards primarily improve…",
        options: ["Runtime speed", "Consistency (and easier reviews/onboarding)", "Memory usage", "Security"],
        answer: 1,
        explanation: "Automate them with formatters/linters so they're never a manual chore.",
      },
    ],
  },
  "premature-optimization": {
    quiz: [
      {
        question: "Avoiding premature optimization means…",
        options: ["Never optimizing", "Optimizing based on measurement, where it's proven necessary", "Always using the fastest trick", "Ignoring performance forever"],
        answer: 1,
        explanation: "Work → correct/readable → measure → optimize the proven bottleneck.",
      },
    ],
  },
  "unsafe-shortcuts": {
    quiz: [
      {
        question: "Why is an empty catch block dangerous?",
        options: ["It's slow", "It swallows errors and hides bugs", "It uses memory", "It can't compile"],
        answer: 1,
        explanation: "Swallowing exceptions hides the information you need to debug.",
      },
    ],
  },

  /* Errors & Robustness */
  assertions: {
    quiz: [
      {
        question: "An assertion failure usually indicates…",
        options: ["Bad user input", "A bug in the code", "A network outage", "A slow disk"],
        answer: 1,
        explanation: "Assertions check invariants; exceptions handle legitimate runtime conditions.",
      },
    ],
  },
  logging: {
    quiz: [
      {
        question: "Good logs help you answer…",
        options: ["Only the time", "What happened, when, which input, and which component", "Nothing useful", "The user's password"],
        answer: 1,
        explanation: "Use log levels to control verbosity per environment.",
      },
    ],
  },

  /* Quality Assurance */
  "static-analysis": {
    quiz: [
      {
        question: "Static analysis…",
        options: ["Runs the program to find bugs", "Checks code without running it", "Only formats code", "Deploys the app"],
        answer: 1,
        explanation: "It's the earliest, cheapest feedback — catching issues before the code runs.",
      },
    ],
  },
  "code-review": {
    quiz: [
      {
        question: "Code review is especially good at catching…",
        options: ["Only typos", "Design issues, missing tests, and unclear code", "Compiler errors", "Network failures"],
        answer: 1,
        explanation: "Humans catch what tools can't — and reviews spread knowledge across the team.",
      },
    ],
  },

  /* Testing */
  "integration-system-testing": {
    quiz: [
      {
        question: "Acceptance testing checks that the system…",
        options: ["Compiles", "Satisfies stakeholder expectations", "Has no warnings", "Runs fast"],
        answer: 1,
        explanation: "Integration tests components together; system tests the whole vs requirements.",
      },
    ],
  },
  "regression-testing": {
    quiz: [
      {
        question: "Regression testing ensures…",
        options: ["New features are fast", "Previously working behavior still works after changes", "Code is shorter", "Tests are deleted"],
        answer: 1,
        explanation: "Automated and run often, it's what makes refactoring and change safe.",
      },
    ],
  },
  "gui-testing": {
    quiz: [
      {
        question: "Because GUI testing is hard, you should…",
        options: ["Skip testing", "Move logic out of the GUI and test it via stable APIs", "Only test manually", "Test pixels"],
        answer: 1,
        explanation: "A thin view over well-tested logic needs far less fragile GUI testing.",
      },
    ],
  },
  "test-coverage": {
    quiz: [
      {
        question: "High test coverage…",
        options: ["Guarantees great tests", "Doesn't guarantee good tests", "Means no bugs", "Replaces code review"],
        answer: 1,
        explanation: "You can execute every line without meaningfully asserting anything.",
      },
    ],
  },

  /* Test Case Design */
  "test-case-design": {
    quiz: [
      {
        question: "Black-box testing designs tests from…",
        options: ["The code's internals", "External behavior and specifications", "Coverage reports", "Git history"],
        answer: 1,
        explanation: "White-box uses implementation knowledge; gray-box is a mix.",
      },
    ],
  },
  "combining-test-inputs": {
    quiz: [
      {
        question: "Pairwise testing guarantees that…",
        options: ["Every combination is tested", "Every pair of input choices appears at least once", "Only valid inputs are tested", "Nothing is skipped"],
        answer: 1,
        explanation: "A good balance vs the expensive all-combinations approach. Keep one invalid input per negative test.",
      },
    ],
  },
  "scripted-exploratory": {
    quiz: [
      {
        question: "Exploratory testing is…",
        options: ["Predefined and repeatable", "Designed while learning the system", "Fully automated", "Only for regression"],
        answer: 1,
        explanation: "Scripted tests guard known behavior; exploratory discovers the unknown.",
      },
    ],
  },

  /* Integration & DevOps */
  integration: {
    quiz: [
      {
        question: "Big-bang integration is risky because…",
        options: ["It's too fast", "The bug search space becomes huge when everything is combined late", "It needs no testing", "It can't fail"],
        answer: 1,
        explanation: "Integrate incrementally and test each step to keep the search space small.",
      },
    ],
  },
  "build-automation": {
    quiz: [
      {
        question: "Build automation automates tasks like…",
        options: ["Writing requirements", "Compiling, testing, packaging, and deploying", "Designing the UI", "Interviewing users"],
        answer: 1,
        explanation: "A single reliable build command is the foundation of CI/CD.",
      },
    ],
  },
  reuse: {
    quiz: [
      {
        question: "A framework differs from a library because it…",
        options: ["Is smaller", "Calls your code (inversion of control)", "Has no functions", "Can't be reused"],
        answer: 1,
        explanation: "Library: you call it. Framework: it calls you.",
      },
    ],
    flashcards: [
      { front: "Library vs framework", back: "You call a library; a framework calls you (inversion of control)." },
    ],
  },

  /* Documentation */
  "documentation-overview": {
    quiz: [
      {
        question: "Documentation is best written…",
        options: ["Bottom-up, details first", "Top-down — big picture first, details when needed", "Only as code comments", "After the project ends"],
        answer: 1,
        explanation: "Keep docs near the code and in version control so they stay alive.",
      },
    ],
  },

  /* Process Models */
  "iterative-incremental": {
    quiz: [
      {
        question: "Iterative & incremental development…",
        options: ["Does all stages once, in order", "Delivers in repeated cycles, refining each time", "Has no testing", "Never ships"],
        answer: 1,
        explanation: "Early working software + feedback + earlier risk discovery.",
      },
    ],
  },
  "agile-models": {
    quiz: [
      {
        question: "Agile especially values…",
        options: ["Comprehensive documentation over working software", "Responding to change and working software", "Fixed plans", "Contracts over collaboration"],
        answer: 1,
        explanation: "Scrum and XP are specific agile methods sharing these values.",
      },
    ],
  },
  "extreme-programming": {
    quiz: [
      {
        question: "Which is an Extreme Programming practice?",
        options: ["Big upfront design", "Pair programming and test-first development", "No releases until the end", "Solo heroics"],
        answer: 1,
        explanation: "XP emphasizes engineering discipline: pairing, TDD, CI, simple design, frequent releases.",
      },
    ],
  },

  /* Collaboration */
  "revision-control": {
    quiz: [
      {
        question: "Revision control records, for each change…",
        options: ["Only the file size", "What changed, who, when, and why", "Just the author", "Nothing"],
        answer: 1,
        explanation: "That history enables collaboration, recovery, branching, and conflict resolution.",
      },
    ],
  },
  "project-planning": {
    quiz: [
      {
        question: "A good project plan is…",
        options: ["Written once and never changed", "Updated as new information appears", "Optional", "Only a schedule"],
        answer: 1,
        explanation: "Re-planning as you learn beats clinging to an outdated plan.",
      },
    ],
  },
  "team-structures": {
    quiz: [
      {
        question: "The best team structure…",
        options: ["Is always a strict hierarchy", "Depends on size, complexity, experience, and communication cost", "Is always egoless", "Doesn't matter"],
        answer: 1,
        explanation: "Match the structure to the context — there's no single best one.",
      },
    ],
  },
};
