export type Listener = () => void;

export class Emitter {
  private readonly listeners = new Map<unknown, Set<Listener>>();

  emit(key: unknown) {
    const listeners = this.getListeners(key);

    for (const listener of listeners) {
      listener();
    }
  }

  listen(key: unknown, listener: Listener) {
    const listeners = this.getListeners(key);
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  private getListeners(key: unknown) {
    let listeners = this.listeners.get(key);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(key, listeners);
    }

    return listeners;
  }
}
