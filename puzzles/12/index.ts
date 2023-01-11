import { locationEquals } from "../common/location";

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
type Trail = {
  location: Location;
  path: Location[];
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
      return candidateHeight - currentHeight < 2;
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
  return unvisitedAndClimbable;
};

const findPath = (game: Game): Location[] =>
  findPathFromAny(game, [game.start]);

const findPathFromAny = (
  game: Game,
  startLocations: Location[]
): Location[] => {
  let turnCount = 0;
  const start = { location: game.start, path: [game.start] };
  let currentTrails: Trail[] = startLocations.map((l) => ({
    location: l,
    path: [l],
  }));
  let successfulTrail: Trail | undefined;
  const visited: Location[] = startLocations;
  while (!successfulTrail && turnCount < 500) {
    // console.log(currentTrails.map((t) => t.location));
    const nextTrails = currentTrails.flatMap((t) => {
      const fromHere = getCandidateSteps(t.location, game.map, visited);
      return fromHere.map((nextLocation) => ({
        location: nextLocation,
        path: t.path.concat(nextLocation),
      }));
    });
    const nextLocations = nextTrails.map((t) => t.location);
    visited.push(...nextLocations);
    currentTrails = nextTrails.filter((t, ix, self) => {
      return (
        self.findIndex((other) =>
          locationEquals(t.location)(other.location)
        ) === ix
      );
    });
    successfulTrail = currentTrails.find((t) =>
      locationEquals(t.location)(game.end)
    );
    turnCount++;
  }
  return successfulTrail?.path || [];
};
const findPathFromA = (game: Game): Location[] => {
  const locations: Location[] = [];
  game.map.forEach((r, y) => {
    r.forEach((c, x) => {
      if (c === "a" || c === "S") {
        locations.push({ x, y });
      }
    });
  });

  return findPathFromAny(game, locations);
};
export { parseInput, findPath, getCandidateSteps, findPathFromA };
