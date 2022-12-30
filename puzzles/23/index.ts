type Location = {
  x: number;
  y: number;
};
type Elf = {
  name: number;
  x: number;
  y: number;
};
const processMoves = (elfs: Elf[]): Elf[] => {
  return elfs;
};
const calculateScore = (elfs: Elf[]): number => {
  const { xMin, yMin, xMax, yMax } = elfs.reduce(
    (prev, curr: Elf) => {
      return {
        xMin: Math.min(curr.x, prev.xMin),
        xMax: Math.max(curr.x, prev.xMax),
        yMin: Math.min(curr.y, prev.yMin),
        yMax: Math.max(curr.y, prev.yMax),
      };
    },
    { xMin: Infinity, yMin: Infinity, xMax: 0, yMax: 0 }
  );
  return (xMax - xMin) * (yMax - yMin);
};
export { Elf, Location, processMoves, calculateScore };
