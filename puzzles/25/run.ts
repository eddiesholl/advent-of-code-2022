import { readLines } from "../common/input";
import { sumSnafus } from "./index";

const encoded = sumSnafus(readLines(__dirname));
console.log("Encoded result is " + encoded);
