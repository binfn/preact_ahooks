import useBoolean from '../useBoolean/index.ts';
import useEventListener from '../useEventListener/index.ts';
import type { BasicTarget } from '../utils/domTarget.ts';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
}

export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
    },
    {
      target,
    },
  );

  return state;
};
