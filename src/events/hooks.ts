import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import { Event } from './event';
import { IValue } from './value';

let renderCount = 0;

export function useEvent(event: Event) {
  const [, setState] = useState(renderCount);

  useEffect(() => {
    return event.on(() => {
      setState(++renderCount);
    });
  }, [event]);
}

export function useValue<T>(event: Event & IValue<T>) {
  useEvent(event);

  return event.value;
}

export function useListener(event: Event, fn: () => void) {
  const ref = useRef(fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  useEffect(() => {
    return event.on((...args) => ref.current(...args));
  }, [event]);
}
