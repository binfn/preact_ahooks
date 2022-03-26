import { useEffect, useState } from '../deps.ts';
import type { DependencyList, EffectCallback } from '../deps.ts';
import type { DebounceOptions } from '../useDebounce/debounceOptions.ts';
import useDebounceFn from '../useDebounceFn/index.ts';
import useUnmount from '../useUnmount/index.ts';
import useUpdateEffect from '../useUpdateEffect/index.ts';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
