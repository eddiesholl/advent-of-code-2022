import { findIntersection, notEmpty } from "../common/array";
import { sum, sumValues } from "../common/math";

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

// Part 2
type Chunk = [string, string, string];
const createChunks = (lines: string[]): Chunk[] => {
  const result: Chunk[] = [];
  let chunk: string[] = [];
  lines.forEach((line, ix) => {
    chunk.push(line);
    if (chunk.length === 3) {
      result.push(chunk as Chunk);
      chunk = [];
    }
  });
  return result;
};
const processChunk = (chunk: Chunk): [string, number] => {
  const [first, second, third] = chunk;
  const common1 = findCharOverlaps(first, second);
  const common2 = findCharOverlaps(first, third);
  const commonIndex = findIntersection(common1, common2)[0];
  return [first, commonIndex];
};
const processPackGroups = (lines: string[]): number =>
  sum(
    createChunks(lines)
      .map(processChunk)
      .map(([str, ix]) => scoreChar(str, ix))
  );
export {
  processPacks,
  processPackGroups,
  processChunk,
  findFirstCharOverlap,
  scorePack,
  slicePack,
  createChunks,
};
