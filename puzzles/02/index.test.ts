import { calculateScores, scoreRound } from "./index";

describe("02", () => {
  describe("scoreRound", () => {
    it("scores a victory score", () => {
      expect(scoreRound({ theirs: "A", mine: "Y" })).toEqual(8);
    });
    it("scores a draw correctly", () => {
      expect(scoreRound({ theirs: "B", mine: "Y" })).toEqual(5);
    });
    it("scores a loss correctly", () => {
      expect(scoreRound({ theirs: "C", mine: "Y" })).toEqual(2);
    });
  });

  describe("calculateScores", () => {
    it("handles empty lines", () => {
      expect(calculateScores([""])).toEqual(0);
    });
  });
});
