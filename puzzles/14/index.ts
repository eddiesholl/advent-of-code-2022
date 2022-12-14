interface Point {
  x: number;
  y: number;
}
interface Distance extends Point {}
type Material = "air" | "rock" | "sand";
interface Location extends Point {
  material: Material;
}
type Line = Point[];
type Grid = Record<string, Location>;
const pointsEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const delta = (a: Point, b: Point): Distance => ({
  x: b.x - a.x,
  y: b.y - a.y,
});
const normaliseDirection = (d: Distance): Distance => ({
  x: d.x < 0 ? -1 : d.x > 0 ? 1 : 0,
  y: d.y < 0 ? -1 : d.y > 0 ? 1 : 0,
});
const move = (p: Point, d: Distance): Point => ({
  x: p.x + d.x,
  y: p.y + d.y,
});
const id = (p: Point) => `${p.x}-${p.y}`;
const setRock = (grid: Grid, start: Point, end: Point) => {
  const movement = normaliseDirection(delta(start, end));
  let currentLocation = start;
  console.log(JSON.stringify(start));
  console.log(JSON.stringify(end));

  while (!pointsEqual(currentLocation, end)) {
    grid[id(currentLocation)] = {
      ...currentLocation,
      material: "rock",
    };
    currentLocation = move(currentLocation, movement);
  }
};
const createGrid = (lines: Line[]): Grid => {
  const result: Grid = {};
  lines.forEach((line) => {
    let pointCounter = 0;
    while (pointCounter < line.length - 1) {
      setRock(result, line[pointCounter], line[pointCounter + 1]);
      pointCounter++;
    }
  });
  return result;
};
const parseLines = (lines: string[]): Line[] => {
  return lines.map((line) =>
    line.split(" -> ").map((s) => {
      const nums = s.split(",");
      return { x: parseInt(nums[0]), y: parseInt(nums[1]) };
    })
  );
};
const findLowestRock = (grid: Grid): Location =>
  Object.values(grid)
    .filter((l) => l.material === "rock")
    .sort((a, b) => b.y - a.y)[0];
const sandStart = { x: 500, y: 0 };
const addSand = (grid: Grid, lowestRock: Location): boolean => {
  return true;
};
const fillWithSand = (grid: Grid): number => {
  const lowestRock = findLowestRock(grid);
  console.log(`lowest rock = {x:${lowestRock.x}, y:${lowestRock.y}`);
  let sandCount = -1;
  let isSandDropped = false;
  while (!isSandDropped) {
    sandCount++;
    isSandDropped = addSand(grid, lowestRock);
  }
  return sandCount;
};
export { parseLines, createGrid, fillWithSand, findLowestRock, Material };
