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
type CompareResult = true | false | null;
const comparePacketItems = (
  first: PacketItem,
  second: PacketItem
): CompareResult => {
  console.log(`${JSON.stringify(first)} vs ${JSON.stringify(second)}`);
  if (Array.isArray(first) && Array.isArray(second)) {
    console.log("arrays");
    let ix = 0;
    while (ix < first.length) {
      if (ix === second.length) {
        return false;
      }
      const itemResult = comparePacketItems(first[ix], second[ix]);
      if (itemResult !== null) {
        return itemResult;
      }
      ix++;
    }
    if (first.length < second.length) {
      return true;
    } else if (second.length < first.length) {
      return false;
    }
    return second.length <= first.length;
  } else if (!Array.isArray(first) && !Array.isArray(second)) {
    console.log("literals");
    return first === second ? null : first <= second;
  } else if (!Array.isArray(first)) {
    console.log("brackets on first");
    return comparePacketItems([first], second);
  } else if (!Array.isArray(second)) {
    console.log("brackets on second");
    return comparePacketItems(first, [second]);
  }
  return true;
};
const checkPackets = (packets: PacketPair[]): number[] => {
  return packets
    .filter((pp) => comparePacketItems(pp.first, pp.second) === true)
    .map((p) => p.name);
};
const b = () => void 0;
export { parseLines, checkPackets, comparePacketItems };
