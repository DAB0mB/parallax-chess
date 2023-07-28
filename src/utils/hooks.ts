import { useCallback, useInsertionEffect, useRef } from 'react';

export function useCaller<Fn extends (...args: any) => any>(fn: Fn) {
  const ref = useRef(fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const caller = useCallback((...args: any) => {
    return ref.current(...args);
  }, []) as Fn;

  return caller;
}
