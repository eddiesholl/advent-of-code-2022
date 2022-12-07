import { readLines } from "../common/input";
import { a } from "./index";

const score = a(readLines(__dirname));
console.log("Score is " + score.length);
