import { readLines } from "../common/input";
import { busiestMonkeys, parseInput, processRounds } from "./index";

const scores = busiestMonkeys(processRounds(parseInput(readLines(__dirname))));
console.log("Score is " + scores[0] * scores[1]);
