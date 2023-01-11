import { readLines } from "../common/input";
import { createGrid, fillWithSand, Grid, parseLines } from "./index";
import { logGrid } from "./render";

const states = fillWithSand(
  createGrid(parseLines(readLines(__dirname, "input.txt")))
);

states.forEach((state) => {
  // console.dir(state.grid);
  console.log(state.sandCount);
  logGrid(state.grid);
});
// logUpdate(`${state.sandCount}`);
// console.log("Score is " + score);
