import { readLines } from "../common/input";
import { processMoves } from "./index";
import { parseLines } from "./parse";

const { grid, blizzards } = parseLines(readLines(__dirname, "example.txt"));
const score = processMoves(grid, blizzards);
console.log(score);
console.log("Score is " + score.length);
