interface MaxElf {
  number: Number;
  calorieCount: Number;
}

const findMaxElf = (lines: string[]): MaxElf => {
  const result = lines.reduce(
    (prev, curr) => {
      if (curr === "") {
        return {
          ...prev,
          currentElfNumber: prev.currentElfNumber + 1,
          currentCalories: 0,
        };
      } else {
        const currentCalorieValue = parseInt(curr);
        const currentElfCalories = prev.currentCalories + currentCalorieValue;

        if (currentElfCalories > prev.calorieCount) {
          return {
            ...prev,
            number: prev.currentElfNumber,
            currentCalories: currentElfCalories,
            calorieCount: currentElfCalories,
          };
        } else {
          return {
            ...prev,
            currentCalories: currentElfCalories,
          };
        }
      }
    },
    {
      currentElfNumber: 1,
      number: 1,
      currentCalories: 0,
      calorieCount: 0,
    }
  );
  return { number: result.number, calorieCount: result.calorieCount };
};
const displayElf = (elf: MaxElf) =>
  console.log(`Elf ${elf.number} has the most calories, ${elf.calorieCount}`);

export { findMaxElf, displayElf };
