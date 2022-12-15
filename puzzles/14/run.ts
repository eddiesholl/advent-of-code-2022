import { readLines } from "../common/input";
import { createGrid, fillWithSand, parseLines } from "./index";

const score = fillWithSand(createGrid(parseLines(readLines(__dirname))));
console.log("Score is " + score);
