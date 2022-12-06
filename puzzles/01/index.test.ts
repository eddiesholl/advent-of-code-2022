import { findMaxElf } from "./index";

describe("findMaxElf", () => {
  describe("happy paths", () => {
    it("handles an empty set of lines", () => {
      expect(findMaxElf([])).toEqual({ number: 1, calorieCount: 0 });
    });
  });
});
