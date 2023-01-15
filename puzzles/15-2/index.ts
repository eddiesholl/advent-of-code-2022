import { notEmpty } from "../common/array";
import { locationEquals, Location } from "../common/location";
import { renderGrid } from "./render";

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
type Rows = Record<number, Span>;
type Grid = {
  minY: number;
  maxY: number;
  minX: number;
  maxX: number;
  rows: Rows;
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
const mergeType = (current: SpanType, update: SpanType): SpanType => {
  if (current === "beacon" || current === "sensor") {
    return current;
  } else {
    return update;
  }
};
/**
 * A    B
 * C    D
 * C   D
 *  C   D
 *  C D
 * */
const overlapSpan = (targetSpan: Span, newSpan: Span): void => {
  const A = targetSpan.start,
    B = targetSpan.end,
    C = newSpan.start,
    D = newSpan.end;
  // console.log(`A:${A}-B:${B} C:${C}-D:${D}`);
  if (A === C) {
    if (B === D) {
      targetSpan.type = mergeType(targetSpan.type, newSpan.type);
    } else {
      const targetPost = trimSpan(targetSpan, newSpan.end + 1, targetSpan.end);
      targetSpan.end = newSpan.end;
      targetSpan.type = mergeType(targetSpan.type, newSpan.type);
      targetSpan.next = targetPost;
    }
  } else if (C > A) {
    if (B === D) {
      const targetOverlap = trimSpan(
        targetSpan,
        newSpan.start,
        targetSpan.end
      ) as Span;
      targetOverlap.type = mergeType(targetOverlap.type, newSpan.type);
      targetSpan.end = newSpan.start - 1;
      targetSpan.next = targetOverlap;
    } else {
      // console.log("overlap subset");
      const targetOverlap = trimSpan(
        targetSpan,
        newSpan.start,
        newSpan.end
      ) as Span;
      const targetPost = trimSpan(
        targetSpan,
        newSpan.end + 1,
        targetSpan.end
      ) as Span;
      targetOverlap.type = mergeType(targetOverlap.type, newSpan.type);
      targetSpan.end = newSpan.start - 1;
      targetSpan.next = targetOverlap;
      targetOverlap.next = targetPost;
    }
  }
};
const insertSpan = (currentHead: Span, newHead: Span): void => {
  const currentHeadBackup = { ...currentHead };
  currentHead.start = newHead.start;
  currentHead.end = newHead.end;
  currentHead.type = newHead.type;
  currentHead.next = newHead;

  newHead.start = currentHeadBackup.start;
  newHead.end = currentHeadBackup.end;
  newHead.type = currentHeadBackup.type;
  newHead.next = currentHeadBackup.next;
};
/**
 *         s.start     s.end
 *  s  e
 *   s        e
 *           s       e
 *                 s            e
 *                          s    e
 * */

const trimSpan = (s: Span, start: number, end: number): Span | undefined => {
  if (start > end || end < s.start || start > s.end) {
    // console.log("trimSpan bail");
    // console.log(s);
    // console.log(`${start} - ${end}`);
    return;
  }
  return {
    ...s,
    start: Math.max(s.start, start),
    end: Math.min(s.end, end),
  };
};
const removeDupes = (head: Span): void => {
  let current = head;
  let next = head.next;
  while (current && next) {
    if (next.type === current.type && next.start === current.end + 1) {
      current.end = next.end;
      next = next.next;
      current.next = next;
      next = current.next;
    } else {
      current = next;
      next = current.next;
    }
  }
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

const debugMerge = false;
const mergeSpan = (startSpan: Span, newSpan: Span): void => {
  debugMerge && console.log(startSpan);
  debugMerge && console.log(newSpan);

  const newPre = trimSpan(newSpan, newSpan.start, startSpan.start - 1);
  const newPost = trimSpan(newSpan, startSpan.end + 1, newSpan.end);
  const newOverlap = trimSpan(newSpan, startSpan.start, startSpan.end);
  if (newOverlap) {
    debugMerge && console.log("newOverlap " + JSON.stringify(newOverlap));
    overlapSpan(startSpan, newOverlap);
  }

  if (newPost) {
    debugMerge && console.log("newPost " + JSON.stringify(newPost));
    if (startSpan.next) {
      mergeSpan(startSpan.next, newPost);
    } else {
      startSpan.next = newPost;
    }
  }

  // Do the pre last as it mutates the ordering
  if (newPre) {
    debugMerge && console.log("newPre " + JSON.stringify(newPre));
    insertSpan(startSpan, newPre);
  }

  removeDupes(startSpan);
};
const findEndOfSpans = (s: Span): number => {
  let current = s;
  while (current.next) {
    current = current.next;
  }
  return current.end;
};
const rowsToGrid = (rows: Rows): Grid => {
  // console.log(rows);
  const keys = Object.keys(rows)
    .map((k) => parseInt(k))
    .sort((a, b) => a - b);
  // console.log(keys);
  const values = Object.values(rows);
  const minX = values.reduce(
    (prev, curr) => Math.min(prev, curr.start),
    Infinity
  );
  const maxX = values.reduce(
    (prev, curr) => Math.max(prev, findEndOfSpans(curr)),
    -Infinity
  );

  return {
    rows,
    minX,
    maxX,
    minY: keys[0],
    maxY: keys.slice(-1)[0],
  };
};
const createGrid = (
  sensors: Sensor[]
  // minValue: number = 0,
  // maxValue: number = 4000000
): Grid => {
  const rows: Rows = {};
  sensors.forEach((sensor) => {
    let debug = false;
    if (sensor.name === 2) {
      debug = true;
      console.log("Sensor 2");
      console.log(sensor);
    }
    const distanceToBeacon = sensor.beaconDistance;
    // let y = sensor.location.y - distanceToBeacon;
    // const yEnd = sensor.location.y + distanceToBeacon;
    let d = 0;
    while (d <= distanceToBeacon) {
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
      if (debug) {
        console.log("newLowerSpan");
        console.log(newLowerSpan);
      }
      const lowerStart = rows[yLower];
      if (lowerStart) {
        if (debug) {
          console.log("about to merge newLowerSpan into lowerStart");
          console.log(lowerStart);
          console.log(newLowerSpan);
        }
        mergeSpan(lowerStart, newLowerSpan);
        if (debug) {
          console.log("lowerStart");
          console.log(lowerStart);
        }
      } else {
        rows[yLower] = newLowerSpan;
      }

      // Add a span 'below' the sensor
      const yUpper = sensor.location.y + yDelta;
      const newUpperSpan: Span = {
        start: xLower,
        end: xUpper,
        type: "notBeacon",
      };

      const upperStart = rows[yUpper];
      if (upperStart) {
        mergeSpan(upperStart, newUpperSpan);
      } else {
        rows[yUpper] = newUpperSpan;
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
    const sensorStart = rows[ySensor];
    if (sensorStart) {
      mergeSpan(sensorStart, newSensorSpan);
    } else {
      rows[ySensor] = newSensorSpan;
    }

    // Add the span for the beacon
    const xBeacon = sensor.nearestBeacon.x;
    const newBeaconSpan: Span = {
      start: xBeacon,
      end: xBeacon,
      type: "beacon",
    };
    const yBeacon = sensor.nearestBeacon.y;
    const beaconStart = rows[yBeacon];
    if (beaconStart) {
      mergeSpan(beaconStart, newBeaconSpan);
    } else {
      rows[yBeacon] = newBeaconSpan;
    }
    renderGrid(rowsToGrid(rows));
  });

  return rowsToGrid(rows);
};

const searchForUnknown = (s: Span, minValue: number, maxValue: number) => {
  if (s.start > minValue) {
    return s.start - 1;
  }
  let current: Span | undefined = s;

  while (current) {
    if (current.type === "empty") {
      return current.start;
    }
    const next: Span | undefined = current.next;
    if (next === undefined && current.end <= maxValue) {
      return current.end + 1;
    }
    if (next && next.start > current.end + 1) {
      return current.end + 1;
    }
    current = next;
  }
  return null;
};
const findDistressBeacon = (
  grid: Grid,
  minValue: number = 0,
  maxValue: number = 4000000
): Location => {
  let y = minValue;
  while (y < maxValue) {
    const row = grid.rows[y];
    const distressBeaconX = searchForUnknown(row, minValue, maxValue);
    if (distressBeaconX !== null) {
      console.log(`Found distress beacon at ${distressBeaconX},${y}`);
      console.log(row);
      return { x: distressBeaconX, y };
    }
    y++;
  }
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
