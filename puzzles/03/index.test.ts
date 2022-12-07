import { a } from "./index";

describe("03", () => {
  describe("a", () => {
    describe("happy paths", () => {
      it("handles no lines", () => {
        expect(a([])).toEqual(0);
      });
    });
  });
});
