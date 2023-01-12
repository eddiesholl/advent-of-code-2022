import { readLines } from "../common/input";
import { calculateNotBeacons, parseLines } from "./index";

const score = calculateNotBeacons(
  parseLines(readLines(__dirname, "input.txt")),
  // 10
  2000000
);
console.log("Score is " + score.length);
