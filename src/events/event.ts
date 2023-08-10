import { IEmitter, Listener } from './emitter';

export class Event {
  constructor(readonly emitter: IEmitter) {
  }

  emit() {
    this.emitter.emit(this);
  }

  on(listener: Listener) {
    return this.emitter.on(this, listener);
  }
}
