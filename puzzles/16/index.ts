import { notEmpty } from "../common/array";
import { sumValues } from "../common/math";

type Valve = {
  name: string;
  rate: number;
  linked: string[];
};
type GameState = {
  t: number;
  location: string;
  open: string[];
  visited: string[];
  rate: number;
  released: number;
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
const findBestValvePath = (valves: Valve[]): TerminalState => {
  const valveMap: ValveMap = {};
  valves.forEach((valve) => (valveMap[valve.name] = valve));
  return recurse(valveMap, [], 30);
};
const nextStateFrom = (
  { op, state }: Minute,
  valveMap: ValveMap
): GameState => {
  const newOpen =
    op.kind === "open" ? state.open.concat(op.target) : state.open;
  const newRate = newOpen.map((v) => valveMap[v].rate).reduce(sumValues, 0);
  return {
    t: state.t + 1,
    location: op.kind === "move" ? op.target : state.location,
    open: newOpen,
    visited:
      op.kind === "move" ? state.visited.concat(op.target) : state.visited,
    rate: newRate,
    released: state.released + state.rate,
  };
};
const recurse = (
  valveMap: ValveMap,
  minutes: Minute[],
  endTime: number
): TerminalState => {
  let currentState: GameState;
  if (minutes.length === 0) {
    currentState = {
      t: 1,
      location: "AA",
      open: [],
      visited: ["AA"],
      rate: 0,
      released: 0,
    };
  } else {
    const prevMinute = minutes.slice(-1)[0];
    currentState = nextStateFrom(prevMinute, valveMap);
    if (currentState.t > endTime) {
      // console.log(prevMinute.state.released + prevMinute.state.rate);
      return {
        sequence: minutes,
        released: prevMinute.state.released + prevMinute.state.rate,
      };
    }
  }
  const currentValve = valveMap[currentState.location];
  const possibleOps: ValveOp[] = currentValve.linked
    .filter((v) => !currentState.visited.includes(v))
    .map((v) => ({ kind: "move", target: v }));

  if (!currentState.open.includes(currentState.location)) {
    possibleOps.push({ kind: "open", target: currentState.location });
  }

  if (possibleOps.length === 0) {
    possibleOps.push({ kind: "noop" });
  }
  const possibleOutcomes = possibleOps.map((op) =>
    recurse(valveMap, minutes.concat({ state: currentState, op }), endTime)
  );
  // console.log(`t = ${minutes.length}, possible = ${possibleOutcomes.length}`);
  return possibleOutcomes.sort((a, b) => b.released - a.released)[0];
};
/*
== Minute 14 ==
Valves BB, DD, and JJ are open, releasing 54 pressure.
You move to valve FF.
*/
const renderMinute = ({ op, state }: Minute) => {
  console.log(`== Minute ${state.t} ==`);
  if (state.open.length === 0) {
    console.log("No valves are open");
  } else {
    console.log(
      `Valves ${state.open.join(", ")} are open, releasing ${
        state.rate
      } pressure`
    );
  }
  if (op.kind === "open") {
    console.log(`You open valve ${op.target}`);
  } else if (op.kind === "move") {
    console.log(`You move to valve ${op.target}`);
  }
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
