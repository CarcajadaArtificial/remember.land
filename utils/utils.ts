export const isURL = (str: string): boolean =>
  (str.length >= 7 && str.substring(0, 7) === 'http://') ||
  (str.length >= 8 && str.substring(0, 8) === 'https://');

// deno-lint-ignore no-explicit-any
export const isAllUndefined = (obj: Record<string, any>): boolean =>
  Object.values(obj).every((val) => val === undefined);
