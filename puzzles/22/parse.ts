import { Game, Grid, Material, Move } from "./index";

const parseLines = (lines: string[]): Game => {
  const grid: Grid = [];
  const moves: Move[] = [];
  lines.forEach((line) => {
    if ([" ", ".", "#"].includes(line[0])) {
      grid.push(line.split("") as Material[]);
    } else {
      const moveMatch = line.match(/(\d+|[A-Z]+)/g);
      if (moveMatch) {
        const parsedMoves = moveMatch.map((m) => {
          const asNum = parseInt(m);
          return isNaN(asNum) ? m : asNum;
        });
        moves.push(...parsedMoves);
      }
    }
  });
  return { grid, moves };
};

export { parseLines };
