type Location = {
  x: number;
  y: number;
};
type GameState = {
  head: Location;
  tail: Location;
};
type Direction = "U" | "D" | "L" | "R";
type Move = {
  d: Direction;
  n: number;
};
const distanceBetween = (n1: number, n2: number): number =>
  Math.max(n1, n2) - Math.min(n1, n2);
const isTailNearHead = (head: Location, tail: Location): boolean => {
  const xDiff = distanceBetween(head.x, tail.x);
  const yDiff = distanceBetween(head.y, tail.y);
  return xDiff < 2 && yDiff < 2;
};
const move = (loc: Location, d: Direction): Location => {
  switch (d) {
    case "U":
      return { x: loc.x, y: loc.y + 1 };
    case "D":
      return { x: loc.x, y: loc.y - 1 };
    case "L":
      return { x: loc.x - 1, y: loc.y };
    case "R":
      return { x: loc.x + 1, y: loc.y };
  }
};
const closeGap = (gap: number): number => (gap === -2 ? -1 : gap === 2 ? 1 : 0);
const shiftTailToHead = (head: Location, tail: Location): Location => {
  const deltaX = head.x - tail.x;
  const deltaY = head.y - tail.y;
  return { x: head.x - closeGap(deltaX), y: head.y - closeGap(deltaY) };
};
const movePiecesSingle = (state: GameState, d: Direction): GameState => {
  const headAfterMove = move(state.head, d);
  const tailAfterMove = isTailNearHead(headAfterMove, state.tail)
    ? state.tail
    : shiftTailToHead(headAfterMove, state.tail);

  return { head: headAfterMove, tail: tailAfterMove };
};

const parseMove = (line: string): Move => {
  const matcher = /([RULD]) (\d+)/;
  const match = line.match(matcher);
  if (match) {
    return { d: match[1] as Direction, n: parseInt(match[2]) };
  } else {
    return { d: "U", n: 0 };
  }
};
const parseMoves = (lines: string[]): Move[] => {
  return lines.map(parseMove);
};
const processMoves = (moves: Move[]): number => {
  let state = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 },
  };
  const tailLocs = new Set<string>();
  moves.forEach((move) => {
    // console.log(move);
    let counter = 0;
    while (counter < move.n) {
      state = movePiecesSingle(state, move.d);
      // console.log(state);
      tailLocs.add(state.tail.x + "-" + state.tail.y);
      counter++;
    }
  });
  return tailLocs.size;
};
export { isTailNearHead, movePiecesSingle, parseMoves, processMoves };
