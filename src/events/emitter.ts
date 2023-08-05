export type Listener = () => void;
export type Unlistener = () => void;

export interface IEmitter {
  emit(key: unknown): void;
  on(key: unknown, listener: Listener): Unlistener;
}

export class Emitter implements IEmitter {
  private readonly listeners = new Map<unknown, Set<Listener>>();

  emit(key: unknown) {
    const listeners = this.listeners.get(key);
    if (!listeners) return;

    for (const listener of listeners) {
      listener();
    }
  }

  on(key: unknown, listener: Listener): Unlistener {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    const listeners = this.listeners.get(key)!;
    listeners.add(listener);

    return () => {
      listeners.delete(listener);

      if (!listeners.size) {
        this.listeners.delete(key);
      }
    };
  }
}
