import { readLines } from "../common/input";
import { findPath, parseInput } from "./index";

const steps = findPath(parseInput(readLines(__dirname)));
console.log(steps);
console.log("Score is " + steps.length);
