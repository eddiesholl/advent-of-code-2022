import { readLines } from "../common/input";
import { parseLines, mixFile, findCoordinates } from "./index";

const score = findCoordinates(
  // mixFile(parseLines(readLines(__dirname, "input.txt")))
  mixFile(parseLines(readLines(__dirname, "example.txt")))
);
console.log("Score is " + score);
