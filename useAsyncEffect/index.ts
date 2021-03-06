import type { DependencyList } from '../deps.ts';
import { useEffect } from '../deps.ts';

function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps: DependencyList,
) {
  function isGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    // @ts-ignore unknown
    return typeof val[Symbol.asyncIterator] === 'function';
  }
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    async function execute() {
      if (isGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (cancelled || result.done) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
}

export default useAsyncEffect;
