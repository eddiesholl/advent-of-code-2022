import { a, findFirstOverlap, scorePack, slicePack } from "./index";

describe("03", () => {
  describe("a", () => {
    describe("happy paths", () => {
      it("handles no lines", () => {
        expect(a([])).toEqual(0);
      });

      it("handles no overlap", () => {
        expect(a(["ab"])).toEqual(0);
      });

      it("handles overlapping a", () => {
        expect(a(["aa"])).toEqual(1);
      });
      it("handles more complex overlapping b", () => {
        expect(a(["abcb"])).toEqual(2);
      });
      it("processes multiple packs", () => {
        expect(a(["aa", "zz", "AA", "ZZ"])).toEqual(106);
      });
      it("handles the full example", () => {
        expect(
          a([
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg",
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw",
          ])
        ).toEqual(157);
      });
    });
  });

  describe("findFirstOverlap", () => {
    it("handles empty arrays", () => {
      expect(findFirstOverlap("", "")).toEqual(undefined);
    });

    it("handles a simple overlap", () => {
      expect(findFirstOverlap("a", "a")).toEqual(0);
    });
    it("handles item 2 from the example", () => {
      expect(findFirstOverlap("jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL")).toEqual(
        13
      );
    });
  });

  describe("slicePack", () => {
    it("slices an empty string", () => {
      expect(slicePack("")).toStrictEqual(["", ""]);
    });
    it("slices a simple pack", () => {
      expect(slicePack("ab")).toStrictEqual(["a", "b"]);
    });

    it("slices a more interesting pack", () => {
      expect(slicePack("abcd")).toStrictEqual(["ab", "cd"]);
    });

    it("handles odd counts", () => {
      expect(slicePack("abc")).toStrictEqual(["ab", "c"]);
    });
    it("handles item 2 from the example", () => {
      expect(slicePack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toStrictEqual([
        "jqHRNqRjqzjGDLGL",
        "rsFMfFZSrLrFZsSL",
      ]);
    });
  });

  describe("scorePack", () => {
    it("scores a simple overlap", () => {
      expect(scorePack("abcb")).toEqual(2);
    });

    it("scores a capital overlap", () => {
      expect(scorePack("ZbcZ")).toEqual(52);
    });
    it("handles item 1 from the example", () => {
      expect(scorePack("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual(16);
    });
    it("handles item 2 from the example", () => {
      expect(scorePack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toEqual(38);
    });
  });
});
