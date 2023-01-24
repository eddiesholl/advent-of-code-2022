import { readLines } from "../common/input";
import { calculateScore, processMoves } from "./index";
import { parseLines } from "./parse";

// Part 1
// const score = calculateScore(processMoves(parseLines(readLines(__dirname))));
// console.log("Score is " + score);

// Part 2
const score = calculateScore(
  processMoves(parseLines(readLines(__dirname)), true)
);
console.log("Score is " + score);
