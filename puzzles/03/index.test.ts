import {
  processPacks,
  findFirstCharOverlap,
  scorePack,
  slicePack,
  createChunks,
  processChunk,
} from "./index";

describe("03", () => {
  describe("part 2", () => {
    describe("processChunk", () => {
      it("can find a single unique char", () => {
        expect(processChunk(["abc", "cde", "xxc"])).toEqual(["abc", 2]);
      });
    });
    describe("createChunks", () => {
      it("creates basic groups", () => {
        expect(
          createChunks(["000", "111", "222", "333", "444", "555"])
        ).toEqual([
          ["000", "111", "222"],
          ["333", "444", "555"],
        ]);
      });
    });
  });
  describe("a", () => {
    describe("happy paths", () => {
      it("handles no lines", () => {
        expect(processPacks([])).toEqual(0);
      });

      it("handles no overlap", () => {
        expect(processPacks(["ab"])).toEqual(0);
      });

      it("handles overlapping a", () => {
        expect(processPacks(["aa"])).toEqual(1);
      });
      it("handles more complex overlapping b", () => {
        expect(processPacks(["abcb"])).toEqual(2);
      });
      it("processes multiple packs", () => {
        expect(processPacks(["aa", "zz", "AA", "ZZ"])).toEqual(106);
      });
      it("handles the full example", () => {
        expect(
          processPacks([
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

  describe("findFirstCharOverlap", () => {
    it("handles empty arrays", () => {
      expect(findFirstCharOverlap("", "")).toEqual(undefined);
    });

    it("handles a simple overlap", () => {
      expect(findFirstCharOverlap("a", "a")).toEqual(0);
    });
    it("handles item 2 from the example", () => {
      expect(
        findFirstCharOverlap("jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL")
      ).toEqual(13);
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
