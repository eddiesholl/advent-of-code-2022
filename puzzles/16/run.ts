import { readLines } from "../common/input";
import { findBestValvePath, parseLines, renderMinute } from "./index";

const score = findBestValvePath(
  parseLines(readLines(__dirname, "input.txt")),
  10
  // parseLines(readLines(__dirname, "example.txt"), 30)
);
console.log("Score is " + score.released);
score.sequence.map(renderMinute);
// console.log("Sequence is " + JSON.stringify(score.ops));
