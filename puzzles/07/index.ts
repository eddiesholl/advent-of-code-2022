type File = {
  name: string;
  size: number;
  directory: Directory;
};
type Directory = {
  name: string;
  files: File[];
  children: Directory[];
  parent: Directory | null;
};

const parseCommands = (lines: string[]): Directory => {
  const rootDir: Directory = {
    children: [],
    files: [],
    name: "/",
    parent: null,
  };
  const currentDirectory = rootDir;
  lines.forEach((line) => {
    const action = parseLine(line);
    switch (action.kind) {
      case "directory":
        break;
      case "file":
        break;
      case "up":
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
  const filePattern = /(\d+) (\w+)/;
  const cdMatch = line.match(cdPattern);
  const fileMatch = line.match(filePattern);
  if (cdMatch) {
    return { kind: "directory", name: cdMatch[1] };
  } else if (fileMatch) {
    return { kind: "file", name: fileMatch[2], size: parseInt(fileMatch[1]) };
  } else {
    return { kind: "noop" };
  }
};
const b = () => void 0;
export { parseCommands, b };
