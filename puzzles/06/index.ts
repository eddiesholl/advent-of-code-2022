const findStartUniqueSequence =
  (seqLength: number) =>
  (line: string): number => {
    let head = line.slice(0, seqLength);
    let tail = line.slice(seqLength);
    let charCounter = seqLength;
    while (hasDupes(head) && tail.length > 0) {
      head = head.slice(1).concat(tail[0]);
      tail = tail.slice(1);
      charCounter++;
    }
    return charCounter;
  };

const findMarkerEnd = findStartUniqueSequence(4);

// Part 2
// mjqjpqmgbljsphdztnvjfqwrcgsmlb
// 123456789012345678901234567890
// ...jpqmgbljsphdztnv
const findMessageEnd = findStartUniqueSequence(14);

const hasDupes = (line: string): boolean => {
  const arr = line.split("");
  return arr.some((c, ix) => arr.indexOf(c, ix + 1) > -1);
};
export { findMarkerEnd, hasDupes, findMessageEnd };
