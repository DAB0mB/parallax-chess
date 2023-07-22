import { useCallback, useInsertionEffect, useRef } from 'react';

export function useCaller<Fn extends (...args: any) => any>(fn: Fn) {
  const ref = useRef(callerRefInit as Fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const caller = useCallback((...args: any) => {
    return ref.current(...args);
  }, []) as Fn;

  return caller;
}

function callerRefInit() {
  throw new Error('Function not ready');
}
