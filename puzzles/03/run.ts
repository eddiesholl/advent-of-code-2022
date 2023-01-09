import { readLines } from "../common/input";
import { processPackGroups, processPacks } from "./index";

// Part 1
// const score = processPacks(readLines(__dirname));

// Part 2
const score = processPackGroups(readLines(__dirname));
console.log("Score is " + score);
