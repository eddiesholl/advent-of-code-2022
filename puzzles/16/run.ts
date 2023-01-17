import { readLines } from "../common/input";
import { findBestValvePath, parseLines } from "./index";
import { renderMinute } from "./render";

// Part 1
// const score = findBestValvePath(
//   parseLines(readLines(__dirname, "input.txt")),
//   // parseLines(readLines(__dirname, "example.txt")),
//   30
// );

// Part 2
const score = findBestValvePath(
  parseLines(readLines(__dirname, "input.txt")),
  // parseLines(readLines(__dirname, "example.txt")),
  26,
  ["guide", "elephant"]
);
score.sequence.map(renderMinute);
console.log("Score is " + score.released);
