// A = Rock, B = Paper, C = Scissors
type OpponentChoice = "A" | "B" | "C";
// X = Rock, Y = Paper, Z = Scissors
type MyChoice = "X" | "Y" | "Z";

type Round = {
  opponentChoice: OpponentChoice;
  myChoice: MyChoice;
};
const MyChoiceScores: Record<MyChoice, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};
const handsIWin: Record<OpponentChoice, MyChoice> = {
  A: "Y",
  B: "Z",
  C: "X",
};
const equalChoices: Record<OpponentChoice, MyChoice> = {
  A: "X",
  B: "Y",
  C: "Z",
};
// const scoreMyChoice = (myChoice: MyChoice) => myCh
const doIWin = (opponentChoice: OpponentChoice, myChoice: MyChoice) =>
  handsIWin[opponentChoice] === myChoice;
const scoreResult = (opponentChoice: OpponentChoice, myChoice: MyChoice) =>
  equalChoices[opponentChoice] === myChoice
    ? 3
    : doIWin(opponentChoice, myChoice)
    ? 6
    : 0;
const scoreRound = (round?: Round): number =>
  round
    ? MyChoiceScores[round.myChoice] +
      scoreResult(round.opponentChoice, round.myChoice)
    : 0;

const parseLine = (line: string) => {
  const parts = line.split(" ");
  if (parts.length === 2) {
    return {
      opponentChoice: parts[0] as OpponentChoice,
      myChoice: parts[1] as MyChoice,
    };
  }
};

const sumValues = (prev: number, curr: number) => {
  console.log(prev);
  return prev + curr;
};
const calculateScores = (lines: string[]): number => {
  return lines
    .map(parseLine)
    .filter((p) => p !== undefined)
    .map(scoreRound)
    .reduce(sumValues, 0);
};

export { calculateScores, scoreRound, scoreResult, parseLine };
