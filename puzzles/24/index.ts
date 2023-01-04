import { Location, locationEquals } from "../common/location";
import { renderGrid } from "./render";

type Direction = ">" | "<" | "^" | "v";
type Blizzard = {
  direction: Direction;
  location: Location;
};
type Grid = {
  start: Location;
  end: Location;
  width: number;
  height: number;
};
type GameState = {
  player: Location;
  blizzards: Blizzard[];
};
type Move = Direction | "wait";
type MoveResult = {
  move: Move;
  destination: Location;
};
type Turn = {
  move: Move;
  t: number;
};
type ChoiceNode = {
  // t: number;
  move: Move;
  player: Location;
  parent?: ChoiceNode;
};
const updateBlizzards = (blizzards: Blizzard[], grid: Grid) => {
  const newBlizzards = blizzards.map(({ direction, location }) => {
    const { x, y } = location;
    const newLocation: Location =
      direction === "<"
        ? { x: location.x - 1, y }
        : direction === ">"
        ? { x: x + 1, y }
        : direction === "^"
        ? { x, y: y - 1 }
        : { x, y: y + 1 };
    if (newLocation.y < 1) {
      newLocation.y = grid.height - 2;
    }
    if (newLocation.y > grid.height - 2) {
      newLocation.y = 1;
    }
    if (newLocation.x < 1) {
      newLocation.x = grid.width - 2;
    }
    if (newLocation.x > grid.width - 2) {
      newLocation.x = 1;
    }
    return { direction, location: newLocation };
  });
  return newBlizzards;
};
const noBlizzardsAt = (blizzards: Blizzard[], searchFor: Location) =>
  blizzards.every((b) => !locationEquals(searchFor)(b.location));

const findPossibleMoves = (
  grid: Grid,
  blizzards: Blizzard[],
  currentPlayer: Location
) => {
  const { x, y } = currentPlayer;
  const moves: MoveResult[] = [{ move: "wait", destination: currentPlayer }];

  const left = { x: x - 1, y };
  const right = { x: x + 1, y };
  const up = { x, y: y - 1 };
  const down = { x, y: y + 1 };
  if (x > 1 && noBlizzardsAt(blizzards, left)) {
    moves.push({ move: "<", destination: left });
  }
  if (x < grid.width - 2 && noBlizzardsAt(blizzards, right)) {
    moves.push({ move: ">", destination: right });
  }
  if (y > 1 && noBlizzardsAt(blizzards, up)) {
    moves.push({ move: "^", destination: up });
  }
  if (y < grid.height - 2 && noBlizzardsAt(blizzards, down)) {
    moves.push({ move: "v", destination: down });
  }
  if (moves.length === 0) {
    moves.push({ move: "wait", destination: currentPlayer });
  }
  return moves;
};
const scan = (grid: Grid, state: GameState): Move[] => {
  const root: ChoiceNode = {
    // t: 0,
    move: "^",
    player: grid.start,
  };
  let currentChoices = [root];
  let success: ChoiceNode | undefined;
  let currentBlizzards: Blizzard[] = state.blizzards;
  let t = 1;
  renderGrid(grid, currentBlizzards);

  while (!success) {
    console.log(t);
    console.log(currentChoices.length);
    success = currentChoices.find((choice) =>
      locationEquals(choice.player)(grid.end)
    );
    if (success) {
      break;
    }
    currentBlizzards = updateBlizzards(currentBlizzards, grid);
    renderGrid(grid, currentBlizzards);
    const possibleChoices: ChoiceNode[] = currentChoices.flatMap((choice) => {
      return findPossibleMoves(grid, currentBlizzards, choice.player).map(
        (m) => ({
          t,
          parent: choice,
          move: m.move,
          player: m.destination,
        })
      );
    });
    currentChoices = possibleChoices;
    t++;
  }
  const result: Move[] = [];
  let nextMove: ChoiceNode | undefined = success;
  while (nextMove) {
    result.push(nextMove.move);
    nextMove = nextMove.parent;
  }
  result.reverse();
  return result;
};
const processMoves = (grid: Grid, blizzards: Blizzard[]) => {
  const initialState: GameState = {
    player: grid.start,
    blizzards,
  };
  const turns = scan(grid, initialState);
  return turns;
};
export {
  Direction,
  Blizzard,
  Grid,
  processMoves,
  updateBlizzards,
  findPossibleMoves,
};
