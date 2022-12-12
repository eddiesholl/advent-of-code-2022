import { readLines } from "../common/input";
import { parseInput } from "./index";

describe("12", () => {
  describe("parseInput", () => {
    it("handles emoty lines", () => {
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
});
