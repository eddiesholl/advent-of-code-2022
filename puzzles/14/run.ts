import { readLines } from "../common/input";
import { createGrid, fillWithSand, Grid, parseLines } from "./index";

const states = fillWithSand(
  createGrid(parseLines(readLines(__dirname, "input.txt")))
);
const logGrid = (grid: Grid) => {
  const allLocs = Object.values(grid).flatMap((r) => Object.values(r));
  const locsByX = allLocs.sort((a, b) => a.x - b.x);
  const minX = locsByX[0].x;
  const maxX = locsByX.slice(-1)[0].x;
  const locsByY = allLocs.sort((a, b) => a.y - b.y);
  const minY = Math.min(0, locsByY[0].y);
  const maxY = locsByY.slice(-1)[0].y;
  console.log(`${minX}-${maxX} ${minY}-${maxY}`);
  let result = "";
  let cy = minY;
  while (cy <= maxY) {
    let cx = minX;
    const row = grid[cy];
    while (cx <= maxX) {
      if (row === undefined) {
        result += cx === 500 ? "." : " ";
      } else {
        const loc = row[cx];
        if (loc === undefined) {
          result += cx === 500 ? "." : " ";
        } else if (loc.material === "rock") {
          result += "#";
        } else if (loc.material === "sand") {
          result += "o";
        } else if (loc.material === "air") {
          result += " ";
        }
      }
      cx++;
    }
    result += `${cy}\n`;
    cy++;
  }
  console.log(result);
  // .filter((l) => l.material === "rock")
  // .sort((a, b) => b.y - a.y)[0];
};
states.forEach((state) => {
  // console.dir(state.grid);
  console.log(state.sandCount);
  logGrid(state.grid);
});
// logUpdate(`${state.sandCount}`);
// console.log("Score is " + score);
