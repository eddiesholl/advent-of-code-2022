import { containsAll, containsNoneOf, notEmpty } from "../common/array";
import { renderElfs } from "./render";

type Elf = {
  x: number;
  y: number;
};
type NeighbourSlot = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";
type Cardinal = "north" | "south" | "east" | "west";
type Direction = {
  name: Cardinal;
  next: Direction;
  searchSlots: NeighbourSlot[];
};
const elfIsAt = (elf: Elf, x: number, y: number) => elf.x === x && elf.y === y;
const NORTH = { name: "north", searchSlots: ["nw", "n", "ne"] } as Direction;
const EAST = { name: "east", next: NORTH, searchSlots: ["ne", "e", "se"] };
const WEST = { name: "west", next: EAST, searchSlots: ["sw", "w", "nw"] };
const SOUTH = { name: "south", next: WEST, searchSlots: ["se", "s", "sw"] };
NORTH.next = SOUTH as Direction;

const findNeighbours = (elfs: Elf[], i: number): NeighbourSlot[] => {
  const { x, y } = elfs[i];
  const minX = x - 1;
  const maxX = x + 1;
  const minY = y - 1;
  const maxY = y + 1;
  return elfs
    .map((elf, ix) => {
      if (i === ix) {
        return null;
      }
      const cardinal: NeighbourSlot | null = elfIsAt(elf, minX, minY)
        ? "sw"
        : elfIsAt(elf, minX, y)
        ? "w"
        : elfIsAt(elf, minX, maxY)
        ? "nw"
        : elfIsAt(elf, x, maxY)
        ? "n"
        : elfIsAt(elf, maxX, maxY)
        ? "ne"
        : elfIsAt(elf, maxX, y)
        ? "e"
        : elfIsAt(elf, maxX, minY)
        ? "se"
        : elfIsAt(elf, x, minY)
        ? "s"
        : null;
      return cardinal;
    })
    .filter(notEmpty);
};
const translateElf = ({ x, y }: Elf, cardinal: Cardinal): Elf => {
  return cardinal === "east"
    ? { x: x + 1, y }
    : cardinal === "north"
    ? { x, y: y + 1 }
    : cardinal === "south"
    ? { x, y: y - 1 }
    : cardinal === "west"
    ? { x: x - 1, y }
    : { x, y };
};
const elfId = (elf: Elf): string => `${elf.x}-${elf.y}`;
const getCountByLocation = (elfs: Elf[]) => {
  const counts: Record<string, number> = {};
  elfs.forEach((elf) => {
    const id = elfId(elf);
    const current = counts[id] || 0;
    counts[id] = current + 1;
  });
  return counts;
};
const makeTurn = (elfs: Elf[], direction: Direction): Elf[] => {
  // phase 1 - consider neighbours.
  // Propose a move if there is one
  const proposalsByIndex: Record<number, Elf> = {};
  elfs.forEach((elf, ix) => {
    const neighbours = findNeighbours(elfs, ix);
    if (neighbours.length > 0) {
      if (containsNoneOf(neighbours, direction.searchSlots)) {
        // console.log("propose first " + direction.name);
        proposalsByIndex[ix] = translateElf(elf, direction.name);
      } else if (containsNoneOf(neighbours, direction.next.searchSlots)) {
        // console.log("propose second" + direction.next.name);
        proposalsByIndex[ix] = translateElf(elf, direction.next.name);
      } else if (containsNoneOf(neighbours, direction.next.next.searchSlots)) {
        // console.log("propose third " + direction.next.next.name);
        proposalsByIndex[ix] = translateElf(elf, direction.next.next.name);
      } else if (
        containsNoneOf(neighbours, direction.next.next.next.searchSlots)
      ) {
        // console.log("propose fourth " + direction.next.next.next.name);
        proposalsByIndex[ix] = translateElf(elf, direction.next.next.next.name);
      }
    }
  });

  const proposalValues = Object.values(proposalsByIndex);
  const countByLocation = getCountByLocation(proposalValues);
  const newElfs = elfs.map((elf, ix) => {
    const proposalForMe = proposalsByIndex[ix];
    if (proposalForMe) {
      const id = elfId(proposalForMe);
      if (countByLocation[id] === 1) {
        // console.log("used a proposal");
        return proposalForMe;
      }
    }
    // console.log("no proposal");
    return { ...elf };
  });
  return newElfs;
};
const processMoves = (elfs: Elf[]): Elf[] => {
  let direction = NORTH;
  let current = [...elfs];
  let turn = 1;
  renderElfs(elfs, turn);

  while (turn <= 10) {
    current = makeTurn(current, direction);
    renderElfs(current, turn);

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
  elfId,
};
