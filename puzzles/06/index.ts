const findMarkerEnd = (line: string): number => {
  let head = line.slice(0, 4);
  let tail = line.slice(4);
  let charCounter = 4;
  while (hasDupes(head) && tail.length > 4) {
    head = head.slice(1).concat(tail[0]);
    tail = tail.slice(1);
    charCounter++;
  }
  return charCounter;
};

// Part 2
// mjqjpqmgbljsphdztnvjfqwrcgsmlb
// 123456789012345678901234567890
// ...jpqmgbljsphdztnv
const findMessageEnd = (line: string): number => {
  let head = line.slice(0, 14);
  let tail = line.slice(14);
  let charCounter = 14;
  while (hasDupes(head) && tail.length > 0) {
    head = head.slice(1).concat(tail[0]);
    tail = tail.slice(1);
    charCounter++;
  }
  return charCounter;
};

const hasDupes = (line: string): boolean => {
  const arr = line.split("");
  return arr.some((c, ix) => arr.indexOf(c, ix + 1) > -1);
};
export { findMarkerEnd, hasDupes, findMessageEnd };
