import { readLines } from "../common/input";
import { parseInput } from "./index";

describe("11", () => {
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
        },
        {
          name: 1,
          items: [54, 65, 75, 74],
          operand: "+",
          operationValue: 6,
          test: 19,
          ifTrue: 2,
          ifFalse: 0,
        },
        {
          name: 2,
          items: [79, 60, 97],
          operand: "^",
          operationValue: 1,
          test: 13,
          ifTrue: 1,
          ifFalse: 3,
        },
        {
          name: 3,
          items: [74],
          operand: "+",
          operationValue: 3,
          test: 17,
          ifTrue: 0,
          ifFalse: 1,
        },
      ]);
    });
  });
});
