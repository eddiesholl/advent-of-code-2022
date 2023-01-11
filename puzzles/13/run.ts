import { readLines } from "../common/input";
import { sumValues } from "../common/math";
import {
  calculateDecoder,
  checkPackets,
  parseLines,
  sortPackets,
} from "./index";

// Part 1
// const score = checkPackets(parseLines(readLines(__dirname))).reduce(
//   sumValues,
//   0
// );

// Part 2
const score = calculateDecoder(sortPackets(parseLines(readLines(__dirname))));
console.log("Score is " + score);
