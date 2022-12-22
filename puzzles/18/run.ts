import { readLines } from "../common/input";
import { parseLines, countFaces } from "./index";

const score = countFaces(parseLines(readLines(__dirname)));
console.log("Score is " + score);
