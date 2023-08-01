import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import { Event } from './event';
import { Memo } from './memo';
import { State } from './state';

let renderCount = 0;

export function useEvent(event: Event) {
  const [, setState] = useState(renderCount);

  useEffect(() => {
    return event.on(() => {
      setState(++renderCount);
    });
  }, [event]);
}

export function useValue<TValue>(event: State<TValue> | Memo<TValue>) {
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
