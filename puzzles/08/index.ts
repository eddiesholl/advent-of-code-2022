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
const isTreeTallerIn =
  (mover: (location: Location) => Location) =>
  (startTree: Tree, treeGrid: TreeGrid): boolean => {
    const maxX = treeGrid[0].length;
    const maxY = treeGrid.length;
    let currentLocation: Location = mover(startTree);
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
        return true;
      }
      currentLocation = mover(currentLocation);
    }
    return false;
  };
const isTreeTallerNorth = isTreeTallerIn((loc) => ({
  x: loc.x,
  y: loc.y - 1,
}));
const isTreeTallerSouth = isTreeTallerIn((loc) => ({
  x: loc.x,
  y: loc.y + 1,
}));
const isTreeTallerEast = isTreeTallerIn((loc) => ({
  x: loc.x + 1,
  y: loc.y,
}));
const isTreeTallerWest = isTreeTallerIn((loc) => ({
  x: loc.x - 1,
  y: loc.y,
}));
const isTreeHidden = (tree: Tree, treeGrid: TreeGrid): boolean => {
  const north = isTreeTallerNorth(tree, treeGrid);
  const south = isTreeTallerSouth(tree, treeGrid);
  const east = isTreeTallerEast(tree, treeGrid);
  const west = isTreeTallerWest(tree, treeGrid);
  // console.log(tree);
  // console.log(`north:${north} - south:${south} - east:${east} - west:${west}`);

  return north && south && east && west;
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
export { parseLines, findHiddenTrees };
