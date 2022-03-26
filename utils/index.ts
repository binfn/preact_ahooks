// deno-lint-ignore-file
export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}
