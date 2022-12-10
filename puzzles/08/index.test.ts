import { parseLines, findHiddenTrees } from "./index";

describe("08", () => {
  describe("findHiddenTrees", () => {
    describe("happy paths", () => {
      it("handles one tree", () => {
        expect(findHiddenTrees([[5]])).toEqual([]);
      });
      it("handles 2x2", () => {
        expect(
          findHiddenTrees([
            [5, 3],
            [1, 2],
          ])
        ).toEqual([]);
      });
      it("handles 3x3, none hidden", () => {
        expect(
          findHiddenTrees([
            [5, 3, 5],
            [5, 9, 4],
            [1, 2, 6],
          ])
        ).toEqual([]);
      });
      it("handles 3x3, centre hidden", () => {
        expect(
          findHiddenTrees([
            [5, 3, 5],
            [5, 1, 4],
            [1, 2, 6],
          ])
        ).toEqual([{ x: 1, y: 1 }]);
      });
      it("handles the example", () => {
        expect(
          findHiddenTrees(
            parseLines(["30373", "25512", "65332", "33549", "35390"])
          )
        ).toEqual([
          { x: 3, y: 1 },
          { x: 2, y: 2 },
        ]);
      });
    });
  });
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(["30373", "25512", "65332", "33549", "35390"])).toEqual(
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ]
      );
    });
  });
});
