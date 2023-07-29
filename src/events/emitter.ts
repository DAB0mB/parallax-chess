export type Listener = () => void;

export class Emitter {
  private readonly listeners = new Map<unknown, Set<Listener>>();

  emit(key: unknown) {
    const listeners = this.listeners.get(key);
    if (!listeners) return;

    for (const listener of listeners) {
      listener();
    }
  }

  on(key: unknown, listener: Listener) {
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
