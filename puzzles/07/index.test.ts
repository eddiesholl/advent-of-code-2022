import {
  calculateDirectorySize,
  Directory,
  findDeleteTarget,
  findSmallDirectories,
  parseCommands,
  parseLine,
} from "./index";

const exampleCommands = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];
describe("07", () => {
  describe("parseLine", () => {
    it("handles cd", () => {
      expect(parseLine("$ cd abc")).toEqual({ kind: "directory", name: "abc" });
    });
    it("handles cd up", () => {
      expect(parseLine("$ cd ..")).toEqual({ kind: "up" });
    });
    it("handles ls", () => {
      expect(parseLine("$ ls")).toEqual({ kind: "noop" });
    });
    it("handles a file", () => {
      expect(parseLine("12345 foobar")).toEqual({
        kind: "file",
        name: "foobar",
        size: 12345,
      });
    });
    it("handles a file with a .", () => {
      expect(parseLine("12345 foo.bar")).toEqual({
        kind: "file",
        name: "foo.bar",
        size: 12345,
      });
    });
    it("handles a directory", () => {
      expect(parseLine("dir baz")).toEqual({ kind: "noop" });
    });
  });
  describe("parseCommands", () => {
    it("handles the example", () => {
      const root: Directory = {
        parent: null,
        files: [
          { name: "b.txt", size: 14848514 },
          { name: "c.dat", size: 8504156 },
        ],
        name: "/",
        children: [],
      };
      const root_a: Directory = {
        parent: root,
        files: [
          { name: "f", size: 29116 },
          { name: "g", size: 2557 },
          { name: "h.lst", size: 62596 },
        ],
        name: "a",
        children: [],
      };
      const root_b: Directory = {
        parent: root,
        files: [],
        name: "b",
        children: [],
      };
      const root_d: Directory = {
        parent: root,
        files: [
          { name: "j", size: 4060174 },
          { name: "d.log", size: 8033020 },
          { name: "d.ext", size: 5626152 },
          { name: "k", size: 7214296 },
        ],
        name: "d",
        children: [],
      };
      root.children.push(root_a);
      root.children.push(root_d);
      const root_a_e: Directory = {
        parent: root_a,
        files: [{ name: "i", size: 584 }],
        name: "e",
        children: [],
      };
      root_a.children.push(root_a_e);
      expect(parseCommands(exampleCommands)).toEqual(root);
    });
  });
  describe("findSmallDirectories", () => {
    it("works for the example", () => {
      const dir = parseCommands(exampleCommands);
      calculateDirectorySize(dir);
      const smallDirs = findSmallDirectories(dir);
      expect(smallDirs.length).toEqual(2);
      expect(smallDirs.map((d) => d.name)).toEqual(["e", "a"]);
      expect(smallDirs.map((d) => d.totalSize)).toEqual([584, 94853]);
    });
  });
  describe("findDeleteTarget", () => {
    it("works for the example", () => {
      const dir = parseCommands(exampleCommands);
      calculateDirectorySize(dir);
      const deleteTarget = findDeleteTarget(dir);
      expect(deleteTarget?.name).toEqual("d");
      expect(deleteTarget?.totalSize).toEqual(24933642);
    });
  });
});
