import { renderLinkedList } from "./render";

type WrapperBuilder = {
  value: number;
  originalIndex: number;
  previous?: WrapperBuilder;
  next?: WrapperBuilder;
};
type NumberWrapper = {
  value: number;
  originalIndex: number;
  previous: NumberWrapper;
  next: NumberWrapper;
};

const parseLines = (lines: string[]): number[] => {
  return lines.map((l) => parseInt(l)).filter((n) => !isNaN(n));
};
const buildList = (numbers: number[]): NumberWrapper => {
  const builders: WrapperBuilder[] = numbers.map((n, ix) => ({
    value: n,
    originalIndex: ix,
  }));
  builders.forEach((b, ix) => {
    if (ix === 0) {
      b.previous = builders[builders.length - 1];
    } else {
      b.previous = builders[ix - 1];
    }
    if (ix === builders.length - 1) {
      b.next = builders[0];
    } else {
      b.next = builders[ix + 1];
    }
  });
  return builders[0] as NumberWrapper;
};
const findTarget = (head: NumberWrapper, targetIndex: number) => {
  let current = head;
  while (current.originalIndex !== targetIndex) {
    current = current.next;
  }
  return current;
};
const unlink = (head: NumberWrapper): NumberWrapper => {
  const previous = head.previous;
  const next = head.next;
  previous.next = next;
  next.previous = previous;
  return next;
};
const insertBefore = (newItem: NumberWrapper, head: NumberWrapper) => {
  const previous = head.previous;
  newItem.previous = previous;
  previous.next = newItem;
  newItem.next = head;
  head.previous = newItem;
};
const shiftRight = (shiftTarget: NumberWrapper, numberCount: number): void => {
  const shiftCount = shiftTarget.value;
  // const shiftCount = shiftTarget.value % (numberCount - 1);
  let i = 0;
  let newHead = unlink(shiftTarget);
  // console.log(shiftCount);
  // console.log(renderLinkedList(newHead));
  while (i < shiftCount) {
    newHead = newHead.next;
    i++;
  }
  // console.log(renderLinkedList(newHead));
  insertBefore(shiftTarget, newHead);
  // console.log(renderLinkedList(shiftTarget));
};
// [3,2,-1,4] -> [3,2,4] -> [3,-1,2,4]
const shiftLeft = (shiftTarget: NumberWrapper, numberCount: number): void => {
  const shiftCount = shiftTarget.value;
  let i = 0;
  let newHead = unlink(shiftTarget);
  while (i > shiftCount) {
    newHead = newHead.previous;
    i--;
  }
  insertBefore(shiftTarget, newHead);
};

const mixIndex = (
  head: NumberWrapper,
  originalIndex: number,
  numberCount: number
): NumberWrapper => {
  const target = findTarget(head, originalIndex);
  if (target.value === 0) {
    return head;
  } else if (target.value > 0) {
    shiftRight(target, numberCount);
  } else {
    shiftLeft(target, numberCount);
  }
  return head;
};
const listToArray = (head: NumberWrapper): number[] => {
  const result: number[] = [];
  let current = head;
  while (true) {
    result.push(current.value);
    current = current.next;
    if (current === head) {
      break;
    }
    if (result.length > 20) {
      break;
    }
  }
  return result;
};

const mixFile = (numbers: number[]): number[] => {
  let head = buildList(numbers);
  const numberCount = numbers.length;
  let n = 0;
  while (n < numberCount) {
    head = mixIndex(head, n, numberCount);

    n++;
  }
  return listToArray(head);
};
const findCoordinates = (numbers: number[]): number => {
  const numberCount = numbers.length;
  const zeroIndex = numbers.findIndex((n) => n === 0);
  const index1000 = (zeroIndex + 1000) % numberCount;
  const index2000 = (zeroIndex + 2000) % numberCount;
  const index3000 = (zeroIndex + 3000) % numberCount;
  const number1000 = numbers[index1000];
  const number2000 = numbers[index2000];
  const number3000 = numbers[index3000];
  console.log(number1000);
  console.log(number2000);
  console.log(number3000);
  return number1000 + number2000 + number3000;
};
export {
  parseLines,
  mixFile,
  findCoordinates,
  shiftRight,
  shiftLeft,
  buildList,
  NumberWrapper,
  listToArray,
  mixIndex,
};
