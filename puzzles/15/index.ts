import { notEmpty, onlyUnique } from "../common/array";
import { locationEquals, Location } from "../common/location";
import { pad } from "../common/string";

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
const getBounds = (sensors: Sensor[]): Bounds => {
  const firstSensor = sensors[0];
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
    { topLeft: firstSensor.location, bottomRight: firstSensor.location }
  );
  return result;
};
const distanceBetween = (l1: Location, l2: Location): number => {
  return Math.abs(l1.x - l2.x) + Math.abs(l1.y - l2.y);
};
const locationsCloserThanBeacon = (
  sensor: Sensor,
  bounds: Bounds,
  row: number
): number[] => {
  const distanceToBeacon = sensor.beaconDistance;
  if (Math.abs(sensor.location.y - row) > distanceToBeacon) {
    // console.log(
    //   `skipping sensor ${sensor.name} with y loc ${sensor.location.y}, distanceToBeacon ${distanceToBeacon}`
    // );
    return [];
  }
  // console.log(
  //   `processing sensor ${sensor.name} with y loc ${sensor.location.y}, distanceToBeacon ${distanceToBeacon}`
  // );
  // console.log("Beacon range for sensor " + sensor.name);
  // console.log(distanceToBeacon);
  const result: number[] = [];
  let y = row;
  const yEnd = sensor.location.y + distanceToBeacon;
  // console.log(
  //   `Bounds are x:${bounds.topLeft.x},y:${bounds.topLeft.y} to x:${bounds.bottomRight.x},y:${bounds.bottomRight.y}`
  // );
  let x = Math.max(sensor.location.x - distanceToBeacon, bounds.topLeft.x);
  const xEnd = Math.min(
    sensor.location.x + distanceToBeacon,
    bounds.bottomRight.x
  );
  // let firstHeader = "  ";
  // let secondHeader = "  ";
  // while (x <= xEnd) {
  //   if (x % 10 === 0) {
  //     secondHeader += "0";
  //   } else if (x % 5 === 0) {
  //     secondHeader += "5";
  //   } else {
  //     secondHeader += Math.abs(x % 10).toString();
  //   }
  //   if (x > 0 && x % 10 === 0) {
  //     firstHeader += Math.floor(x / 10).toString();
  //   } else if (x > 0 && x % 5 === 0) {
  //     firstHeader += Math.floor(x / 10).toString();
  //   } else {
  //     firstHeader += " ";
  //   }
  //   x++;
  // }
  // console.log(firstHeader);
  // console.log(secondHeader);
  // while (y <= yEnd) {
  console.log(`x ${x} -> xEnd: ${xEnd}`);
  x = sensor.location.x - distanceToBeacon;
  // let line = pad(y.toString(), bounds.bottomRight.y.toString().length);
  while (x <= xEnd) {
    const here = { x, y };
    const distanceToLoc = distanceBetween(sensor.location, here);
    if (distanceToLoc <= distanceToBeacon) {
      result.push(x);
    }
    // if (locationEquals(sensor.location)(here)) {
    //   line += "S";
    // } else if (locationEquals(sensor.nearestBeacon)(here)) {
    //   line += "B";
    // } else if (distanceToLoc <= distanceToBeacon) {
    //   line += distanceToLoc;
    // } else {
    //   line += ".";
    // }
    x++;
  }
  // y == 10 && console.log(line);
  // console.log(line);
  // y++;
  // }
  return result;
};

const calculateKnownLocations = (
  sensors: Sensor[],
  row: number,
  boundsToUse: Bounds | undefined = undefined
): Set<number> => {
  const bounds = boundsToUse ?? getBounds(sensors);
  // console.log(
  //   `Bounds are x:${bounds.topLeft.x},y${bounds.topLeft.y} to x:${bounds.bottomRight.x},y${bounds.bottomRight.y}`
  // );
  const beaconFreeLocationsNonUnique = sensors
    .map((sensor) => {
      const notBeacons = locationsCloserThanBeacon(sensor, bounds, row);
      return notBeacons;
    })
    .flat();
  // console.log(beaconFreeLocationsNonUnique.length);
  const uniqueLocations = new Set(beaconFreeLocationsNonUnique);
  // REVISIT Don't forget about known beacon spots
  // const beaconFreeOnRow = beaconFreeLocations.filter((l) => l.y === row);
  return uniqueLocations;
};
const calculateNotBeacons = (
  sensors: Sensor[],
  row: number,
  boundsToUse: Bounds | undefined = undefined
): number[] => {
  const allKnownBeacons = sensors
    .map((s) => s.nearestBeacon)
    .reduce(
      (acc, curr) => acc.concat(acc.find(locationEquals(curr)) ? [] : [curr]),
      [] as Location[]
    );
  const knownLocations = calculateKnownLocations(sensors, row, boundsToUse);
  return Array.from(knownLocations).filter(
    (x) => !allKnownBeacons.some(locationEquals({ x, y: row }))
  );
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

// Part 2
const findDistressBeacon = (
  sensors: Sensor[],
  minValue: number = 0,
  maxValue: number = 4000000
): Location => {
  const bounds: Bounds = {
    topLeft: { x: minValue, y: minValue },
    bottomRight: { x: maxValue, y: maxValue },
  };
  const allKnownBeacons = sensors
    .map((s) => s.nearestBeacon)
    .reduce(
      (acc, curr) => acc.concat(acc.find(locationEquals(curr)) ? [] : [curr]),
      [] as Location[]
    );
  let y = minValue;
  while (y < maxValue) {
    if (y % 100 === 0) {
      console.log(y);
    }
    const knownLocations = calculateKnownLocations(sensors, y, bounds);
    let x = minValue;
    while (x < maxValue) {
      if (!knownLocations.has(x)) {
        console.log(knownLocations);
        return { x, y };
      }
      x++;
    }
    y++;
  }
  return { x: 1, y: 1 };
};
export { parseLines, calculateNotBeacons, findDistressBeacon };
