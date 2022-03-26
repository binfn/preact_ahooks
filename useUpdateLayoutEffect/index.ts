import { useLayoutEffect } from '../deps.ts';
import { createUpdateEffect } from '../createUpdateEffect/index.ts';

export default createUpdateEffect(useLayoutEffect);
