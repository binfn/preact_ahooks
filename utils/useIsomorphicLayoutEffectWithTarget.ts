import isBrowser from './isBrowser.ts';
import useEffectWithTarget from './useEffectWithTarget.ts';
import useLayoutEffectWithTarget from './useLayoutEffectWithTarget.ts';

const useIsomorphicLayoutEffectWithTarget = isBrowser
  ? useLayoutEffectWithTarget
  : useEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
