import { notEmpty } from "../common/array";

type Jet = ">" | "<";
const parseJets = (lines: string[]): Jet[] => {
  const line = lines[0];
  const chars = line.split("");
  return chars
    .map((c) => (c === ">" || c === "<" ? (c as Jet) : null))
    .filter(notEmpty);
};
const b = () => void 0;
export { parseJets, b };
