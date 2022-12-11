import { processMoves, parseMoves } from "./index";

describe("09", () => {
  describe("processMoves", () => {
    it("handles the example", () => {
      expect(
        processMoves(
          parseMoves(["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"])
        )
      ).toEqual(13);
    });
  });
});
