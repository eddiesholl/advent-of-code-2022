import { Minute } from "./index";

const logRobotLine = (r: number, n: number, name: string) =>
  console.log(
    `${r} ${name}-collecting robot${
      r > 0 ? "s" : ""
    } collects ${r} ore; you now have ${n} ${name}.`
  );
/*
Spend 3 ore and 14 clay to start building an obsidian-collecting robot.
1 ore-collecting robot collects 1 ore; you now have 1 ore.
4 clay-collecting robots collect 4 clay; you now have 5 clay.
1 obsidian-collecting robot collects 1 obsidian; you now have 4 obsidian.
The new obsidian-collecting robot is ready; you now have 2 of them.
*/
const renderMinute = ({ action, finalState, t }: Minute) => {
  console.log(`== Minute ${t} ==`);
  if (action.kind === "build") {
    console.log(
      `Spend ${action.cost.ore} ore and ${action.cost.clay} clay and ${action.cost.obsidian} obsidian to start building an ${action.robot}-collecting robot`
    );
  }
  logRobotLine(finalState.oreRobots, finalState.ore, "ore");
  if (finalState.clayRobots > 0) {
    logRobotLine(finalState.clayRobots, finalState.clay, "clay");
  }
  if (finalState.obsidianRobots > 0) {
    logRobotLine(finalState.obsidianRobots, finalState.obsidian, "obsidian");
  }
  if (finalState.geodeRobots > 0) {
    logRobotLine(finalState.geodeRobots, finalState.geodes, "geodes");
  }
  if (action.kind === "build") {
    const bumpedRobot =
      action.robot === "clay"
        ? finalState.clayRobots
        : action.robot === "geode"
        ? finalState.geodeRobots
        : action.robot === "obsidian"
        ? finalState.obsidianRobots
        : finalState.oreRobots;
    console.log(
      `The new ${action.robot}-collecting robot is ready; you now have ${
        bumpedRobot + 1
      } of them`
    );
  }
  console.log("");
};

export { renderMinute };
