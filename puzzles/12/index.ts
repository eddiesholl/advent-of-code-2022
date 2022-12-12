type Height = string;
type MapRow = Height[];
type Map = MapRow[];
type Location = {
  x: number;
  y: number;
};
type Game = {
  start: Location;
  end: Location;
  map: Map;
};
const parseInput = (lines: string[]): Game => {
  const map: Map = [];
  let start: Location = { x: 0, y: 0 };
  let end: Location = { x: 0, y: 0 };
  lines
    .filter((l) => l !== "")
    .forEach((line, iy) => {
      const heights = line.split("");
      map.push(heights);
      const indexS = heights.indexOf("S");
      if (indexS > -1) {
        start = { x: indexS, y: iy };
      }
      const indexE = heights.indexOf("E");
      if (indexE > -1) {
        end = { x: indexE, y: iy };
      }
    });
  return { start, end, map };
};
const b = () => void 0;
export { parseInput, b };
