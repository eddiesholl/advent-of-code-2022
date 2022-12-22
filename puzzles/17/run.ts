import { readLines } from "../common/input";
import { parseJets, processRocks } from "./index";

const score = processRocks(
  // 20,
  2022,
  parseJets(readLines(__dirname, "input.txt"))
);
console.log("Score is " + score);
