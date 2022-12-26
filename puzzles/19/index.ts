import { isContinueStatement } from "typescript";
import { renderMinute } from "./render";
import { notEmpty } from "../common/array";
import { sumValues } from "../common/math";

type RobotCost = {
  ore: number;
  clay: number;
  obsidian: number;
};
type Blueprint = {
  name: number;
  oreRobotCost: RobotCost;
  clayRobotCost: RobotCost;
  obsidianRobotCost: RobotCost;
  geodeRobotCost: RobotCost;
};
type GameState = {
  ore: number;
  oreRobots: number;
  clay: number;
  clayRobots: number;
  obsidian: number;
  obsidianRobots: number;
  geodes: number;
  geodeRobots: number;
};
type RobotName = "ore" | "clay" | "obsidian" | "geode";

type Noop = { kind: "noop" };
type BuildAction = { kind: "build"; robot: RobotName; cost: RobotCost };
type Action = Noop | BuildAction;
type Minute = {
  t: number;
  finalState: GameState;
  action: Action;
};
type TerminalState = {
  minutes: Minute[];
  finalState: GameState;
};
type BestResults = Record<number, GameState>;

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

const consume = (prevState: GameState, cost: RobotCost): GameState => {
  return {
    ...prevState,
    clay: prevState.clay - cost.clay,
    obsidian: prevState.obsidian - cost.obsidian,
    ore: prevState.ore - cost.ore,
  };
};
const updateState = (prevState: GameState, action: Action): GameState => {
  const nextState = {
    ...prevState,
    ore: prevState.ore + prevState.oreRobots,
    clay: prevState.clay + prevState.clayRobots,
    obsidian: prevState.obsidian + prevState.obsidianRobots,
    geodes: prevState.geodes + prevState.geodeRobots,
  };
  if (action.kind === "noop") {
    return nextState;
  }
  if (action.robot === "clay") {
    nextState.clayRobots += 1;
  } else if (action.robot === "geode") {
    nextState.geodeRobots += 1;
  } else if (action.robot === "obsidian") {
    nextState.obsidianRobots += 1;
  } else if (action.robot === "ore") {
    nextState.oreRobots += 1;
  }
  return consume(nextState, action.cost);
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
  gameState: GameState,
  minutes: Minute[],
  currentTime: number,
  bestResults: BestResults
): TerminalState | undefined => {
  if (currentTime > 24) {
    return { minutes, finalState: gameState };
  }

  const actions: Action[] = [];
  if (canAfford(blueprint.geodeRobotCost, gameState)) {
    actions.push({
      kind: "build",
      robot: "geode",
      cost: blueprint.geodeRobotCost,
    });
  }
  if (canAfford(blueprint.obsidianRobotCost, gameState)) {
    actions.push({
      kind: "build",
      robot: "obsidian",
      cost: blueprint.obsidianRobotCost,
    });
  }
  if (canAfford(blueprint.clayRobotCost, gameState)) {
    actions.push({
      kind: "build",
      robot: "clay",
      cost: blueprint.clayRobotCost,
    });
  }
  if (canAfford(blueprint.oreRobotCost, gameState)) {
    actions.push({
      kind: "build",
      robot: "ore",
      cost: blueprint.oreRobotCost,
    });
  }
  actions.push({ kind: "noop" });

  const possibleTerminals: (TerminalState | undefined)[] = [];
  actions.forEach((action) => {
    if (currentTime < 5) {
      console.log(currentTime);
    }
    const nextState = updateState(gameState, action);
    if (nextState.clay < 0 || nextState.ore < 0 || nextState.obsidian < 0) {
      console.log("Bad state detected");
      console.dir(nextState);
    }
    const currentBestForT = bestResults[currentTime];
    if (currentBestForT && definitelyBetter(currentBestForT, nextState)) {
      console.log("bailing at " + currentTime);
      return;
    }
    if (definitelyBetter(nextState, currentBestForT)) {
      console.log("found better at " + currentTime);
      bestResults[currentTime] = nextState;
    }
    const minute = {
      t: currentTime,
      finalState: nextState,
      action,
    };
    const terminal = recurse(
      blueprint,
      nextState,
      minutes.concat(minute),
      currentTime + 1,
      bestResults
    );
    possibleTerminals.push(terminal);
  });
  return possibleTerminals
    .filter(notEmpty)
    .sort((a, b) => b.finalState.geodes - a.finalState.geodes)[0];
};
const processBlueprints = (blueprints: Blueprint[]): number => {
  const startingState: GameState = {
    ore: 1,
    oreRobots: 1,
    clay: 0,
    clayRobots: 0,
    obsidian: 0,
    obsidianRobots: 0,
    geodes: 0,
    geodeRobots: 0,
  };
  return blueprints
    .map((blueprint) => {
      const maxGeodesOpened = recurse(blueprint, startingState, [], 1, {});
      console.log("Blueprint " + blueprint.name);
      if (maxGeodesOpened) {
        maxGeodesOpened.minutes.forEach(renderMinute);
        return maxGeodesOpened.finalState.geodes * blueprint.name;
      } else {
        console.log("No solution found");
        return 0;
      }
    })
    .reduce(sumValues, 0);
};
export { parseLines, processBlueprints, Minute };
