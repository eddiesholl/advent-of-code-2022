import { Game, Grid, Move } from "./index";

const parseLines = (lines: string[]): Game => {
  const grid: Grid = [];
  const moves: Move[] = [];
  lines.forEach((line) => {
    if (line.startsWith(" ") || line.startsWith(".")) {
      grid.push(line.split(""));
    } else {
      const moveMatch = line.match(/(\d+|[A-Z]+)/g);
      if (moveMatch) {
        console.log(moveMatch);
        const parsedMoves = moveMatch.map((m) => {
          console.log(m);
          const asNum = parseInt(m);
          return isNaN(asNum) ? m : asNum;
        });
        console.log(parsedMoves);
        console.log(moves);
        moves.push(...parsedMoves);
        console.log(moves);
      }
    }
  });
  return { grid, moves };
};

export { parseLines };
