import { readLines } from "../common/input";
import { findMarkerEnd, findMessageEnd } from "./index";

// Part 1
// const score = findMarkerEnd(readLines(__dirname)[0]);

// Part 2
const score = findMessageEnd(readLines(__dirname)[0]);
console.log("Marker ends at " + score);
