import { Emitter } from './emitter';
import { Event } from './event';
import { IValue, Value, getValue, kValue } from './value';

export class State<T> extends Event implements IValue<T> {
  [kValue]: T;

  get value(): T {
    return this[kValue];
  }

  set value(value: Value<T> | T) {
    if (value === this.value) return;

    this[kValue] = getValue(value);
    this.emit();
  }

  constructor(emitter: Emitter, value: T) {
    super(emitter);

    this[kValue] = value;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value?.toString();
  }
}
