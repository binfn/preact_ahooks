import { createUseStorageState } from '../createUseStorageState/index.ts';
import isBrowser from '../utils/isBrowser.ts';

const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
