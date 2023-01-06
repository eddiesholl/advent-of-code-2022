import { readLines } from "../common/input";
import { processMoves } from "./index";
import { parseLines } from "./parse";
import { renderMoves } from "./render";

const { grid, blizzards } = parseLines(readLines(__dirname, "input.txt"));
// const { grid, blizzards } = parseLines(readLines(__dirname, "example.txt"));
const moves = processMoves(grid, blizzards);
renderMoves(moves);
// console.log(moves);
console.log("Score is " + moves.length);
