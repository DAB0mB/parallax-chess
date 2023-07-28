import { Effect } from './effect';
import { Event } from './event';
import { Emitter } from './emitter';

export class Memo<TValue> extends Effect {
  private _value!: TValue;
  private invalid = true;

  get value() {
    if (this.invalid) {
      this.invalid = false;
      this._value = this.getter();
    }

    return this._value;
  }

  constructor(emitter: Emitter, private readonly getter: () => TValue, events: Event[]) {
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
