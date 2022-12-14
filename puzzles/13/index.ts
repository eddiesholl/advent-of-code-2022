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
const log = (msg: string, depth: number): void => {
  // console.log(Array(depth).fill("  ").join("") + msg);
};
const comparePacketItems = (
  first: PacketItem,
  second: PacketItem,
  depth: number = 0
): CompareResult => {
  log(`Compare ${JSON.stringify(first)} vs ${JSON.stringify(second)}`, depth);
  if (Array.isArray(first) && Array.isArray(second)) {
    let ix = 0;
    while (ix < first.length) {
      if (ix === second.length) {
        log(
          "Right side ran out of items, so inputs are not in the right order",
          depth
        );
        return false;
      }
      const itemResult = comparePacketItems(first[ix], second[ix], depth + 1);
      if (itemResult !== null) {
        return itemResult;
      }
      ix++;
    }
    if (first.length < second.length) {
      log(
        "Left side ran out of items, so inputs are in the right order",
        depth
      );
      return true;
    } else if (second.length < first.length) {
      log(
        "Right side ran out of items, so inputs are not in the right order",
        depth
      );
      return false;
    }
    return null;
  } else if (!Array.isArray(first) && !Array.isArray(second)) {
    if (first < second) {
      log("Left side is smaller, so inputs are in the right order", depth + 1);
      return true;
    }
    if (second < first) {
      log(
        "Right side is smaller, so inputs are not in the right order",
        depth + 1
      );
      return false;
    }
    return null;
  } else if (!Array.isArray(first)) {
    log("Mixed types; convert left to [] and retry comparison", depth);
    return comparePacketItems([first], second, depth);
  } else if (!Array.isArray(second)) {
    log("Mixed types; convert right to [] and retry comparison", depth);
    return comparePacketItems(first, [second], depth);
  }
  return null;
};
const checkPackets = (packets: PacketPair[]): number[] => {
  return packets
    .filter((pp) => comparePacketItems(pp.first, pp.second, 0) === true)
    .map((p) => p.name);
};
const b = () => void 0;
export { parseLines, checkPackets, comparePacketItems };
