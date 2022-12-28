import { readLines } from "../common/input";
import {
  parseLines,
  mixFile,
  findCoordinates,
  shiftLeft,
  buildList,
  shiftRight,
  NumberWrapper,
  listToArray,
  mixIndex,
  renderLinkedList,
} from "./index";

describe("20", () => {
  describe("shiftRight", () => {
    let start: NumberWrapper;
    beforeEach(() => {
      start = buildList([1, 2, -3, 3, -2, 0, 4]);
    });
    it("handles shifting once", () => {
      shiftRight(start);
      console.log(start.value);
      expect(listToArray(start)).toEqual([1, -3, 3, -2, 0, 4, 2]);
    });
  });
  describe("shiftLeft", () => {
    let start: NumberWrapper;
    it("handles shifting left", () => {
      start = buildList([1, -3, 2, 3, -2, 0, 4]);

      shiftLeft(start.next); // -3
      console.log(start.value);
      expect(listToArray(start)).toEqual([1, 2, 3, -2, -3, 0, 4]);
    });
  });
  describe("mixIndex", () => {
    let exampleHead: NumberWrapper;
    beforeEach(() => {
      exampleHead = buildList([1, 2, -3, 3, -2, 0, 4]);
    });
    it("handles the first example", () => {
      exampleHead = buildList([1, 2, -3, 3, -2, 0, 4]);
      const result = listToArray(mixIndex(exampleHead, 0));
      expect(result).toEqual([1, -3, 3, -2, 0, 4, 2]);
      expect(renderLinkedList(exampleHead)).toEqual(
        "2 -> 1 -> -3 | 1 -> -3 -> 3 | -3 -> 3 -> -2 | 3 -> -2 -> 0 | -2 -> 0 -> 4 | 0 -> 4 -> 2 | 4 -> 2 -> 1"
      );
    });
    it("handles the second example", () => {
      exampleHead = buildList([2, 1, -3, 3, -2, 0, 4]);
      const result = listToArray(mixIndex(exampleHead, 0));
      expect(result).toEqual([2, 3, -2, 0, 4, 1, -3]);
      expect(renderLinkedList(exampleHead)).toEqual(
        "-3 -> 2 -> 3 | 2 -> 3 -> -2 | 3 -> -2 -> 0 | -2 -> 0 -> 4 | 0 -> 4 -> 1 | 4 -> 1 -> -3 | 1 -> -3 -> 2"
      );
    });
    it("handles the third example", () => {
      exampleHead = buildList([1, -3, 2, 3, -2, 0, 4]);
      const result = listToArray(mixIndex(exampleHead, 1));
      expect(result).toEqual([1, 2, 3, -2, -3, 0, 4]);
    });
    it("handles the fourth example", () => {
      exampleHead = buildList([1, 2, 3, -2, -3, 0, 4]);
      const result = listToArray(mixIndex(exampleHead, 2));
      expect(result).toEqual([1, 2, -2, -3, 0, 3, 4]);
    });
    it("handles the fifth example", () => {
      exampleHead = buildList([1, 2, -2, -3, 0, 3, 4]);
      const result = listToArray(mixIndex(exampleHead, 2));
      expect(result).toEqual([1, 2, -3, 0, 3, 4, -2]);
    });
    it("handles the sixth example (0)", () => {
      exampleHead = buildList([1, 2, -3, 0, 3, 4, -2]);
      const result = listToArray(mixIndex(exampleHead, 3));
      expect(result).toEqual([1, 2, -3, 0, 3, 4, -2]);
    });
    it("handles the seventh example (4)", () => {
      exampleHead = buildList([1, 2, -3, 0, 3, 4, -2]);
      const result = listToArray(mixIndex(exampleHead, 5));
      expect(result).toEqual([1, 2, -3, 4, 0, 3, -2]);
    });
  });
  describe("mixFile", () => {
    it("handles the first example", () => {
      expect(mixFile([1, 2, -3, 3, -2, 0, 4])).toEqual([1, 2, -3, 4, 0, 3, -2]);
    });
  });
  describe("parseLines", () => {
    it("handles the example", () => {
      const result = parseLines(readLines(__dirname, "example.txt"));
      expect(result).toEqual([1, 2, -3, 3, -2, 0, 4]);
    });
  });
});
