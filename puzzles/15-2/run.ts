import { readLines } from "../common/input";
import { createGrid, findDistressBeacon, parseLines } from "./index";

const distress = findDistressBeacon(
  // createGrid(parseLines(readLines(__dirname, "example.txt"))),
  createGrid(parseLines(readLines(__dirname, "input.txt"))),
  0,
  // 20
  4000000
);
console.log(`Distress at ${distress.x},${distress.y}`);
console.log(`Frequency is ${4000000 * distress.x + distress.y}`);
