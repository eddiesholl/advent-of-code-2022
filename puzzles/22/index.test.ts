import { readLines } from "../common/input";
import {
  applyWalk,
  Bearing,
  calculateScore,
  getCandidateLocCube,
  Grid,
  processMoves,
} from "./index";
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

  describe("part 2", () => {
    describe("getCandidateLocCube", () => {
      it.each([
        [50, 8, "left", 0, 108, "right"], // E -> B
        [54, 0, "up", 0, 154, "right"], // E -> A
        [120, 0, "up", 20, 199, "up"], // F -> A
        [149, 5, "right", 99, 144, "left"], // F -> C
        [110, 49, "down", 99, 60, "left"], // F -> D
        [99, 99, "right", 149, 49, "up"], // D -> F
        [99, 124, "right", 149, 26, "left"], // C -> F
        [55, 149, "down", 49, 155, "left"], // C -> A
        [49, 194, "right", 94, 149, "up"], // A -> C
        [10, 199, "down", 110, 0, "down"], // A -> F
        [0, 162, "left", 62, 0, "down"], // A -> E
        [0, 120, "left", 50, 29, "right"], // B -> E
        [0, 100, "up", 50, 50, "right"], // B -> D
        [50, 99, "left", 49, 100, "down"], // D -> B
      ])(
        "translates around the cube from (%d,%d) %s to (%d,%d) %s",
        (
          xStart: number,
          yStart: number,
          bearingStart: string,
          xEnd: number,
          yEnd: number,
          bearingEnd: string
        ) => {
          expect(
            getCandidateLocCube({
              bearing: bearingStart as Bearing,
              x: xStart,
              y: yStart,
            })
          ).toEqual({ bearing: bearingEnd, x: xEnd, y: yEnd });
        }
      );
    });
  });
});
