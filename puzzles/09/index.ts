interface Location {
  x: number;
  y: number;
}
type GameState = {
  head: Location;
  tail: Location;
};
interface Knot extends Location {
  next?: Knot;
}
type Rope = {
  head: Knot;
  tail: Knot;
  [s: string]: Knot;
};
type Direction = "U" | "D" | "L" | "R";
type Move = {
  d: Direction;
  n: number;
};
const distanceBetween = (n1: number, n2: number): number =>
  Math.max(n1, n2) - Math.min(n1, n2);
const isNextNearPrevious = (previous: Location, next: Location): boolean => {
  const xDiff = distanceBetween(previous.x, next.x);
  const yDiff = distanceBetween(previous.y, next.y);
  return xDiff < 2 && yDiff < 2;
};
const move = (loc: Location, d: Direction): void => {
  switch (d) {
    case "U":
      loc.y = loc.y + 1;
      break;
    case "D":
      loc.y = loc.y - 1;
      break;
    case "L":
      loc.x = loc.x - 1;
      break;
    case "R":
      loc.x = loc.x + 1;
      break;
  }
};
const closeGap = (gap: number): number => (gap === -2 ? -1 : gap === 2 ? 1 : 0);
const shiftNextToPrevious = (prev: Location, next: Location): void => {
  const deltaX = prev.x - next.x;
  const deltaY = prev.y - next.y;
  next.x = prev.x - closeGap(deltaX);
  next.y = prev.y - closeGap(deltaY);
};
const movePiecesSingle = (rope: Rope, d: Direction): GameState => {
  move(rope.head, d);
  let previous = rope.head;
  let next = rope.head.next;
  while (next) {
    if (!isNextNearPrevious(previous, next)) {
      shiftNextToPrevious(previous, next);
    }
    previous = next;
    next = next.next;
  }

  return rope;
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
const processMoves2Knots = (moves: Move[]) => {
  const tail = { x: 0, y: 0 };
  const head = { x: 0, y: 0, next: tail };
  const rope = { head, tail };
  return processMoves(rope)(moves);
};
const processMoves =
  (rope: Rope) =>
  (moves: Move[]): number => {
    let currentRope = rope;
    const tailLocs = new Set<string>();
    moves.forEach((move) => {
      let counter = 0;
      while (counter < move.n) {
        currentRope = movePiecesSingle(currentRope, move.d);
        // console.log(currentRope);
        tailLocs.add(currentRope.tail.x + "-" + currentRope.tail.y);
        counter++;
      }
    });
    return tailLocs.size;
  };
export { isNextNearPrevious, movePiecesSingle, parseMoves, processMoves2Knots };
