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
        falling: false,
      };
    case 1:
      return {
        type: "+",
        shape: [new Set([1]), new Set([0, 1, 2]), new Set([1])],
        location,
        width: 3,
        falling: false,
      };
    case 2:
      return {
        type: "]",
        shape: [new Set([2]), new Set([2]), new Set([0, 1, 2])],
        location,
        width: 4,
        falling: false,
      };
    case 3:
      return {
        type: "I",
        shape: [new Set([0]), new Set([0]), new Set([0]), new Set([0])],
        location,
        width: 1,
        falling: false,
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
const renderState = (state: GameState) => {
  let h = state.chamber.length + 5;
  let x = 0;
  let currentRow: Row;
  console.log(state.activeRock);
  while (h >= 0) {
    currentRow = state.chamber[h];
    let rowString = "|";
    x = 0;
    const maybeFalling = h >= state.activeRock.location.y;
    const fallingH = h - state.activeRock.location.y;
    const fallingRow = fallingH > -1 && state.activeRock.shape[fallingH];
    while (x < chamberWidth) {
      const fixedRock = currentRow && currentRow.has(x);
      const fallingRock =
        fallingRow && fallingRow.has(x - state.activeRock.location.x);
      rowString = rowString + (fixedRock ? "#" : fallingRock ? "@" : ".");
      x++;
    }
    rowString = rowString + "|";
    console.log(rowString);
    h--;
  }
  console.log("---------");
  console.log("");
};
const applyGas = ({ activeRock }: GameState, jet: Jet) => {
  if (jet === "<") {
    if (activeRock.location.x > 0) {
      activeRock.location.x -= 1;
    }
  } else if (jet === ">") {
    if (activeRock.location.x + activeRock.width < chamberWidth) {
      activeRock.location.x += 1;
    }
  }
};

const applyFall = ({ chamber, activeRock }: GameState) => {
  if (activeRock.location.y === 0) {
    activeRock.falling = false;
    return;
  }
  const rockBottom = activeRock.shape.slice(-1)[0];
  const groundTop = chamber[0] || new Set();
  if (Array.from(rockBottom).some((r) => groundTop.has(r))) {
    activeRock.falling = false;
    return;
  } else {
    activeRock.location.y -= 1;
  }
};

const rockLanded = ({ activeRock }: GameState) => {
  return activeRock.falling;
};

const cloneChamber = (chamber: Chamber): Chamber =>
  chamber.map((r) => new Set(r));

const landRock = ({ chamber, activeRock }: GameState) => {
  const rowsToAdd = [...activeRock.shape].reverse();
  const nextChamber = cloneChamber(chamber);
  rowsToAdd.forEach((row) => {
    const offsetedRow = Array.from(row).map((r) => r + activeRock.location.x);
    nextChamber.push(new Set(offsetedRow));
  });
  return nextChamber;
};

const highestRock = (chamber: Chamber) => chamber.length;

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
      renderState(currentState);
      applyGas(currentState, jets[j]);
      j = (j + 1) % jl;
      applyFall(currentState);
      // console.log("j " + j);
      if (rockLanded(currentState)) {
        console.log("rock landed " + r);
        rockFalling = false;
        chambers.push(cloneChamber(currentState.chamber));
        currentState = {
          chamber: landRock(currentState),
          activeRock: createRock(r, { x: 2, y: highestRock(chamber) + 3 }),
        };
        r = (r + 1) % 5;
      }
    }
    if (i % 100 === 0) {
      console.log(i);
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
export { parseJets, processRocks };
