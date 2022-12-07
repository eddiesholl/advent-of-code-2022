import { a } from "./index";

describe("00", () => {
  describe("a", () => {
    describe("happy paths", () => {
      it("handles empty lines", () => {
        expect(a([])).toEqual([]);
      });
      it("handles the example", () => {
        expect(
          a(["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"])
        ).toEqual(["2-8,3-7", "6-6,4-6"]);
      });
    });
  });
});
