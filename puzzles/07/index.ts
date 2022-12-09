import { sumValues } from "../common/math";

export type File = {
  name: string;
  size: number;
};
type Directory = {
  name: string;
  files: File[];
  children: Directory[];
  parent: Directory | null;
  totalSize?: number;
};

const parseCommands = (lines: string[]): Directory => {
  const rootDir: Directory = {
    children: [],
    files: [],
    name: "/",
    parent: null,
  };
  let currentDirectory = rootDir;
  lines.forEach((line) => {
    const action = parseLine(line);
    switch (action.kind) {
      case "directory":
        //REVISIT: Find better way to deal with starting edge case
        if (action.name === "/") {
          currentDirectory = rootDir;
          break;
        }
        const possibleNextDir = currentDirectory.children.find(
          (d) => d.name === action.name
        );
        if (possibleNextDir) {
          currentDirectory = possibleNextDir;
        } else {
          const newDir: Directory = {
            children: [],
            files: [],
            name: action.name,
            parent: currentDirectory,
          };
          currentDirectory.children.push(newDir);
          currentDirectory = newDir;
        }
        break;
      case "file":
        const possibleNextFile = currentDirectory.files.find(
          (d) => d.name === action.name
        );
        if (!possibleNextFile) {
          const newFile: File = {
            name: action.name,
            size: action.size,
          };
          currentDirectory.files.push(newFile);
        }
        break;
      case "up":
        currentDirectory = currentDirectory.parent || currentDirectory;
        break;
    }
  });
  return rootDir;
};
type EnterDirectory = {
  kind: "directory";
  name: string;
};
type AddFile = {
  kind: "file";
  name: string;
  size: number;
};
type MoveUp = {
  kind: "up";
};
type NoOp = {
  kind: "noop";
};
type Action = EnterDirectory | AddFile | MoveUp | NoOp;
const parseLine = (line: string): Action => {
  const cdPattern = /\$ cd (.*)/;
  const filePattern = /(\d+) ([\w\.]+)/;
  const cdMatch = line.match(cdPattern);
  const fileMatch = line.match(filePattern);
  if (cdMatch) {
    const target = cdMatch[1];
    return target === ".."
      ? { kind: "up" }
      : { kind: "directory", name: target };
  } else if (fileMatch) {
    return { kind: "file", name: fileMatch[2], size: parseInt(fileMatch[1]) };
  } else {
    return { kind: "noop" };
  }
};
const calculateDirectorySize = (directory: Directory): number => {
  const localFileSize = directory.files.map((f) => f.size).reduce(sumValues, 0);
  const childDirSize = directory.children
    .map(calculateDirectorySize)
    .reduce(sumValues, 0);
  directory.totalSize = localFileSize + childDirSize;
  return directory.totalSize;
};
const findSmallDirectories = (directory: Directory): Directory[] => {
  const smallChildren = directory.children.flatMap(findSmallDirectories);
  if (directory.totalSize && directory.totalSize < 100000) {
    smallChildren.push(directory);
  }
  return smallChildren;
};
export {
  parseCommands,
  parseLine,
  Directory,
  findSmallDirectories,
  calculateDirectorySize,
};
