import useLatest from '../useLatest/index.ts';
import type { BasicTarget } from '../utils/domTarget.ts';
import { getTargetElement } from '../utils/domTarget.ts';
import useEffectWithTarget from '../utils/useEffectWithTarget.ts';
import { useRef,DragEvent,ClipboardEvent } from '../deps.ts';

export interface Options {
  onFiles?: (files: File[], event?: DragEvent) => void;
  onUri?: (url: string, event?: DragEvent) => void;
  onDom?: (content: any, event?: DragEvent) => void;
  onText?: (text: string, event?: ClipboardEvent) => void;
  onDragEnter?: (event?: DragEvent) => void;
  onDragOver?: (event?: DragEvent) => void;
  onDragLeave?: (event?: DragEvent) => void;
  onDrop?: (event?: DragEvent) => void;
  onPaste?: (event?: ClipboardEvent) => void;
}

const useDrop = (target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);

  // https://stackoverflow.com/a/26459269
  const dragEnterTarget = useRef<any>();

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onData = (
        dataTransfer: DataTransfer,
        event: DragEvent | ClipboardEvent,
      ) => {
        const uri = dataTransfer.getData('text/uri-list');
        const dom = dataTransfer.getData('custom');

        if (dom && optionsRef.current.onDom) {
          let data = dom;
          try {
            data = JSON.parse(dom);
          } catch (e) {
            data = dom;
          }
          optionsRef.current.onDom(data, event as DragEvent);
          return;
        }

        if (uri && optionsRef.current.onUri) {
          optionsRef.current.onUri(uri, event as DragEvent);
          return;
        }

        if (dataTransfer.files && dataTransfer.files.length && optionsRef.current.onFiles) {
          optionsRef.current.onFiles(Array.from(dataTransfer.files), event as DragEvent);
          return;
        }

        if (dataTransfer.items && dataTransfer.items.length && optionsRef.current.onText) {
          dataTransfer.items[0].getAsString((text) => {
            optionsRef.current.onText!(text, event as ClipboardEvent);
          });
        }
      };

      const onDragEnter = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragEnterTarget.current = event.target;
        optionsRef.current.onDragEnter?.(event);
      };

      const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        optionsRef.current.onDragOver?.(event);
      };

      const onDragLeave = (event: DragEvent) => {
        if (event.target === dragEnterTarget.current) {
          optionsRef.current.onDragLeave?.(event);
        }
      };

      const onDrop = (event: DragEvent) => {
        event.preventDefault();
        onData(event.dataTransfer, event);
        optionsRef.current.onDrop?.(event);
      };

      const onPaste = (event: ClipboardEvent) => {
        onData(event.clipboardData, event);
        optionsRef.current.onPaste?.(event);
      };

      targetElement.addEventListener('dragenter', onDragEnter as any);
      targetElement.addEventListener('dragover', onDragOver as any);
      targetElement.addEventListener('dragleave', onDragLeave as any);
      targetElement.addEventListener('drop', onDrop as any);
      targetElement.addEventListener('paste', onPaste as any);

      return () => {
        targetElement.removeEventListener('dragenter', onDragEnter as any);
        targetElement.removeEventListener('dragover', onDragOver as any);
        targetElement.removeEventListener('dragleave', onDragLeave as any);
        targetElement.removeEventListener('drop', onDrop as any);
        targetElement.removeEventListener('paste', onPaste as any);
      };
    },
    [],
    target,
  );
};

export default useDrop;
