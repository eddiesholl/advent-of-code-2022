import { parseLines, processInstructions } from "./index";

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
      expect(processInstructions([null, 3, -5])).toEqual([1, 1, 4, 4, -1]);
    });
  });
});
