import { a, parseLine, rangeLineOverlaps } from "./index";

describe("04", () => {
  describe("rangeLineOverlaps", () => {
    it.each([
      ["2-4,6-8", false],
      ["2-3,4-5", false],
      ["5-7,7-9", true],
      ["2-8,3-7", true],
      ["6-6,4-6", true],
      ["2-6,4-8", true],
    ])("detects overlap in %s as '%s'", (line: string, expected: boolean) => {
      const parsed = parseLine(line);
      expect(parsed).toBeDefined();
      if (parsed) {
        expect(rangeLineOverlaps(parsed)).toEqual(expected);
      }
    });
  });
  describe("a", () => {
    describe("happy paths", () => {
      it("handles empty lines", () => {
        expect(a([])).toEqual([]);
      });
      it("handles the example", () => {
        expect(
          a(["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"])
            .length
        ).toEqual(2);
      });
    });
  });
});
