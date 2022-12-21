import { readLines } from "../common/input";
import { findBestValvePath, parseLines, renderMinute } from "./index";

const score = findBestValvePath(
  parseLines(readLines(__dirname, "input.txt")),
  30
  // parseLines(readLines(__dirname, "example.txt")),
  // 30
);
score.sequence.map(renderMinute);
console.log("Score is " + score.released);
// console.log("Sequence is " + JSON.stringify(score.ops));
