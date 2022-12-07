import fs from "fs";
import path from "path";

const readLines = (inputFolder: string, inputFileName: string = "input.txt") =>
  fs
    .readFileSync(path.join(inputFolder, inputFileName), "utf-8")
    .split(/\r?\n/);

export { readLines };
