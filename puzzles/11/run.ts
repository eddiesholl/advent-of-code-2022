import { readLines } from "../common/input";
import { busiestMonkeys, parseInput, processRounds } from "./index";

// Part 1
// const scores = busiestMonkeys(processRounds(parseInput(readLines(__dirname))));

const scores = busiestMonkeys(
  processRounds(parseInput(readLines(__dirname)), true, 10000)
);
console.log("Score is " + scores[0] * scores[1]);
