import { readLines } from "../common/input";
import { calculateNotBeacons, parseLines } from "./index";

const score = calculateNotBeacons(
  parseLines(readLines(__dirname, "example.txt")),
  10
);
console.log("Score is " + score);
