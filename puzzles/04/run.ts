import { readLines } from "../common/input";
import { a, rangeLineOverlaps } from "./index";

// Part 1
// const score = a(readLines(__dirname));

// Part 2
const score = readLines(__dirname).filter(rangeLineOverlaps);
console.log("Score is " + score.length);
