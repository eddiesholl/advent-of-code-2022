import { sumValues } from "../common/math";

const decodeMap: Record<string, number> = {
  2: 2,
  1: 1,
  0: 0,
  "-": -1,
  "=": -2,
};
const decodeBaseValue = (encoded: string): number => decodeMap[encoded] ?? NaN;

const decode = (encoded: string): number => {
  return encoded
    .split("")
    .reverse()
    .map((c, ix) => {
      const base = decodeBaseValue(c);
      return base * Math.pow(5, ix);
    })
    .reduce(sumValues);
};
const encode = (n: number): string => {
  let result = "";
  let remainder = n;
  let power = 0;
  while (remainder > 0) {
    let current = remainder % 5;
    const divisor = Math.pow(5, power);
    result = current * divisor + result;
    remainder = Math.floor((remainder - current) / divisor);
    power++;
  }
  return result;
};
export { decode, encode };
