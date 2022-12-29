type OPEN = ".";
type CLOSED = " ";
type WALL = "#";
type Material = OPEN | CLOSED | WALL;

type GridRow = Material[];
type Grid = GridRow[];
type Move = string | number;
type Moves = Move[];
type Game = {
  grid: Grid;
  moves: Moves;
};
type Bearing = "up" | "down" | "left" | "right";
type Location = {
  x: number;
  y: number;
  bearing: Bearing;
};
const findStart = (game: Game): Location => {
  const firstRow = game.grid[0];
  const x = firstRow.indexOf(".");
  return { x, y: 0, bearing: "right" };
};

const processMoves = (game: Game): Location => {
  const start = findStart(game);

  return start;
};
const calculateScore = (l: Location) => {
  const bearingScore =
    l.bearing === "right"
      ? 0
      : l.bearing === "down"
      ? 1
      : l.bearing === "left"
      ? 2
      : 3;
  return 4 * (l.x + 1) + 1000 * (l.y + 1) + bearingScore;
};
export { Game, Grid, Move, Material, processMoves, calculateScore };
