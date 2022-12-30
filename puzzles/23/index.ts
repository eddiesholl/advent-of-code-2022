type Elf = {
  x: number;
  y: number;
};
type Direction = {
  name: string;
  next: Direction;
};
const NORTH = { name: "north" } as Direction;
const EAST = { name: "east", next: NORTH };
const WEST = { name: "west", next: EAST };
const SOUTH = { name: "south", next: WEST };
NORTH.next = SOUTH;

const makeTurn = (elfs: Elf[], direction: Direction): Elf[] => {
  return elfs;
};
const processMoves = (elfs: Elf[]): Elf[] => {
  let direction = NORTH;
  let current = [...elfs];
  let turn = 1;
  while (turn <= 10) {
    current = makeTurn(current, direction);
    direction = direction.next;
    turn++;
  }
  return current;
};
const calculateScore = (elfs: Elf[]): number => {
  const { xMin, yMin, xMax, yMax } = elfs.reduce(
    (prev, curr: Elf) => {
      return {
        xMin: Math.min(curr.x, prev.xMin),
        xMax: Math.max(curr.x, prev.xMax),
        yMin: Math.min(curr.y, prev.yMin),
        yMax: Math.max(curr.y, prev.yMax),
      };
    },
    { xMin: Infinity, yMin: Infinity, xMax: 0, yMax: 0 }
  );
  return (xMax - xMin) * (yMax - yMin);
};
export {
  Elf,
  processMoves,
  calculateScore,
  makeTurn,
  NORTH,
  SOUTH,
  EAST,
  WEST,
};
