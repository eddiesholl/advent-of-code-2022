import { parseJets } from "./index";

describe("17", () => {
  describe("parseJets", () => {
    it("handles emoty lines", () => {
      expect(parseJets([">><<"])).toEqual([">", ">", "<", "<"]);
    });
  });
});
