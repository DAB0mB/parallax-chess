import { Emitter, Listener } from './emitter';

export class Event {
  constructor(readonly emitter: Emitter) {
  }

  emit() {
    this.emitter.emit(this);
  }

  on(listener: Listener) {
    return this.emitter.on(this, listener);
  }
}
