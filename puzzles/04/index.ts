type Range = {
  start: number;
  end: number;
};

const parseRange = (rangeStr: string): Range => {
  const parts = rangeStr.split("-");
  return { start: parseInt(parts[0]), end: parseInt(parts[1]) };
};
const rangeContains = (rLarger: Range, rSmaller: Range): boolean => {
  return rLarger.start <= rSmaller.start && rLarger.end >= rSmaller.end;
};
const rangeLineContained = (line: string): boolean => {
  const rangeStrs = line.split(",");
  if (rangeStrs.length !== 2) {
    return false;
  }
  const r1 = parseRange(rangeStrs[0]);
  const r2 = parseRange(rangeStrs[1]);
  const r1Size = r1.end - r1.start;
  const r2Size = r2.end - r2.start;
  return r1Size > r2Size ? rangeContains(r1, r2) : rangeContains(r2, r1);
};

// Part 2
const rangeLineOverlaps = (line: string): boolean => {
  const rangeStrs = line.split(",");
  if (rangeStrs.length !== 2) {
    return false;
  }
  const r1 = parseRange(rangeStrs[0]);
  const r2 = parseRange(rangeStrs[1]);
  const [lowerRange, upperRange] = r1.start < r2.start ? [r1, r2] : [r2, r1];
  return upperRange.start <= lowerRange.end;
};
const a = (lines: string[]) => lines.filter(rangeLineContained);
export { a, rangeLineOverlaps };
