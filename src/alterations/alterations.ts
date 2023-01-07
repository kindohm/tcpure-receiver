import { randInt, randFloat } from "../util";

const knobRandomFloat = (input: string, parts: string[]) => {
  const min = parts.length > 0 ? parseFloat(parts[0]) : 0;
  const max = parts.length === 2 ? parseFloat(parts[1]) : 1;


  if (isNaN(min) || isNaN(max)) {
    return input;
  }

  const newVal = randFloat(min, max);
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);

  const newLine = `${input.slice(0, start + 1)}${newVal.toFixed(3)}${input.slice(end)}`;
  return newLine;
};

const buttonRandomOnOff = () => {
};

export const alterations = {
  knob: {
    f: knobRandomFloat
  },
  button: {
    onoff: buttonRandomOnOff
  }
};