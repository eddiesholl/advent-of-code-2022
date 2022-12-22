import { notEmpty } from "../common/array";
import { sumValues } from "../common/math";

type Point = {
  x: number;
  y: number;
  z: number;
};
const makeId = (p: Point): string => `${p.x}-${p.y}-${p.z}`;
const countFaces = (points: Point[]): number => {
  const ids = new Set(points.map(makeId));
  return points
    .map((p) => {
      const neighbors = [
        { ...p, x: p.x - 1 },
        { ...p, x: p.x + 1 },
        { ...p, y: p.y - 1 },
        { ...p, y: p.y + 1 },
        { ...p, z: p.z - 1 },
        { ...p, z: p.z + 1 },
      ].map(makeId);
      return neighbors.filter((n) => !ids.has(n)).length;
    })
    .reduce(sumValues, 0);
};
const parseLines = (lines: string[]): Point[] =>
  lines
    .map((line) => {
      const match = line.match(/(\d+),(\d+),(\d+)/);
      if (match) {
        return {
          x: parseInt(match[1]),
          y: parseInt(match[2]),
          z: parseInt(match[3]),
        };
      }
    })
    .filter(notEmpty);

const b = () => void 0;
export { parseLines, countFaces };
