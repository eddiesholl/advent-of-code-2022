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
const valueOfHeight = (height: string): number => {
  const realString = height === "S" ? "a" : height === "E" ? "z" : height;
  return realString.charCodeAt(0);
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
    });
  // console.log(`candidates for x:${start.x}, y:${start.y}`);
  // console.log(unvisitedCandidates);
  return unvisitedAndClimbable;
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
