import { readLines } from "../common/input";
import { parseLines } from "./index";

describe("13", () => {
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        {
          name: 1,
          first: [1, 1, 3, 1, 1],
          second: [1, 1, 5, 1, 1],
        },
        {
          name: 2,
          first: [[1], [2, 3, 4]],
          second: [[1], 4],
        },
        {
          name: 3,
          first: [9],
          second: [[8, 7, 6]],
        },
        {
          name: 4,
          first: [[4, 4], 4, 4],
          second: [[4, 4], 4, 4, 4],
        },
        {
          name: 5,
          first: [7, 7, 7, 7],
          second: [7, 7, 7],
        },
        {
          name: 6,
          first: [],
          second: [3],
        },
        {
          name: 7,
          first: [[[]]],
          second: [[]],
        },
        {
          name: 8,
          first: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          second: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        },
      ]);
    });
  });
});
