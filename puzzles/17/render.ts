import { chamberWidth, GameState, Row } from "./index";

const renderState = (state: GameState) => {
  let h = state.chamber.length + 5;
  let x = 0;
  let currentRow: Row;
  console.log(state.chamber.length);
  console.log(state.activeRock);
  while (h >= 0) {
    currentRow = state.chamber[h];
    let rowString = (h % 10).toString();
    x = 0;
    const fallingH = h - state.activeRock.location.y;
    const fallingRow =
      fallingH > -1 &&
      state.activeRock.shape[state.activeRock.shape.length - fallingH - 1];
    while (x < chamberWidth) {
      const fixedRock = currentRow && currentRow.has(x);
      const fallingRock =
        fallingRow && fallingRow.has(x - state.activeRock.location.x);
      rowString = rowString + (fixedRock ? "#" : fallingRock ? "@" : ".");
      x++;
    }
    rowString = rowString + "|";
    console.log(rowString);
    h--;
  }
  console.log("---------");
  console.log("");
};

export { renderState };
