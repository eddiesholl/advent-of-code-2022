import { readLines } from "../common/input";
import {
  Blizzard,
  findPossibleMoves,
  Grid,
  processMoves,
  updateBlizzards,
} from "./index";
import { parseLines } from "./parse";

describe("24", () => {
  describe("findPossibleMoves", () => {
    let grid: Grid;
    let blizzards: Blizzard[];
    beforeEach(() => {
      const example = parseLines(readLines(__dirname, "example.txt"));
      grid = example.grid;
      blizzards = example.blizzards;
    });
    it("will wait when nothing available", () => {
      expect(findPossibleMoves(grid, blizzards, { x: 1, y: 2 })).toEqual([
        { move: "wait", destination: { x: 1, y: 2 } },
      ]);
    });
    it("can find a single move", () => {
      expect(findPossibleMoves(grid, blizzards, { x: 3, y: 1 })).toEqual([
        { move: "wait", destination: { x: 3, y: 1 } },
        { move: "v", destination: { x: 3, y: 2 } },
      ]);
    });
    it("can find 3 moves", () => {
      expect(findPossibleMoves(grid, blizzards, { x: 3, y: 2 })).toEqual([
        { move: "wait", destination: { x: 3, y: 2 } },
        { move: ">", destination: { x: 4, y: 2 } },
        { move: "^", destination: { x: 3, y: 1 } },
        { move: "v", destination: { x: 3, y: 3 } },
      ]);
    });
  });
  describe("updateBlizzards", () => {
    it("does simple moves correctly", () => {
      expect(
        updateBlizzards(
          [
            { location: { x: 2, y: 5 }, direction: "<" },
            { location: { x: 4, y: 4 }, direction: ">" },
            { location: { x: 2, y: 2 }, direction: "^" },
            { location: { x: 3, y: 6 }, direction: "v" },
          ],
          {
            start: { x: 1, y: 0 },
            end: { x: 5, y: 8 },
            width: 7,
            height: 9,
          }
        )
      ).toEqual([
        { location: { x: 1, y: 5 }, direction: "<" },
        { location: { x: 5, y: 4 }, direction: ">" },
        { location: { x: 2, y: 1 }, direction: "^" },
        { location: { x: 3, y: 7 }, direction: "v" },
      ]);
    });
    it("wraps correctly", () => {
      expect(
        updateBlizzards(
          [
            { location: { x: 1, y: 5 }, direction: "<" },
            { location: { x: 5, y: 4 }, direction: ">" },
            { location: { x: 2, y: 1 }, direction: "^" },
            { location: { x: 3, y: 7 }, direction: "v" },
          ],
          {
            start: { x: 1, y: 0 },
            end: { x: 5, y: 8 },
            width: 7,
            height: 9,
          }
        )
      ).toEqual([
        { location: { x: 5, y: 5 }, direction: "<" },
        { location: { x: 1, y: 4 }, direction: ">" },
        { location: { x: 2, y: 7 }, direction: "^" },
        { location: { x: 3, y: 1 }, direction: "v" },
      ]);
    });
  });
  describe("processMoves", () => {
    it.skip("handles the example", () => {
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
        grid: {
          start: { x: 1, y: 0 },
          end: { x: 6, y: 5 },
          width: 8,
          height: 6,
        },
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
