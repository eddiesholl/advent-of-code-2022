import { readLines } from "../common/input";
import { sumValues } from "../common/math";
import {
  calculateDirectorySize,
  findSmallDirectories,
  parseCommands,
} from "./index";

const rootDir = parseCommands(readLines(__dirname));
calculateDirectorySize(rootDir);
const smallDirs = findSmallDirectories(rootDir);
const smallDirsSize = smallDirs.map((d) => d.totalSize).reduce(sumValues, 0);
console.log("Score is " + smallDirsSize);
