import { createMap } from "../common/map";

type OperationMonkey = {
  name: string;
  operator: string;
  a: string;
  b: string;
};
type ValueMonkey = {
  name: string;
  value: number;
};
const isOperation = (monkey: Monkey): monkey is OperationMonkey =>
  (monkey as OperationMonkey).operator !== undefined;
const isValue = (monkey: Monkey): monkey is ValueMonkey =>
  (monkey as ValueMonkey).value !== undefined;
type Monkey = OperationMonkey | ValueMonkey;
const createValue = (
  { name, operator }: OperationMonkey,
  a: number,
  b: number
): ValueMonkey => {
  const value =
    operator === "*"
      ? a * b
      : operator === "/"
      ? a / b
      : operator === "+"
      ? a + b
      : operator === "-"
      ? a - b
      : 0;

  return { name, value };
};
const findRootValue = (monkeys: Monkey[]): number => {
  const monkeyInputs = createMap(monkeys, (m) => m.name);
  const monkeyNames = Object.keys(monkeyInputs);
  const monkeyCount = monkeyNames.length;
  let swapped = true;
  while (swapped) {
    swapped = false;
    let i = 0;
    while (i < monkeyCount) {
      const currentMonkeyName = monkeyNames[i];
      const current = monkeyInputs[currentMonkeyName];
      if (isOperation(current)) {
        const a = monkeyInputs[current.a];
        const b = monkeyInputs[current.b];

        if (isValue(a) && isValue(b)) {
          monkeyInputs[currentMonkeyName] = createValue(
            current,
            a.value,
            b.value
          );
          swapped = true;
        }
      }
      i++;
    }
  }
  const root = monkeyInputs["root"];
  if (isOperation(root)) {
    console.error("ERROR: root has not been evaluated");
    return 0;
  }
  return root.value;
};
const parseLines = (lines: string[]): Monkey[] => {
  const result: Monkey[] = [];
  lines.forEach((line: string) => {
    const operationMatch = line.match(/(\w+): (\w+) ([\+\-\*\/]) (\w+)/);
    if (operationMatch) {
      result.push({
        name: operationMatch[1],
        a: operationMatch[2],
        operator: operationMatch[3],
        b: operationMatch[4],
      });
    } else {
      const valueMatch = line.match(/(\w+): (\d+)/);
      if (valueMatch) {
        result.push({ name: valueMatch[1], value: parseInt(valueMatch[2]) });
      }
    }
  });
  return result;
};
export { parseLines, findRootValue };
