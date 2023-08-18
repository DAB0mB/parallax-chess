import { Effect } from './effect';
import { Emitter } from './emitter';
import { Event } from './event';
import { IValue } from './value';

export class Memo<T> extends Effect implements IValue<T> {
  private _value!: T;
  private invalid = true;

  get value() {
    if (this.invalid) {
      this.invalid = false;
      this._value = this.getter();
    }

    return this._value;
  }

  constructor(emitter: Emitter, private readonly getter: () => T, events: Event[]) {
    super(emitter, events);
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value?.toString();
  }

  emit() {
    this.invalid = true;
    super.emit();
  }
}
