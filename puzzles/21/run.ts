import { readLines } from "../common/input";
import { findRootValue, parseLines } from "./index";

const score = findRootValue(parseLines(readLines(__dirname)));
console.log("Score is " + score);
