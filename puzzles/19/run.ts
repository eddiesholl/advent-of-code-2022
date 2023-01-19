import { readLines } from "../common/input";
import { parseLines, processBlueprints } from "./index";

const score = processBlueprints(parseLines(readLines(__dirname, "input.txt")));
console.log("Score is " + score);
