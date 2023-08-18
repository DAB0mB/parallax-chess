import { Emitter } from './emitter';
import { Event } from './event';
import { IValue, Value } from './value';

export class State<T> extends Event implements IValue<T> {
  get value(): T {
    return this._value;
  }

  set value(value: Value<T> | T) {
    if (value === this.value) return;

    this._value = Value.get(value);
    this.emit();
  }

  constructor(emitter: Emitter, private _value: T) {
    super(emitter);
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value?.toString();
  }
}
