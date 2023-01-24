import { Location, locationEquals } from "../common/location";
import { renderGrid, renderMoves } from "./render";

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
  player: Location;
  blizzards: Blizzard[];
};
type ChoiceNode = {
  t: number;
  move: Move;
  player: Location;
  blizzards: Blizzard[];
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
  const moves: MoveResult[] = [];

  const left = { x: x - 1, y };
  const right = { x: x + 1, y };
  const up = { x, y: y - 1 };
  const down = { x, y: y + 1 };
  const moveDown = { move: "v", destination: down } as MoveResult;
  const moveUp = { move: "^", destination: up } as MoveResult;
  if (locationEquals(down)(grid.end)) {
    moves.push(moveDown);
  }
  if (locationEquals(up)(grid.end)) {
    moves.push(moveUp);
  }
  if (y > 0 && y < grid.height - 1 && x > 1 && noBlizzardsAt(blizzards, left)) {
    moves.push({ move: "<", destination: left });
  }
  if (
    y > 0 &&
    y < grid.height - 1 &&
    x < grid.width - 2 &&
    noBlizzardsAt(blizzards, right)
  ) {
    moves.push({ move: ">", destination: right });
  }
  if (y > 1 && noBlizzardsAt(blizzards, up)) {
    moves.push(moveUp);
  }
  if (y < grid.height - 2 && noBlizzardsAt(blizzards, down)) {
    moves.push(moveDown);
  }
  if (noBlizzardsAt(blizzards, currentPlayer)) {
    moves.push({ move: "wait", destination: currentPlayer });
  }
  return moves;
};
const scan = (grid: Grid, state: GameState): Turn[] => {
  // REVISIT: This assumes you can move down straight away
  const root: ChoiceNode = {
    t: 0,
    move: "^",
    player: grid.start,
    blizzards: state.blizzards,
    // player: { x: grid.start.x, y: grid.start.y + 1 },
  };
  let currentChoices = [root];
  let success: ChoiceNode | undefined;
  let currentBlizzards: Blizzard[] = state.blizzards;
  let t = 0;
  console.dir(grid);
  // renderGrid(grid, currentBlizzards);

  while (!success) {
    // console.log("Starting Minute " + t);
    // console.log(currentChoices.length + " choices");
    success = currentChoices.find((choice) =>
      locationEquals(choice.player)(grid.end)
    );
    if (success) {
      break;
    }
    // console.log("Just blizzards for t = " + t);
    // renderGrid(grid, currentBlizzards);
    // console.log("Rendering choices");
    // console.dir(currentChoices);
    currentChoices.forEach((choice) => {
      // Check for invalid player locations
      const blizHere = currentBlizzards.filter(
        (b) =>
          b.location.x === choice.player.x && b.location.y === choice.player.y
      );
      if (blizHere.length > 0) {
        renderGrid(grid, currentBlizzards, choice.player);
        console.log(
          "blizHere --------------------------------------------------------------"
        );
        console.log(choice.player);
        console.log(choice.move);
        console.log(choice.parent?.player);
      }
    });

    currentBlizzards = updateBlizzards(currentBlizzards, grid);
    const possibleChoices: ChoiceNode[] = currentChoices.flatMap((choice) => {
      return findPossibleMoves(grid, currentBlizzards, choice.player).map(
        (m) => ({
          t: t + 1,
          parent: choice,
          move: m.move,
          player: m.destination,
          blizzards: currentBlizzards,
        })
      );
    });
    currentChoices = possibleChoices.filter((value, index, self) => {
      return (
        self.findIndex((choice) =>
          locationEquals(choice.player)(value.player)
        ) === index
      );
    });
    t++;
  }
  const result: ChoiceNode[] = [];
  let nextMove: ChoiceNode | undefined = success;
  while (nextMove) {
    result.push(nextMove);
    nextMove = nextMove.parent;
  }
  return result
    .reverse()
    .filter((n) => n.t > 0)
    .map((n) => ({
      move: n.move,
      t: n.t,
      blizzards: n.blizzards,
      player: n.player,
    }));
};
const processMoves = (grid: Grid, blizzards: Blizzard[]) => {
  const initialState: GameState = {
    player: grid.start,
    blizzards,
  };
  const turns = scan(grid, initialState);
  return turns;
};
const processPart2 = (grid: Grid, blizzards: Blizzard[]) => {
  const initialState: GameState = {
    player: grid.start,
    blizzards,
  };
  const returnGrid = { ...grid, end: grid.start, start: grid.end };
  const turnsToEnd1 = scan(grid, initialState);
  renderMoves(turnsToEnd1);
  const t1Final = turnsToEnd1.slice(-1)[0];
  console.log(t1Final.player);
  renderGrid(grid, t1Final.blizzards, t1Final.player);

  const stateReturn1: GameState = {
    player: grid.start,
    blizzards: t1Final.blizzards,
  };
  const turnsToStart1 = scan(returnGrid, stateReturn1);
  renderMoves(turnsToStart1);
  const t2Final = turnsToStart1.slice(-1)[0];
  console.log(t2Final.player);
  renderGrid(grid, t2Final.blizzards, t2Final.player);
  const stateThereAgain: GameState = {
    player: grid.start,
    blizzards: t2Final.blizzards,
  };
  const turnsToEnd2 = scan(grid, stateThereAgain);
  renderMoves(turnsToEnd2);
  const t3Final = turnsToEnd2.slice(-1)[0];

  renderGrid(grid, t3Final.blizzards, t3Final.player);

  console.log(
    `${turnsToEnd1.length} ${turnsToStart1.length} ${turnsToEnd2.length}`
  );
  return turnsToEnd1.length + turnsToStart1.length + turnsToEnd2.length;
};
export {
  Direction,
  Blizzard,
  Grid,
  Turn,
  processMoves,
  updateBlizzards,
  findPossibleMoves,
  processPart2,
};
