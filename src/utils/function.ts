export function callAll(callbacks: (() => unknown)[]) {
  for (const callback of callbacks) {
    callback();
  }
}
