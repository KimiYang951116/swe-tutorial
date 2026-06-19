import { useEffect, useState } from "react";

/** A thin progress bar (under the top bar) that tracks scroll through the page. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-14 z-20 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
