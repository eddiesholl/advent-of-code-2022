import { readLines } from "../common/input";
import { parseMoves, processMoves2Knots } from "./index";

const score = processMoves2Knots(parseMoves(readLines(__dirname)));
console.log("Score is " + score);
