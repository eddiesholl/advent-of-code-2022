type Noop = null;
type Addx = number;
type Instruction = Noop | Addx;

const parseLines = (lines: string[]): Instruction[] => {
  const addMatcher = /addx (-?\d+)/;
  return lines.map((line) => {
    const match = line.match(addMatcher);
    if (match) {
      return parseInt(match[1]);
    } else {
      return null;
    }
  });
};
const processInstructions = (instructions: Instruction[]): number[] => {
  let registerValue = 1;
  const registerValues: number[] = [1];
  instructions.forEach((instruction, iix) => {
    if (instruction !== null) {
      const nextRegisterValue = registerValue + instruction;
      registerValues.push(registerValue, nextRegisterValue);
      registerValue = nextRegisterValue;
    } else {
      registerValues.push(registerValue);
    }
  });
  return registerValues;
};
const getSignalStrength = (values: number[]): number => {
  return values.reduce((prev, curr, ix) => {
    if ([20, 60, 100, 140, 180, 220].includes(ix + 1)) {
      return prev + curr * (ix + 1);
    } else {
      return prev;
    }
  }, 0);
};

// Part 2
const renderCrt = (values: number[]): void => {
  let line = "";
  // let n = 0;
  // while (n < 40) {
  //   line += n % 10;
  //   n++;
  // }
  // console.log(values);
  // console.log(line);
  // console.log("-----");
  // line = "";
  values.forEach((v, ix) => {
    const x = ix % 40;
    if (x === 0 && ix > 0) {
      console.log(line);
      line = "";
    }
    if ([x - 1, x, x + 1].includes(v)) {
      line += "#";
    } else {
      line += " ";
    }
  });
};
export {
  parseLines,
  processInstructions,
  getSignalStrength,
  Instruction,
  renderCrt,
};
