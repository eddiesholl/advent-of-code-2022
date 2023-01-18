import { readLines } from "../common/input";
import {
  GameState,
  parseLines,
  processBlueprints,
  snapshotToMinutes,
  updateState,
  WaitAction,
} from "./index";

describe("19", () => {
  const startingState: GameState = {
    t: 1,
    ore: 0,
    oreRobots: 1,
    clay: 0,
    clayRobots: 0,
    obsidian: 0,
    obsidianRobots: 0,
    geodes: 0,
    geodeRobots: 0,
  };
  describe("snapshotToMinutes", () => {
    it("handles example 1 output", () => {
      const input = {
        t: 1,
        after: {
          t: 4,
          ore: 1,
          oreRobots: 1,
          clay: 0,
          clayRobots: 1,
          obsidian: 0,
          obsidianRobots: 0,
          geodes: 0,
          geodeRobots: 0,
        },
        before: startingState,
        action: {
          kind: "wait",
          robot: "clay",
          cost: { ore: 2, clay: 0, obsidian: 0 },
          minutes: 2,
          readyAt: 3,
        } as WaitAction,
      };
      const result = snapshotToMinutes(input);
      expect(result).toEqual([
        {
          action: {
            kind: "noop",
          },
          finalState: {
            clay: 0,
            clayRobots: 0,
            geodeRobots: 0,
            geodes: 0,
            obsidian: 0,
            obsidianRobots: 0,
            ore: 1,
            oreRobots: 1,
            t: 1,
          },
          t: 1,
        },
        {
          action: {
            kind: "noop",
          },
          finalState: {
            clay: 0,
            clayRobots: 0,
            geodeRobots: 0,
            geodes: 0,
            obsidian: 0,
            obsidianRobots: 0,
            ore: 2,
            oreRobots: 1,
            t: 1,
          },
          t: 2,
        },
        {
          action: {
            cost: {
              clay: 0,
              obsidian: 0,
              ore: 2,
            },
            kind: "build",
            robot: "clay",
          },
          finalState: {
            clay: 0,
            clayRobots: 1,
            geodeRobots: 0,
            geodes: 0,
            obsidian: 0,
            obsidianRobots: 0,
            ore: 1,
            oreRobots: 1,
            t: 4,
          },
          t: 3,
        },
      ]);
    });
    it("it will convert a wait for 2", () => {
      expect(
        snapshotToMinutes({
          t: 1,
          before: startingState,
          after: {
            ...startingState,
            t: 1,
            clayRobots: 1,
            ore: 0,
          },
          action: {
            kind: "wait",
            robot: "clay",
            cost: { ore: 2, clay: 0, obsidian: 0 },
            minutes: 1,
            readyAt: 2,
          },
        })
      ).toEqual([
        {
          t: 1,
          action: { kind: "noop" },
          finalState: { ...startingState, ore: 1 },
        },
        {
          t: 2,
          action: {
            kind: "build",
            robot: "clay",
            cost: { ore: 2, clay: 0, obsidian: 0 },
          },
          finalState: { ...startingState, ore: 0, clayRobots: 1 },
        },
      ]);
    });
  });
  describe("updateState", () => {
    const blueprint = {
      oreRobotCost: { ore: 1, clay: 0, obsidian: 0 },
      clayRobotCost: { ore: 2, clay: 0, obsidian: 0 },
      obsidianRobotCost: { ore: 3, clay: 2, obsidian: 0 },
      geodeRobotCost: { ore: 1, clay: 2, obsidian: 3 },
    };

    it("handles a build action", () => {
      expect(
        updateState(
          {
            t: 3,
            ore: 3,
            oreRobots: 1,
            clay: 0,
            clayRobots: 0,
            obsidian: 0,
            obsidianRobots: 0,
            geodes: 0,
            geodeRobots: 0,
          },
          {
            kind: "build",
            cost: blueprint.clayRobotCost,
            robot: "clay",
          }
        )
      ).toEqual({
        t: 4,
        ore: 2,
        clay: 0,
        geodes: 0,
        obsidian: 0,
        oreRobots: 1,
        clayRobots: 1,
        obsidianRobots: 0,
        geodeRobots: 0,
      });
    });
    it("handles a wait action at the start", () => {
      expect(
        updateState(startingState, {
          kind: "wait",
          cost: blueprint.clayRobotCost,
          robot: "clay",
          minutes: 2,
          readyAt: 3,
        })
      ).toEqual({
        t: 4,
        ore: 1,
        clay: 0,
        geodes: 0,
        obsidian: 0,
        oreRobots: 1,
        clayRobots: 1,
        obsidianRobots: 0,
        geodeRobots: 0,
      });
    });
  });
  describe("processBlueprints", () => {
    it.skip("handles the example", () => {
      expect(
        processBlueprints(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual(33);
    });
  });
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
