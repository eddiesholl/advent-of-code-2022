import { notEmpty } from "../common/array";
import { sumValues } from "../common/math";

const processPacks = (lines: string[]) =>
  lines.map(scorePack).reduce(sumValues, 0);
const findCharOverlaps = (str1: string, str2: string): number[] =>
  Array.from(str1)
    .map((c, ix) => {
      if (str2.includes(c)) {
        return ix;
      }
    })
    .filter(notEmpty);

const findFirstCharOverlap = (str1: string, str2: string): number | undefined =>
  findCharOverlaps(str1, str2)[0];

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

  const overlapIndex = findFirstCharOverlap(str1, str2);
  return overlapIndex !== undefined ? scoreChar(str1, overlapIndex) : 0;
};
const processPackGroups = (lines: string[]): number => {
  return 0;
};
export { processPacks, findFirstCharOverlap, scorePack, slicePack };
