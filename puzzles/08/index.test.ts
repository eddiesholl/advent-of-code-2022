import { parseLines, findHiddenTrees, TreeGrid, scenicScore } from "./index";

describe("08", () => {
  let exampleParsed: TreeGrid;
  beforeEach(() => {
    exampleParsed = parseLines(["30373", "25512", "65332", "33549", "35390"]);
  });
  describe("findHiddenTrees", () => {
    describe("happy paths", () => {
      it("handles one tree", () => {
        expect(findHiddenTrees(parseLines(["5"]))).toEqual([]);
      });
      it("handles 2x2", () => {
        expect(findHiddenTrees(parseLines(["53", "12"]))).toEqual([]);
      });
      it("handles 3x3, none hidden", () => {
        expect(findHiddenTrees(parseLines(["535", "594", "126"]))).toEqual([]);
      });
      it("handles 3x3, centre hidden", () => {
        expect(findHiddenTrees(parseLines(["535", "514", "126"]))).toEqual([
          { x: 1, y: 1, height: 1 },
        ]);
      });
      it("handles the example", () => {
        expect(findHiddenTrees(exampleParsed)).toEqual([
          { x: 3, y: 1, height: 1 },
          { x: 2, y: 2, height: 3 },
          { x: 1, y: 3, height: 3 },
          { x: 3, y: 3, height: 4 },
        ]);
      });
    });
  });
  describe("Part 2", () => {
    describe("scenicScore", () => {
      it("matches example 1", () => {
        expect(scenicScore({ x: 2, y: 1, height: 5 }, exampleParsed)).toEqual(
          4
        );
      });
      it("matches example 2", () => {
        expect(scenicScore({ x: 2, y: 3, height: 5 }, exampleParsed)).toEqual(
          8
        );
      });
    });
  });
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(exampleParsed.length).toEqual(5);
      expect(exampleParsed[0].length).toEqual(5);
    });
  });
});
