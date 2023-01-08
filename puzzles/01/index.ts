import { sum } from "../common/math";

interface Elf {
  number: number;
  calorieCount: number;
}
type ElfAccumulator = {
  currentElf: Elf;
  elfs: Elf[];
};

const calculateElfs = (lines: string[]): Elf[] => {
  const firstElf = { number: 1, calorieCount: 0 };
  const acc: ElfAccumulator = {
    currentElf: firstElf,
    elfs: [firstElf],
  };
  const result = lines.reduce((prev, curr) => {
    let last: Elf | undefined = prev.slice(-1)[0];
    if (curr === "") {
      const newElf = {
        number: (last === undefined ? 0 : last.number) + 1,
        calorieCount: 0,
      };
      return prev.concat(newElf);
    } else {
      const currentCalorieValue = parseInt(curr);
      if (last === undefined) {
        last = { number: 1, calorieCount: 0 };
        prev.push(last);
      }
      last.calorieCount += currentCalorieValue;
      return prev;
    }
  }, [] as Elf[]);

  return result.sort((a, b) => b.calorieCount - a.calorieCount);
};

const findTop3 = (lines: string[]): number => {
  const elfs = calculateElfs(lines);
  const topElfs = elfs.slice(0, 3);
  console.log(topElfs);
  return sum(topElfs.map((e) => e.calorieCount));
};

const findMaxElf = (lines: string[]): Elf => {
  const elfs = calculateElfs(lines);
  const result = elfs[0];
  return result;
};
const displayElf = (elf: Elf) =>
  console.log(`Elf ${elf.number} has the most calories, ${elf.calorieCount}`);

export { findMaxElf, displayElf, findTop3 };
