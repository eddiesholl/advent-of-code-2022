import { notEmpty } from "../common/array";

type ValveDescription = {
  name: string;
  rate: number;
  linked: string[];
};
const parseLines = (lines: string[]): ValveDescription[] =>
  lines
    .map((l) => {
      const match = l.match(
        /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w|,|\s]+)/
      );
      if (match) {
        return {
          name: match[1],
          rate: parseInt(match[2]),
          linked: match[3].split(", "),
        };
      }
    })
    .filter(notEmpty);
const b = () => void 0;
export { parseLines, b };
