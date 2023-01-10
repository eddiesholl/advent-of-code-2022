import { readLines } from "../common/input";
import { sumValues } from "../common/math";
import {
  calculateDirectorySize,
  findDeleteTarget,
  findSmallDirectories,
  parseCommands,
} from "./index";

const rootDir = parseCommands(readLines(__dirname));
calculateDirectorySize(rootDir);

// Part 1
// const smallDirs = findSmallDirectories(rootDir);
// const smallDirsSize = smallDirs.map((d) => d.totalSize).reduce(sumValues, 0);

// Part 2
const deleteTarget = findDeleteTarget(rootDir);
console.log("Score is " + deleteTarget?.totalSize);
