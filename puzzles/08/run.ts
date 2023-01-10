import { readLines } from "../common/input";
import { findHiddenTrees, findMostScenicTree, parseLines } from "./index";

const treeGrid = parseLines(readLines(__dirname));

// Part 1
// const hiddenTrees = findHiddenTrees(treeGrid);
// const totalTrees = treeGrid.length * treeGrid[0].length;
// console.log("Visible tree count is " + (totalTrees - hiddenTrees.length));

// Part 2
const score = findMostScenicTree(treeGrid);
console.log("Most Scenic Tree score is " + score);
