import { notEmpty } from "../common/array";
import { renderState } from "./render";

const chamberWidth = 7;
type Location = { x: number; y: number };
type Row = Set<number>;
type Chamber = Row[];
type RockType = "-" | "+" | "]" | "I" | "[]";
type RockShape = Row[];
type Rock = {
  type: RockType;
  shape: RockShape;
  location: Location;
  width: number;
  falling: boolean;
};
type GameState = {
  chamber: Chamber;
  activeRock: Rock;
};
type Jet = ">" | "<";
const rockMap = {
  0: { type: "-", shape: [] },
};
const createRock = (r: number, location: Location): Rock => {
  switch (r) {
    default:
    case 0:
      return {
        type: "-",
        shape: [new Set([0, 1, 2, 3])],
        location,
        width: 4,
        falling: true,
      };
    case 1:
      return {
        type: "+",
        shape: [new Set([1]), new Set([0, 1, 2]), new Set([1])],
        location,
        width: 3,
        falling: true,
      };
    case 2:
      return {
        type: "]",
        shape: [new Set([2]), new Set([2]), new Set([0, 1, 2])],
        location,
        width: 4,
        falling: true,
      };
    case 3:
      return {
        type: "I",
        shape: [new Set([0]), new Set([0]), new Set([0]), new Set([0])],
        location,
        width: 1,
        falling: true,
      };
    case 4:
      return {
        type: "[]",
        shape: [new Set([0, 1]), new Set([0, 1])],
        location,
        width: 2,
        falling: false,
      };
  }
};

const applyGas = ({ activeRock }: GameState, jet: Jet) => {
  if (jet === "<") {
    // console.log("applyGas <");
    if (activeRock.location.x > 0) {
      console.log("applyGas < effective");
      activeRock.location.x -= 1;
    }
  } else if (jet === ">") {
    // console.log("applyGas >");
    if (activeRock.location.x + activeRock.width < chamberWidth) {
      console.log("applyGas > effective");
      activeRock.location.x += 1;
    }
  }
};

const applyFall = ({ chamber, activeRock }: GameState) => {
  // console.log("applyFall y " + activeRock.location.y);
  if (activeRock.location.y === 0) {
    activeRock.falling = false;
    return;
  }
  const closeToGround = activeRock.location.y === chamber.length;
  if (!closeToGround) {
    console.log(`!closeToGround ${activeRock.location.y} ${chamber.length}`);
    activeRock.location.y -= 1;
    return;
  }
  const rockBottom = activeRock.shape.slice(-1)[0];
  const groundTop = chamber.slice(-1)[0] || new Set();
  console.log(rockBottom);
  console.log(groundTop);
  if (
    Array.from(rockBottom).some((r) => groundTop.has(r + activeRock.location.x))
  ) {
    activeRock.falling = false;
    return;
  } else {
    activeRock.location.y -= 1;
    return;
  }
};

const rockLanded = ({ activeRock }: GameState) => !activeRock.falling;
const rockFalling = ({ activeRock }: GameState) => activeRock.falling;

const cloneChamber = (chamber: Chamber): Chamber =>
  chamber.map((r) => new Set(r));

const landRock = ({ chamber, activeRock }: GameState) => {
  const rowsToAdd = [...activeRock.shape].reverse();
  // const nextChamber = cloneChamber(chamber);
  rowsToAdd.forEach((row) => {
    const offsetedRow = Array.from(row).map((r) => r + activeRock.location.x);
    chamber.push(new Set(offsetedRow));
  });
  // return nextChamber;
};

const highestRock = (chamber: Chamber) => chamber.length - 1;

const processRocks = (iterations: number, jets: Jet[]) => {
  let i = 1;
  let r = 0;
  let j = 0;
  const jl = jets.length;
  const chamber: Chamber = [];
  let activeRock = createRock(r, { x: 2, y: 3 });
  let currentState = { chamber, activeRock };
  let chambers: Chamber[] = [];

  while (i <= iterations) {
    while (rockFalling(currentState)) {
      renderState(currentState);
      applyGas(currentState, jets[j]);
      j = (j + 1) % jl;
      applyFall(currentState);
      // console.log("j " + j);
      if (rockLanded(currentState)) {
        // console.log("rock landed " + r);
        landRock(currentState);
        chambers.push(currentState.chamber);
        r = (r + 1) % 5;
        // console.log("highest rock " + highestRock(currentState.chamber));
        currentState = {
          chamber: cloneChamber(currentState.chamber),
          activeRock: createRock(r, {
            x: 2,
            y: highestRock(currentState.chamber) + 4,
          }),
        };
      }
    }
    if (i % 100 === 0) {
      console.log(i);
    }
    i++;
  }
  return highestRock(chambers.slice(-1)[0]) + 1;
};
const parseJets = (lines: string[]): Jet[] => {
  const line = lines[0];
  const chars = line.split("");
  return chars
    .map((c) => (c === ">" || c === "<" ? (c as Jet) : null))
    .filter(notEmpty);
};
const b = () => void 0;
export { parseJets, processRocks, applyGas, GameState, chamberWidth, Row };
