export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
export function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}
