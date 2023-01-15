import { notEmpty } from "../common/array";
import { Minute, Valve } from "./index";

const describeSequence = (minutes: Omit<Minute, "state">[]): string =>
  minutes
    .map((m) => (m.op.kind === "noop" ? "noop" : `${m.op.kind}-${m.op.target}`))
    .join("-");

/*
== Minute 14 ==
Valves BB, DD, and JJ are open, releasing 54 pressure.
You move to valve FF.
*/
export const renderMinute = ({ op, state }: Minute) => {
  console.log(`== Minute ${state.t} ==`);
  if (state.open.size === 0) {
    console.log("No valves are open");
  } else {
    console.log(
      `Valves ${Array.from(state.open).sort().join(", ")} are open, releasing ${
        state.rate
      } pressure`
    );
  }
  if (op.kind === "open") {
    console.log(`You open valve ${op.target}`);
  } else if (op.kind === "move") {
    console.log(`You move to valve ${op.target}`);
  }
  console.log(state.released);
  console.log("");
};
