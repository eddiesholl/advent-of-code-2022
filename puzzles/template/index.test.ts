import { a } from "./index";

describe("00", () => {
  describe("a", () => {
    describe("happy paths", () => {
      it("handles emoty lines", () => {
        expect(a([])).toEqual(undefined);
      });
    });
  });
});
