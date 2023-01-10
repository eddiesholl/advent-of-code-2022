import { readLines } from "../common/input";
import { parseMoves, processMoves10Knots, processMoves2Knots } from "./index";

// Part 1
// const score = processMoves2Knots(parseMoves(readLines(__dirname)));

// Part 2
const score = processMoves10Knots(parseMoves(readLines(__dirname)));
console.log("Score is " + score);
