import { useCallback, useInsertionEffect, useRef } from 'react';

export function useCaller<TReturn, TArgs extends unknown[]>(fn: (...args: TArgs) => TReturn): (...args: TArgs) => TReturn {
  const ref = useRef(fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const caller = useCallback((...args: TArgs) => {
    return ref.current(...args);
  }, []);

  return caller;
}

export function useObjMemo<T extends Record<string, unknown>>(obj: T) {
  const ref = useRef(obj);
  if (!shallowCompare(ref.current, obj)) {
    ref.current = obj;
  }
  return ref.current;
}

const shallowCompare = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);
