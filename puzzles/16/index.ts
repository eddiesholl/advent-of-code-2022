import { arraysEqual, arraysEqualOrdered, notEmpty } from "../common/array";
import { createMap } from "../common/map";
import { sumValues } from "../common/math";

type Valve = {
  name: string;
  rate: number;
  linked: string[];
};
type Player = {
  name: string;
  location: string;
  played: boolean;
};
type GameState = {
  t: number;
  players: Record<string, Player>;
  open: Set<string>;
  visited: Set<string>;
  rate: number;
  released: number;
  usefulClosedValves: Set<string>;
};
type Minute = {
  ops: ValveOp[];
  state: GameState;
};
type TerminalState = {
  sequence: Minute[];
  released: number;
};
interface MoveOp {
  player: string;
  kind: "move";
  from: string;
  target: string;
}
interface OpenOp {
  player: string;
  kind: "open";
  target: string;
}
interface NoOp {
  player: string;
  kind: "noop";
}
type ValveOp = MoveOp | OpenOp | NoOp;
type ValveMap = Record<string, Valve>;
type VolumeNumbers = { released: number; rate: number };
type VisitBag = Record<string, VolumeNumbers>;

const findBestValvePath = (
  valves: Valve[],
  endTime: number,
  playerNames: string[] = ["guide"]
): TerminalState => {
  const valveMap: ValveMap = {};
  valves.forEach((valve) => (valveMap[valve.name] = valve));

  const maxFlowRate = valves.map((v) => v.rate).reduce(sumValues, 0);

  const players = createMap(
    playerNames.map((name) => ({ name, played: false, location: "AA" })),
    (p) => p.name
  );
  const initialState: GameState = {
    t: 1,
    players,
    open: new Set<string>(),
    visited: new Set<string>(),
    rate: 0,
    released: 0,
    usefulClosedValves: new Set(
      Object.values(valveMap)
        .filter((v) => v.rate > 0)
        .map((v) => v.name)
    ),
  };
  return recurse(valveMap, initialState, [], [], endTime, maxFlowRate, 0, {});
};
const tickState = (state: GameState, valveMap: ValveMap) => {
  const players: Record<string, Player> = {};
  Object.keys(state.players).forEach(
    (k) => (players[k] = { ...state.players[k], played: false })
  );
  const newRate = Array.from(state.open)
    .map((v) => valveMap[v].rate)
    .reduce(sumValues, 0);
  return {
    ...state,
    players,
    t: state.t + 1,
    released: state.released + state.rate,
    rate: newRate,
  };
};
const moveLocation = (locations: string[], from: string, to: string) => {
  const i = locations.indexOf(from);
  if (i === -1) {
    throw new Error("Could not find move,from in current locations");
  }
  const updated = [...locations];
  updated[i] = to;
  return updated;
};
const nextStateFrom = (
  op: ValveOp,
  state: GameState,
  valveMap: ValveMap
): GameState => {
  const players = { ...state.players };
  const newPlayer = { ...players[op.player] };
  newPlayer.played = true;
  players[op.player] = newPlayer;
  if (op.kind === "open") {
    const newOpen = new Set(state.open).add(op.target);
    const newUseful = new Set(state.usefulClosedValves);
    newUseful.delete(op.target);
    return {
      ...state,
      players,
      open: newOpen,
      usefulClosedValves: newUseful,
    };
  } else if (op.kind === "move") {
    newPlayer.location = op.target;
    return {
      ...state,
      players,
      visited: new Set(state.visited).add(op.target),
    };
  } else {
    return {
      ...state,
      players,
    };
  }
};
const getPossibleOps = (
  state: GameState,
  valveMap: ValveMap
): ValveOp[] | null => {
  const nextPlayer = Object.values(state.players).find(
    (p) => p.played === false
  );
  if (!nextPlayer) {
    return null;
  }
  const location = nextPlayer.location;
  const currentValve = valveMap[location];
  const canOpenCurrentLocation = !state.open.has(location);
  const allValvesOpen = state.usefulClosedValves.size === 0;
  const possibleOps: ValveOp[] = canOpenCurrentLocation
    ? [{ kind: "open", target: location, player: nextPlayer.name }]
    : [];

  if (!allValvesOpen) {
    const possibleMoves: ValveOp[] = currentValve.linked.map((v) => ({
      kind: "move",
      from: location,
      target: v,
      player: nextPlayer.name,
    }));
    possibleOps.push(...possibleMoves);
  }
  if (possibleOps.length === 0) {
    possibleOps.push({ kind: "noop", player: nextPlayer.name });
  }
  return possibleOps;
};
const recurse = (
  valveMap: ValveMap,
  currentState: GameState,
  opsThisMinute: ValveOp[],
  minutes: Minute[],
  endTime: number,
  maxFlowRate: number,
  bestTotalSoFar: number,
  visitBag: VisitBag,
  debug: boolean = false
): TerminalState => {
  const minutesLeft = endTime - currentState.t;
  const totalReleased = currentState.released;
  const openString = Array.from(currentState.open).sort().join("-");
  const interesting =
    currentState.t === 14 &&
    openString === "BB-DD-JJ" &&
    currentState.players["guide"].location === "EE";
  // console.log("minutesLeft " + minutesLeft);
  if (interesting) {
    console.log("intersting");
  }
  if (minutesLeft < 0) {
    return {
      sequence: minutes,
      released: totalReleased,
    };
  }

  const bestPossibleTotal = totalReleased + (minutesLeft + 1) * maxFlowRate;
  if (bestPossibleTotal < bestTotalSoFar) {
    if (interesting) {
      console.log("bail 2");
    }
    return {
      sequence: minutes,
      released: totalReleased,
    };
  }

  const possibleOps = getPossibleOps(currentState, valveMap);
  if (interesting) {
    console.log("possibleOps");
    console.log(possibleOps);
  }

  const allOutcomes: TerminalState[] = [];
  if (possibleOps === null) {
    if (interesting) {
      console.log("null");
    }
    const visitBagId = `${currentState.t}-${Object.values(currentState.players)
      .map((p) => p.location)
      .sort()
      .join(",")}`;
    const visitBagMatch = visitBag[visitBagId];
    if (
      visitBagMatch &&
      visitBagMatch.rate > currentState.rate &&
      visitBagMatch.released > currentState.released
    ) {
      if (interesting) {
        console.log("bail 1");
      }
      // Allow bailing early based on possible better path to here
      // return {
      //   sequence: minutes,
      //   released: totalReleased,
      // };
    } else {
      visitBag[visitBagId] = {
        released: currentState.released,
        rate: currentState.rate,
      };
    }
    // No players have turns left
    const nextState = tickState(currentState, valveMap);
    const outcome = recurse(
      valveMap,
      nextState,
      [],
      minutes.concat({ state: currentState, ops: opsThisMinute }),
      endTime,
      maxFlowRate,
      bestTotalSoFar,
      visitBag
    );

    allOutcomes.push(outcome);
  } else {
    let newBestTotalSoFar = bestTotalSoFar;
    if (interesting) {
      console.log("ops");
    }

    possibleOps.forEach((op, ix) => {
      // console.log("recursing for op " + op.kind);
      if (interesting) {
        console.log(op);
      }

      const nextState = nextStateFrom(op, currentState, valveMap);
      const outcome = recurse(
        valveMap,
        nextState,
        opsThisMinute.concat(op),
        minutes,
        endTime,
        maxFlowRate,
        newBestTotalSoFar,
        visitBag
      );

      allOutcomes.push(outcome);
      newBestTotalSoFar = Math.max(newBestTotalSoFar, outcome.released);
      if (interesting) {
        console.log(outcome.sequence.length);
        console.log(outcome.released);
      }
    });
  }
  allOutcomes.sort((a, b) => b.released - a.released);
  const best = allOutcomes[0];

  // console.log("returning best");
  // console.dir(best);
  return best;
};

const parseLines = (lines: string[]): Valve[] =>
  lines
    .map((l) => {
      const match = l.match(
        /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w|,|\s]+)/
      );
      if (match) {
        return {
          name: match[1],
          rate: parseInt(match[2]),
          linked: match[3].split(", "),
        };
      }
    })
    .filter(notEmpty);

export { parseLines, findBestValvePath, recurse, GameState, Minute, Valve };
