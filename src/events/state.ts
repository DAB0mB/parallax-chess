import { Event } from './event';
import { Emitter } from './emitter';

export class State<T> extends Event {
  get value() {
    return this._value;
  }

  set value(value: T) {
    if (value === this.value) return;

    this._value = value;
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
