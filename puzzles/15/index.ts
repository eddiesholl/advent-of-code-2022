import { notEmpty } from "../common/array";

type Location = {
  x: number;
  y: number;
};
type Sensor = {
  name: number;
  location: Location;
  nearestBeacon: Location;
};
const calculateNotBeacons = (sensors: Sensor[], row: number): number => {
  return 0;
};
const parseLines = (lines: string[]): Sensor[] => {
  return lines
    .map((l, ix) => {
      const match = l.match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
      );
      if (match !== null) {
        return {
          name: ix,
          location: { x: parseInt(match[1]), y: parseInt(match[2]) },
          nearestBeacon: { x: parseInt(match[3]), y: parseInt(match[4]) },
        };
      }
    })
    .filter(notEmpty);
};
const b = () => void 0;
export { parseLines, calculateNotBeacons };
