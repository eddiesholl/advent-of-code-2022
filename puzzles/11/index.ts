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
  inspections: number;
};
type GameState = Record<MonkeyId, number[]>;
const processRounds = (monkeys: Monkey[]): Monkey[] => {
  let roundCounter = 0;
  let gameState = createGameState(monkeys);
  while (roundCounter < 20) {
    gameState = processRound(monkeys, gameState);
    roundCounter++;
  }
  return monkeys;
};
const busiestMonkeys = (monkeys: Monkey[]): number[] => {
  return monkeys
    .sort((m1, m2) => m2.inspections - m1.inspections)
    .map((m) => m.inspections);
};
const processRound = (monkeys: Monkey[], gameState: GameState): GameState => {
  const nextState = {
    ...gameState,
  };
  monkeys.forEach((monkey) => {
    const startedWith = gameState[monkey.name];
    startedWith.forEach((n) => {
      const withWorry =
        monkey.operand === "*"
          ? n * monkey.operationValue
          : monkey.operand === "+"
          ? n + monkey.operationValue
          : n * n;
      const bored = Math.floor(withWorry / 3);
      if (bored % monkey.test === 0) {
        nextState[monkey.ifTrue].push(bored);
      } else {
        nextState[monkey.ifFalse].push(bored);
      }
      monkey.inspections = monkey.inspections + 1;
    });
    nextState[monkey.name] = [];
  });
  return nextState;
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
      inspections: 0,
    });
    lineCounter += 7;
  }

  return result;
};
const createGameState = (monkeys: Monkey[]): GameState => {
  const result: GameState = {};
  monkeys.forEach((monkey) => {
    result[monkey.name] = monkey.items;
  });

  return result;
};
export {
  parseInput,
  processRound,
  createGameState,
  busiestMonkeys,
  processRounds,
};
