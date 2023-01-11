import { readLines } from "../common/input";
import { busiestMonkeys, parseInput, processRounds } from "./index";

// Part 1
// const scores = busiestMonkeys(processRounds(parseInput(readLines(__dirname))));

const scores = busiestMonkeys(
  processRounds(parseInput(readLines(__dirname, "example.txt")), true, 5)
);
console.log("Score is " + scores[0] * scores[1]);
