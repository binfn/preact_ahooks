import useAntdTable from '../useAntdTable/index.tsx';
import type { Data, Params, Service } from '../useAntdTable/types.ts';
import { fieldAdapter, resultAdapter } from './fusionAdapter.ts';
import type { FusionTableOptions, FusionTableResult } from './types.ts';

const useFusionTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: FusionTableOptions<TData, TParams> = {},
): FusionTableResult<TData, TParams> => {
  const ret = useAntdTable<TData, TParams>(service, {
    ...options,
    form: options.field ? fieldAdapter(options.field) : undefined,
  });

  return resultAdapter(ret);
};

export default useFusionTable;
