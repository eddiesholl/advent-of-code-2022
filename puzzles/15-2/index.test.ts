import { readLines } from "../common/input";
import {
  createGrid,
  findDistressBeacon,
  mergeSpan,
  parseLines,
  Sensor,
  Span,
} from "./index";

describe("15-2", () => {
  let exampleSensors: Sensor[];
  beforeEach(() => {
    exampleSensors = parseLines(readLines(__dirname, "example.txt"));
  });
  describe("mergeSpan", () => {
    /**
     * Scenarios
     * A = startSpan.start, B = startSpan.end, C = newSpan.start, D = newSpan.end
     * 1 A B C D
     * 2 A B start.next  C D
     * 3 A B
     *     C  D
     * 4 A  B
     *    C   D
     * 5 A  B
     *   C  D
     * 6 A    B
     *    C  D
     * 7  A    B
     *  C    D
     * 8   A    B
     *   C D
     * 9     A    B
     *   C D
     * */
    let startSpan: Span;
    let newSpan: Span;
    let nextSpan: Span;
    beforeEach(() => {
      startSpan = { start: 1, end: 5, type: "notBeacon" };
      nextSpan = { start: 8, end: 10, type: "sensor" };
    });
    it("handles 1", () => {
      newSpan = { start: 6, end: 7, type: "beacon" };
      mergeSpan(startSpan, newSpan);
      expect(startSpan).toEqual({
        ...startSpan,
        next: newSpan,
      });
    });
    it("handles 2", () => {
      newSpan = { start: 6, end: 7, type: "beacon" };
      startSpan.next = nextSpan;
      mergeSpan(startSpan, newSpan);
      expect(startSpan).toEqual({
        start: 1,
        end: 5,
        type: "notBeacon",
        next: {
          start: 6,
          end: 7,
          type: "beacon",
          next: { start: 8, end: 10, type: "sensor" },
        },
      });
    });
    it("handles 3", () => {
      newSpan = { start: 5, end: 7, type: "beacon" };
      mergeSpan(startSpan, newSpan);
      console.log(startSpan);
      expect(startSpan).toEqual({
        start: 1,
        end: 4,
        type: "notBeacon",
        next: {
          start: 5,
          end: 7,
          type: "beacon",
        },
      });
    });
  });
  describe("createGrid", () => {
    it("handles the example row 1", () => {
      expect(createGrid(exampleSensors.slice(0, 1), 0, 20)).toEqual({
        minY: 11,
        maxY: 25,
        11: {
          end: 2,
          start: 2,
          type: "notBeacon",
        },
        12: {
          end: 3,
          start: 1,
          type: "notBeacon",
        },
        13: {
          end: 4,
          start: 0,
          type: "notBeacon",
        },
        14: {
          end: 5,
          start: -1,
          type: "notBeacon",
        },
        15: {
          end: 6,
          start: -2,
          type: "notBeacon",
        },
        16: {
          end: 7,
          start: -3,
          type: "notBeacon",
        },
        17: {
          end: 8,
          start: -4,
          type: "notBeacon",
        },
        18: {
          end: 2,
          start: 2,
          type: "sensor",
        },
        19: {
          end: 8,
          start: -4,
          type: "notBeacon",
        },
        20: {
          end: 7,
          start: -3,
          type: "notBeacon",
        },
        21: {
          end: 6,
          start: -2,
          type: "notBeacon",
        },
        22: {
          end: 5,
          start: -1,
          type: "notBeacon",
        },
        23: {
          end: 4,
          start: 0,
          type: "notBeacon",
        },
        24: {
          end: 3,
          start: 1,
          type: "notBeacon",
        },
        25: {
          end: 2,
          start: 2,
          type: "notBeacon",
        },
      });
    });
  });
  describe.skip("findDistressBeacon", () => {
    it("handles the example", () => {
      expect(findDistressBeacon(exampleSensors, 0, 20)).toEqual({
        x: 14,
        y: 11,
      });
    });
  });
});
