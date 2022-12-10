import { readLines } from "../common/input";
import { findHiddenTrees, parseLines } from "./index";

const treeGrid = parseLines(readLines(__dirname));
const hiddenTrees = findHiddenTrees(treeGrid);
const totalTrees = treeGrid.length * treeGrid[0].length;
console.log("Visible tree count is " + (totalTrees - hiddenTrees.length));
