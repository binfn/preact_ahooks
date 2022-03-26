import { createUseStorageState } from '../createUseStorageState/index.ts';
import isBrowser from '../utils/isBrowser.ts';

const useLocalStorageState = createUseStorageState(() => (isBrowser ? localStorage : undefined));

export default useLocalStorageState;
