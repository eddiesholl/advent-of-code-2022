import { notEmpty, onlyUnique } from "../common/array";

type Location = {
  x: number;
  y: number;
};
type Sensor = {
  name: number;
  location: Location;
  nearestBeacon: Location;
};
type Bounds = {
  topLeft: Location;
  bottomRight: Location;
};
const getBounds = (sensors: Sensor[]): Bounds => {
  const result = sensors.reduce(
    (prev, curr) => {
      return {
        topLeft: {
          x: Math.min(prev.topLeft.x, curr.location.x, curr.nearestBeacon.x),
          y: Math.min(prev.topLeft.y, curr.location.y, curr.nearestBeacon.y),
        },
        bottomRight: {
          x: Math.max(
            prev.bottomRight.x,
            curr.location.x,
            curr.nearestBeacon.x
          ),
          y: Math.max(
            prev.bottomRight.y,
            curr.location.y,
            curr.nearestBeacon.y
          ),
        },
      };
    },
    { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } }
  );
  return result;
};
const distanceBetween = (l1: Location, l2: Location): number => {
  return Math.abs(l1.x - l2.x) + Math.abs(l1.y - l2.y);
};
const locationsCloserThan = (
  loc: Location,
  distance: number,
  bounds: Bounds
): Location[] => {
  const result: Location[] = [];
  let y = bounds.topLeft.y;
  while (y < bounds.bottomRight.y) {
    let x = bounds.topLeft.x;
    while (x < bounds.bottomRight.x) {
      const here = { x, y };
      const distanceToLoc = distanceBetween(loc, here);
      if (distanceToLoc < distance) {
        result.push(here);
      }
      x++;
    }
    y++;
  }
  return result;
};
const locationEquals =
  (l1: Location) =>
  (l2: Location): boolean =>
    l1.x === l2.x && l1.y === l2.y;
const calculateNotBeacons = (sensors: Sensor[], row: number): number => {
  const bounds = getBounds(sensors);
  const beaconFreeLocations = sensors
    .map((sensor) => {
      const beaconDistance = distanceBetween(
        sensor.location,
        sensor.nearestBeacon
      );
      const notBeacons = locationsCloserThan(
        sensor.location,
        beaconDistance,
        bounds
      );
      return notBeacons;
    })
    .flat()
    .reduce(
      (acc, curr) => acc.concat(acc.find(locationEquals(curr)) ? [] : [curr]),
      [] as Location[]
    );
  // REVISIT Don't forget about known beacon spots
  const beaconFreeOnRow = beaconFreeLocations.filter((l) => l.y === row);
  return beaconFreeOnRow.length;
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
