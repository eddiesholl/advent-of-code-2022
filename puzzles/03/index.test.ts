import { a, findIntersectionIndex, scorePack, slicePack } from "./index";

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
    });
  });

  describe("findIntersectionIndex", () => {
    it("handles empty arrays", () => {
      expect(findIntersectionIndex([], [])).toEqual([]);
    });

    it("handles a simple overlap", () => {
      expect(findIntersectionIndex(["a"], ["a"])).toEqual([0]);
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
  });

  describe("scorePack", () => {
    it("scores a simple overlap", () => {
      expect(scorePack("abcb")).toEqual(2);
    });

    it.only("scores a capital overlap", () => {
      expect(scorePack("ZbcZ")).toEqual(52);
    });
  });
});
