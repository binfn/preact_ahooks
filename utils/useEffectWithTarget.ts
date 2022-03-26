import { useEffect } from '../deps.ts';
import createEffectWithTarget from './createEffectWithTarget.ts';

const useEffectWithTarget = createEffectWithTarget(useEffect);

export default useEffectWithTarget;
