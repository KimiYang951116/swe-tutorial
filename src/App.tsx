import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

// Lesson and category pages pull in CodeMirror + Framer Motion, so load them
// on demand to keep the initial (Home) bundle small.
const TopicPage = lazy(() =>
  import("./pages/TopicPage").then((m) => ({ default: m.TopicPage }))
);
const CategoryPage = lazy(() =>
  import("./pages/CategoryPage").then((m) => ({ default: m.CategoryPage }))
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="topic/:slug" element={<TopicPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
