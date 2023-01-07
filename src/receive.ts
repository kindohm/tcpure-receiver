import { alterDocument } from "./alterDocument";

type Signal = {
  cc: number;
  value: number;
};

const controllerMap = (new Array(16)).fill(0)
  .reduce((map, x, i) => {
    return {
      ...map,
      [(i * 2) + 64]: `knob${(i + 1).toString().padStart(2, "0")}`,
      [(i * 2) + 65]: `button${(i + 1).toString().padStart(2, "0")}`
    };
  }, {});

export const receive = (signal: Signal) => {
  console.log(controllerMap[signal.cc], signal.value);
  alterDocument({ knob: controllerMap[signal.cc], value: signal.value });
};