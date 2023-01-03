import { readLines } from "../common/input";
import { processMoves } from "./index";
import { parseLines } from "./parse";

describe("24", () => {
  describe("processMoves", () => {
    it("handles the example", () => {
      const { grid, blizzards } = parseLines(
        readLines(__dirname, "example.txt")
      );
      const result = processMoves(grid, blizzards);
      expect(result.length).toEqual(18);
    });
  });
  describe("parseLines", () => {
    it("handles example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual({
        grid: { start: { x: 1, y: 0 }, end: { x: 6, y: 5 } },
        blizzards: [
          { location: { x: 1, y: 1 }, direction: ">" },
          { location: { x: 2, y: 1 }, direction: ">" },
          { location: { x: 4, y: 1 }, direction: "<" },
          { location: { x: 5, y: 1 }, direction: "^" },
          { location: { x: 6, y: 1 }, direction: "<" },
          { location: { x: 2, y: 2 }, direction: "<" },
          { location: { x: 5, y: 2 }, direction: "<" },
          { location: { x: 6, y: 2 }, direction: "<" },
          { location: { x: 1, y: 3 }, direction: ">" },
          { location: { x: 2, y: 3 }, direction: "v" },
          { location: { x: 4, y: 3 }, direction: ">" },
          { location: { x: 5, y: 3 }, direction: "<" },
          { location: { x: 6, y: 3 }, direction: ">" },
          { location: { x: 1, y: 4 }, direction: "<" },
          { location: { x: 2, y: 4 }, direction: "^" },
          { location: { x: 3, y: 4 }, direction: "v" },
          { location: { x: 4, y: 4 }, direction: "^" },
          { location: { x: 5, y: 4 }, direction: "^" },
          { location: { x: 6, y: 4 }, direction: ">" },
        ],
      });
    });
  });
});
