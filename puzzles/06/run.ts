import { readLines } from "../common/input";
import { findMarkerEnd } from "./index";

const score = findMarkerEnd(readLines(__dirname)[0]);
console.log("Marker ends at " + score);
