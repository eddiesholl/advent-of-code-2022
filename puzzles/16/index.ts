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

const exampleWinningOps: ValveOp[] = [
  { kind: "move", target: "DD" },
  { kind: "open", target: "DD" },
  { kind: "move", target: "CC" },
  { kind: "move", target: "BB" },
  { kind: "open", target: "BB" },
  { kind: "move", target: "AA" },
  { kind: "move", target: "II" },
  { kind: "move", target: "JJ" },
  { kind: "open", target: "JJ" },
  { kind: "move", target: "II" },
  { kind: "move", target: "AA" },
  { kind: "move", target: "DD" },
  { kind: "move", target: "EE" },
  { kind: "move", target: "FF" },
  { kind: "move", target: "GG" },
  { kind: "move", target: "HH" },
  { kind: "open", target: "HH" },
  { kind: "move", target: "GG" },
  { kind: "move", target: "FF" },
  { kind: "move", target: "EE" },
  { kind: "open", target: "EE" },
  { kind: "move", target: "DD" },
  { kind: "move", target: "CC" },
  { kind: "open", target: "CC" },
  { kind: "noop" },
  { kind: "noop" },
  { kind: "noop" },
  { kind: "noop" },
  { kind: "noop" },
  { kind: "noop" },
];
const exampleWinningDescription = describeSequence(
  exampleWinningOps.map((op) => ({
    op,
  }))
);
const findBestValvePath = (valves: Valve[], endTime: number): TerminalState => {
  const valveMap: ValveMap = {};
  valves.forEach((valve) => (valveMap[valve.name] = valve));
  const maxFlowRate = valves.map((v) => v.rate).reduce(sumValues, 0);
  // return recurse(valveMap, [], 10, maxFlowRate, 0);
  const visitBag: VisitBag = {};
  return recurse(valveMap, [], endTime, maxFlowRate, 0, visitBag);
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
  const minutesDesc = describeSequence(minutes);
  let onTrack = false;
  if (exampleWinningDescription.startsWith(minutesDesc)) {
    console.log("on track with " + minutesDesc);
    onTrack = true;
  }
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
    const visitBagId = `${currentState.t}-${currentState.location}`;
    const visitBagMatch = visitBag[visitBagId];
    if (
      visitBagMatch &&
      visitBagMatch.rate > currentState.rate &&
      visitBagMatch.released > currentState.released
    ) {
      // if (onTrack) {
      //   console.log(
      //     `Bailing on ${visitBagId}, ${visitBagMatch} > ${totalReleased}`
      //   );
      // }
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
  const canOpenCurrentLocation = !currentState.open.has(currentState.location);
  const allValvesOpen = currentState.usefulClosedValves.size === 0;
  const possibleOps: ValveOp[] = canOpenCurrentLocation
    ? [{ kind: "open", target: currentState.location }]
    : [];

  if (!allValvesOpen) {
    const possibleMoves: ValveOp[] = currentValve.linked
      // .filter((v) => !currentState.visited.includes(v))
      .map((v) => ({ kind: "move", target: v }));
    possibleOps.push(...possibleMoves);
  }

  if (possibleOps.length === 0) {
    // return fillNoops(minutes, endTime);
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
    if (m < 4) {
      // console.log(`m = ${m}, ix = ${ix}`);
    }
    const outcome = recurse(
      valveMap,
      minutes.concat({ state: currentState, op }),
      endTime,
      maxFlowRate,
      newBestTotalSoFar,
      visitBag
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
