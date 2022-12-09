import { readLines } from "../common/input";
import {
  parseMoves,
  parseStacks,
  processMoves,
  selectFirstItems,
} from "./index";

const stack = parseStacks(readLines(__dirname, "stacks.txt"));
const moves = parseMoves(readLines(__dirname, "moves.txt"));
const result = processMoves(stack, moves);
const topItems = selectFirstItems(result);
console.log("Top stacks are " + topItems);
