import {
  Move,
  parseStackLine,
  processMoves,
  processMovesPart2,
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
        1: ["J"],
      });
    });
    it("handles multiple stacks", () => {
      expect(parseStackLine({})("[J] [K] [L]")).toEqual({
        1: ["J"],
        2: ["K"],
        3: ["L"],
      });
    });

    it("handles sparse lines", () => {
      expect(parseStackLine({})("    [K]     [L]")).toEqual({
        2: ["K"],
        4: ["L"],
      });
    });

    it("extends existing stacks", () => {
      const stackedSoFar = {
        1: ["K"],
        3: ["L"],
      };
      expect(parseStackLine(stackedSoFar)("    [X]     [Y]")).toEqual({
        ...stackedSoFar,
        2: ["X"],
        4: ["Y"],
      });
    });

    it("fully merges with existing stacks", () => {
      const stackedSoFar = {
        2: ["K"],
        4: ["L"],
      };
      expect(parseStackLine(stackedSoFar)("[A] [X]     [Y]")).toEqual({
        ...stackedSoFar,
        1: ["A"],
        2: ["K", "X"],
        4: ["L", "Y"],
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
          1: ["N", "Z"],
          2: ["D", "C", "M"],
          3: ["P"],
        };
        move1 = { n: 1, from: 2, to: 1 };
        move2 = { n: 3, from: 1, to: 3 };
        move3 = { n: 2, from: 2, to: 1 };
        move4 = { n: 1, from: 1, to: 2 };
      });

      it("handles the first move", () => {
        expect(processMoves(start, [move1])).toEqual({
          1: ["D", "N", "Z"],
          2: ["C", "M"],
          3: ["P"],
        });
      });

      it("handles the second move", () => {
        expect(processMoves(start, [move1, move2])).toEqual({
          1: [],
          2: ["C", "M"],
          3: ["Z", "N", "D", "P"],
        });
      });

      it("handles the third move", () => {
        expect(processMoves(start, [move1, move2, move3])).toEqual({
          1: ["M", "C"],
          2: [],
          3: ["Z", "N", "D", "P"],
        });
      });

      it("handles the full example", () => {
        const moves = [move1, move2, move3, move4];
        expect(processMoves(start, moves)).toEqual({
          1: ["C"],
          2: ["M"],
          3: ["Z", "N", "D", "P"],
        });
      });
    });
  });

  describe("processMovesPart2", () => {
    describe("example", () => {
      let start: StackStore;
      let move1: Move;
      let move2: Move;
      let move3: Move;
      let move4: Move;
      beforeEach(() => {
        start = {
          1: ["N", "Z"],
          2: ["D", "C", "M"],
          3: ["P"],
        };
        move1 = { n: 1, from: 2, to: 1 };
        move2 = { n: 3, from: 1, to: 3 };
        move3 = { n: 2, from: 2, to: 1 };
        move4 = { n: 1, from: 1, to: 2 };
      });

      it("handles the first move", () => {
        expect(processMovesPart2(start, [move1])).toEqual({
          1: ["D", "N", "Z"],
          2: ["C", "M"],
          3: ["P"],
        });
      });

      it("handles the second move", () => {
        expect(processMovesPart2(start, [move1, move2])).toEqual({
          1: [],
          2: ["C", "M"],
          3: ["D", "N", "Z", "P"],
        });
      });

      it("handles the third move", () => {
        expect(processMovesPart2(start, [move1, move2, move3])).toEqual({
          1: ["C", "M"],
          2: [],
          3: ["D", "N", "Z", "P"],
        });
      });

      it("handles the full example", () => {
        const moves = [move1, move2, move3, move4];
        expect(processMovesPart2(start, moves)).toEqual({
          1: ["M"],
          2: ["C"],
          3: ["D", "N", "Z", "P"],
        });
      });
    });
  });
  describe("selectFirstItems", () => {
    it("works", () => {
      expect(
        selectFirstItems({
          1: ["C"],
          2: ["M"],
          3: ["Z", "N", "D", "P"],
        })
      ).toEqual(["C", "M", "Z"]);
    });
  });
});
