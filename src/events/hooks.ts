import { useEffect, useState } from 'react';
import { Event } from './event';
import { Memo } from './memo';
import { State } from './state';

let renderCount = 0;

export function useEvent(event: Event) {
  const [, setState] = useState(renderCount);

  useEffect(() => {
    return event.listen(() => {
      setState(++renderCount);
    });
  }, [event]);
}

export function useValue<TValue>(event: State<TValue> | Memo<TValue>) {
  useEvent(event);

  return event.value;
}

export function useListener(event: Event, caller: () => void) {
  useEffect(() => {
    return event.listen(caller);
  }, [caller]);
}
