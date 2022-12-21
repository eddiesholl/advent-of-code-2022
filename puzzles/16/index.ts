import { arraysEqual, arraysEqualOrdered, notEmpty } from "../common/array";
import { sumValues } from "../common/math";

type Valve = {
  name: string;
  rate: number;
  linked: string[];
};
type GameState = {
  t: number;
  location: string;
  open: Set<string>;
  visited: Set<string>;
  rate: number;
  released: number;
  usefulClosedValves: Set<string>;
};
type Minute = {
  op: ValveOp;
  state: GameState;
};
type TerminalState = {
  sequence: Minute[];
  released: number;
};
interface MoveOp {
  kind: "move";
  target: string;
}
interface OpenOp {
  kind: "open";
  target: string;
}
interface NoOp {
  kind: "noop";
}
type ValveOp = MoveOp | OpenOp | NoOp;
type ValveMap = Record<string, Valve>;
type VolumeNumbers = { released: number; rate: number };
type VisitBag = Record<string, VolumeNumbers>;
const describeSequence = (minutes: Omit<Minute, "state">[]): string =>
  minutes
    .map((m) => (m.op.kind === "noop" ? "noop" : `${m.op.kind}-${m.op.target}`))
    .join("-");

const findBestValvePath = (valves: Valve[], endTime: number): TerminalState => {
  const valveMap: ValveMap = {};
  valves.forEach((valve) => (valveMap[valve.name] = valve));

  const maxFlowRate = valves.map((v) => v.rate).reduce(sumValues, 0);

  return recurse(valveMap, [], endTime, maxFlowRate, 0, {});
};
const nextStateFrom = (
  { op, state }: Minute,
  valveMap: ValveMap
): GameState => {
  if (op.kind === "open") {
    const newOpen = new Set(state.open).add(op.target);
    const newRate = Array.from(newOpen)
      .map((v) => valveMap[v].rate)
      .reduce(sumValues, 0);
    const newUseful = new Set(state.usefulClosedValves);
    newUseful.delete(op.target);
    return {
      t: state.t + 1,
      location: state.location,
      open: newOpen,
      visited: state.visited,
      rate: newRate,
      released: state.released + state.rate,
      usefulClosedValves: newUseful,
    };
  } else if (op.kind === "move") {
    return {
      t: state.t + 1,
      location: op.target,
      open: state.open,
      visited: new Set(state.visited).add(op.target),
      rate: state.rate,
      released: state.released + state.rate,
      usefulClosedValves: state.usefulClosedValves,
    };
  } else {
    return {
      ...state,
      t: state.t + 1,
      released: state.released + state.rate,
    };
  }
};
const fillNoops = (minutes: Minute[], endTime: number): TerminalState => {
  const { op: prevOp, state: prevState } = minutes.slice(-1)[0];
  let t = prevState.t;
  const sequence = [...minutes];
  let lastReleased: number = 0;
  while (t <= endTime) {
    t++;
    const released = prevState.released + prevState.rate;
    const state = {
      ...prevState,
      t,
      released,
    };
    lastReleased = released;
    sequence.push({ op: { kind: "noop" }, state });
  }
  return { sequence, released: lastReleased };
};
const recurse = (
  valveMap: ValveMap,
  minutes: Minute[],
  endTime: number,
  maxFlowRate: number,
  bestTotalSoFar: number,
  visitBag: VisitBag,
  debug: boolean = false
): TerminalState => {
  let currentState: GameState;

  if (minutes.length === 0) {
    currentState = {
      t: 1,
      location: "AA",
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
  } else {
    const prevMinute = minutes.slice(-1)[0];
    currentState = nextStateFrom(prevMinute, valveMap);
    const minutesLeft = endTime - currentState.t;
    const totalReleased = currentState.released;
    if (minutesLeft < 0) {
      return {
        sequence: minutes,
        released: totalReleased,
      };
    }
    const visitBagId = `${currentState.t}-${currentState.location}`;
    const visitBagMatch = visitBag[visitBagId];
    if (
      visitBagMatch &&
      visitBagMatch.rate > currentState.rate &&
      visitBagMatch.released > currentState.released
    ) {
      return {
        sequence: minutes,
        released: totalReleased,
      };
    } else {
      visitBag[visitBagId] = {
        released: currentState.released,
        rate: currentState.rate,
      };
    }
    const bestPossibleTotal = totalReleased + (minutesLeft + 1) * maxFlowRate;
    if (bestPossibleTotal < bestTotalSoFar) {
      return {
        sequence: minutes,
        released: totalReleased,
      };
    }
  }
  const currentValve = valveMap[currentState.location];
  const canOpenCurrentLocation = !currentState.open.has(currentState.location);
  const allValvesOpen = currentState.usefulClosedValves.size === 0;
  const possibleOps: ValveOp[] = canOpenCurrentLocation
    ? [{ kind: "open", target: currentState.location }]
    : [];

  if (!allValvesOpen) {
    const possibleMoves: ValveOp[] = currentValve.linked.map((v) => ({
      kind: "move",
      target: v,
    }));
    possibleOps.push(...possibleMoves);
  }

  if (possibleOps.length === 0) {
    // return fillNoops(minutes, endTime);
    possibleOps.push({ kind: "noop" });
  }
  const allOutcomes: TerminalState[] = [];
  let newBestTotalSoFar = bestTotalSoFar;

  possibleOps.forEach((op, ix) => {
    const outcome = recurse(
      valveMap,
      minutes.concat({ state: currentState, op }),
      endTime,
      maxFlowRate,
      newBestTotalSoFar,
      visitBag
    );

    allOutcomes.push(outcome);
    newBestTotalSoFar = Math.max(newBestTotalSoFar, outcome.released);
  });
  allOutcomes.sort((a, b) => b.released - a.released);
  const best = allOutcomes[0];

  return best;
};
/*
== Minute 14 ==
Valves BB, DD, and JJ are open, releasing 54 pressure.
You move to valve FF.
*/
const renderMinute = ({ op, state }: Minute) => {
  console.log(`== Minute ${state.t} ==`);
  if (state.open.size === 0) {
    console.log("No valves are open");
  } else {
    console.log(
      `Valves ${Array.from(state.open).sort().join(", ")} are open, releasing ${
        state.rate
      } pressure`
    );
  }
  if (op.kind === "open") {
    console.log(`You open valve ${op.target}`);
  } else if (op.kind === "move") {
    console.log(`You move to valve ${op.target}`);
  }
  console.log(state.released);
  console.log("");
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

export { parseLines, findBestValvePath, recurse, GameState, renderMinute };
