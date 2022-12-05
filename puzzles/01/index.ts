import { open } from "node:fs/promises";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = await open(path.join(__dirname, "input.txt"));

const inputLines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split(/\r?\n/);

let currentElf = 1;
let maxElfNumber = 1;
let maxElfCalorieCount = 0;
let currentElfCalories = 0;
for (const line of inputLines) {
  if (line === "") {
    // if the line is blank, move to the next elf
    currentElf++;
    currentElfCalories = 0;
  } else {
    // else update the current elf calorie total
    const currentCalorieValue = parseInt(line);
    currentElfCalories += currentCalorieValue;

    if (currentElfCalories > maxElfCalorieCount) {
      maxElfNumber = currentElf;
      maxElfCalorieCount = currentElfCalories;
      console.log(currentCalorieValue);
    }
  }
}

console.log(maxElfNumber);
console.log(maxElfCalorieCount);
