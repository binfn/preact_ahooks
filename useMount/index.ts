import { useEffect } from '../deps.ts';

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
