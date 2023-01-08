const sumValues = (prev?: number, curr?: number) => {
  return (prev || 0) + (curr || 0);
};
const sum = (values: number[]) => values.reduce(sumValues, 0);

export { sumValues, sum };
