import { findMarkerEnd, hasDupes } from "./index";

describe("06", () => {
  describe("findMarkerEnd", () => {
    describe("examples", () => {
      it("example 1", () => {
        expect(findMarkerEnd("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5);
      });
      it("example 2", () => {
        expect(findMarkerEnd("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6);
      });
      it("example 3", () => {
        expect(findMarkerEnd("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10);
      });
      it("example 4", () => {
        expect(findMarkerEnd("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11);
      });
    });
  });
  describe("hasDupes", () => {
    it("handles empty string", () => {
      expect(hasDupes("")).toEqual(false);
    });
    it("handles a single char", () => {
      expect(hasDupes("a")).toEqual(false);
    });
    it("handles a unique sequence", () => {
      expect(hasDupes("abvc")).toEqual(false);
    });
    it("finds a simple dupe", () => {
      expect(hasDupes("aa")).toEqual(true);
    });
  });
});
