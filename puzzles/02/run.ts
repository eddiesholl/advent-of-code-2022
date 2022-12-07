import { readLines } from "../common/input";
import { calculateScores } from "./index";

const score = calculateScores(readLines(__dirname));
console.log("Score = " + score);
