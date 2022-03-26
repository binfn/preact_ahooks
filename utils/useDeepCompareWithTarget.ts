
import type { DependencyList, EffectCallback,isEqual } from '../deps.ts';
import { useRef } from '../deps.ts';
import type { BasicTarget } from './domTarget.ts';
import useEffectWithTarget from './useEffectWithTarget.ts';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  // @ts-ignore unknown
  return isEqual(aDeps, bDeps);
};

const useDeepCompareEffectWithTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  target: BasicTarget<any> | BasicTarget<any>[],
) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffectWithTarget(effect, [signalRef.current], target);
};

export default useDeepCompareEffectWithTarget;
