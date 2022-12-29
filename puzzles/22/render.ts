import { createMap } from "../common/map";
import { Bearing, Game, Location, Move } from "./index";

const renderBearing = (b: Bearing) =>
  b === "down" ? "V" : b === "up" ? "^" : b === "right" ? ">" : "<";
const locationIndex = (x: number, y: number) => `${x}-${y}`;
const renderLocations = (
  game: Game,
  locations: Location[],
  move: Move
): void => {
  console.log(locations.slice(-2)[0]);
  console.log("move " + move);
  console.log(locations.slice(-1)[0]);
  const locMap = createMap(locations.slice(-2), (l) => locationIndex(l.x, l.y));
  game.grid.forEach((row, y) => {
    let line = "";
    let xLine = "";
    row.forEach((cell, x) => {
      xLine += x % 10;
      const locIndex = locationIndex(x, y);
      const loc = locMap[locIndex];
      if (loc) {
        line += renderBearing(loc.bearing);
      } else {
        line += cell;
      }
    });
    line += y % 10;
    if (y === 0) {
      console.log(xLine);
    }
    console.log(line);
  });
  // console.log(game.moves);
};

export { renderLocations };
