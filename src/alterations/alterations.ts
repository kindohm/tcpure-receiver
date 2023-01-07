import { randInt, randFloat } from "../util";

type AlterationArgs = {
  input: string;
  parts: string[]
};

const replaceBetween = (input: string, start: number, end: number, value: string) => {
  return `${input.slice(0, start + 1)}${value}${input.slice(end)}`;
};

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

const knobRandomInt = ({ input, parts }: AlterationArgs) => {
  const min = parts.length > 0 ? parseFloat(parts[0]) : 0;
  const max = parts.length === 2 ? parseFloat(parts[1]) : min + 1;


  if (isNaN(min) || isNaN(max)) {
    return input;
  }

  const newVal = randInt(min, max);
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);

  return replaceBetween(input, start, end, newVal.toString());
};

const MIN_PLIES = 2;
const MAX_PLIES = 5;
const MIN_PLY = 1;
const MAX_PLY = 15;
const knobRandomPlies = ({ input, parts }: AlterationArgs) => {

  const first = parts.length > 0 ? parts[0] : 'n';
  const count = first === 'n' ? randInt(MIN_PLIES, MAX_PLIES) : parseInt(first);
  if (isNaN(count)) {
    return input;
  }

  console.log('count', count)

  const minPly = parts.length > 1 ? parseInt(parts[1]) : MIN_PLY;
  const maxPly = parts.length > 2 ? parseInt(parts[2]) : minPly + MAX_PLY;

  if (isNaN(minPly) || isNaN(maxPly)) {
    return input;
  }

  console.log('minmax', minPly, maxPly);

  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const plies = (new Array(count)).fill(null).map(p => randInt(minPly, maxPly));
  return replaceBetween(input, start, end, `<${plies.join(' ')}>`);


};

const buttonRandomOnOff = ({ input, parts }: AlterationArgs) => {
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const newValue = randInt(0, 1);
  return replaceBetween(input, start, end, newValue.toString());
};

type Alterations = {
  knob: {
    f: (a: AlterationArgs) => string,
    i: (a: AlterationArgs) => string,
    plies: (a: AlterationArgs) => string
  },
  button: {
    onoff: (a: AlterationArgs) => string
  }
};

export const alterations: Alterations = {
  knob: {
    f: knobRandomFloat,
    i: knobRandomInt,
    plies: knobRandomPlies
  },
  button: {
    onoff: buttonRandomOnOff
  }
};