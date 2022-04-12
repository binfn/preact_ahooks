// deno-lint-ignore-file
export * from "https://esm.sh/preact@10.x.x";

export {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useErrorBoundary,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "https://esm.sh/preact@10.x.x/hooks";
export type {
  CreateHandle,
  EffectCallback,
  Inputs,
  PropRef,
  Reducer,
  Ref,
  StateUpdater,
} from "https://esm.sh/preact@10.x.x/hooks";

export { default as Cookies } from "https://esm.sh/js-cookie@2.x.x";

export { default as dayjs } from "https://esm.sh/dayjs@1.x";

export { default as screenfull } from "https://esm.sh/screenfull@5.x.x";

export { default as ResizeObserver } from "https://esm.sh/resize-observer-polyfill@1.5.x";

// import type { DependencyList } from "https://esm.sh/react"
export type DependencyList = ReadonlyArray<any>;

//import type { MutableRefObject } from "https://esm.sh/react"
export interface MutableRefObject<T> {
  current: T;
}

//import type { DragEvent } from "https://esm.sh/react"
export interface DragEvent<T = Element> extends Event {
  dataTransfer: DataTransfer;
}

//import type { ClipboardEvent } from "https://esm.sh/react"
export interface ClipboardEvent<T = Element> extends Event {
  clipboardData: DataTransfer;
}

//import type { Dispatch } from "https://esm.sh/react"
export type Dispatch<A> = (value: A) => void;

//import type { SetStateAction } from "https://esm.sh/react"
export type SetStateAction<S> = S | ((prevState: S) => S);

export interface DebouncedFunc<T extends (...args: any[]) => any> {
  /**
   * Call the original function, but applying the debounce rules.
   *
   * If the debounced function can be run immediately, this calls it and returns its return
   * value.
   *
   * Otherwise, it returns the return value of the last invocation, or undefined if the debounced
   * function was not invoked yet.
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * Throw away any pending invocation of the debounced function.
   */
  cancel(): void;

  /**
   * If there is a pending invocation of the debounced function, invoke it immediately and return
   * its return value.
   *
   * Otherwise, return the value from the last invocation, or undefined if the debounced function
   * was never invoked.
   */
  flush(): ReturnType<T> | undefined;
}

export interface DebounceSettings {
  /**
   * @see _.leading
   */
  leading?: boolean | undefined;
  /**
   * @see _.maxWait
   */
  maxWait?: number | undefined;
  /**
   * @see _.trailing
   */
  trailing?: boolean | undefined;
}

export interface ThrottleSettings {
  /**
   * @see _.leading
   */
  leading?: boolean | undefined;
  /**
   * @see _.trailing
   */
  trailing?: boolean | undefined;
}

// @deno-types="./types/debounce.d.ts"
export { default as debounce } from "https://deno.land/x/lodash_es@v0.0.2/src/debounce.js";

// @deno-types="./types/throttle.d.ts"
export { default as throttle } from "https://deno.land/x/lodash_es@v0.0.2/src/throttle.js";

export { default as isEqual } from "https://deno.land/x/lodash_es@v0.0.2/src/isEqual.js";
