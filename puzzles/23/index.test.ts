import { readLines } from "../common/input";
import { parseLines } from "./parse";

describe("23", () => {
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        { name: 0, x: 4, y: 4 },
        { name: 1, x: 7, y: 4 },
        { name: 2, x: 3, y: 5 },
        { name: 3, x: 4, y: 5 },
        { name: 4, x: 6, y: 5 },
        { name: 5, x: 8, y: 5 },
        { name: 6, x: 9, y: 5 },
        { name: 7, x: 3, y: 6 },
        { name: 8, x: 5, y: 6 },
        { name: 9, x: 6, y: 6 },
        { name: 10, x: 7, y: 6 },
        { name: 11, x: 4, y: 7 },
        { name: 12, x: 8, y: 7 },
        { name: 13, x: 9, y: 7 },
        { name: 14, x: 3, y: 8 },
        { name: 15, x: 7, y: 8 },
        { name: 16, x: 9, y: 8 },
        { name: 17, x: 5, y: 9 },
        { name: 18, x: 6, y: 9 },
        { name: 19, x: 7, y: 9 },
        { name: 20, x: 9, y: 9 },
        { name: 21, x: 7, y: 10 },
      ]);
    });
  });
});
