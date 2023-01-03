import { Location } from "../common/location";

type Direction = ">" | "<" | "^" | "v";
type Blizzard = {
  direction: Direction;
  location: Location;
};
type Grid = {
  start: Location;
  end: Location;
};
type GameState = {
  player: Location;
  blizzards: Blizzard[];
};
type Move = Direction | "wait";
type Turn = {
  before: GameState;
  move: Move;
  after: GameState;
  t: number;
};
const recurse = (state: GameState): Turn[] => {
  const result: Turn[] = [];
  return result;
};
const processMoves = (grid: Grid, blizzards: Blizzard[]) => {
  const initialState: GameState = {
    player: grid.start,
    blizzards,
  };
  const turns = recurse(initialState);
  return turns;
};
export { Direction, Blizzard, Grid, processMoves };
