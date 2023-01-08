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

// Part 2
type Choice = {
  score: number;
  beats: Choice;
  beaten: Choice;
};
const rockChoice = {
  score: 1,
} as Choice;
const scissorsChoice = {
  score: 3,
} as Choice;
const paperChoice = {
  score: 2,
  beats: rockChoice,
  beaten: scissorsChoice,
};
rockChoice.beats = scissorsChoice;
rockChoice.beaten = paperChoice;
scissorsChoice.beats = paperChoice;
scissorsChoice.beaten = rockChoice;
// X = lose, Y = draw, Z = win
const scoreRoundPart2 = (round?: Round): number => {
  if (round) {
    const theirs =
      round.theirs === "A"
        ? rockChoice
        : round.theirs === "B"
        ? paperChoice
        : scissorsChoice;
    const tuple: [Choice, number] =
      round.mine === "X"
        ? [theirs.beats, 0]
        : round.mine === "Y"
        ? [theirs, 3]
        : [theirs.beaten, 6];
    return tuple[0].score + tuple[1];
  } else {
    return 0;
  }
};

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

const calculateScoresPart2 = (lines: string[]): number => {
  return lines.map(parseLine).map(scoreRoundPart2).reduce(sumValues, 0);
};

export {
  calculateScores,
  calculateScoresPart2,
  scoreRound,
  scoreRoundPart2,
  scoreResult,
  parseLine,
};
