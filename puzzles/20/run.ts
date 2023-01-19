import { readLines } from "../common/input";
import { parseLines, mixFile, findCoordinates } from "./index";

// Part 1
// const score = findCoordinates(
//   mixFile(parseLines(readLines(__dirname, "input.txt")))
//   // mixFile(parseLines(readLines(__dirname, "example.txt")))
// );
// console.log("Score is " + score);

// Part 2
const score = findCoordinates(
  mixFile(parseLines(readLines(__dirname, "input.txt")), 10, 811589153)
  // mixFile(parseLines(readLines(__dirname, "example.txt")))
);
console.log("Score is " + score);
