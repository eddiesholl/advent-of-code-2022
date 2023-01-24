import { readLines } from "../common/input";
import { processMoves, processPart2 } from "./index";
import { parseLines } from "./parse";
import { renderMoves } from "./render";

const { grid, blizzards } = parseLines(readLines(__dirname, "input.txt"));
// const { grid, blizzards } = parseLines(readLines(__dirname, "example.txt"));

// Part 1
// const moves = processMoves(grid, blizzards);
// renderMoves(moves);
// // console.log(moves);
// console.log("Score is " + moves.length);

// Part 2
const moves = processPart2(grid, blizzards);
// renderMoves(moves);
// console.log(moves);
console.log("Score is " + moves);
