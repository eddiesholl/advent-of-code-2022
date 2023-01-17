import { readLines } from "../common/input";
import { findBestValvePath, parseLines } from "./index";
import { renderMinute } from "./render";

const score = findBestValvePath(
  // parseLines(readLines(__dirname, "input.txt")),
  parseLines(readLines(__dirname, "example.txt")),
  30
);
score.sequence.map(renderMinute);
console.log("Score is " + score.released);
