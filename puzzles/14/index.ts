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
  // console.log(JSON.stringify(start));
  // console.log(JSON.stringify(end));

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
const moveDown = { x: 0, y: 1 };
const moveDownLeft = { x: -1, y: 1 };
const moveDownRight = { x: 1, y: 1 };
const isPointBelow = (a: Point, b: Point) => a.y > b.y;
const addSand = (grid: Grid, lowestRock: Location): boolean => {
  let sandLocation = sandStart;
  let stillMoving = true;
  while (stillMoving) {
    console.log(`sand adding at x:${sandLocation.x}, y:${sandLocation.y}`);
    if (isPointBelow(sandLocation, lowestRock)) {
      return false;
    }
    const idCurrent = id(sandLocation);
    const pointBelow = move(sandLocation, moveDown);
    const idBelow = id(pointBelow);
    const pointBelowLeft = move(sandLocation, moveDownLeft);
    const idBelowLeft = id(pointBelowLeft);
    const pointBelowRight = move(sandLocation, moveDownRight);
    const idBelowRight = id(pointBelowRight);
    const locationBelow = grid[idBelow];
    const locationBelowLeft = grid[idBelowLeft];
    const locationBelowRight = grid[idBelowRight];
    if (locationBelow === undefined) {
      sandLocation = pointBelow;
    } else if (
      locationBelowLeft === undefined ||
      locationBelowLeft.material === "air"
    ) {
      sandLocation = pointBelowLeft;
    } else if (
      locationBelowRight === undefined ||
      locationBelowRight.material === "air"
    ) {
      sandLocation = pointBelowRight;
    } else if (["rock", "sand"].includes(locationBelow.material)) {
      grid[idCurrent] = {
        ...locationBelow,
        material: "sand",
      };
      stillMoving = false;
    }
  }
  return true;
};
const fillWithSand = (grid: Grid): number => {
  const lowestRock = findLowestRock(grid);
  console.log(`lowest rock = {x:${lowestRock.x}, y:${lowestRock.y}`);
  let sandCount = 0;
  let sandSettled = true;
  while (sandSettled) {
    console.log("sand count " + sandCount);
    sandCount++;
    sandSettled = addSand(grid, lowestRock);
  }
  return sandCount;
};
export { parseLines, createGrid, fillWithSand, findLowestRock, Material };
