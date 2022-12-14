import { readLines } from "../common/input";
import { createGrid, parseLines } from "./index";

const score = createGrid(parseLines(readLines(__dirname, "example.txt")));
console.log("Score is " + score);
