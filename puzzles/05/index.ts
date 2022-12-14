type Stack = string[];
export type StackStore = Record<number, Stack>;
const parseStackLine = (store: StackStore) => (line: string) => {
  let charCounter = 0;
  let stackCounter = 1;
  while (charCounter < line.length) {
    const substr = line.substring(charCounter, charCounter + 3);
    const match = substr.match(/\[([A-Z])\]/);
    if (match) {
      const stackToUpdate: Stack = store[stackCounter] || [];
      store[stackCounter] = stackToUpdate.concat(match[1]);
    }
    charCounter += 4;
    stackCounter++;
  }
  return store;
};
const parseStacks = (lines: string[]): StackStore => {
  const stacks: StackStore = {};
  lines.forEach(parseStackLine(stacks));

  return stacks;
};
export type Move = {
  n: number;
  from: number;
  to: number;
};
const parseMoves = (lines: string[]): (Move | undefined)[] =>
  lines.map((line) => {
    const match = line.match(/move (\d+) from (\d+) to (\d+)/);
    if (match) {
      return {
        n: parseInt(match[1]),
        from: parseInt(match[2]),
        to: parseInt(match[3]),
      };
    }
  });

const processMoves = (
  startingStack: StackStore,
  moves: (Move | undefined)[]
): StackStore => {
  const workingStack = {
    ...startingStack,
  };
  // renderStack(workingStack);

  moves.forEach((move) => {
    if (move === undefined) {
      return;
    }
    // renderMove(move);
    // console.log();
    let shiftCounter = 0;
    while (shiftCounter < move.n) {
      const moving = workingStack[move.from].shift();
      if (moving !== undefined) {
        workingStack[move.to].unshift(moving);
      }
      shiftCounter++;
    }
    // renderStack(workingStack);
  });
  return workingStack;
};
const selectFirstItems = (stack: StackStore): string[] =>
  Object.values(stack).map((stack) => stack[0]);

const renderStack = (stackStore: StackStore): void => {
  const stacks = Object.values(stackStore);
  const height = stacks.map((stack) => stack.length).sort((a, b) => b - a)[0];
  const rows = [];
  let rowCounter = 0;
  while (rowCounter < height) {
    const items = stacks
      .map((stack) => stack[rowCounter])
      .map((item) => (item ? "[" + item + "]" : "   "))
      .join(" ");
    rows.push(items);
    rowCounter++;
  }
  const numbers = stacks.map((_stack, ix) => " " + (ix + 1) + " ").join(" ");
  rows.push(numbers);
  console.log(rows.join("\n"));
  // return rows;
};

const renderMove = (move: Move): void => {
  console.log(`move ${move.n} from ${move.from} to ${move.to}`);
};

// Part 2
const processMovesPart2 = (
  startingStack: StackStore,
  moves: (Move | undefined)[]
): StackStore => {
  const workingStack = {
    ...startingStack,
  };
  // renderStack(workingStack);

  moves.forEach((move) => {
    if (move === undefined) {
      return;
    }
    // renderMove(move);
    // console.log();
    const moving = workingStack[move.from].slice(0, move.n);

    workingStack[move.from] = workingStack[move.from].slice(move.n);
    workingStack[move.to] = moving.concat(workingStack[move.to]);
    // renderStack(workingStack);
  });
  return workingStack;
};

export {
  parseStackLine,
  parseStacks,
  parseMoves,
  processMoves,
  selectFirstItems,
  processMovesPart2,
};
