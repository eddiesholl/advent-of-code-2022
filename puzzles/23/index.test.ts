import { readLines } from "../common/input";
import { calculateScore, Elf, makeTurn, NORTH, processMoves } from "./index";
import { parseLines } from "./parse";

const byXThenY = (a: Elf, b: Elf) => (a.x === b.x ? a.y - b.y : a.x - b.x);
describe("23", () => {
  describe("makeTurn", () => {
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
