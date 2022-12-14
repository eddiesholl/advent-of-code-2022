import { readLines } from "../common/input";
import { sumValues } from "../common/math";
import { checkPackets, parseLines } from "./index";

const score = checkPackets(parseLines(readLines(__dirname))).reduce(
  sumValues,
  0
);
console.log("Score is " + score);
