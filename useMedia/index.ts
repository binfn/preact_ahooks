import { useEffect, useState } from '../deps.ts';
import isBrowser from '../utils/isBrowser.ts';

const getInitialState = (query: string, defaultState?: boolean) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (isBrowser) {
    return window.matchMedia(query).matches;
  }
  return false;
};

const useMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };
    mql.addListener(onChange);
    //mql.addEventListener("change",onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
      //mql.removeEventListener("change",onChange);
    };
  }, [query]);

  return state;
};

export default useMedia;
