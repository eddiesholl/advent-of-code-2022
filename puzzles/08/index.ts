import { product } from "../common/math";

type Location = {
  x: number;
  y: number;
};
interface Tree extends Location {
  height: number;
}

type TreeRow = Tree[];
type TreeGrid = TreeRow[];

const parseLine = (line: string, y: number): TreeRow =>
  line.split("").map((s, x) => ({ x, y, height: parseInt(s) }));
const parseLines = (lines: string[]): TreeGrid => {
  return lines.map(parseLine).filter((row) => row.length > 0);
};
type SearchResult = {
  distance: number;
  edge: boolean;
};
const findTreeTallerIn =
  (mover: (location: Location) => Location) =>
  (startTree: Tree, treeGrid: TreeGrid): SearchResult => {
    const maxX = treeGrid[0].length;
    const maxY = treeGrid.length;
    let currentLocation: Location = mover(startTree);
    let distance = 1;
    while (
      currentLocation.x >= 0 &&
      currentLocation.x < maxX &&
      currentLocation.y >= 0 &&
      currentLocation.y < maxY
    ) {
      const currentTree = treeGrid[currentLocation.y][currentLocation.x];
      if (currentTree === undefined) {
        console.log("Missing tree at " + JSON.stringify(currentLocation));
      }
      if (currentTree.height >= startTree.height) {
        return { distance, edge: false };
      }
      currentLocation = mover(currentLocation);
      distance++;
    }
    // distance - 1 to wind back the last iteration of the loop, taking us out of bounds
    return { distance: distance - 1, edge: true };
  };
const findTreeTallerNorth = findTreeTallerIn((loc) => ({
  x: loc.x,
  y: loc.y - 1,
}));
const findTreeTallerSouth = findTreeTallerIn((loc) => ({
  x: loc.x,
  y: loc.y + 1,
}));
const findTreeTallerEast = findTreeTallerIn((loc) => ({
  x: loc.x + 1,
  y: loc.y,
}));
const findTreeTallerWest = findTreeTallerIn((loc) => ({
  x: loc.x - 1,
  y: loc.y,
}));
const isTreeHidden = (tree: Tree, treeGrid: TreeGrid): boolean => {
  const north = findTreeTallerNorth(tree, treeGrid);
  const south = findTreeTallerSouth(tree, treeGrid);
  const east = findTreeTallerEast(tree, treeGrid);
  const west = findTreeTallerWest(tree, treeGrid);
  // console.log(tree);
  // console.log(`north:${north} - south:${south} - east:${east} - west:${west}`);

  return [north, south, east, west].every((r) => r.edge === false);
};
const findHiddenTrees = (treeGrid: TreeGrid): Tree[] => {
  const hiddenTrees: Tree[] = [];
  treeGrid.forEach((row, y) => {
    row.forEach((tree, x) => {
      if (isTreeHidden(tree, treeGrid)) {
        hiddenTrees.push(tree);
      }
    });
  });

  return hiddenTrees;
};

// Part 2
const scenicScore = (tree: Tree, treeGrid: TreeGrid): number => {
  const north = findTreeTallerNorth(tree, treeGrid);
  const south = findTreeTallerSouth(tree, treeGrid);
  const east = findTreeTallerEast(tree, treeGrid);
  const west = findTreeTallerWest(tree, treeGrid);

  // console.log(
  //   `${north.distance} ${south.distance} ${east.distance} ${west.distance}`
  // );
  // console.log(`${north.edge} ${south.edge} ${east.edge} ${west.edge}`);

  return product([north, south, east, west].map((r) => r.distance));
};
const findMostScenicTree = (treeGrid: TreeGrid): number => {
  let maxScenicScore = 0;
  treeGrid.forEach((row, y) => {
    row.forEach((tree, x) => {
      maxScenicScore = Math.max(maxScenicScore, scenicScore(tree, treeGrid));
    });
  });

  return maxScenicScore;
};

export {
  parseLines,
  findHiddenTrees,
  TreeGrid,
  scenicScore,
  findMostScenicTree,
};
