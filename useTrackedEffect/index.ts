import type { DependencyList } from '../deps.ts';
import { useEffect, useRef } from '../deps.ts';

type Effect = (
  changes?: number[],
  previousDeps?: DependencyList,
  currentDeps?: DependencyList,
) => void | (() => void);

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
  //Let's do a reference equality check on 2 dependency list.
  //If deps1 is defined, we iterate over deps1 and do comparison on each element with equivalent element from deps2
  //As this func is used only in this hook, we assume 2 deps always have same length.
  return deps1
    ? deps1.map((_ele, idx) => (deps1[idx] !== deps2?.[idx] ? idx : -1)).filter((ele) => ele >= 0)
    : deps2
    ? deps2.map((_ele, idx) => idx)
    : [];
};

const useTrackedEffect = (effect: Effect, deps?: DependencyList) => {
  const previousDepsRef = useRef<DependencyList>();

  useEffect(() => {
    const changes = diffTwoDeps(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    return effect(changes, previousDeps, deps);
  }, deps);
};

export default useTrackedEffect;
