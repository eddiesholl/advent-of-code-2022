import { readLines } from "../common/input";
import { createGrid, fillWithSand, Grid, parseLines } from "./index";
import { logGrid } from "./render";

const state = fillWithSand(
  // createGrid(parseLines(readLines(__dirname, "example.txt"))),
  createGrid(parseLines(readLines(__dirname, "input.txt"))),
  true
);

// states.forEach((state) => {
//   // console.dir(state.grid);
//   console.log(state.sandCount);
//   logGrid(state);
// });
console.log("score is " + state.sandCount);
// logUpdate(`${state.sandCount}`);
// console.log("Score is " + score);
