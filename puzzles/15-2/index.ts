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
type SpanType = "empty" | "notBeacon" | "sensor" | "beacon";
type Span = {
  start: number;
  end: number;
  type: SpanType;
  next?: Span;
};
// type Grid = Record<number, Span>;
type Grid = {
  minY: number;
  maxY: number;
  [y: number]: Span;
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
        const location: Location = {
          x: parseInt(match[1]),
          y: parseInt(match[2]),
        };
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

const mergeSpans = (startSpan: Span, newSpans: Span[]): void => {
  let head = newSpans.slice(0)[0];
  while (head) {
    mergeSpan(startSpan, head);
    head = newSpans.slice(0)[0];
  }
};
const cloneSpan = (spanToModify: Span, template: Span): void => {
  spanToModify.start = template.start;
  spanToModify.end = template.end;
  spanToModify.type = template.type;
  spanToModify.next = template.next;
};
const splitSpan = (s: Span, n: number): [Span, Span] => {
  if (n < s.start || n > s.end) {
    throw Error("Splitting spans with illegal n value");
  }
  const s2: Span = {
    start: n === s.end ? s.end : n + 1,
    end: s.end,
    type: s.type,
    next: s.next,
  };
  const s1: Span = { start: s.start, end: n, type: s.type, next: s2 };
  return [s1, s2];
};
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
 * 1 start.s  start.e   new.s   new.e
 * 1 start.s  start.e   new.s   new.e
 * 1 start.s  start.e   n.s   n.e
 *
 * */

const mergeSpan = (startSpan: Span, newSpan: Span): void => {
  console.log(startSpan);
  console.log(newSpan);
  const A = startSpan.start,
    B = startSpan.end,
    C = newSpan.start,
    D = newSpan.end;
  if (C > B) {
    if (startSpan.next) {
      mergeSpan(startSpan.next, newSpan); // 2
    } else {
      startSpan.next = newSpan; // 1
    }
  } else if (C === B) {
    if (D === B) {
    } else {
      const [s1, s2] = splitSpan(newSpan, C);
      mergeSpan(startSpan, s1);
      mergeSpan(startSpan, s2);
    }
  } else if (C >= A) {
    if (D > B) {
      const [s1, s2] = splitSpan(newSpan, B);
      mergeSpan(startSpan, s1);
      mergeSpan(startSpan, s2);
    } else {
      // newSpan is subset of startSpan
    }
  } else {
    // C < A
    if (D >= A) {
      const [s1, s2] = splitSpan(newSpan, A);
      mergeSpan(startSpan, s1);
      mergeSpan(startSpan, s2);
    } else {
      // new is fully before start
      const startClone = { ...startSpan };
      cloneSpan(startSpan, newSpan);
      cloneSpan(newSpan, startClone);
      startSpan.next = newSpan;
    }
  }
};
const createGrid = (
  sensors: Sensor[],
  minValue: number = 0,
  maxValue: number = 4000000
) => {
  const result: Grid = { minY: Infinity, maxY: -Infinity };
  sensors.forEach((sensor) => {
    const distanceToBeacon = sensor.beaconDistance;
    // let y = sensor.location.y - distanceToBeacon;
    // const yEnd = sensor.location.y + distanceToBeacon;
    let d = 0;
    while (d < distanceToBeacon) {
      const yDelta = distanceToBeacon - d;
      const xLower = sensor.location.x - d;
      const xUpper = sensor.location.x + d;

      // Add a span 'above' the sensor
      const yLower = sensor.location.y - yDelta;
      const newLowerSpan: Span = {
        start: xLower,
        end: xUpper,
        type: "notBeacon",
      };
      const lowerStart = result[yLower];
      if (lowerStart) {
        mergeSpan(lowerStart, newLowerSpan);
      } else {
        result[yLower] = newLowerSpan;
        result.minY = Math.min(result.minY, yLower);
      }

      // Add a span 'below' the sensor
      const yUpper = sensor.location.y + yDelta;
      const newUpperSpan: Span = {
        start: xLower,
        end: xUpper,
        type: "notBeacon",
      };

      const upperStart = result[yUpper];
      if (upperStart) {
        mergeSpan(upperStart, newUpperSpan);
      } else {
        result[yUpper] = newUpperSpan;
        result.maxY = Math.max(result.maxY, yUpper);
      }

      d++;
    }
    // Add the span on the sensor row
    const xSensor = sensor.location.x;
    const newSensorSpan: Span = {
      start: xSensor,
      end: xSensor,
      type: "sensor",
    };
    const ySensor = sensor.location.y;
    const sensorStart = result[ySensor];
    if (sensorStart) {
      mergeSpan(sensorStart, newSensorSpan);
    } else {
      result[ySensor] = newSensorSpan;
    }

    // Add the span for the beacon
    const xBeacon = sensor.nearestBeacon.x;
    const newBeaconSpan: Span = {
      start: xBeacon,
      end: xBeacon,
      type: "beacon",
    };
    const yBeacon = sensor.nearestBeacon.y;
    const beaconStart = result[yBeacon];
    if (beaconStart) {
      mergeSpan(beaconStart, newBeaconSpan);
    } else {
      result[yBeacon] = newBeaconSpan;
    }
  });

  return result;
};

const findDistressBeacon = (
  sensors: Sensor[],
  minValue: number = 0,
  maxValue: number = 4000000
): Location => {
  return { x: 0, y: 0 };
};
export {
  parseLines,
  findDistressBeacon,
  createGrid,
  Sensor,
  Grid,
  mergeSpan,
  Span,
};
