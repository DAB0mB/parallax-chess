import { Effect } from './effect';
import { Emitter } from './emitter';
import { Event } from './event';
import { IValue, getValue, kValue } from './value';

export class Memo<T> extends Effect implements IValue<T> {
  [kValue]!: T;
  private invalid = true;

  get value() {
    if (this.invalid) {
      this.invalid = false;
      this[kValue] = getValue(this.getter());
    }

    return this[kValue];
  }

  constructor(emitter: Emitter, private readonly getter: () => IValue<T> | T, events: Event[]) {
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
