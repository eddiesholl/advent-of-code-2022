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
  console.log("encoding: " + n);
  while (remainder > 0 || carried > 0) {
    console.log("position " + power);
    let currentDigit = (remainder % 5) + carried;
    console.log(currentDigit);
    if ([0, 1, 2].includes(currentDigit)) {
      console.log("0,1,2");
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
    console.log("currentPower " + currentPower);
    remainder = Math.floor(n / currentPower);
    console.log("remainder " + remainder);
    power++;
  }
  return result;
};
export { decode, encode };
