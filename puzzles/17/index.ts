import { notEmpty } from "../common/array";

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
      };
    case 1:
      return {
        type: "+",
        shape: [new Set([1]), new Set([0, 1, 2]), new Set([1])],
        location,
        width: 3,
      };
    case 2:
      return {
        type: "]",
        shape: [new Set([2]), new Set([2]), new Set([0, 1, 2])],
        location,
        width: 4,
      };
    case 3:
      return {
        type: "I",
        shape: [new Set([0]), new Set([0]), new Set([0]), new Set([0])],
        location,
        width: 1,
      };
    case 4:
      return {
        type: "[]",
        shape: [new Set([0, 1]), new Set([0, 1])],
        location,
        width: 2,
      };
  }
};
function applyGas({ activeRock }: GameState, jet: Jet) {
  if (jet === "<") {
    if (activeRock.location.x > 0) {
      activeRock.location.x -= 1;
    }
  } else if (jet === ">") {
    if (activeRock.location.x + activeRock.width < chamberWidth) {
      activeRock.location.x += 1;
    }
  }
}

function applyFall({ chamber, activeRock }: GameState) {
  throw new Error("Function not implemented.");
}

function rockLanded(currentState: { chamber: Chamber; activeRock: Rock }) {
  throw new Error("Function not implemented.");
}

function cloneChamber(chamber: Chamber): Chamber {
  throw new Error("Function not implemented.");
}

function landRock(currentState: {
  chamber: Chamber;
  activeRock: Rock;
}): Chamber {
  throw new Error("Function not implemented.");
}

function highestRock(chamber: Chamber) {
  throw new Error("Function not implemented.");
}
const processRocks = (iterations: number, jets: Jet[]) => {
  let i = 1;
  let r = 0;
  let j = 0;
  const jl = jets.length;
  const chamber: Chamber = [];
  let activeRock = createRock(r, { x: 2, y: 3 });
  let currentState = { chamber, activeRock };
  let chambers: Chamber[] = [];
  let rockFalling = true;

  while (i <= iterations) {
    while (rockFalling) {
      applyGas(currentState, jets[j]);
      j = (j + 1) % jl;
      applyFall(currentState);
      if (rockLanded(currentState)) {
        rockFalling = false;
        chambers.push(cloneChamber(currentState.chamber));
        currentState = {
          chamber: landRock(currentState),
          activeRock: createRock(r, { x: 2, y: highestRock(chamber) + 3 }),
        };
        r = (r + 1) % 5;
      }
    }
    i++;
  }
  return highestRock(chambers.slice(-1)[0]);
};
const parseJets = (lines: string[]): Jet[] => {
  const line = lines[0];
  const chars = line.split("");
  return chars
    .map((c) => (c === ">" || c === "<" ? (c as Jet) : null))
    .filter(notEmpty);
};
const b = () => void 0;
export { parseJets, b };
