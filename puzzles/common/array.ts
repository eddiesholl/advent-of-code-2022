export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
export function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

export const numDescending = (a: number, b: number) => b - a;
export const numAscending = (a: number, b: number) => a - b;
export const arraysEqual = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((valA) => b.includes(valA));
export const arraysEqualOrdered = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((valA, ix) => b[ix] === valA);
