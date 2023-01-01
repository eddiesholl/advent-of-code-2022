import { readLines } from "../common/input";
import {
  calculateScore,
  EAST,
  Elf,
  findNeighbours,
  makeTurn,
  NORTH,
  processMoves,
  SOUTH,
  WEST,
} from "./index";
import { parseLines } from "./parse";

const byXThenY = (a: Elf, b: Elf) => (a.x === b.x ? a.y - b.y : a.x - b.x);
describe("23", () => {
  describe("findNeighbours", () => {
    it("finds all neighbours missing", () => {
      expect(findNeighbours([{ x: 0, y: 0 }], 0)).toEqual([]);
    });
    it("finds all neighbours full", () => {
      expect(
        findNeighbours(
          [
            { x: 1, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 2 },
            { x: 0, y: 1 },
          ],
          0
        )
      ).toEqual(["sw", "s", "se", "e", "ne", "n", "nw", "w"]);
    });
  });
  describe("makeTurn", () => {
    let square4: Elf[];
    beforeEach(() => {
      square4 = [
        { x: 1, y: 1 }, // lower left
        { x: 2, y: 1 }, // lower right
        { x: 2, y: 2 }, // upper right
        { x: 1, y: 2 }, // upper left
      ];
    });
    it("handles square4 NORTH", () => {
      // N->S->W->E
      expect(makeTurn(square4, NORTH)).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
      ]);
    });
    it("handles square4 SOUTH", () => {
      // S->W->E->N
      expect(makeTurn(square4, SOUTH)).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 2 },
        { x: 0, y: 2 },
      ]);
    });
    it("handles square4 WEST", () => {
      // W->E->N->S
      expect(makeTurn(square4, WEST)).toEqual([
        { x: 0, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 0, y: 2 },
      ]);
    });
    it("handles square4 EAST", () => {
      // E->N->S->W
      expect(makeTurn(square4, EAST)).toEqual([
        { x: 1, y: 0 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 1, y: 3 },
      ]);
    });
    it("handles the 1st example", () => {
      const expected = parseLines(readLines(__dirname, "example-1.txt"));
      console.log("expected");
      console.log(expected);
      expect(
        makeTurn(parseLines(readLines(__dirname, "example.txt")), NORTH).sort(
          byXThenY
        )
      ).toEqual(expected.sort(byXThenY));
    });
  });
  describe("processMoves", () => {
    it("handles the example", () => {
      expect(
        processMoves(parseLines(readLines(__dirname, "example.txt"))).sort(
          byXThenY
        )
      ).toEqual(
        parseLines(readLines(__dirname, "example-10.txt")).sort(byXThenY)
      );
    });
  });
  describe("calculateScore", () => {
    it("handles the example", () => {
      expect(
        calculateScore(parseLines(readLines(__dirname, "example-10.txt")))
      ).toEqual(110);
    });
  });
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        { x: 4, y: 4 },
        { x: 7, y: 4 },
        { x: 3, y: 5 },
        { x: 4, y: 5 },
        { x: 6, y: 5 },
        { x: 8, y: 5 },
        { x: 9, y: 5 },
        { x: 3, y: 6 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 7, y: 6 },
        { x: 4, y: 7 },
        { x: 8, y: 7 },
        { x: 9, y: 7 },
        { x: 3, y: 8 },
        { x: 7, y: 8 },
        { x: 9, y: 8 },
        { x: 5, y: 9 },
        { x: 6, y: 9 },
        { x: 7, y: 9 },
        { x: 9, y: 9 },
        { x: 7, y: 10 },
      ]);
    });
  });
});
