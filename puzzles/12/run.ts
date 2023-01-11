import { readLines } from "../common/input";
import { findPath, parseInput } from "./index";

const map = parseInput(readLines(__dirname, "input.txt"));
const steps = findPath({
  ...map,
  // start: { x: 42, y: 20 },
});
console.log(steps);
console.log("Score is " + (steps.length - 1));
