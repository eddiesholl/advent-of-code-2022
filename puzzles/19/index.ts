import { isContinueStatement } from "typescript";
import { renderMinute } from "./render";
import { notEmpty } from "../common/array";
import { sumValues } from "../common/math";

type RobotCost = {
  ore: number;
  clay: number;
  obsidian: number;
};
type MaxCost = RobotCost;
type Blueprint = {
  name: number;
  oreRobotCost: RobotCost;
  clayRobotCost: RobotCost;
  obsidianRobotCost: RobotCost;
  geodeRobotCost: RobotCost;
};
type Phase = "ready" | "spent" | "harvested" | "received";
interface GameState {
  t: number;
  ore: number;
  oreRobots: number;
  clay: number;
  clayRobots: number;
  obsidian: number;
  obsidianRobots: number;
  geodes: number;
  geodeRobots: number;
}
interface StartState extends GameState {
  kind: "start";
}
interface EndState extends GameState {
  kind: "end";
}
type RobotName = "ore" | "clay" | "obsidian" | "geode";

type Noop = { kind: "noop" };
type BuildAction = { kind: "build"; robot: RobotName; cost: RobotCost };
type WaitAction = {
  kind: "wait";
  robot: RobotName;
  cost: RobotCost;
  minutes: number;
  readyAt: number;
};
type Action = Noop | BuildAction | WaitAction;
type Minute = {
  t: number;
  finalState: EndState;
  action: Action;
};
type Snapshot = {
  t: number;
  before: StartState;
  action: Action;
  after: EndState;
};
type TerminalState = {
  snapshots: Snapshot[];
  finalState: EndState;
};
type BestResults = Record<number, EndState>;

const parseLines = (lines: string[]): Blueprint[] =>
  lines
    .map((line) => {
      const match = line.match(
        /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
      );
      if (match) {
        return {
          name: parseInt(match[1]),
          oreRobotCost: { ore: parseInt(match[2]), clay: 0, obsidian: 0 },
          clayRobotCost: { ore: parseInt(match[3]), clay: 0, obsidian: 0 },
          obsidianRobotCost: {
            ore: parseInt(match[4]),
            clay: parseInt(match[5]),
            obsidian: 0,
          },
          geodeRobotCost: {
            ore: parseInt(match[6]),
            clay: 0,
            obsidian: parseInt(match[7]),
          },
        };
      }
    })
    .filter(notEmpty);
const canAfford = (cost: RobotCost, state: GameState): boolean =>
  state.clay >= cost.clay &&
  state.obsidian >= cost.obsidian &&
  state.ore >= cost.ore;

