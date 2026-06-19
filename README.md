# SWE Patterns — Learn Software Engineering Interactively

An interactive website for understanding the principles and patterns that make software
maintainable. Every topic combines a clear explanation with three ways to learn by doing:

- **▶ Live code playground** — edit each example and run it in a sandboxed in-browser console.
- **✨ Animated visualizations** — watch concepts like the Observer pattern, coupling, and
  Strategy swapping play out in interactive diagrams.
- **⇄ Before → after refactors** — compare messy code with the principled version, with the
  reasoning behind each change.

## What's covered

| Category | Topics |
| --- | --- |
| **Core Principles** | DRY, KISS, YAGNI, Separation of Concerns, Coupling & Cohesion, Composition over Inheritance, Law of Demeter, Tell-Don't-Ask, Encapsulation, Single Source of Truth, Fail Fast, Least Astonishment, Boy Scout Rule |
| **SOLID** | SRP, OCP, LSP, ISP, DIP |
| **Creational patterns** | Factory Method, Singleton, Abstract Factory, Builder, Prototype |
| **Structural patterns** | Adapter, Decorator, Facade, Bridge, Composite, Proxy, Flyweight |
| **Behavioral patterns** | Strategy, Observer, Command, State, Template Method, Iterator, Mediator, Chain of Responsibility, Memento, Visitor, Interpreter |
| **Architecture** | MVC, Layered, MVP, MVVM, Microservices, Event-Driven, Pub/Sub, Client-Server, Hexagonal, CQRS, Repository, Dependency Injection |
| **Quality & Practices** | Clean Code, Refactoring & Code Smells, Testing & TDD |

## Tech stack

- [Vite](https://vite.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (class-based dark mode)
- [React Router](https://reactrouter.com/) for routing
- [CodeMirror 6](https://codemirror.net/) for the editor and read-only code views
- [Framer Motion](https://www.framer.com/motion/) for the visualizations
- A sandboxed **Web Worker** runs playground code with no DOM/network access and a timeout
  that kills runaway loops.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

Requires Node.js 18+ (developed on Node 22).

## Project structure

```
src/
  content/        # all lesson data (structured TypeScript) + registry
    lessons/      # one file per category
  components/
    viz/          # interactive animated visualizations
    runner/       # sandboxed playground execution (Web Worker)
    layout/       # sidebar, top bar, search palette
    Playground.tsx, BeforeAfter.tsx, CodeView.tsx, LessonTemplate.tsx, ...
  pages/          # Home, CategoryPage, TopicPage, NotFound
  lib/            # theme (dark mode), helpers
```

### Adding a lesson

Add a `Lesson` object to the relevant file in `src/content/lessons/`. The lesson renders
automatically — header, intro, optional visualization (`viz` key), body blocks,
before/after, playground, key takeaways, and related links. To add a bespoke animation,
create a component under `src/components/viz/` and register it in `viz/index.tsx`.

## Deployment

The site is a static SPA. `npm run build` outputs `dist/`, deployable to any static host.
A `vercel.json` is included with an SPA rewrite for client-side routing.

## License

[MIT](./LICENSE)
