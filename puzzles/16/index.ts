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
  const maxFlowRate = valves.map((v) => v.rate).reduce(sumValues, 0);
  return recurse(valveMap, [], 30, maxFlowRate, 0);
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
  endTime: number,
  maxFlowRate: number,
  bestTotalSoFar: number,
  debug: boolean = false
): TerminalState => {
  let currentState: GameState;
  if (minutes.length === 0) {
    currentState = {
      t: 1,
      location: "AA",
      open: [],
      visited: [],
      rate: 0,
      released: 0,
    };
  } else {
    const prevMinute = minutes.slice(-1)[0];
    currentState = nextStateFrom(prevMinute, valveMap);
    const minutesLeft = endTime - currentState.t;
    const prevReleased = prevMinute.state.released; // + prevMinute.state.rate;
    const totalReleased = prevMinute.state.released + prevMinute.state.rate;
    const bestPossibleTotal = totalReleased + (minutesLeft + 1) * maxFlowRate;
    if (minutesLeft < 0) {
      // console.log(prevMinute.state.visited);
      // console.log(prevMinute.state.open);
      // if (debug) {
      //   console.log(`${totalReleased} by minute ${currentState.t}`);
      // }
      return {
        sequence: minutes,
        released: totalReleased,
      };
    }
    if (bestPossibleTotal < bestTotalSoFar) {
      // console.log(prevMinute.state.visited);
      // console.log(prevMinute.state.open);
      // if (debug) {
      //   console.log(
      //     `bailing with ${totalReleased} at minute ${currentState.t}`
      //   );
      //   console.log(`${bestPossibleTotal} < ${bestTotalSoFar}`);
      // }
      return {
        sequence: minutes,
        released: totalReleased,
      };
    }
  }
  const currentValve = valveMap[currentState.location];
  const possibleOps: ValveOp[] = currentValve.linked
    // .filter((v) => !currentState.visited.includes(v))
    .map((v) => ({ kind: "move", target: v }));

  if (!currentState.open.includes(currentState.location)) {
    possibleOps.push({ kind: "open", target: currentState.location });
  }

  if (possibleOps.length === 0) {
    possibleOps.push({ kind: "noop" });
  }
  const allOutcomes: TerminalState[] = [];
  let newBestTotalSoFar = bestTotalSoFar;
  // const minute13 =
  //   currentState.t === 13 &&
  //   arraysEqual(currentState.open, ["BB", "DD", "JJ"]) &&
  //   arraysEqualOrdered(currentState.visited, [
  //     "DD",
  //     "CC",
  //     "BB",
  //     "AA",
  //     "II",
  //     "JJ",
  //     "II",
  //     "AA",
  //     "DD",
  //   ]);
  // const minute21 =
  //   currentState.t === 21 &&
  //   arraysEqual(currentState.open, ["BB", "DD", "HH", "JJ"]) &&
  //   arraysEqualOrdered(currentState.visited, [
  //     "DD",
  //     "CC",
  //     "BB",
  //     "AA",
  //     "II",
  //     "JJ",
  //     "II",
  //     "AA",
  //     "DD",
  //     "EE",
  //     "FF",
  //     "GG",
  //     "HH",
  //     "GG",
  //     "FF",
  //     "EE",
  //   ]);
  // if (minute13) {
  //   // console.log("minute13");
  //   // console.log(possibleOps);
  //   // console.log(currentState.open);
  //   // console.log(currentState.rate);
  // }
  // if (minute21) {
  //   // console.log("minute21");
  //   // console.log(possibleOps);
  //   // console.log(currentState.open);
  //   // console.log(currentState.rate);
  // }
  // let finalHurdle = false;
  // if (debug && currentState.t === 21) {
  //   const lastOp = minutes.slice(-1)[0].op;
  //   if (lastOp.kind === "move" && lastOp.target === "EE") {
  //     finalHurdle = true;
  //     // console.log(`t = ${currentState.t}`);
  //     // console.log(possibleOps);
  //   }
  // }
  const m = minutes.length;
  possibleOps.forEach((op, ix) => {
    // if (m < 4) {
    //   console.log(`m = ${m}, ix = ${ix}`);
    // }
    const outcome = recurse(
      valveMap,
      minutes.concat({ state: currentState, op }),
      endTime,
      maxFlowRate,
      newBestTotalSoFar
      // debug || minute21
    );
    // if (minute13) {
    // console.log("from 13");
    // console.log(outcome.released);
    // console.log(
    //   JSON.stringify(
    //     outcome.sequence.map((m) => ({ t: m.state.t, op: m.op }))
    //   )
    // );
    // }
    // if (minute21) {
    // console.log("from 21");
    // console.log(outcome.released);
    // console.log(
    //   JSON.stringify(
    //     outcome.sequence.map((m) => ({ t: m.state.t, op: m.op }))
    //   )
    // );
    // }
    // if (finalHurdle) {
    //   console.log("from 21");
    //   console.log(outcome.released);
    //   console.log(
    //     JSON.stringify(
    //       outcome.sequence.map((m) => ({ t: m.state.t, op: m.op }))
    //     )
    //   );
    // }

    allOutcomes.push(outcome);
    newBestTotalSoFar = Math.max(newBestTotalSoFar, outcome.released);
  });
  // console.log(`t = ${minutes.length}, possible = ${possibleOutcomes.length}`);
  allOutcomes.sort((a, b) => b.released - a.released);
  const best = allOutcomes[0];
  // if (best.released > 1500) {
  //   console.log(debug);
  //   console.log(allOutcomes.map((o) => o.released));
  //   console.log(allOutcomes.map((o) => o.sequence.slice(-1)[0].op));
  // }
  return best;
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
      `Valves ${state.open.sort().join(", ")} are open, releasing ${
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
