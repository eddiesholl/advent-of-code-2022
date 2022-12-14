import { readLines } from "../common/input";
import { checkPackets, comparePacketItems, parseLines } from "./index";

describe("13", () => {
  describe("comparePacketItems", () => {
    it("handles reddit example 1", () => {
      expect(comparePacketItems([1, 2, 3, 4, 5], [1, 2, 3, 4])).toBe(false);
      expect(comparePacketItems([1, 2, 2, 5], [1, 2, 3, 4, 5])).toBe(true);
    });
    it("handles example 1", () => {
      expect(comparePacketItems([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe(true);
    });
    it("handles example 2", () => {
      expect(comparePacketItems([[1], [2, 3, 4]], [[1], 4])).toBe(true);
    });
    it("handles example 3", () => {
      expect(comparePacketItems([9], [[8, 7, 6]])).toBe(false);
    });
    it("handles example 4", () => {
      expect(comparePacketItems([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe(true);
    });
    it("handles example 5", () => {
      expect(comparePacketItems([7, 7, 7, 7], [7, 7, 7])).toBe(false);
    });
    it("handles example 6", () => {
      expect(comparePacketItems([], [3])).toBe(true);
    });
    it("handles example 7", () => {
      expect(comparePacketItems([[[]]], [[]])).toBe(false);
    });
    it("handles example 8", () => {
      expect(
        comparePacketItems(
          [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
        )
      ).toBe(false);
    });
  });
  describe("checkPackets", () => {
    it("handles the example", () => {
      expect(
        checkPackets(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual([1, 2, 4, 6]);
    });
  });
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
