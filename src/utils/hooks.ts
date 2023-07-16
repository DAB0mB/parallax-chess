import { useCallback, useInsertionEffect, useRef } from 'react';
import { autorun } from 'react-autorun';

export function useCaller<Fn extends (...args: any) => any>(fn: Fn) {
  const ref = useRef(callerRefInit as Fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  const caller = useCallback((...args: any) => {
    return ref.current(...args);
  }, []) as Fn;

  return autorun.ignore(caller);
}

function callerRefInit() {
  throw new Error('Function not ready');
}
