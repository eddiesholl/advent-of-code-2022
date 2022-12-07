import { sumValues } from "../common/math";

// A = Rock, B = Paper, C = Scissors
type OpponentChoice = "A" | "B" | "C";
// X = Rock, Y = Paper, Z = Scissors
type MyChoice = "X" | "Y" | "Z";

type Round = {
  theirs: OpponentChoice;
  mine: MyChoice;
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
const doIWin = (round: Round) => handsIWin[round.theirs] === round.mine;
const scoreResult = (round: Round) =>
  equalChoices[round.theirs] === round.mine ? 3 : doIWin(round) ? 6 : 0;
const scoreRound = (round?: Round): number =>
  round ? MyChoiceScores[round.mine] + scoreResult(round) : 0;

const parseLine = (line: string) => {
  const parts = line.split(" ");
  if (parts.length === 2) {
    return {
      theirs: parts[0] as OpponentChoice,
      mine: parts[1] as MyChoice,
    };
  }
};

const calculateScores = (lines: string[]): number => {
  return lines.map(parseLine).map(scoreRound).reduce(sumValues, 0);
};

export { calculateScores, scoreRound, scoreResult, parseLine };