const turnsUntilAfford = (cost: RobotCost, state: GameState): number => {
  const clayGap = cost.clay - state.clay;
  const obsidianGap = cost.obsidian - state.obsidian;
  const oreGap = cost.ore - state.ore;
  const waitForClay =
    cost.clay === 0 ? 0 : Math.ceil(clayGap / state.clayRobots);
  const waitForObsidian =
    cost.obsidian === 0 ? 0 : Math.ceil(obsidianGap / state.obsidianRobots);
  const waitForOre = cost.ore === 0 ? 0 : Math.ceil(oreGap / state.oreRobots);
  // console.log(cost);
  // console.log(state);
  // console.log(waitForClay);
  // console.log(waitForObsidian);
  // console.log(waitForOre);
  return Math.max(waitForClay, waitForObsidian, waitForOre);
};
const buildOrWaitAction = (
  cost: RobotCost,
  robot: RobotName,
  state: GameState,
  finalMinute: number
): Action | null => {
  // console.log("buildOrWaitAction " + robot);
  const turnsUntilRobot = turnsUntilAfford(cost, state);
  // console.log("turnsUntilAfford = " + turnsUntilRobot);
  if (isNaN(turnsUntilRobot) || turnsUntilRobot === Infinity) {
    // console.log("bail nan");
    return null;
  }
  if (state.t + turnsUntilRobot > finalMinute) {
    // console.log("bail final_minute");
    return null;
  }
  return turnsUntilRobot <= 0
    ? {
        kind: "build",
        robot: robot,
        cost: cost,
      }
    : {
        kind: "wait",
        robot: robot,
        cost,
        minutes: turnsUntilRobot,
        readyAt: state.t + turnsUntilRobot,
      };
};
const end = (prevState: StartState): EndState => ({
  ...prevState,
  kind: "end",
});
const harvest = (prevState: StartState): StartState => {
  return {
    ...prevState,
    kind: "start",
    clay: prevState.clay + prevState.clayRobots,
    obsidian: prevState.obsidian + prevState.obsidianRobots,
    ore: prevState.ore + prevState.oreRobots,
    geodes: prevState.geodes + prevState.geodeRobots,
  };
};
const nextMinute = (prevState: EndState): StartState => {
  return {
    ...prevState,
    kind: "start",
    t: prevState.t + 1,
  };
};
const consume = (prevState: StartState, cost: RobotCost): EndState => {
  return {
    ...prevState,
    clay: prevState.clay - cost.clay,
    obsidian: prevState.obsidian - cost.obsidian,
    ore: prevState.ore - cost.ore,
    kind: "end",
  };
};
const updateState = (prevState: StartState, action: Action): EndState => {
  if (action.kind === "wait") {
    let startState = prevState;
    let t = 0;
    while (t < action.minutes) {
      startState = nextMinute(updateState(startState, { kind: "noop" }));
      t++;
    }
    return updateState(startState, {
      kind: "build",
      robot: action.robot,
      cost: action.cost,
    });
  } else if (action.kind === "noop") {
    return end(harvest(prevState));
  } else {
    const nextState = harvest({ ...prevState });
    if (action.robot === "clay") {
      nextState.clayRobots += 1;
    } else if (action.robot === "geode") {
      nextState.geodeRobots += 1;
    } else if (action.robot === "obsidian") {
      nextState.obsidianRobots += 1;
    } else if (action.robot === "ore") {
      nextState.oreRobots += 1;
    }
    // console.log(nextState);
    return consume(nextState, action.cost);
  }
};
const definitelyBetter = (candidate: GameState, baseline: GameState) => {
  if (candidate === undefined) {
    return false;
  }
  if (baseline === undefined) {
    return true;
  }
  return (
    candidate.clay > baseline.clay &&
    candidate.clayRobots > baseline.clayRobots &&
    candidate.geodeRobots > baseline.geodeRobots &&
    candidate.geodes > baseline.geodes &&
    candidate.obsidian > baseline.obsidian &&
    candidate.obsidianRobots > baseline.obsidianRobots &&
    candidate.ore > baseline.ore &&
    candidate.oreRobots > baseline.oreRobots
  );
};
const recurse = (
  blueprint: Blueprint,
  startState: StartState,
  snapshots: Snapshot[],
  bestResults: BestResults,
  maxCost: MaxCost,
  finalMinute: number
): TerminalState | undefined => {
  const currentTime = startState.t;
  // console.log(`t = ${currentTime}`);
  // console.log(gameState);
  const currentTerminal = { snapshots, finalState: end(harvest(startState)) };
  if (currentTime === finalMinute) {
    return currentTerminal;
  }

  const actions: (Action | null)[] = [];
  actions.push(
    buildOrWaitAction(
      blueprint.geodeRobotCost,
      "geode",
      startState,
      finalMinute
    )
  );
  if (startState.obsidianRobots < maxCost.obsidian) {
    actions.push(
      buildOrWaitAction(
        blueprint.obsidianRobotCost,
        "obsidian",
        startState,
        finalMinute
      )
    );
  } else {
    // console.log("maxxed obsidian");
  }
  if (startState.clayRobots < maxCost.clay) {
    actions.push(
      buildOrWaitAction(
        blueprint.clayRobotCost,
        "clay",
        startState,
        finalMinute
      )
    );
  } else {
    // console.log("maxxed clay");
  }
  if (startState.oreRobots < maxCost.ore) {
    actions.push(
      buildOrWaitAction(blueprint.oreRobotCost, "ore", startState, finalMinute)
    );
  } else {
    // console.log("maxxed ore");
  }
  // console.log(actions);
  // actions.push({ kind: "noop" });
  const possibleTerminals: (TerminalState | undefined)[] = [];
  actions.filter(notEmpty).forEach((action) => {
    // console.log(`t ${currentTime} action:`);
    // console.log(action);
    if (action.kind === "wait" && action.readyAt > finalMinute) {
      return currentTerminal;
    }
    const endState = updateState(startState, action);
    if (endState.clay < 0 || endState.ore < 0 || endState.obsidian < 0) {
      console.log("Bad state detected");
      console.dir(endState);
    }
    const currentBestForT = bestResults[currentTime];
    if (currentBestForT && definitelyBetter(currentBestForT, endState)) {
      console.log("bailing at " + currentTime);
      return currentTerminal;
    }
    if (definitelyBetter(endState, currentBestForT)) {
      console.log("found better at " + currentTime);
      bestResults[currentTime] = endState;
    }
    const snapshot = {
      t: currentTime,
      after: endState,
      before: startState,
      action,
    };
    const terminal = recurse(
      blueprint,
      nextMinute(endState),
      snapshots.concat(snapshot),
      bestResults,
      maxCost,
      finalMinute
    );
    possibleTerminals.push(terminal);
  });
  // console.log("possibleTerminals " + currentTime);
  // console.log(possibleTerminals);
  return possibleTerminals
    .filter(notEmpty)
    .sort((a, b) => b.finalState.geodes - a.finalState.geodes)[0];
};
const maxCostForBlueprint = (blueprint: Blueprint): MaxCost => {
  return {
    ore: Math.max(
      blueprint.clayRobotCost.ore,
      blueprint.geodeRobotCost.ore,
      blueprint.obsidianRobotCost.ore,
      blueprint.oreRobotCost.ore
    ),
    clay: Math.max(
      blueprint.clayRobotCost.clay,
      blueprint.geodeRobotCost.clay,
      blueprint.obsidianRobotCost.clay,
      blueprint.oreRobotCost.clay
    ),
    obsidian: Math.max(
      blueprint.clayRobotCost.obsidian,
      blueprint.geodeRobotCost.obsidian,
      blueprint.obsidianRobotCost.obsidian,
      blueprint.oreRobotCost.obsidian
    ),
  };
};
const snapshotToMinutes = (snapshot: Snapshot): Minute[] => {
  // console.log(snapshot.before);
  const result: Minute[] = [];
  if (snapshot.action.kind === "wait") {
    let t = 1;
    let startState = snapshot.before;
    while (t <= snapshot.action.minutes) {
      const finalState = end(harvest(startState));
      result.push({
        t: snapshot.before.t + t - 1,
        action: { kind: "noop" },
        finalState,
      });
      startState = nextMinute(finalState);
      t++;
    }
    result.push({
      t: snapshot.before.t + snapshot.action.minutes,
      action: {
        kind: "build",
        robot: snapshot.action.robot,
        cost: snapshot.action.cost,
      },
      finalState: snapshot.after,
    });
  } else {
    result.push({
      t: snapshot.after.t,
      action: snapshot.action,
      finalState: snapshot.after,
    });
  }
  // console.log(result);
  return result;
};
const processBlueprints = (
  blueprints: Blueprint[],
  finalMinute: number
): number => {
  const startingState: StartState = {
    t: 1,
    ore: 0,
    oreRobots: 1,
    clay: 0,
    clayRobots: 0,
    obsidian: 0,
    obsidianRobots: 0,
    geodes: 0,
    geodeRobots: 0,
    kind: "start",
  };
  return (
    blueprints
      // .slice(0, 1)
      .map((blueprint) => {
        console.log(blueprint);
        const maxCost = maxCostForBlueprint(blueprint);
        const maxGeodesOpened = recurse(
          blueprint,
          startingState,
          [],
          {},
          maxCost,
          finalMinute
        );
        console.log("Blueprint " + blueprint.name);
        if (maxGeodesOpened) {
          maxGeodesOpened.snapshots
            .map((s) => {
              console.log(s);
              return s;
            })
            .flatMap(snapshotToMinutes)
            .forEach(renderMinute);
          return maxGeodesOpened.finalState.geodes * blueprint.name;
        } else {
          console.log("No solution found");
          return 0;
        }
      })
      .reduce(sumValues, 0)
  );
};
export {
  parseLines,
  processBlueprints,
  Minute,
  GameState,
  StartState,
  EndState,
  Snapshot,
  updateState,
  snapshotToMinutes,
  WaitAction,
};
