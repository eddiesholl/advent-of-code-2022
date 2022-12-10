type TreeGrid = number[][];
type Location = {
  x: number;
  y: number;
};
const parseLine = (line: string): number[] =>
  line.split("").map((s) => parseInt(s));
const parseLines = (lines: string[]): TreeGrid => {
  return lines.map(parseLine);
};
const findHiddenTrees = (grid: TreeGrid): Location[] => {
  return [];
};
const b = () => void 0;
export { parseLines, findHiddenTrees };
