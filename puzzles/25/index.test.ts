import { decode, encode } from "./index";

describe("25", () => {
  describe("value conversion", () => {
    const primitiveValues: readonly [number, string][] = [
      [1, "1"],
      [2, "2"],
      [3, "1="],
      [4, "1-"],
      [5, "10"],
      [6, "11"],
      [7, "12"],
      [8, "2="],
      [9, "2-"],
      [10, "20"],
      [15, "1=0"],
      [20, "1-0"],
      [2022, "1=11-2"],
      [12345, "1-0---0"],
      [314159265, "1121-1110-1=0"],
    ];
    it.each(primitiveValues)(
      "can decode to %d from '%s'",
      (a: number, b: string) => {
        expect(decode(b)).toEqual(a);
      }
    );
    it.each(primitiveValues)(
      "can encode from %d to '%s'",
      (a: number, b: string) => {
        expect(encode(a)).toEqual(b);
      }
    );
  });
});
