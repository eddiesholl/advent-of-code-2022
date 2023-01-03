import { Blizzard, Direction, Grid } from "./index";

const isDirection = (c: string): c is Direction =>
  ["<", ">", "^", "v"].includes(c);
const parseLines = (lines: string[]) => {
  const blizzards: Blizzard[] = [];
  const cleanLines = lines.filter((line) => line !== "");
  const top = cleanLines[0];
  const bottom = cleanLines.slice(-1)[0];
  const entranceX = top.indexOf(".");
  const exitX = bottom.indexOf(".");
  const grid: Grid = {
    start: { x: entranceX, y: 0 },
    end: { x: exitX, y: cleanLines.length - 1 },
    width: cleanLines[0].length,
    height: cleanLines.length,
  };
  const rows = cleanLines.slice(1, cleanLines.length - 1);

  rows.forEach((row, y) => {
    row.split("").forEach((c, x) => {
      if (isDirection(c)) {
        blizzards.push({
          direction: c,
          location: { x, y: y + 1 },
        });
      }
    });
  });
  return { blizzards, grid };
};

export { parseLines };
