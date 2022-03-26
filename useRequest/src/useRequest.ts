// deno-lint-ignore-file
import useAutoRunPlugin from './plugins/useAutoRunPlugin.ts';
import useCachePlugin from './plugins/useCachePlugin.ts';
import useDebouncePlugin from './plugins/useDebouncePlugin.ts';
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin.ts';
import usePollingPlugin from './plugins/usePollingPlugin.ts';
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin.ts';
import useRetryPlugin from './plugins/useRetryPlugin.ts';
import useThrottlePlugin from './plugins/useThrottlePlugin.ts';
import type { Options, Plugin, Service } from './types.ts';
import useRequestImplement from './useRequestImplement.ts';

// function useRequest<TData, TParams extends any[], TFormated, TTFormated extends TFormated = any>(
//   service: Service<TData, TParams>,
//   options: OptionsWithFormat<TData, TParams, TFormated, TTFormated>,
//   plugins?: Plugin<TData, TParams>[],
// ): Result<TFormated, TParams>
// function useRequest<TData, TParams extends any[]>(
//   service: Service<TData, TParams>,
//   options?: OptionsWithoutFormat<TData, TParams>,
//   plugins?: Plugin<TData, TParams>[],
// ): Result<TData, TParams>
function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    useDebouncePlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    useThrottlePlugin,
    useAutoRunPlugin,
    useCachePlugin,
    useRetryPlugin,
  ] as Plugin<TData, TParams>[]);
}

export default useRequest;
