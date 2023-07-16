import { Effect } from './effect';
import { Emitter } from './emitter';
import { Event } from './event';
import { Memo } from './memo';
import { State } from './state';

export const emitter = new Emitter();

export const createEvent = () => {
  return new Event(emitter);
};

export const createEffect = (events: Event[]) => {
  return new Effect(emitter, events);
};

export const createState = <T>(value: T) => {
  return new State<T>(emitter, value);
};

export const createMemo = <T>(events: Event[], getter: () => T) => {
  return new Memo<T>(emitter, events, getter);
};
