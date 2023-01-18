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
type Mover = (p: Point) => Point;
type Checker = (n: number) => boolean;
const isNeighbour = (mover: Mover) => (p: Point) => (ids: Set<string>) => ids;
type Bounds = {
  xMin: number;
  yMin: number;
  zMin: number;
  xMax: number;
  yMax: number;
  zMax: number;
};
const getNeighbours = (p: Point) => [
  { ...p, x: p.x - 1 },
  { ...p, x: p.x + 1 },
  { ...p, y: p.y - 1 },
  { ...p, y: p.y + 1 },
  { ...p, z: p.z - 1 },
  { ...p, z: p.z + 1 },
];
const isPointValid = (bounds: Bounds) => (p: Point) =>
  p.x >= bounds.xMin - 1 &&
  p.x <= bounds.xMax + 1 &&
  p.y >= bounds.yMin - 1 &&
  p.y <= bounds.yMax + 1 &&
  p.z >= bounds.zMin - 1 &&
  p.z <= bounds.zMax + 1;
const pointEquals = (p1: Point) => (p2: Point) =>
  p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;
const countExternalFaces = (points: Point[]): number => {
  const bounds: Bounds = points.reduce(
    (prev: Bounds, curr: Point) => {
      return {
        xMin: Math.min(prev.xMin, curr.x),
        yMin: Math.min(prev.yMin, curr.y),
        zMin: Math.min(prev.zMin, curr.z),
        xMax: Math.max(prev.xMax, curr.x),
        yMax: Math.max(prev.yMax, curr.y),
        zMax: Math.max(prev.zMax, curr.z),
      };
    },
    {
      xMin: Infinity,
      yMin: Infinity,
      zMin: Infinity,
      xMax: -Infinity,
      yMax: -Infinity,
      zMax: -Infinity,
    }
  );
  const start = { x: bounds.xMin - 1, y: bounds.yMin - 1, z: bounds.zMin - 1 };
  const queue = [start];
  const outsideFaces: Point[] = [];
  const visited: Point[] = [];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      continue;
    }
    visited.push(current);
    const neighbours = getNeighbours(current).filter(isPointValid(bounds));
    neighbours.forEach((n) => {
      if (points.find(pointEquals(n))) {
        outsideFaces.push(n);
      } else {
        if (!visited.find(pointEquals(n)) && !queue.find(pointEquals(n))) {
          queue.push(n);
        }
      }
    });
  }
  return outsideFaces.length;
};
export { parseLines, countFaces, countExternalFaces };
