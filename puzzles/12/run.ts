import { readLines } from "../common/input";
import { findPath, findPathFromA, parseInput } from "./index";

const map = parseInput(readLines(__dirname, "input.txt"));

// Part 1
// const steps = findPath({
//   ...map,
//   // start: { x: 42, y: 20 },
// });

// Part 2
const steps = findPathFromA(map);
console.log(steps);
console.log("Score is " + (steps.length - 1));
