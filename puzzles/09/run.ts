import { readLines } from "../common/input";
import { parseMoves, processMoves } from "./index";

const score = processMoves(parseMoves(readLines(__dirname)));
console.log("Score is " + score);
