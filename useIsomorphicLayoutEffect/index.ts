import { useEffect, useLayoutEffect } from '../deps.ts';
import isBrowser from '../utils/isBrowser.ts';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
