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
const a = (lines: string[]) => void 0;
const b = () => void 0;
export { Direction, Blizzard, Grid };
