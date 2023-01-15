import { readLines } from "../common/input";
import { findBestValvePath, GameState, parseLines, recurse } from "./index";

describe("16", () => {
  describe("recurse", () => {
    const valveMapAABB = {
      AA: { name: "AA", rate: 1, linked: ["BB"] },
      BB: { name: "BB", rate: 2, linked: ["AA"] },
    };

    it("bails when time is up", () => {
      expect(recurse(valveMapAABB, [], 1, 3, 0, {})).toEqual({
        sequence: [
          {
            op: { kind: "open", target: "AA" },
            state: {
              location: "AA",
              rate: 0,
              released: 0,
              t: 1,
              visited: new Set(),
              open: new Set(),
              usefulClosedValves: new Set(["AA", "BB"]),
            },
          },
        ],
        released: 0,
      });
    });
    it("opens AA and BB", () => {
      const terminalState = recurse(valveMapAABB, [], 5, 3, 0, {});
      expect(terminalState.sequence.length).toEqual(5);
      // terminalState.sequence.map(renderMinute);
      expect(terminalState.sequence[4]).toEqual({
        op: { kind: "noop" },
        state: {
          location: "BB",
          open: new Set(["AA", "BB"]),
          visited: new Set(["BB"]),
          t: 5,
          rate: 3,
          released: 5,
          usefulClosedValves: new Set(),
        },
      });
      expect(terminalState.released).toEqual(8);
    });
  });
  describe("findBestValvePath", () => {
    it("handles the example input", () => {
      expect(
        findBestValvePath(parseLines(readLines(__dirname, "example.txt")), 30)
          .released
      ).toEqual(1651);
    });
  });
  describe("parseLines", () => {
    it("handles the example input", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        { name: "AA", rate: 0, linked: ["DD", "II", "BB"] },
        { name: "BB", rate: 13, linked: ["CC", "AA"] },
        { name: "CC", rate: 2, linked: ["DD", "BB"] },
        { name: "DD", rate: 20, linked: ["CC", "AA", "EE"] },
        { name: "EE", rate: 3, linked: ["FF", "DD"] },
        { name: "FF", rate: 0, linked: ["EE", "GG"] },
        { name: "GG", rate: 0, linked: ["FF", "HH"] },
        { name: "HH", rate: 22, linked: ["GG"] },
        { name: "II", rate: 0, linked: ["AA", "JJ"] },
        { name: "JJ", rate: 21, linked: ["II"] },
      ]);
    });
  });
});
