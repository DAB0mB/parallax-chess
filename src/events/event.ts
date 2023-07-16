import { Emitter, Listener } from './emitter';

export class Event {
  constructor(readonly emitter: Emitter) {
  }

  emit() {
    this.emitter.emit(this);
  }

  listen(listener: Listener) {
    return this.emitter.listen(this, listener);
  }
}
