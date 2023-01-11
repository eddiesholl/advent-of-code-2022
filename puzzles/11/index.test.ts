import { readLines } from "../common/input";
import {
  busiestMonkeys,
  createGameState,
  GameState,
  Monkey,
  parseInput,
  processRound,
  processRounds,
} from "./index";

describe("11", () => {
  describe("busiestMonkeys", () => {
    it("handles empty monkeys", () => {
      expect(busiestMonkeys([])).toEqual([]);
    });
    it("sorts correctly", () => {
      expect(
        busiestMonkeys([
          {
            name: 0,
            items: [79, 98],
            operand: "*",
            operationValue: 19,
            test: 23,
            ifTrue: 2,
            ifFalse: 3,
            inspections: 10,
          },
          {
            name: 1,
            items: [54, 65, 75, 74],
            operand: "+",
            operationValue: 6,
            test: 19,
            ifTrue: 2,
            ifFalse: 0,
            inspections: 5,
          },
        ])
      ).toEqual([10, 5]);
    });
  });
  describe("processRound", () => {
    it("handles the example", () => {
      const monkeys = parseInput(readLines(__dirname, "example.txt"));
      const gs = createGameState(monkeys);
      const nextState = processRound(monkeys, gs);
      expect(nextState[0]).toEqual([20, 23, 27, 26]);
      expect(nextState[1]).toEqual([2080, 25, 167, 207, 401, 1046]);
      expect(nextState[2]).toEqual([]);
      expect(nextState[3]).toEqual([]);
    });
  });
  describe.skip("part 2", () => {
    let exampleMonkeyInput: Monkey[];
    let initialGameState: GameState;
    beforeEach(() => {
      exampleMonkeyInput = parseInput(readLines(__dirname, "example.txt"));
      initialGameState = createGameState(exampleMonkeyInput);
    });
    describe("processMoves", () => {
      it("passes example with 1 turn", () => {
        const result = processRounds(exampleMonkeyInput, true, 1);
        expect(
          result.map((m) => ({ name: m.name, inspections: m.inspections }))
        ).toEqual([
          { name: 0, inspections: 2 },
          { name: 1, inspections: 4 },
          { name: 2, inspections: 3 },
          { name: 3, inspections: 6 },
        ]);
      });
      it("passes example with 20 turns", () => {
        const result = processRounds(exampleMonkeyInput, true, 20);
        expect(
          result.map((m) => ({ name: m.name, inspections: m.inspections }))
        ).toEqual([
          { name: 0, inspections: 99 },
          { name: 1, inspections: 91 },
          { name: 2, inspections: 8 },
          { name: 3, inspections: 103 },
        ]);
      });
      it("passes example with 1000 turns", () => {
        const result = processRounds(exampleMonkeyInput, true, 1000);
        expect(
          result.map((m) => ({ name: m.name, inspections: m.inspections }))
        ).toEqual([
          { name: 0, inspections: 5204 },
          { name: 1, inspections: 4792 },
          { name: 2, inspections: 199 },
          { name: 3, inspections: 5192 },
        ]);
      });
      it("passes example with 10000 turns", () => {
        const result = processRounds(exampleMonkeyInput, true, 10000);
        expect(
          result.map((m) => ({ name: m.name, inspections: m.inspections }))
        ).toEqual([
          { name: 0, inspections: 52166 },
          { name: 1, inspections: 47830 },
          { name: 2, inspections: 1938 },
          { name: 3, inspections: 52013 },
        ]);
      });
    });
  });
  describe("parseInput", () => {
    it("handles example monkeys", () => {
      expect(parseInput(readLines(__dirname, "example.txt"))).toEqual([
        {
          name: 0,
          items: [79, 98],
          operand: "*",
          operationValue: 19,
          test: 23,
          ifTrue: 2,
          ifFalse: 3,
          inspections: 0,
        },
        {
          name: 1,
          items: [54, 65, 75, 74],
          operand: "+",
          operationValue: 6,
          test: 19,
          ifTrue: 2,
          ifFalse: 0,
          inspections: 0,
        },
        {
          name: 2,
          items: [79, 60, 97],
          operand: "^",
          operationValue: 1,
          test: 13,
          ifTrue: 1,
          ifFalse: 3,
          inspections: 0,
        },
        {
          name: 3,
          items: [74],
          operand: "+",
          operationValue: 3,
          test: 17,
          ifTrue: 0,
          ifFalse: 1,
          inspections: 0,
        },
      ]);
    });
  });
});
