import { Elf, elfId } from "./index";

const PAD = 2;
const renderElfs = (elfs: Elf[], round: number) => {
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
  const elfIds = new Set<string>();
  elfs.forEach((e) => elfIds.add(elfId(e)));
  // console.log(elfs);
  console.log(`== End of Round ${round} ==`);
  let y = yMax + PAD;
  while (y >= yMin - PAD) {
    let line = "";
    let x = xMin - PAD;
    while (x <= xMax + PAD) {
      if (elfIds.has(elfId({ x, y }))) {
        line += "#";
      } else {
        line += ".";
      }
      x++;
    }
    console.log(line);
    y--;
  }
};

export { renderElfs };
