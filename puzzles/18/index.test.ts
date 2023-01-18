import { readLines } from "../common/input";
import { countExternalFaces, countFaces, parseLines } from "./index";

describe("18", () => {
  describe("countFaces", () => {
    it("handles 2 cubes", () => {
      expect(
        countFaces([
          { x: 1, y: 1, z: 1 },
          { x: 2, y: 1, z: 1 },
        ])
      ).toEqual(10);
    });
    it("handles the example", () => {
      expect(
        countFaces(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual(64);
    });
  });
  describe("countExternalFaces", () => {
    it("handles the example", () => {
      expect(
        countExternalFaces(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual(58);
    });
  });
});
