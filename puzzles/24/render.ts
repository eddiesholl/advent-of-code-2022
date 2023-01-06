import { Blizzard, Grid, Turn } from "./index";
import { Location, locationEquals } from "../common/location";

const renderGrid = (grid: Grid, blizzards: Blizzard[], player?: Location) => {
  let firstLine = "";
  let x = 0;
  while (x < grid.width) {
    firstLine =
      firstLine +
      (x === grid.start.x ? (player && player.y === 0 ? "P" : ".") : "#");
    x++;
  }
  if (player) {
    console.log(`Player at ${player.x},${player.y}`);
  }
  console.log(firstLine);
  let y = 1;
  while (y < grid.height - 1) {
    x = 1;
    let line = "#";
    while (x < grid.width - 1) {
      const blizHere = blizzards.filter(
        (b) => b.location.x === x && b.location.y === y
      );
      if (player && locationEquals(player)({ x, y })) {
        line = line + "P";
      } else if (blizHere.length > 1) {
        line = line + blizHere.length;
      } else if (blizHere.length === 1) {
        line = line + blizHere[0].direction;
      } else {
        line += ".";
      }
      x++;
    }
    line = line + "#";
    console.log(line);
    y++;
  }

  let lastLine = "";
  x = 0;
  while (x < grid.width) {
    lastLine = lastLine + (x === grid.end.x ? "." : "#");
    x++;
  }
  console.log(lastLine);
};

// Minute 1, move down
const renderMoves = (moves: Turn[]) => {
  moves.forEach((m) => {
    console.log(`Minute ${m.t}, move ${m.move}`);
  });
};

export { renderGrid, renderMoves };
