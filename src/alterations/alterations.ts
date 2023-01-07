import { randInt, randFloat } from "../util";

type AlterationArgs = {
  input: string;
  parts: string[]
};

const replaceBetween = (input: string, start: number, end: number, value: string) => {
  return `${input.slice(0, start + 1)}${value}${input.slice(end)}`;
}

const knobRandomFloat = ({ input, parts }: AlterationArgs) => {
  const min = parts.length > 0 ? parseFloat(parts[0]) : 0;
  const max = parts.length === 2 ? parseFloat(parts[1]) : 1;


  if (isNaN(min) || isNaN(max)) {
    return input;
  }

  const newVal = randFloat(min, max);
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);

  return replaceBetween(input, start, end, newVal.toFixed(3));
};

const buttonRandomOnOff = ({ input, parts }: AlterationArgs) => {
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const newValue = randInt(0, 1);
  return replaceBetween(input, start, end, newValue.toString());
};

type Alterations = {
  knob: {
    f: (a: AlterationArgs) => string
  },
  button: {
    onoff: (a: AlterationArgs) => string
  }
};

export const alterations: Alterations = {
  knob: {
    f: knobRandomFloat
  },
  button: {
    onoff: buttonRandomOnOff
  }
};