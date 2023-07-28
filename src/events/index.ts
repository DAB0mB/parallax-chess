import { Effect } from './effect';
import { Emitter } from './emitter';
import { Event } from './event';
import { Memo } from './memo';
import { State } from './state';

export const emitter = new Emitter();
export const noopEvent = createEvent();

export function createEvent() {
  return new Event(emitter);
}

export function createEffect(events: Event[]) {
  return new Effect(emitter, events);
}

export function createState<T>(value: T) {
  return new State<T>(emitter, value);
}

export function createMemo<T>(getter: () => T, events: Event[]) {
  return new Memo<T>(emitter, getter, events);
}
