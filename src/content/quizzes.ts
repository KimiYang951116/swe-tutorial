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
};
