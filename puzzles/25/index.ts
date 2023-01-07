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
    .reduce(sumValues, 0);
};
/**
 * Encode regular numbers to a string, using a base 5, and only allowing values 2,1,0, - for -1 and = for -2
 * Example: 15 => 1=0 - 1*25 + (-2*5) + (0*1)
 * */
type ExpressableValue = [number, number];
const encodeMap: Record<number, ExpressableValue> = {
  3: [-1, 1],
};
const encode = (n: number): string => {
  let result = "";
  let remainder = n;
  let power = 1;
  let carried = 0;
  while (remainder > 0 || carried > 0) {
    let currentDigit = (remainder % 5) + carried;
    if ([0, 1, 2].includes(currentDigit)) {
      result = currentDigit + result;
      carried = 0;
    } else {
      carried = 1;
      if (currentDigit === 3) {
        result = "=" + result;
        currentDigit = -2;
      }
      if (currentDigit === 4) {
        result = "-" + result;
        currentDigit = -1;
      }
      if (currentDigit === 5) {
        result = "0" + result;
      }
    }
    const currentPower = Math.pow(5, power);
    remainder = Math.floor(n / currentPower);
    power++;
  }
  return result;
};
const sumSnafus = (values: string[]): string => {
  const decodedValues = values.map(decode);
  const sum = decodedValues.reduce(sumValues, 0);
  return encode(sum);
};
export { decode, encode, sumSnafus };
