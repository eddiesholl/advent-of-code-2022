import { readLines } from "../common/input";
import { findBestValvePath, parseLines, renderMinute } from "./index";

const score = findBestValvePath(
  parseLines(readLines(__dirname, "example.txt"))
);
console.log("Score is " + score.released);
score.sequence.map(renderMinute);
// console.log("Sequence is " + JSON.stringify(score.ops));
