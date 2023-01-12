import { locationEquals } from "../common/location";
import { GameState, Grid } from "./index";

const logGrid = ({ grid, path, newRock, sandCount }: GameState) => {
  const allLocs = Object.values(grid).flatMap((r) => Object.values(r));
  const locsByX = allLocs.sort((a, b) => a.x - b.x);
  const minX = locsByX[0].x;
  const maxX = locsByX.slice(-1)[0].x;
  const locsByY = allLocs.sort((a, b) => a.y - b.y);
  const minY = Math.min(0, locsByY[0].y);
  const maxY = locsByY.slice(-1)[0].y;
  console.log("sand count " + sandCount);
  console.log(`${minX}-${maxX} ${minY}-${maxY}`);
  let result = "";
  let cy = minY;
  while (cy <= maxY) {
    let cx = minX;
    const row = grid[cy];
    while (cx <= maxX) {
      const indexInPath = path.findIndex(locationEquals({ x: cx, y: cy }));
      const emptyChar =
        indexInPath > -1 ? indexInPath % 10 : cx === 500 ? "." : " ";
      if (row === undefined) {
        result += emptyChar;
      } else {
        const loc = row[cx];
        if (loc === undefined) {
          result += emptyChar;
        } else if (loc.material === "rock") {
          result += "#";
        } else if (loc.material === "sand") {
          if (newRock && locationEquals(loc)(newRock)) {
            result += "O";
          } else {
            result += "o";
          }
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

export { logGrid };
