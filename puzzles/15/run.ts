import { readLines } from "../common/input";
import { calculateNotBeacons, findDistressBeacon, parseLines } from "./index";

// Part 1
// const score = calculateNotBeacons(
//   parseLines(readLines(__dirname, "input.txt")),
//   // 10
//   2000000
// );
// console.log("Score is " + score.size);

const distress = findDistressBeacon(
  parseLines(readLines(__dirname, "example.txt")),
  0,
  20
);
console.log(`Distress at ${distress.x},${distress.y}`);
console.log(`Frequency is ${4000000 * distress.x + distress.y}`);
