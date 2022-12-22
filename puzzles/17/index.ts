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
  height: number;
  falling: boolean;
};
type GameState = {
  chamber: Chamber;
  activeRock: Rock;
};
type Jet = ">" | "<";

const createRock = (r: number, location: Location): Rock => {
  switch (r) {
    default:
    case 0:
      return {
        type: "-",
        shape: [new Set([0, 1, 2, 3])],
        location,
        width: 4,
        height: 1,
        falling: true,
      };
    case 1:
      return {
        type: "+",
        shape: [new Set([1]), new Set([0, 1, 2]), new Set([1])],
        location,
        width: 3,
        height: 3,
        falling: true,
      };
    case 2:
      return {
        type: "]",
        shape: [new Set([2]), new Set([2]), new Set([0, 1, 2])],
        location,
        width: 3,
        height: 3,
        falling: true,
      };
    case 3:
      return {
        type: "I",
        shape: [new Set([0]), new Set([0]), new Set([0]), new Set([0])],
        location,
        width: 1,
        height: 4,
        falling: true,
      };
    case 4:
      return {
        type: "[]",
        shape: [new Set([0, 1]), new Set([0, 1])],
        location,
        width: 2,
        height: 2,
        falling: true,
      };
  }
};
const rockCanMoveLeft = ({ activeRock, chamber }: GameState): boolean => {
  if (activeRock.location.x === 0) {
    return false;
  }
  const rowsFree = activeRock.shape.map((rockRow, rockShapeIndex) => {
    const chamberRowNumber =
      activeRock.location.y + (activeRock.height - 1 - rockShapeIndex);
    const chamberRow = chamber[chamberRowNumber];
    if (!chamberRow) {
      return true;
    }
    return Array.from(rockRow).every(
      (r) => !chamberRow.has(r + activeRock.location.x - 1)
    );
  });
  return rowsFree.every(Boolean);
};
const rockCanMoveRight = ({ activeRock, chamber }: GameState): boolean => {
  if (activeRock.location.x + activeRock.width >= chamberWidth) {
    return false;
  }
  const rowsFree = activeRock.shape.map((rockRow, rockShapeIndex) => {
    const chamberRowNumber =
      activeRock.location.y + (activeRock.height - 1 - rockShapeIndex);
    const chamberRow = chamber[chamberRowNumber];
    if (!chamberRow) {
      return true;
    }
    return Array.from(rockRow).every(
      (rx) => !chamberRow.has(rx + activeRock.location.x + 1)
    );
  });
  return rowsFree.every(Boolean);
};

const applyGas = ({ activeRock, chamber }: GameState, jet: Jet) => {
  if (jet === "<") {
    if (rockCanMoveLeft({ activeRock, chamber })) {
      activeRock.location.x -= 1;
    }
  } else if (jet === ">") {
    if (rockCanMoveRight({ activeRock, chamber })) {
      activeRock.location.x += 1;
    }
  }
};

const rockCanMoveDown = ({ activeRock, chamber }: GameState): boolean => {
  if (activeRock.location.x + activeRock.width >= chamberWidth) {
    return false;
  }
  const rowsFree = activeRock.shape.map((rockRow, rockShapeIndex) => {
    const chamberRowNumber =
      activeRock.location.y + (activeRock.height - 1 - rockShapeIndex);
    const chamberRowBelow = chamber[chamberRowNumber - 1]; // -1 to grab row below
    if (!chamberRowBelow) {
      return true;
    }
    return Array.from(rockRow).every(
      (rx) => !chamberRowBelow.has(rx + activeRock.location.x)
    );
  });
  return rowsFree.every(Boolean);
};

const applyFall = ({ chamber, activeRock }: GameState) => {
  if (activeRock.location.y === 0) {
    activeRock.falling = false;
    return;
  }
  const aboveGround = activeRock.location.y > chamber.length;
  if (aboveGround) {
    activeRock.location.y -= 1;
    return;
  }
  if (rockCanMoveDown({ chamber, activeRock })) {
    activeRock.location.y -= 1;
  } else {
    activeRock.falling = false;
  }
};

const rockLanded = ({ activeRock }: GameState) => !activeRock.falling;
const rockFalling = ({ activeRock }: GameState) => activeRock.falling;

const cloneChamber = (chamber: Chamber): Chamber =>
  chamber.map((r) => new Set(r));

const landRock = ({ chamber, activeRock }: GameState) => {
  activeRock.shape.forEach((fallingRow, fallingRowIndex) => {
    const h = activeRock.location.y + (activeRock.height - fallingRowIndex - 1);
    const chamberRow = chamber[h];
    const fallingRowArray = Array.from(fallingRow);
    if (chamberRow) {
      fallingRowArray.forEach((x) => chamberRow.add(x + activeRock.location.x));
    } else {
      const newLandedRow = fallingRowArray.map(
        (r) => r + activeRock.location.x
      );
      chamber[h] = new Set(newLandedRow);
    }
  });
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

  while (i <= iterations) {
    while (rockFalling(currentState)) {
      applyGas(currentState, jets[j]);
      j = (j + 1) % jl;
      applyFall(currentState);
      renderState(currentState);
      if (rockLanded(currentState)) {
        console.log("rock landed " + r);
        landRock(currentState);
        r = (r + 1) % 5;
        currentState = {
          chamber: cloneChamber(currentState.chamber),
          activeRock: createRock(r, {
            x: 2,
            y: highestRock(currentState.chamber) + 4,
          }),
        };
        break;
      }
    }
    if (i % 100 === 0) {
      console.log(i);
    }
    i++;
  }
  return highestRock(currentState.chamber) + 1;
};
const parseJets = (lines: string[]): Jet[] => {
  const line = lines[0];
  const chars = line.split("");
  return chars
    .map((c) => (c === ">" || c === "<" ? (c as Jet) : null))
    .filter(notEmpty);
};
const b = () => void 0;
export {
  parseJets,
  processRocks,
  applyGas,
  GameState,
  chamberWidth,
  Row,
  createRock,
};
