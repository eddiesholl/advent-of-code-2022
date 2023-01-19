import { readLines } from "../common/input";
import { parseLines, processBlueprints } from "./index";

// Part 1
// const score = processBlueprints(parseLines(readLines(__dirname, "input.txt")),24);
// console.log("Score is " + score);

// Part 2
const score = processBlueprints(
  parseLines(readLines(__dirname, "example.txt")).slice(0, 3),
  32,
  false
);
console.log("Score is " + score);
