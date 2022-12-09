import { a, parseStackLine } from "./index";

describe("05", () => {
  describe("a", () => {
    describe("happy paths", () => {
      it("handles emoty lines", () => {
        expect(a([])).toEqual(undefined);
      });
    });
  });
  describe("parseStackLine", () => {
    it("handles 0 length lines", () => {
      expect(parseStackLine({})("")).toEqual({});
    });
    it("handles empty lines", () => {
      expect(parseStackLine({})("     ")).toEqual({});
    });
    it("handles a simple line", () => {
      expect(parseStackLine({})("[J]")).toEqual({
        1: { number: 1, items: ["J"] },
      });
    });
    it("handles multiple stacks", () => {
      expect(parseStackLine({})("[J] [K] [L]")).toEqual({
        1: { number: 1, items: ["J"] },
        2: { number: 2, items: ["K"] },
        3: { number: 3, items: ["L"] },
      });
    });

    it("handles sparse lines", () => {
      expect(parseStackLine({})("    [K]     [L]")).toEqual({
        2: { number: 2, items: ["K"] },
        4: { number: 4, items: ["L"] },
      });
    });

    it("extends existing stacks", () => {
      const stackedSoFar = {
        1: { number: 1, items: ["K"] },
        3: { number: 3, items: ["L"] },
      };
      expect(parseStackLine(stackedSoFar)("    [X]     [Y]")).toEqual({
        ...stackedSoFar,
        2: { number: 2, items: ["X"] },
        4: { number: 4, items: ["Y"] },
      });
    });

    it("fully merges with existing stacks", () => {
      const stackedSoFar = {
        2: { number: 2, items: ["K"] },
        4: { number: 4, items: ["L"] },
      };
      expect(parseStackLine(stackedSoFar)("[A] [X]     [Y]")).toEqual({
        ...stackedSoFar,
        1: { number: 1, items: ["A"] },
        2: { number: 2, items: ["K", "X"] },
        4: { number: 4, items: ["L", "Y"] },
      });
    });
  });
});
