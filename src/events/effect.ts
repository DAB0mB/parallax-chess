import { Event } from './event';
import { Emitter, Listener, Unlistener } from './emitter';

export class Effect extends Event {
  private readonly unlisteners = new Set<Unlistener>();

  constructor(emitter: Emitter, private readonly events: Event[]) {
    for (const event of events) {
      if (event.emitter !== emitter) {
        throw new Error('All events must share the same instance of EventEmitter');
      }
    }

    super(emitter);
  }

  override on(listener: Listener) {
    const offEffect = super.on(listener);
    this.unlisteners.add(offEffect)

    if (this.unlisteners.size == 1) {
      const emit = () => this.emit();

      for (const event of this.events) {
        const offEvent = event.on(emit);
        this.unlisteners.add(offEvent);
      }
    }

    return () => {
      offEffect();
      this.unlisteners.delete(offEffect);

      if (this.unlisteners.size == this.events.length) {
        for (const offEvent of this.unlisteners) {
          offEvent();
          this.unlisteners.delete(offEvent);
        }
      }
    };
  }
}
