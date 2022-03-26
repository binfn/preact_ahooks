import { useLayoutEffect } from '../deps.ts';
import createEffectWithTarget from './createEffectWithTarget.ts';

const useEffectWithTarget = createEffectWithTarget(useLayoutEffect);

export default useEffectWithTarget;
