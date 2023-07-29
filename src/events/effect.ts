import { Event } from './event';
import { Emitter, Listener } from './emitter';

export class Effect extends Event {
  private readonly offCache = new Set<() => void>();

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
    this.offCache.add(offEffect)

    if (this.offCache.size == 1) {
      const emit = () => this.emit();

      for (const event of this.events) {
        const offEvent = event.on(emit);
        this.offCache.add(offEvent);
      }
    }

    return () => {
      offEffect();
      this.offCache.delete(offEffect);

      if (this.offCache.size == this.events.length) {
        for (const offEvent of this.offCache) {
          offEvent();
          this.offCache.delete(offEvent);
        }
      }
    };
  }
}
