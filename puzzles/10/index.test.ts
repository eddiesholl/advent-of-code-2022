import { readLines } from "../common/input";
import {
  getSignalStrength,
  Instruction,
  parseLines,
  processInstructions,
} from "./index";

describe("10", () => {
  describe("parseLines", () => {
    it("handles noop", () => {
      expect(parseLines(["noop"])).toEqual([null]);
    });

    it("handles positive add", () => {
      expect(parseLines(["addx 123"])).toEqual([123]);
    });

    it("handles negative add", () => {
      expect(parseLines(["addx -123"])).toEqual([-123]);
    });
  });
  describe("processInstructions", () => {
    it("handles the simple example", () => {
      expect(processInstructions([null, 3, -5])).toEqual([1, 1, 1, 4, 4, -1]);
    });
  });
  describe("longer example", () => {
    let instructions: Instruction[];
    let cycleValues: number[];
    let sum: number;
    beforeEach(() => {
      instructions = parseLines(readLines(__dirname, "example.txt"));
      cycleValues = processInstructions(instructions);
      sum = getSignalStrength(cycleValues);
    });
    it("parses correctly", () => {
      expect(instructions.slice(0, 10)).toEqual([
        15,
        -11,
        6,
        -3,
        5,
        -1,
        -8,
        13,
        4,
        null,
      ]);
    });
    it("has correct cycle values", () => {
      console.log(cycleValues.length);
      expect(cycleValues[19]).toEqual(21);
      expect(cycleValues[59]).toEqual(19);
      expect(cycleValues[99]).toEqual(18);
      expect(cycleValues[139]).toEqual(21);
      expect(cycleValues[179]).toEqual(16);
      expect(cycleValues[219]).toEqual(18);
    });
    it("gets the right sum value", () => {
      expect(sum).toEqual(13140);
    });
  });
});
