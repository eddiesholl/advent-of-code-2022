import { readLines } from "../common/input";
import { calculateScore, processMoves } from "./index";
import { parseLines } from "./parse";

const score = calculateScore(processMoves(parseLines(readLines(__dirname))));
console.log("Score is " + score);
