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
const parseLines = (lines: string[]): number[] => lines.map(parseInt);
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
  console.log("searching for originalIndex ===  " + targetIndex);
  console.log(listToArray(head));
  while (current.originalIndex !== targetIndex) {
    current = current.next;
  }
  console.log("found item for " + targetIndex);
  console.log(current);
  return current;
};
const shiftRight = (shiftTarget: NumberWrapper): void => {
  console.log("shiftRight");
  const shiftCount = shiftTarget.value;
  let i = 0;
  let destination = shiftTarget;
  while (i < shiftCount) {
    destination = destination.next;
    i++;
  }
  const oldPrev = shiftTarget.previous;
  const oldNext = shiftTarget.next;
  const newNext = destination.next;
  const newPrev =
    destination.previous === shiftTarget ? destination : destination.previous;
  shiftTarget.next = newNext;
  shiftTarget.previous = newPrev;
  destination.next = shiftTarget;
  destination.previous = oldPrev;
  oldPrev.next = oldNext;
  newNext.previous = shiftTarget;
};
const shiftLeft = (shiftTarget: NumberWrapper): void => {
  console.log("shiftLeft");
  const shiftCount = shiftTarget.value;
  let i = 0;
  let destination = shiftTarget;
  while (i > shiftCount) {
    destination = destination.previous;
    i--;
  }
  const oldPrev = shiftTarget.previous;
  const oldNext = shiftTarget.next;
  const newNext = destination;
  const newPrev = destination.previous; // REVISIT move by -1
  shiftTarget.next = newNext;
  shiftTarget.previous = newPrev;
  destination.previous = shiftTarget;
  oldPrev.next = oldNext;
  newPrev.next = shiftTarget;
};

const mixIndex = (
  head: NumberWrapper,
  originalIndex: number
): NumberWrapper => {
  const target = findTarget(head, originalIndex);
  if (target.value === 0) {
    console.log("target === 0");
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
    head = mixIndex(head, n);
    console.log(renderLinkedList(head));

    n++;
  }
  return listToArray(head);
};
const findCoordinates = (numbers: number[]): number => {
  return 0;
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
