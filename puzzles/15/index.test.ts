import { readLines } from "../common/input";
import { calculateNotBeacons, findDistressBeacon, parseLines } from "./index";

describe("15", () => {
  describe("part 2", () => {
    it("handles the example", () => {
      expect(
        findDistressBeacon(
          parseLines(readLines(__dirname, "example.txt")),
          0,
          20
        )
      ).toEqual({ x: 14, y: 11 });
    });
  });
  describe("calculateNotBeacons", () => {
    it("handles the example", () => {
      expect(
        calculateNotBeacons(parseLines(readLines(__dirname, "example.txt")), 10)
          .length
      ).toEqual(26);
    });
  });
  describe("parseLines", () => {
    it("handles the example", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        {
          name: 1,
          location: { x: 2, y: 18 },
          nearestBeacon: { x: -2, y: 15 },
          beaconDistance: 7,
        },
        {
          name: 2,
          location: { x: 9, y: 16 },
          nearestBeacon: { x: 10, y: 16 },
          beaconDistance: 1,
        },
        {
          name: 3,
          location: { x: 13, y: 2 },
          nearestBeacon: { x: 15, y: 3 },
          beaconDistance: 3,
        },
        {
          name: 4,
          location: { x: 12, y: 14 },
          nearestBeacon: { x: 10, y: 16 },
          beaconDistance: 4,
        },
        {
          name: 5,
          location: { x: 10, y: 20 },
          nearestBeacon: { x: 10, y: 16 },
          beaconDistance: 4,
        },
        {
          name: 6,
          location: { x: 14, y: 17 },
          nearestBeacon: { x: 10, y: 16 },
          beaconDistance: 5,
        },
        {
          name: 7,
          location: { x: 8, y: 7 },
          nearestBeacon: { x: 2, y: 10 },
          beaconDistance: 9,
        },
        {
          name: 8,
          location: { x: 2, y: 0 },
          nearestBeacon: { x: 2, y: 10 },
          beaconDistance: 10,
        },
        {
          name: 9,
          location: { x: 0, y: 11 },
          nearestBeacon: { x: 2, y: 10 },
          beaconDistance: 3,
        },
        {
          name: 10,
          location: { x: 20, y: 14 },
          nearestBeacon: { x: 25, y: 17 },
          beaconDistance: 8,
        },
        {
          name: 11,
          location: { x: 17, y: 20 },
          nearestBeacon: { x: 21, y: 22 },
          beaconDistance: 6,
        },
        {
          name: 12,
          location: { x: 16, y: 7 },
          nearestBeacon: { x: 15, y: 3 },
          beaconDistance: 5,
        },
        {
          name: 13,
          location: { x: 14, y: 3 },
          nearestBeacon: { x: 15, y: 3 },
          beaconDistance: 1,
        },
        {
          name: 14,
          location: { x: 20, y: 1 },
          nearestBeacon: { x: 15, y: 3 },
          beaconDistance: 7,
        },
      ]);
    });
  });
});
