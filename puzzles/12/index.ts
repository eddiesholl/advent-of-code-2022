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
  return shortestPathTo(game.start, game.end, game.map, [], 200) || [];
};
const valueOfHeight = (height: string): number => {
  const realString = height === "S" ? "a" : height === "E" ? "z" : height;
  return realString.charCodeAt(0);
};
const distanceBetween = (a: Location, b: Location): Location => {
  return { x: Math.abs(a.x - b.x), y: Math.abs(a.y - b.y) };
};
const getCandidateSteps = (
  start: Location,
  map: Map,
  visited: Location[]
): Location[] => {
  const candidates = [];
  const currentHeight = valueOfHeight(map[start.y][start.x]);
  // console.log(`Start x:${start.x} y:${start.y}`);
  // console.log("height " + currentHeightNumber);
  const candidateUp = { x: start.x, y: start.y - 1 };
  const candidateRight = { x: start.x + 1, y: start.y };
  const candidateDown = { x: start.x, y: start.y + 1 };
  const candidateLeft = { x: start.x - 1, y: start.y };

  start.y > 0 && candidates.push(candidateUp);
  start.x < map[0].length - 1 && candidates.push(candidateRight);
  start.y < map.length - 1 && candidates.push(candidateDown);
  start.x > 0 && candidates.push(candidateLeft);

  const unvisitedAndClimbable = candidates
    .filter((loc) => !visited.some((v) => v.x === loc.x && v.y === loc.y))
    .filter((loc) => {
      const candidateHeight = valueOfHeight(map[loc.y][loc.x]);
      // console.log(`Candidate x:${loc.x} y:${loc.y}`);
      // console.log("candidate height " + candidateHeight.charCodeAt(0));
      return candidateHeight - currentHeight < 2;
      // console.log(canClimb);
    })
    .sort((a, b) => {
      const aChar = map[a.y][a.x];
      const bChar = map[b.y][b.x];
      if (aChar === "E") {
        return -1;
      }
      if (bChar === "E") {
        return 1;
      }
      return valueOfHeight(bChar) - valueOfHeight(aChar);
    });
  // console.log(`candidates for x:${start.x}, y:${start.y}`);
  // console.log(unvisitedCandidates);
  return unvisitedAndClimbable;
};
const logLocation = (l: Location, msg: string) => {
  if (msg) {
    // console.log(msg);
  }
  // console.log(`x: ${l.x}, y:${l.y}`);
};
const shortestPathTo = (
  start: Location,
  end: Location,
  map: Map,
  visited: Location[],
  bailDepth: number
): Location[] | null => {
  logLocation(start, "Starting with loc:");
  if (start.x === end.x && start.y === end.y) {
    // console.log("found it");
    // console.log(visited);
    console.log("terminate at length " + visited.length);
    return visited;
  }
  if (visited.length > bailDepth) {
    console.log("bailing at depth " + bailDepth);
    return null;
  }
  const candidateSteps = getCandidateSteps(start, map, visited);
  if (candidateSteps.length === 0) {
    // console.log("bailing because no candidate steps");
    const delta = distanceBetween(start, end);
    // console.log(`x: ${delta.x} - y: ${delta.y}`);
    // console.log(visited);
    return null;
  }
  const nextVisited = visited.concat(start);
  let bestPath: Location[] | null = null;
  candidateSteps.forEach((nextLocation) => {
    logLocation(nextLocation, "trying nextLocation");
    logLocation(start, "within start");

    const nextBailDepth = bestPath
      ? Math.min(bailDepth, bestPath.length)
      : bailDepth;
    const nextResult = shortestPathTo(
      nextLocation,
      end,
      map,
      nextVisited,
      nextBailDepth
    );
    if (
      nextResult !== null &&
      (bestPath === null || nextResult.length < bestPath.length)
    ) {
      console.log("updating bestPath to " + nextResult.length);
      bestPath = nextResult;
    }
  });
  // console.log("return bestPath with length " + (bestPath || []).length);
  return bestPath;
};
export { parseInput, findPath, getCandidateSteps };
