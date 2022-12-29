import { readLines } from "../common/input";
import { applyWalk, calculateScore, Grid, processMoves } from "./index";
import { parseLines } from "./parse";

describe("22", () => {
  let grid: Grid;
  beforeEach(() => {
    grid = [
      //-----------------------y
      [" ", ".", ".", "#"], // 0
      [" ", ".", ".", "#"], // 1
      [".", ".", ".", "#"], // 2
      [".", ".", ".", "."], // 3
      //0    1    2    3
    ];
  });
  describe("applyWalk", () => {
    describe("simple open moves", () => {
      it("can move right", () => {
        expect(applyWalk({ x: 1, y: 0, bearing: "right" }, grid, 1)).toEqual({
          x: 2,
          y: 0,
          bearing: "right",
        });
      });
      it("can move left", () => {
        expect(applyWalk({ x: 2, y: 0, bearing: "left" }, grid, 1)).toEqual({
          x: 1,
          y: 0,
          bearing: "left",
        });
      });
      it("can move up", () => {
        expect(applyWalk({ x: 1, y: 2, bearing: "up" }, grid, 2)).toEqual({
          x: 1,
          y: 0,
          bearing: "up",
        });
      });
      it("can move down", () => {
        expect(applyWalk({ x: 2, y: 0, bearing: "down" }, grid, 2)).toEqual({
          x: 2,
          y: 2,
          bearing: "down",
        });
      });
    });
    describe("blocked by a wall", () => {
      it("stops at a simple wall", () => {
        expect(applyWalk({ x: 1, y: 0, bearing: "right" }, grid, 5)).toEqual({
          x: 2,
          y: 0,
          bearing: "right",
        });
      });
      it("stops if the wall is past a wrap", () => {});
    });
    describe("line wrappings", () => {
      it("wraps bottom to top", () => {
        expect(applyWalk({ x: 2, y: 3, bearing: "down" }, grid, 2)).toEqual({
          x: 2,
          y: 1,
          bearing: "down",
        });
      });
      it("wraps top to bottom", () => {
        expect(applyWalk({ x: 1, y: 0, bearing: "up" }, grid, 1)).toEqual({
          x: 1,
          y: 3,
          bearing: "up",
        });
      });
      it("wraps left to right", () => {
        expect(applyWalk({ x: 0, y: 3, bearing: "left" }, grid, 1)).toEqual({
          x: 3,
          y: 3,
          bearing: "left",
        });
      });
      it("wraps through closed cells", () => {
        expect(applyWalk({ x: 0, y: 2, bearing: "up" }, grid, 1)).toEqual({
          x: 0,
          y: 3,
          bearing: "up",
        });
      });
    });
  });
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
