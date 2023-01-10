import { processMoves2Knots, parseMoves } from "./index";

describe("09", () => {
  describe("processMoves2Knots", () => {
    it.only("handles the example", () => {
      expect(
        processMoves2Knots(
          parseMoves(["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"])
        )
      ).toEqual(13);
    });
  });
});
