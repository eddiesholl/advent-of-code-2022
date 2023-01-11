import { readLines } from "../common/input";
import {
  getSignalStrength,
  parseLines,
  processInstructions,
  renderCrt,
} from "./index";

// Part 1
// const score = getSignalStrength(
//   processInstructions(parseLines(readLines(__dirname)))
// );
// Part 2
const score = renderCrt(processInstructions(parseLines(readLines(__dirname))));
console.log("Score is " + score);
