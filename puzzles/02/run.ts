import { readLines } from "../common/input";
import { calculateScores, calculateScoresPart2 } from "./index";

// Part 1
// const score = calculateScores(readLines(__dirname));

// Part 2
const score = calculateScoresPart2(readLines(__dirname));
console.log("Score = " + score);
