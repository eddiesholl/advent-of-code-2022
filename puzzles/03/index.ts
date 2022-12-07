import { sumValues } from "../common/math";

const a = (lines: string[]) => lines.map(scorePack).reduce(sumValues, 0);
const b = () => void 0;
const findIntersectionIndex = (
  arr1: string[],
  arr2: string[]
): (number | undefined)[] =>
  arr1
    .map((c, ix) => {
      if (arr2.includes(c)) {
        console.log(ix);
        return ix;
      }
    })
    .filter((ix) => ix !== undefined);

const slicePack = (line: string): string[] => [
  line.slice(0, Math.ceil(line.length / 2)),
  line.slice(Math.ceil(line.length / 2)),
];
const scoreChar = (str: string, at: number): number => {
  const charCode = str.charCodeAt(at);
  if (charCode > 96) {
    return charCode - 96;
  } else {
    return charCode - 38;
  }
};
const scorePack = (line: string): number => {
  const [str1, str2] = slicePack(line);
  const arr1 = Array.from(str1);
  const arr2 = Array.from(str2);

  console.log(str1);
  console.log(str2);
  const intersections = findIntersectionIndex(arr1, arr2);
  console.log(intersections);
  return intersections.length === 1 && intersections[0] !== undefined
    ? scoreChar(str1, intersections[0])
    : 0;
};
export { a, b, findIntersectionIndex, scorePack, slicePack };
