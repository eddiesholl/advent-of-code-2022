import { readLines } from "../common/input";
import { parseLines } from "./index";

describe("16", () => {
  describe("parseLines", () => {
    it("handles emoty lines", () => {
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
