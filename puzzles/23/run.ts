import { readLines } from "../common/input";
import { calculateScore, processMoves } from "./index";
import { parseLines } from "./parse";

const score = calculateScore(
  // processMoves(parseLines(readLines(__dirname, "example.txt")))
  processMoves(parseLines(readLines(__dirname, "input.txt")))
  // processMoves(parseLines(readLines(__dirname, "merry-xmas-812.txt")))
);
console.log("Score is " + score);
