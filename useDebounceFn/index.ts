import { useMemo,debounce } from '../deps.ts';
import type { DebounceOptions } from '../useDebounce/debounceOptions.ts';
import useLatest from '../useLatest/index.ts';
import useUnmount from '../useUnmount/index.ts';

// deno-lint-ignore no-explicit-any
type noop = (...args: any) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        ((...args: Parameters<T>): ReturnType<T> => {
          // @ts-ignore Type 'Parameters<T>' must have a '[Symbol.iterator]()' method
          return fnRef.current(...args);
        }),
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
