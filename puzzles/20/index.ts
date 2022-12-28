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
const shiftRight = (shiftTarget: NumberWrapper): void => {
  const shiftCount = shiftTarget.value;
  let i = 0;
  while (i < shiftCount) {
    const next = shiftTarget.next;
    const previous = shiftTarget.previous;
    const newNext = shiftTarget.next.next;
    shiftTarget.next = newNext;
    shiftTarget.previous = next;
    next.next = shiftTarget;
    next.previous = previous;
    previous.next = next;
    newNext.previous = shiftTarget;
    i++;
  }
};
const shiftLeft = (shiftTarget: NumberWrapper): void => {
  const shiftCount = shiftTarget.value;
  let i = 0;
  while (i > shiftCount) {
    const next = shiftTarget.next;
    const previous = shiftTarget.previous;
    const newPrevious = shiftTarget.previous.previous;
    shiftTarget.previous = newPrevious;
    shiftTarget.next = previous;
    previous.previous = shiftTarget;
    previous.next = next;
    next.previous = previous;
    newPrevious.next = shiftTarget;
    i--;
  }
};

const mixIndex = (
  head: NumberWrapper,
  originalIndex: number
): NumberWrapper => {
  const target = findTarget(head, originalIndex);
  if (target.value === 0) {
    return head;
  } else if (target.value > 0) {
    shiftRight(target);
  } else {
    shiftLeft(target);
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
const renderLinkedList = (head: NumberWrapper): string => {
  const result: string[] = [];
  let current = head;
  while (true) {
    result.push(
      `${current.previous.value} -> ${current.value} -> ${current.next.value}`
    );
    current = current.next;
    if (current === head) {
      break;
    }
    if (result.length > 20) {
      break;
    }
  }
  return result.join(" | ");
};
const mixFile = (numbers: number[]): number[] => {
  let head = buildList(numbers);
  const numberCount = numbers.length;
  let n = 0;
  while (n < numberCount) {
    console.log(n);
    console.log("before");
    console.log(renderLinkedList(head));

    head = mixIndex(head, n);
    console.log("after");
    console.log(renderLinkedList(head));

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
  renderLinkedList,
};

/**
 * const index = wrappers.findIndex((w) => w.originalIndex === n);
    console.log(`${n} at ${index}`);
    const wrapper = wrappers[index];
    const shift = wrapper.value;
    const destinationIndex = (index + shift) % numberCount;
    console.log(`destination ${destinationIndex}`);
    wrapper.modifiedIndex = destinationIndex;
    if (index < destinationIndex) {
      wrapper.modifiedIndex = destinationIndex;
      wrappers.forEach((w) => {
        if (w.modifiedIndex > index && w.originalIndex < destinationIndex) {
          w.modifiedIndex -= 1;
        }
      });
      // const head = wrappers.slice(0, index);
      // const moving = wrappers.slice(index, index + 1);
      // const middle = wrappers.slice(index + 1, destinationIndex);
      // const tail = wrappers.slice(destinationIndex + 1, numberCount);
      // console.log("wrappers before");
      // console.log(wrappers);
      // console.log(head);
      // console.log(middle);
      // console.log(moving);
      // console.log(tail);
      // wrappers = head.concat(middle).concat(moving).concat(tail);
      // console.log("wrappers after");
      // console.log(wrappers);
    }
    if (index > destinationIndex) {
      wrapper.modifiedIndex = destinationIndex;
      wrappers.forEach((w) => {
        if (w.modifiedIndex > index && w.originalIndex < destinationIndex) {
          w.modifiedIndex -= 1;
        }
      });
 */
