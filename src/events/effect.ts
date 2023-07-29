import { Event } from './event';
import { Emitter, Listener } from './emitter';

export class Effect extends Event {
  private listenersCount = 0;

  constructor(emitter: Emitter, private readonly events: Event[]) {
    for (const event of events) {
      if (event.emitter !== emitter) {
        throw new Error('All events must share the same instance of EventEmitter');
      }
    }

    super(emitter);
  }

  override on(listener: Listener) {
    this.listenersCount++;
    const offEffect = [super.on(listener)];

    if (this.listenersCount === 1) {
      const emit = () => this.emit();

      for (const event of this.events) {
        const offEvent = event.on(emit);
        offEffect.push(offEvent);
      }
    }

    return () => {
      this.listenersCount--;

      for (const offEvent of offEffect) {
        offEvent();
      }
    };
  }
}
