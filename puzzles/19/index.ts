import { notEmpty } from "../common/array";

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
const b = () => void 0;
export { parseLines, b };
