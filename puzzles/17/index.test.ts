import { applyFall, applyGas, createRock, GameState, parseJets } from "./index";

describe("17", () => {
  describe("parseJets", () => {
    it("handles emoty lines", () => {
      expect(parseJets([">><<"])).toEqual([">", ">", "<", "<"]);
    });
  });

  describe("applyGas", () => {
    it("respects left wall", () => {
      const gameState: GameState = {
        chamber: [],
        activeRock: createRock(3, { x: 0, y: 5 }), // I
      };
      applyGas(gameState, "<");
      expect(gameState.activeRock.location.x).toEqual(0);
    });
    it("respects right wall", () => {
      const gameState: GameState = {
        chamber: [],
        activeRock: createRock(4, { x: 5, y: 5 }), // []
      };
      applyGas(gameState, ">");
      expect(gameState.activeRock.location.x).toEqual(5);
    });
    it("can move free rock to the right", () => {
      const gameState: GameState = {
        chamber: [],
        activeRock: createRock(2, { x: 3, y: 2 }), // ]
      };
      applyGas(gameState, ">");
      expect(gameState.activeRock.location.x).toEqual(4);
    });
    it("detects horizontal collisions on the right", () => {
      const gameState: GameState = {
        chamber: [new Set([6]), new Set([6]), new Set([6])],
        activeRock: createRock(2, { x: 3, y: 2 }), // ]
      };
      applyGas(gameState, ">");
      expect(gameState.activeRock.location.x).toEqual(3);
    });

    /*
   4|   @
   3|  @@@
   2|  #@
   1|  #
   0|  #
    --------
     0123456
    */
    it("detects horizontal collisions on the left", () => {
      const gameState: GameState = {
        chamber: [new Set([2]), new Set([2]), new Set([2])],
        activeRock: createRock(1, { x: 2, y: 2 }), // +
      };
      applyGas(gameState, "<");
      expect(gameState.activeRock.location.x).toEqual(2);
      // Now bump 2 spots to the right, and make sure it can shift left
      gameState.activeRock.location.x += 2;
      applyGas(gameState, "<");
      expect(gameState.activeRock.location.x).toEqual(3);
    });
  });
  describe("applyFall", () => {
    /*      @
    4|      @
    3|    @@@
    2|  #
    1| ###
    0|  #
     --------
      0123456
     */
    it("allows an overlapping fall", () => {
      const gameState: GameState = {
        chamber: [new Set([2]), new Set([1, 2, 3]), new Set([2])],
        activeRock: createRock(2, { x: 4, y: 3 }), // ]
      };
      applyFall(gameState);
      expect(gameState.activeRock.location.y).toEqual(2);
    });
  });
});
