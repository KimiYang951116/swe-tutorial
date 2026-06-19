import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProgressState {
  understood: Record<string, boolean>;
  confidence: Record<string, number>; // slug -> 1..5
}

interface ProgressContextValue {
  understood: Record<string, boolean>;
  confidence: Record<string, number>;
  isUnderstood: (slug: string) => boolean;
  toggleUnderstood: (slug: string) => void;
  setConfidence: (slug: string, value: number) => void;
  understoodCount: number;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);
const STORAGE_KEY = "swe-progress";

function load(): ProgressState {
  if (typeof window === "undefined") return { understood: {}, confidence: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { understood: {}, confidence: {}, ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt storage */
  }
  return { understood: {}, confidence: {} };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleUnderstood = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      understood: { ...s.understood, [slug]: !s.understood[slug] },
    }));
  }, []);

  const setConfidence = useCallback((slug: string, value: number) => {
    setState((s) => ({ ...s, confidence: { ...s.confidence, [slug]: value } }));
  }, []);

  const reset = useCallback(() => setState({ understood: {}, confidence: {} }), []);

  const value = useMemo<ProgressContextValue>(() => {
    const understoodCount = Object.values(state.understood).filter(Boolean).length;
    return {
      understood: state.understood,
      confidence: state.confidence,
      isUnderstood: (slug) => !!state.understood[slug],
      toggleUnderstood,
      setConfidence,
      understoodCount,
      reset,
    };
  }, [state, toggleUnderstood, setConfidence, reset]);

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
