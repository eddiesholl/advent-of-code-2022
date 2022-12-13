type PacketItem = number | PacketItem[];
type Packet = PacketItem[];
type PacketPair = {
  name: number;
  first: Packet;
  second: Packet;
};
const parsePacket = (line: string): Packet => JSON.parse(line) as Packet;
const parseLines = (lines: string[]): PacketPair[] => {
  const result = [];
  let lineCounter = 0;
  let resultCounter = 1;
  while (lineCounter < lines.length) {
    const l1 = lines[lineCounter];
    const l2 = lines[lineCounter + 1];
    result.push({
      name: resultCounter,
      first: parsePacket(l1),
      second: parsePacket(l2),
    });
    lineCounter += 3;
    resultCounter++;
  }
  return result;
};
const b = () => void 0;
export { parseLines, b };
