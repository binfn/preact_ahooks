import { useEffect, useState } from '../deps.ts';
import useDebounceFn from '../useDebounceFn/index.ts';
import type { DebounceOptions } from './debounceOptions.ts';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

export default useDebounce;
