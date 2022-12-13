import { readLines } from "../common/input";
import { findPath, getCandidateSteps, parseInput } from "./index";

describe("12", () => {
  describe("getCandidateSteps", () => {
    it("prefers jumping to the finish", () => {
      const game = parseInput(readLines(__dirname, "example.txt"));
      const candidateSteps = getCandidateSteps({ x: 4, y: 2 }, game.map, []);
      expect(candidateSteps.length).toEqual(4);
      expect(candidateSteps[0]).toEqual({ x: 5, y: 2 });
    });
    it("finds full options", () => {
      const game = parseInput(readLines(__dirname, "example.txt"));
      const candidateSteps = getCandidateSteps({ x: 1, y: 1 }, game.map, []);
      expect(candidateSteps).toEqual([
        { x: 2, y: 1 }, // c
        { x: 1, y: 2 }, // c
        { x: 1, y: 0 }, // a
        { x: 0, y: 1 }, // a
      ]);
    });
    it("does not suggest visited locations", () => {
      const game = parseInput(readLines(__dirname, "example.txt"));
      const candidateSteps = getCandidateSteps({ x: 1, y: 1 }, game.map, [
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 1 },
      ]);
      expect(candidateSteps).toEqual([]);
    });
  });
  describe("parseInput", () => {
    it("handles empty lines", () => {
      expect(parseInput(readLines(__dirname, "example.txt"))).toEqual({
        start: { x: 0, y: 0 },
        end: { x: 5, y: 2 },
        map: [
          ["S", "a", "b", "q", "p", "o", "n", "m"],
          ["a", "b", "c", "r", "y", "x", "x", "l"],
          ["a", "c", "c", "s", "z", "E", "x", "k"],
          ["a", "c", "c", "t", "u", "v", "w", "j"],
          ["a", "b", "d", "e", "f", "g", "h", "i"],
        ],
      });
    });
  });
  describe("findPath", () => {
    it("handles the example", () => {
      const locations = findPath(
        parseInput(readLines(__dirname, "example.txt"))
      );
      expect(locations.length).toEqual(31);
      expect(locations[0]).toEqual({ x: 0, y: 0 });
      expect(locations.slice(-1)).toEqual([{ x: 4, y: 2 }]);
    });
  });
});
