import { sumValues } from "../common/math";

const a = (lines: string[]) => lines.map(scorePack).reduce(sumValues, 0);
const b = () => void 0;
const findIntersectionIndex = (
  str1: string,
  str2: string
): (number | undefined)[] =>
  Array.from(str1)
    .map((c, ix) => {
      if (str2.includes(c)) {
        return ix;
      }
    })
    .filter((ix) => ix !== undefined)
    .slice(0, 1);

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

  const intersections = findIntersectionIndex(str1, str2);
  return intersections.length === 1 && intersections[0] !== undefined
    ? scoreChar(str1, intersections[0])
    : 0;
};
export { a, b, findIntersectionIndex, scorePack, slicePack };
