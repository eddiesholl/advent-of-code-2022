import { readLines } from "../common/input";
import { calculateScore, processMoves } from "./index";
import { parseLines } from "./parse";

describe("22", () => {
  describe("processMoves", () => {
    it("handles the example", () => {
      expect(
        processMoves(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual({ x: 7, y: 5, bearing: "right" });
    });
  });

  describe("calculateScore", () => {
    it("handles the example", () => {
      expect(calculateScore({ x: 7, y: 5, bearing: "right" })).toEqual(6032);
    });
  });

  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual({
        grid: [
          [" ", " ", " ", " ", " ", " ", " ", " ", ".", ".", ".", "#"],
          [" ", " ", " ", " ", " ", " ", " ", " ", ".", "#", ".", "."],
          [" ", " ", " ", " ", " ", " ", " ", " ", "#", ".", ".", "."],
          [" ", " ", " ", " ", " ", " ", " ", " ", ".", ".", ".", "."],
          [".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", "#"],
          [".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
          [".", ".", "#", ".", ".", ".", ".", "#", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
          [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            ".",
            ".",
            ".",
            "#",
            ".",
            ".",
            ".",
            ".",
          ],
          [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            ".",
            ".",
            ".",
            ".",
            ".",
            "#",
            ".",
            ".",
          ],
          [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            ".",
            "#",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
          ],
          [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            "#",
            ".",
          ],
        ],
        moves: [10, "R", 5, "L", 5, "R", 10, "L", 4, "R", 5, "L", 5],
      });
    });
  });
});
