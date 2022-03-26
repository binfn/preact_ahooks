
import { useMemo,throttle } from '../deps.ts';
import useLatest from '../useLatest/index.ts';
import type { ThrottleOptions } from '../useThrottle/throttleOptions.ts';
import useUnmount from '../useUnmount/index.ts';

type noop = (...args: any) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        ((...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        }),
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
