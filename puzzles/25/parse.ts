import { Elf } from "./index";

const parseLines = (lines: string[]): Elf[] => {
  const result: Elf[] = [];
  lines.reverse().forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") {
        result.push({ x, y });
      }
    });
  });
  return result;
};

export { parseLines };
