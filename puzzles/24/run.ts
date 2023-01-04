import { readLines } from "../common/input";
import { processMoves } from "./index";
import { parseLines } from "./parse";

const { grid, blizzards } = parseLines(readLines(__dirname));
const score = processMoves(grid, blizzards);
console.log("Score is " + score.length);
