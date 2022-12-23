import { readLines } from "../common/input";
import { parseLines } from "./index";

describe("19", () => {
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        {
          name: 1,
          oreRobotCost: { ore: 4, clay: 0, obsidian: 0 },
          clayRobotCost: { ore: 2, clay: 0, obsidian: 0 },
          obsidianRobotCost: {
            ore: 3,
            clay: 14,
            obsidian: 0,
          },
          geodeRobotCost: {
            ore: 2,
            clay: 0,
            obsidian: 7,
          },
        },
        {
          name: 2,
          oreRobotCost: { ore: 2, clay: 0, obsidian: 0 },
          clayRobotCost: { ore: 3, clay: 0, obsidian: 0 },
          obsidianRobotCost: {
            ore: 3,
            clay: 8,
            obsidian: 0,
          },
          geodeRobotCost: {
            ore: 3,
            clay: 0,
            obsidian: 12,
          },
        },
      ]);
    });
  });
});
