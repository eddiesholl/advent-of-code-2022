type MonkeyId = number;
type Operand = "*" | "+" | "^";
type Monkey = {
  name: MonkeyId;
  items: number[];
  operand: Operand;
  operationValue: number;
  test: number;
  ifTrue: MonkeyId;
  ifFalse: MonkeyId;
};
const parseInput = (lines: string[]): Monkey[] => {
  const result: Monkey[] = [];
  let lineCounter = 0;
  while (lines.length > lineCounter + 6) {
    const monkeyLines = lines.slice(lineCounter, lineCounter + 6);
    const name = parseInt((monkeyLines[0].match(/Monkey (\d+)/) || [])[1]);
    const items = (monkeyLines[1].match(/Starting items: ([\d, ]+)/) || [])[1]
      .split(", ")
      .map((i) => parseInt(i));
    const opMatch =
      monkeyLines[2].match(/Operation: new = old (\*|\+) (\d+|old)/) || [];
    const operand = opMatch[2] === "old" ? "^" : (opMatch[1] as Operand);
    const operationValue = opMatch[2] === "old" ? 1 : parseInt(opMatch[2]);
    const test = parseInt(
      (monkeyLines[3].match(/Test: divisible by (\d+)/) || [])[1]
    );
    const ifTrue = parseInt(
      (monkeyLines[4].match(/If true: throw to monkey (\d+)/) || [])[1]
    );
    const ifFalse = parseInt(
      (monkeyLines[5].match(/If false: throw to monkey (\d+)/) || [])[1]
    );
    result.push({
      name,
      items,
      operand,
      operationValue,
      test,
      ifTrue,
      ifFalse,
    });
    lineCounter += 7;
  }

  return result;
};
const b = () => void 0;
export { parseInput, b };
