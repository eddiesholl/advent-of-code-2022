import { readLines } from "../common/input";
import { parseJets, processRocks } from "./index";

const score = processRocks(
  20, //2022,
  parseJets(readLines(__dirname, "example.txt"))
);
console.log("Score is " + score);
