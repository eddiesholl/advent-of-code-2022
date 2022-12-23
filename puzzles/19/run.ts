import { readLines } from "../common/input";
import { parseLines, processBlueprints } from "./index";

const score = processBlueprints(
  parseLines(readLines(__dirname, "example.txt"))
);
console.log("Score is " + score);
