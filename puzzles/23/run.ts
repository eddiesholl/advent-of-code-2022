import { readLines } from "../common/input";
import { calculateScore, processMoves, runUntilStop } from "./index";
import { parseLines } from "./parse";

// Part 1
// const score = calculateScore(
//   processMoves(parseLines(readLines(__dirname, "input.txt")))
// );
// console.log("Score is " + score);

// Part 2
const score = runUntilStop(parseLines(readLines(__dirname, "input.txt")));
console.log("Score is " + score);
