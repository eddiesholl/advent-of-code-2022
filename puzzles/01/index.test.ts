import { findMaxElf } from "./index";

describe("findMaxElf", () => {
  describe("happy paths", () => {
    it("handles an empty set of lines", () => {
      expect(findMaxElf([])).toEqual({ number: 1, calorieCount: 0 });
    });

    it("handles a single line", () => {
      expect(findMaxElf(["5"])).toEqual({ number: 1, calorieCount: 5 });
    });

    it("handles 2 simple elfs", () => {
      expect(findMaxElf(["5", "", "3", "4"])).toEqual({
        number: 2,
        calorieCount: 7,
      });
    });

    it("handles finding the last elf", () => {
      expect(findMaxElf(["5", "", "3", "4", "", "10", "8"])).toEqual({
        number: 3,
        calorieCount: 18,
      });
    });

    it("finds the first elf", () => {
      expect(findMaxElf(["500", "", "3", "4", "", "10", "8"])).toEqual({
        number: 1,
        calorieCount: 500,
      });
    });

    it("finds the middle elf", () => {
      expect(findMaxElf(["5", "", "30", "4", "", "10", "8"])).toEqual({
        number: 2,
        calorieCount: 34,
      });
    });
  });
});
