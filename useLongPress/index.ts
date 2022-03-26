import { useRef } from '../deps.ts';
import useLatest from '../useLatest/index.ts';
import type { BasicTarget } from '../utils/domTarget.ts';
import { getTargetElement } from '../utils/domTarget.ts';
import isBrowser from '../utils/isBrowser.ts';
import useEffectWithTarget from '../utils/useEffectWithTarget.ts';

type EventType = MouseEvent | TouchEvent;
export interface Options {
  delay?: number;
  onClick?: (event: EventType) => void;
  onLongPressEnd?: (event: EventType) => void;
}

const touchSupported =
  isBrowser &&
  //@ts-ignore unknown
  ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch));

function useLongPress(
  onLongPress: (event: EventType) => void,
  target: BasicTarget,
  { delay = 300, onClick, onLongPressEnd }: Options = {},
) {
  const onLongPressRef = useLatest(onLongPress);
  const onClickRef = useLatest(onClick);
  const onLongPressEndRef = useLatest(onLongPressEnd);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isTriggeredRef = useRef(false);

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onStart = (event: TouchEvent | MouseEvent) => {
        timerRef.current = setTimeout(() => {
          onLongPressRef.current(event);
          isTriggeredRef.current = true;
        }, delay);
      };

      const onEnd = (event: TouchEvent | MouseEvent, shouldTriggerClick: boolean = false) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(event);
        }
        if (shouldTriggerClick && !isTriggeredRef.current && onClickRef.current) {
          onClickRef.current(event);
        }
        isTriggeredRef.current = false;
      };

      const onEndWithClick = (event: TouchEvent | MouseEvent) => onEnd(event, true);

      if (!touchSupported) {
        //@ts-ignore unknown
        targetElement.addEventListener('mousedown', onStart);
        //@ts-ignore unknown
        targetElement.addEventListener('mouseup', onEndWithClick);
        //@ts-ignore unknown
        targetElement.addEventListener('mouseleave', onEnd);
      } else {
        //@ts-ignore unknown
        targetElement.addEventListener('touchstart', onStart);
        //@ts-ignore unknown
        targetElement.addEventListener('touchend', onEndWithClick);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          isTriggeredRef.current = false;
        }
        if (!touchSupported) {
          //@ts-ignore unknown
          targetElement.removeEventListener('mousedown', onStart);
          //@ts-ignore unknown
          targetElement.removeEventListener('mouseup', onEndWithClick);
          //@ts-ignore unknown
          targetElement.removeEventListener('mouseleave', onEnd);
        } else {
          //@ts-ignore unknown
          targetElement.removeEventListener('touchstart', onStart);
          //@ts-ignore unknown
          targetElement.removeEventListener('touchend', onEndWithClick);
        }
      };
    },
    [],
    target,
  );
}

export default useLongPress;
