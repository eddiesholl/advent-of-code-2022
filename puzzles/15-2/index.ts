import { notEmpty } from "../common/array";
import { locationEquals, Location } from "../common/location";

type Sensor = {
  name: number;
  location: Location;
  nearestBeacon: Location;
  beaconDistance: number;
};
type Bounds = {
  topLeft: Location;
  bottomRight: Location;
};

const distanceBetween = (l1: Location, l2: Location): number => {
  return Math.abs(l1.x - l2.x) + Math.abs(l1.y - l2.y);
};

const parseLines = (lines: string[]): Sensor[] => {
  return lines
    .map((l, ix) => {
      const match = l.match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
      );
      if (match !== null) {
        const location = { x: parseInt(match[1]), y: parseInt(match[2]) };
        const nearestBeacon = { x: parseInt(match[3]), y: parseInt(match[4]) };
        return {
          name: ix + 1,
          location,
          nearestBeacon,
          beaconDistance: distanceBetween(location, nearestBeacon),
        };
      }
    })
    .filter(notEmpty);
};

const findDistressBeacon = (
  sensors: Sensor[],
  minValue: number = 0,
  maxValue: number = 4000000
): Location => {
  return { x: 0, y: 0 };
};
export { parseLines, findDistressBeacon };
