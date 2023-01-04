import { Blizzard, Grid } from "./index";

const renderGrid = (grid: Grid, blizzards: Blizzard[]) => {
  let firstLine = "";
  let x = 0;
  while (x < grid.width) {
    firstLine = firstLine + (x === grid.start.x ? "." : "#");
    x++;
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
      if (blizHere.length > 1) {
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

export { renderGrid };
