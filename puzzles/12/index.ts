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
const findPath = (game: Game): Location[] => {
  return shortestPathTo(game.start, game.end, game.map, []) || [];
};
const getCandidateSteps = (
  start: Location,
  map: Map,
  visited: Location[]
): Location[] => {
  // console.log(map[0].length - 1);
  const candidates = [];
  const hasLeftBuffer = start.x > 0;
  const hasRightBuffer = start.x < map[0].length - 1;
  const hasTopBuffer = start.y > 0;
  const hasBottomBuffer = start.y < map.length - 1;

  // hasTopBuffer &&
  //   hasLeftBuffer &&
  //   candidates.push({ x: start.x - 1, y: start.y - 1 });
  hasTopBuffer && candidates.push({ x: start.x, y: start.y - 1 });
  // hasTopBuffer &&
  //   hasRightBuffer &&
  //   candidates.push({ x: start.x + 1, y: start.y + 1 });
  hasRightBuffer && candidates.push({ x: start.x + 1, y: start.y });
  // hasRightBuffer &&
  //   hasBottomBuffer &&
  //   candidates.push({ x: start.x + 1, y: start.y + 1 });
  hasBottomBuffer && candidates.push({ x: start.x, y: start.y + 1 });
  // hasBottomBuffer &&
  //   hasLeftBuffer &&
  //   candidates.push({ x: start.x - 1, y: start.y + 1 });
  hasLeftBuffer && candidates.push({ x: start.x - 1, y: start.y });

  const unvisitedCandidates = candidates.filter(
    (loc) => !visited.some((v) => v.x === loc.x && v.y === loc.y)
  );
  // console.log(`candidates for x:${start.x}, y:${start.y}`);
  // console.log(unvisitedCandidates);
  return unvisitedCandidates;
};
const shortestPathTo = (
  start: Location,
  end: Location,
  map: Map,
  visited: Location[]
): Location[] | null => {
  if (start.x === end.x && start.y === end.y) {
    // console.log("found it");
    // console.log(visited);
    return visited;
  }
  const candidateSteps = getCandidateSteps(start, map, visited);
  if (candidateSteps.length === 0) {
    return null;
  }
  const nextVisited = visited.concat(start);
  const pathsToEnd = candidateSteps
    .map((nextLocation) => shortestPathTo(nextLocation, end, map, nextVisited))
    .filter((l) => l !== null)
    .sort((l1, l2) => {
      if (l1 !== null && l2 !== null) {
        return l1.length - l2.length;
      } else if (l1 === null) {
        return 1;
      } else {
        return -1;
      }
    });
  if (pathsToEnd.length === 0) {
    return null;
  } else {
    return pathsToEnd[0];
  }
};
export { parseInput, findPath };
