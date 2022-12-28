import { readLines } from "../common/input";
import { parseLines, findRootValue } from "./index";

describe("021", () => {
  describe("findRootValue", () => {
    it("handles the simplest scenario", () => {
      expect(findRootValue([{ name: "root", value: 1 }])).toEqual(1);
    });
    it("handles root as an operation", () => {
      expect(
        findRootValue([
          { name: "root", operator: "+", a: "a", b: "b" },
          { name: "a", value: 5 },
          { name: "b", value: 6 },
        ])
      ).toEqual(11);
    });
    it("handles example input", () => {
      expect(
        findRootValue(parseLines(readLines(__dirname, "example.txt")))
      ).toEqual(152);
    });
  });

  describe("parseLines", () => {
    it("handles example input", () => {
      expect(parseLines(readLines(__dirname, "example.txt"))).toEqual([
        {
          a: "pppw",
          b: "sjmn",
          name: "root",
          operator: "+",
        },
        {
          name: "dbpl",
          value: 5,
        },
        {
          a: "sllz",
          b: "lgvd",
          name: "cczh",
          operator: "+",
        },
        {
          name: "zczc",
          value: 2,
        },
        {
          a: "humn",
          b: "dvpt",
          name: "ptdq",
          operator: "-",
        },
        {
          name: "dvpt",
          value: 3,
        },
        {
          name: "lfqf",
          value: 4,
        },
        {
          name: "humn",
          value: 5,
        },
        {
          name: "ljgn",
          value: 2,
        },
        {
          a: "drzm",
          b: "dbpl",
          name: "sjmn",
          operator: "*",
        },
        {
          name: "sllz",
          value: 4,
        },
        {
          a: "cczh",
          b: "lfqf",
          name: "pppw",
          operator: "/",
        },
        {
          a: "ljgn",
          b: "ptdq",
          name: "lgvd",
          operator: "*",
        },
        {
          a: "hmdt",
          b: "zczc",
          name: "drzm",
          operator: "-",
        },
        {
          name: "hmdt",
          value: 32,
        },
      ]);
    });
  });
});
