import {
  Move,
  parseStackLine,
  processMoves,
  selectFirstItems,
  StackStore,
} from "./index";

describe("05", () => {
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
  describe("processMoves", () => {
    describe("example", () => {
      let start: StackStore;
      let move1: Move;
      let move2: Move;
      let move3: Move;
      let move4: Move;
      beforeEach(() => {
        start = {
          1: { number: 1, items: ["N", "Z"] },
          2: { number: 2, items: ["D", "C", "M"] },
          3: { number: 3, items: ["P"] },
        };
        move1 = { n: 1, from: 2, to: 1 };
        move2 = { n: 3, from: 1, to: 3 };
        move3 = { n: 2, from: 2, to: 1 };
        move4 = { n: 1, from: 1, to: 2 };
      });

      it("handles the first move", () => {
        expect(processMoves(start, [move1])).toEqual({
          1: { number: 1, items: ["D", "N", "Z"] },
          2: { number: 2, items: ["C", "M"] },
          3: { number: 3, items: ["P"] },
        });
      });

      it("handles the second move", () => {
        expect(processMoves(start, [move1, move2])).toEqual({
          1: { number: 1, items: [] },
          2: { number: 2, items: ["C", "M"] },
          3: { number: 3, items: ["Z", "N", "D", "P"] },
        });
      });

      it("handles the third move", () => {
        expect(processMoves(start, [move1, move2, move3])).toEqual({
          1: { number: 1, items: ["M", "C"] },
          2: { number: 2, items: [] },
          3: { number: 3, items: ["Z", "N", "D", "P"] },
        });
      });

      it("handles the full example", () => {
        const moves = [move1, move2, move3, move4];
        expect(processMoves(start, moves)).toEqual({
          1: { number: 1, items: ["C"] },
          2: { number: 2, items: ["M"] },
          3: { number: 3, items: ["Z", "N", "D", "P"] },
        });
      });
    });
  });

  describe("selectFirstItems", () => {
    it("works", () => {
      expect(
        selectFirstItems({
          1: { number: 1, items: ["C"] },
          2: { number: 2, items: ["M"] },
          3: { number: 3, items: ["Z", "N", "D", "P"] },
        })
      ).toEqual(["C", "M", "Z"]);
    });
  });
});
