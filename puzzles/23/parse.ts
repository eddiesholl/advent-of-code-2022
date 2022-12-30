import { Elf } from "./index";

const parseLines = (lines: string[]): Elf[] => {
  const result: Elf[] = [];
  lines.reverse().forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") {
        result.push({ name: result.length, x, y });
      }
    });
  });
  return result;
};

export { parseLines };
