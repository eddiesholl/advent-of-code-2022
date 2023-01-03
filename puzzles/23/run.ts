import { readLines } from "../common/input";
import { calculateScore, processMoves } from "./index";
import { parseLines } from "./parse";

const score = calculateScore(
  processMoves(parseLines(readLines(__dirname, "input.txt")))
);
console.log("Score is " + score);
