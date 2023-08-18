export interface IValue<T> {
  value: T
}

export class Value<T> implements IValue<T> {
  static get<T>(value: Value<T> | T) {
    return value instanceof Value ? value.value : value;
  }

  constructor(readonly value: T) {
  }
}
