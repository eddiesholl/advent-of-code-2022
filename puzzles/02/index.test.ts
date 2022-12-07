import { calculateScores, scoreRound } from "./index";

describe("02", () => {
  describe("scoreRound", () => {
    it("scores a victory score", () => {
      expect(scoreRound({ opponentChoice: "A", myChoice: "Y" })).toEqual(8);
    });
    it("scores a draw correctly", () => {
      expect(scoreRound({ opponentChoice: "B", myChoice: "Y" })).toEqual(5);
    });
    it("scores a loss correctly", () => {
      expect(scoreRound({ opponentChoice: "C", myChoice: "Y" })).toEqual(2);
    });
  });

  describe("calculateScores", () => {
    it("handles empty lines", () => {
      expect(calculateScores([""])).toEqual(0);
    });
  });
});
