import { readLines } from "../common/input";
import { findBestValvePath, parseLines } from "./index";

const score = findBestValvePath(
  parseLines(readLines(__dirname, "example.txt")),
  30
);
console.log("Score is " + score.released);
console.log("Sequence is " + JSON.stringify(score.ops));
