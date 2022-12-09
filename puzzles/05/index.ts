const a = (lines: string[]) => void 0;
const b = () => void 0;
type Stack = {
  number: number;
  items: string[];
};
type StackStore = Record<number, Stack>;
const parseStackLine = (store: StackStore) => (line: string) => {
  let charCounter = 0;
  let stackCounter = 1;
  while (charCounter < line.length) {
    const substr = line.substring(charCounter, charCounter + 3);
    const match = substr.match(/\[([A-Z])\]/);
    if (match) {
      const stackToUpdate = store[stackCounter] || {
        number: stackCounter,
        items: [],
      };
      store[stackCounter] = {
        number: stackCounter,
        items: stackToUpdate.items.concat(match[1]),
      };
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
export { a, b, parseStackLine };
