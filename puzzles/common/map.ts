const createMap = <T, V extends string | number | symbol>(
  items: T[],
  selector: (item: T) => V
): Record<V, T> => {
  const result = {} as Record<V, T>;
  items.forEach((i) => (result[selector(i)] = i));
  return result;
};

export { createMap };
