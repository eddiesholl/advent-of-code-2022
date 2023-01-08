import { readLines } from "../common/input";
import { displayElf, findMaxElf, findTop3 } from "./index";

// Part 1
// displayElf(findMaxElf(readLines(__dirname)));

// Part 2
const score = findTop3(readLines(__dirname));
console.log("Score is " + score);
