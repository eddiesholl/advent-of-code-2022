import { calculateScores, scoreRound, scoreRoundPart2 } from "./index";

describe("02", () => {
  // 1 for Rock, 2 for Paper, and 3 for Scissors
  // 0 if you lost, 3 if the round was a draw, and 6 if you won
  describe("scoreRoundPart2", () => {
    // X = lose, Y = draw, Z = win
    it("scores a draw score", () => {
      expect(scoreRoundPart2({ theirs: "A", mine: "Y" })).toEqual(4);
    });
    it("scores a loss correctly", () => {
      expect(scoreRoundPart2({ theirs: "B", mine: "X" })).toEqual(1);
    });
    it("scores a win correctly", () => {
      expect(scoreRoundPart2({ theirs: "C", mine: "Z" })).toEqual(7);
    });
  });
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
