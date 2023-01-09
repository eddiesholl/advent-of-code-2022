import { readLines } from "../common/input";
import {
  parseMoves,
  parseStacks,
  processMoves,
  processMovesPart2,
  selectFirstItems,
} from "./index";

const stack = parseStacks(readLines(__dirname, "stacks.txt"));
const moves = parseMoves(readLines(__dirname, "moves.txt"));

// Part 1
// const result = processMoves(stack, moves);

// Part 2
const result = processMovesPart2(stack, moves);

const topItems = selectFirstItems(result);
console.log("Top stacks are " + topItems);
