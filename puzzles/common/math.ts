const sumValues = (prev?: number, curr?: number) => {
  return (prev || 0) + (curr || 0);
};
const sum = (values: number[]) => values.reduce(sumValues, 0);
const product = (values: number[]) =>
  values.reduce((prev, curr) => prev * curr, 1);

export { sumValues, sum, product };
