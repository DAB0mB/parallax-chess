import { useEffect, useState } from 'react';
import { Event } from './event';
import { State } from './state';
import { Memo } from './memo';

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
