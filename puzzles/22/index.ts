import { renderLocations } from "./render";

type OPEN = ".";
type CLOSED = " ";
type WALL = "#";
type Material = OPEN | CLOSED | WALL;

type GridRow = Material[];
type Grid = GridRow[];
type Move = string | number;
const isTurn = (move: Move): move is string => typeof move === "string";
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
type MoveShifts = Record<string, Bearing>;
const moveMap: Record<string, MoveShifts> = {
  up: { L: "left", R: "right" },
  down: { L: "right", R: "left" },
  left: { L: "down", R: "up" },
  right: { L: "up", R: "down" },
};
const applyTurn = (l: Location, turn: string): Location => {
  return { ...l, bearing: moveMap[l.bearing][turn] };
};
const getCandidateLoc = (l: Location): Location => {
  const x =
    l.bearing === "right" ? l.x + 1 : l.bearing === "left" ? l.x - 1 : l.x;
  const y = l.bearing === "down" ? l.y + 1 : l.bearing === "up" ? l.y - 1 : l.y;
  return { x, y, bearing: l.bearing };
};
const firstCellInColumn = (
  x: number,
  bearing: Bearing,
  grid: Grid
): Location | null => {
  let y = bearing === "up" ? grid.length - 1 : 0;
  while (y >= 0 && y < grid.length) {
    const m = grid[y][x];
    if (m === "#") {
      return null;
    } else if (m === ".") {
      return { x, y, bearing };
    }
    y += bearing === "up" ? -1 : 1;
  }
  return null;
};
const firstCellInRow = (
  y: number,
  bearing: Bearing,
  grid: Grid
): Location | null => {
  const row = grid[y];
  let x = bearing === "left" ? row.length - 1 : 0;
  while (x >= 0 && x < row.length) {
    const m = grid[y][x];
    if (m === "#") {
      return null;
    } else if (m === ".") {
      return { x, y, bearing };
    }
    x += bearing === "left" ? -1 : 1;
  }
  return null;
};
const applyWalk = (
  startLoc: Location,
  grid: Grid,
  distance: number
): Location => {
  let newLoc = { ...startLoc };
  let d = 0;
  while (d < distance) {
    const candidateLoc = getCandidateLoc(newLoc);
    const candidateRow = grid[candidateLoc.y];
    if (candidateRow) {
      const candidateCell = candidateRow[candidateLoc.x];
      if (candidateCell) {
        if (candidateCell === "#") {
          break;
        } else if (candidateCell === ".") {
          newLoc = candidateLoc;
        } else {
          // We've struck a closed cell, and need to wrap
          if (newLoc.bearing === "left" || newLoc.bearing === "right") {
            const candidateLoc = firstCellInRow(newLoc.y, newLoc.bearing, grid);
            if (candidateLoc) {
              newLoc = candidateLoc;
            } else {
              break;
            }
          } else {
            const candidateLoc = firstCellInColumn(
              newLoc.x,
              newLoc.bearing,
              grid
            );
            if (candidateLoc) {
              newLoc = candidateLoc;
            } else {
              break;
            }
          }
        }
      } else {
        // We must have wrapped horizontally. Check if its possible to wrap in this current row
        const candidateLoc = firstCellInRow(newLoc.y, newLoc.bearing, grid);
        if (candidateLoc) {
          newLoc = candidateLoc;
        } else {
          break;
        }
      }
    } else {
      // We must have wrapped vertically. Check if it's possible to wrap in this current column
      const candidateLoc = firstCellInColumn(newLoc.x, newLoc.bearing, grid);
      if (candidateLoc) {
        newLoc = candidateLoc;
      } else {
        break;
      }
    }
    d++;
  }
  return newLoc;
};
const processMoves = (game: Game): Location => {
  let location = findStart(game);
  const locations: Location[] = [location];
  game.moves.forEach((move) => {
    if (isTurn(move)) {
      location = applyTurn(location, move);
    } else {
      location = applyWalk(location, game.grid, move);
    }
    locations.push(location);
    // renderLocations(game, locations, move);
  });

  return location;
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
export {
  Game,
  Grid,
  Move,
  Material,
  Location,
  Bearing,
  processMoves,
  calculateScore,
  applyWalk,
};
