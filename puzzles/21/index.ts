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
type MonkeyMap = Record<string, Monkey>;
const createValue = (
  op: OperationMonkey,
  a: ValueMonkey,
  b: ValueMonkey
): ValueMonkey => {
  let value: number = 0;
  switch (op.operator) {
    case "*":
      value = a.value * b.value;
      break;
    case "/":
      value = a.value / b.value;
      break;
    case "+":
      value = a.value + b.value;
      break;
    case "-":
      value = a.value - b.value;
      break;
  }
  return { name: op.name, value };
};
const findRootValue = (monkeys: Monkey[]): number => {
  const monkeyInputs: MonkeyMap = {};
  monkeys.forEach((m) => (monkeyInputs[m.name] = m));
  const monkeyNames = Object.keys(monkeyInputs);
  const monkeyCount = monkeyNames.length;
  let swapped = true;
  while (swapped) {
    swapped = false;
    let i = 0;
    let current: Monkey;
    while (i < monkeyCount) {
      const currentMonkeyName = monkeyNames[i];
      current = monkeyInputs[currentMonkeyName];
      if (isOperation(current)) {
        const a = monkeyInputs[current.a];
        const b = monkeyInputs[current.b];

        if (isValue(a) && isValue(b)) {
          monkeyInputs[currentMonkeyName] = createValue(current, a, b);
          swapped = true;
        }
      }
      i++;
    }
  }
  const root = monkeyInputs["root"];
  if (isOperation(root)) {
    console.log("root has not been evaluated");
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
const b = () => void 0;
export { parseLines, findRootValue };
