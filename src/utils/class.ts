export function cacheProperty<TInstance, TKey extends keyof TInstance, TValue>(
  instance: TInstance,
  key: TKey,
  value: TValue,
) {
  Object.defineProperty(instance, key, {
    value,
    enumerable: true,
    configurable: true,
  });

  return value;
}

export function invalidateProperty<TInstance, TKey extends keyof TInstance>(
  instance: TInstance,
  key: TKey,
) {
  delete instance[key];
}
