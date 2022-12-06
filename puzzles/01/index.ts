import { open } from "node:fs/promises";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const file = await open(path.join(__dirname, "input.txt"));

const inputPath = path.join(__dirname, "input.txt");
type MaxElf = {
  number: Number;
  calorieCount: Number;
};
const readLines = () => fs.readFileSync(inputPath, "utf-8").split(/\r?\n/);
const findMaxElf = (lines: string[]): MaxElf => {
  const result = lines.reduce(
    (prev, curr) => {
      if (curr === "") {
        console.log("empty line");
        return {
          ...prev,
          currentElfNumber: prev.currentElfNumber + 1,
          currentCalories: 0,
        };
      } else {
        const currentCalorieValue = parseInt(curr);
        const currentElfCalories = prev.currentCalories + currentCalorieValue;

        console.log(currentElfCalories);
        console.log(prev.maxCalories);
        if (currentElfCalories > prev.maxCalories) {
          console.log("new max");
          return {
            ...prev,
            maxElfNumber: prev.currentElfNumber,
            currentCalories: currentElfCalories,
            maxCalories: currentElfCalories,
          };
        } else {
          console.log("keep max");
          return {
            ...prev,
            currentCalories: currentElfCalories,
          };
        }
      }
    },
    {
      currentElfNumber: 1,
      maxElfNumber: 1,
      currentCalories: 0,
      maxCalories: 0,
    }
  );
  return {
    number: result.maxElfNumber,
    calorieCount: result.maxCalories,
  };
};
const displayElf = (elf: MaxElf) =>
  console.log(`Elf ${elf.number} has the most calories, ${elf.calorieCount}`);

export { findMaxElf, readLines, displayElf };
