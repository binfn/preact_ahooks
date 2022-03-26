import { useEffect, useState } from '../deps.ts';
import type { DependencyList, EffectCallback } from '../deps.ts';
import type { ThrottleOptions } from '../useThrottle/throttleOptions.ts';
import useThrottleFn from '../useThrottleFn/index.ts';
import useUnmount from '../useUnmount/index.ts';
import useUpdateEffect from '../useUpdateEffect/index.ts';

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;
