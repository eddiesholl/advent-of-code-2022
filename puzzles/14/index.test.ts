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
      expect(findLowestRock({ "0-5": zero5, "0-7": one7 })).toEqual(one7);
    });
  });
  describe("fillWithSand", () => {
    it("handles the example", () => {
      const grid = expect(
        fillWithSand(
          createGrid(parseLines(readLines(__dirname, "example.txt")))
        )
      ).toEqual(24);
    });
  });
  describe("createGrid", () => {
    it("handles empty lines", () => {
      expect(createGrid([])).toEqual({});
    });
    it("handles the example", () => {
      const grid = createGrid(parseLines(readLines(__dirname, "example.txt")));
      expect(Object.keys(grid)).toEqual([
        "498-4",
        "498-5",
        "498-6",
        "497-6",
        "503-4",
        "502-4",
        "502-5",
        "502-6",
        "502-7",
        "502-8",
        "502-9",
        "501-9",
        "500-9",
        "499-9",
        "498-9",
        "497-9",
        "496-9",
        "495-9",
      ]);
    });
  });
});
