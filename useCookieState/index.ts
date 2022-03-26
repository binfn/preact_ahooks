
import { useState,Cookies } from '../deps.ts';
import useMemoizedFn from '../useMemoizedFn/index.ts';
import { isFunction } from '../utils/index.ts';

export type State = string | undefined;

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

function useCookieState(cookieKey: string, options: Options = {}) {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey);

    if (typeof cookieValue === 'string') return cookieValue;

    if (isFunction(options.defaultValue)) {
      return options.defaultValue();
    }

    return options.defaultValue;
  });

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      // deno-lint-ignore no-unused-vars
      const { defaultValue, ...restOptions } = { ...options, ...newOptions };
      setState((prevState) => {
        const value = isFunction(newValue) ? newValue(prevState) : newValue;
        if (value === undefined) {
          Cookies.remove(cookieKey);
        } else {
          Cookies.set(cookieKey, value, restOptions);
        }
        return value;
      });
    },
  );

  return [state, updateState] as const;
}

export default useCookieState;
