import { readLines } from "../common/input";
import { parseLines, countFaces, countExternalFaces } from "./index";

// Part 1
// const score = countFaces(parseLines(readLines(__dirname)));
// console.log("Score is " + score);

// Part 2
const score = countExternalFaces(
  parseLines(readLines(__dirname, "example.txt"))
);
console.log("Score is " + score);
