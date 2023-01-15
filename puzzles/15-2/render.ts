import { Grid, Span } from "./index";

const pad = (value: string, widthNeeded: number): string => {
  const valWidth = value.length;
  const needed = widthNeeded - valWidth;
  return Array(needed).fill(" ").join("") + value.toString();
};
const spanChar = ({ type }: Span): string =>
  type === "beacon"
    ? "B"
    : type === "sensor"
    ? "S"
    : type === "notBeacon"
    ? "#"
    : " ";

const renderRawSpans = (grid: Grid) => {
  const keys = Object.keys(grid.rows)
    .map((k) => parseInt(k))
    .sort((a, b) => a - b);
  keys.forEach((k) => {
    const span = grid.rows[k];
    console.log(`Row ${k}`);
    let current: Span | undefined = span;
    let p = 0;
    while (current) {
      console.log(
        pad("", 4 * p) +
          ` { start: ${current.start}, end: ${current.end}, type: ${current.type} }`
      );
      p++;
      current = current.next;
    }
  });
};
export const renderGrid = (grid: Grid) => {
  renderRawSpans(grid);
  let y = grid.minY;
  const yPad = Object.keys(grid.rows).reduce(
    (prev, curr) => Math.max(prev, curr.length),
    0
  );
  console.log(`x: ${grid.minX} -> ${grid.maxX}`);
  let x = grid.minX;
  let line = Array(yPad).fill(" ").join("");
  while (x < grid.maxX) {
    line += Math.abs(x % 10);
    x++;
  }
  console.log(line);
  while (y <= grid.maxY) {
    line = pad(y.toString(), yPad);
    x = grid.minX;
    let span: Span | undefined = grid.rows[y];
    while (x <= grid.maxX) {
      if (span === undefined || x < span.start) {
        line += " ";
      } else if (x <= span.end) {
        line += spanChar(span);
      }
      if (span && x === span.end) {
        span = span.next;
      }
      x++;
    }
    console.log(line);
    y++;
  }
};
