import { readLines } from "../common/input";
import { getSignalStrength, parseLines, processInstructions } from "./index";

const score = getSignalStrength(
  processInstructions(parseLines(readLines(__dirname)))
);
console.log("Score is " + score);
