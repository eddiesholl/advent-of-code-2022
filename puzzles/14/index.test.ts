import { readLines } from "../common/input";
import {
  createGrid,
  fillWithSand,
  findLowestRock,
  Material,
  parseLines,
} from "./index";

describe("14", () => {
  describe("findLowestRock", () => {
    it("sorts correctly", () => {
      const zero5 = { x: 0, y: 5, material: "rock" as Material };
      const one7 = { x: 1, y: 7, material: "rock" as Material };
      expect(findLowestRock({ 5: { 0: zero5 }, 7: { 0: one7 } })).toEqual(one7);
    });
  });
  describe("fillWithSand", () => {
    it("handles the example", () => {
      expect(
        fillWithSand(
          createGrid(parseLines(readLines(__dirname, "example.txt")))
        ).length
      ).toEqual(24);
    });
  });
  describe("createGrid", () => {
    it("handles empty lines", () => {
      expect(createGrid([])).toEqual({});
    });
    it("handles the example", () => {
      const grid = createGrid(parseLines(readLines(__dirname, "example.txt")));
      expect(grid).toEqual({
        4: {
          498: { x: 498, y: 4, material: "rock" },
          502: { x: 502, y: 4, material: "rock" },
          503: { x: 503, y: 4, material: "rock" },
        },
        5: {
          498: { x: 498, y: 5, material: "rock" },
          502: { x: 502, y: 5, material: "rock" },
        },
        6: {
          498: { x: 498, y: 6, material: "rock" },
          497: { x: 497, y: 6, material: "rock" },
          502: { x: 502, y: 6, material: "rock" },
        },
        7: {
          502: { x: 502, y: 7, material: "rock" },
        },
        8: {
          502: { x: 502, y: 8, material: "rock" },
        },
        9: {
          495: { x: 495, y: 9, material: "rock" },
          496: { x: 496, y: 9, material: "rock" },
          497: { x: 497, y: 9, material: "rock" },
          498: { x: 498, y: 9, material: "rock" },
          499: { x: 499, y: 9, material: "rock" },
          500: { x: 500, y: 9, material: "rock" },
          501: { x: 501, y: 9, material: "rock" },
          502: { x: 502, y: 9, material: "rock" },
        },
      });
    });
  });
});
