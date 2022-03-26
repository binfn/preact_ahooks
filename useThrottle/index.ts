import { useEffect, useState } from '../deps.ts';
import useThrottleFn from '../useThrottleFn/index.ts';
import type { ThrottleOptions } from './throttleOptions.ts';

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;
