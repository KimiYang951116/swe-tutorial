import type { ComponentType } from "react";
import { DryViz, CouplingViz, CompositionViz } from "./principlesViz";
import { SrpViz, OcpViz, LspViz, IspViz, DipViz } from "./solidViz";
import {
  FactoryViz,
  SingletonViz,
  DecoratorViz,
  AdapterViz,
  StrategyViz,
  ObserverViz,
} from "./patternsViz";
import { MvcViz } from "./archViz";
import { TestingPyramidViz, PartitionsViz } from "./qaViz";
import { GitBranchesViz, WalkingSkeletonViz } from "./processViz";

/** Maps a lesson's `viz` key to its interactive animation component. */
export const vizRegistry: Record<string, ComponentType> = {
  // principles
  dry: DryViz,
  coupling: CouplingViz,
  composition: CompositionViz,
  // SOLID
  srp: SrpViz,
  ocp: OcpViz,
  lsp: LspViz,
  isp: IspViz,
  dip: DipViz,
  // patterns
  factory: FactoryViz,
  singleton: SingletonViz,
  decorator: DecoratorViz,
  adapter: AdapterViz,
  strategy: StrategyViz,
  observer: ObserverViz,
  // architecture
  mvc: MvcViz,
  // testing & QA
  "testing-pyramid": TestingPyramidViz,
  partitions: PartitionsViz,
  // process & delivery
  "git-branches": GitBranchesViz,
  "walking-skeleton": WalkingSkeletonViz,
};

export function hasViz(key: string | undefined): boolean {
  return !!key && key in vizRegistry;
}

/** Framed, titled container that renders the bespoke visualization for `name`. */
export function Visualization({ name }: { name: string }) {
  const Component = vizRegistry[name];
  if (!Component) return null;
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/60 to-white p-4 shadow-sm dark:border-indigo-500/20 dark:from-indigo-500/5 dark:to-slate-900">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
        <span className="text-sm">▶</span> Interactive visualization
      </div>
      <Component />
    </div>
  );
}
