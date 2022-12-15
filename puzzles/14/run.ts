import { readLines } from "../common/input";
import { createGrid, fillWithSand, parseLines } from "./index";

const states = fillWithSand(
  createGrid(parseLines(readLines(__dirname, "example.txt")))
);
states.forEach((state) => {
  console.log(state.sandCount);
});
// logUpdate(`${state.sandCount}`);
// console.log("Score is " + score);
