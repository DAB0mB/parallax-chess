import { IEmitter, Unlistener } from './emitter';

export class EventTargetEmitter<TTarget extends EventTarget> implements IEmitter {
  constructor(readonly target: TTarget) {
  }

  emit(event: Event): void {
    this.target.dispatchEvent(event);
  }

  on<TKey extends string>(key: TKey, listener: EventTargetListener<TTarget, TKey>): Unlistener {
    this.target.addEventListener(key, listener);

    return () => {
      this.target.removeEventListener(key, listener);
    };
  }
}

export function emitTargetEvent<TTarget extends EventTarget>(target: TTarget, event: Event) {
  return new EventTargetEmitter(target).emit(event);
}

export function onTargetEvent<TTarget extends EventTarget, TKey extends string>(target: TTarget, key: TKey, listener: EventTargetListener<TTarget, TKey>) {
  return new EventTargetEmitter(target).on(key, listener);
}

export type EventTargetListener<TTarget extends EventTarget, TKey extends string> = TTarget['addEventListener'] extends (key: TKey, listener: infer RListener) => void ? RListener extends EventListener ? EventListener : never: never;
