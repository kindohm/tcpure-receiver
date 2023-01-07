import { randInt, randFloat } from "../util";

type AlterationArgs = {
  input: string;
  parts: string[]
};

const replaceBetween = (input: string, start: number, end: number, value: string) => {
  return `${input.slice(0, start + 1)}${value}${input.slice(end)}`;
};

const alterRandomFloat = ({ input, parts }: AlterationArgs) => {
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

const alterRandomInt = ({ input, parts }: AlterationArgs) => {
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
const alterRandomPlies = ({ input, parts }: AlterationArgs) => {

  const first = parts.length > 0 ? parts[0] : 'n';
  const count = first === 'n' ? randInt(MIN_PLIES, MAX_PLIES) : parseInt(first);
  if (isNaN(count)) {
    return input;
  }

  const minPly = parts.length > 1 ? parseInt(parts[1]) : MIN_PLY;
  const maxPly = parts.length > 2 ? parseInt(parts[2]) : minPly + MAX_PLY;

  if (isNaN(minPly) || isNaN(maxPly)) {
    return input;
  }

  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const plies = (new Array(count)).fill(null).map(p => randInt(minPly, maxPly));
  return replaceBetween(input, start, end, `<${plies.join(' ')}>`);
};

const MIN_F_STEPS = 2;
const MAX_F_STEPS = 5;
const MIN_F = 0.5;
const MAX_F = 2;
const alterRandomFStep = ({ input, parts }: AlterationArgs) => {

  const first = parts.length > 0 ? parts[0] : 'n';
  const count = first === 'n' ? randInt(MIN_F_STEPS, MAX_F_STEPS) : parseInt(first);
  if (isNaN(count)) {
    return input;
  }

  const minStep = parts.length > 1 ? parseFloat(parts[1]) : MIN_F;
  const maxStep = parts.length > 2 ? parseFloat(parts[2]) : minStep + MAX_F;

  if (isNaN(minStep) || isNaN(maxStep)) {
    return input;
  }

  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const steps = (new Array(count)).fill(null).map(p => randFloat(minStep, maxStep).toFixed(3));
  return replaceBetween(input, start, end, `<${steps.join(' ')}>`);
};

const MIN_I_STEPS = 2;
const MAX_I_STEPS = 5;
const MIN_I = 1;
const MAX_I = 10;
const alterRandomIStep = ({ input, parts }: AlterationArgs) => {

  const first = parts.length > 0 ? parts[0] : 'n';
  const count = first === 'n' ? randInt(MIN_I_STEPS, MAX_I_STEPS) : parseInt(first);
  if (isNaN(count)) {
    return input;
  }

  const minStep = parts.length > 1 ? parseInt(parts[1]) : MIN_I;
  const maxStep = parts.length > 2 ? parseInt(parts[2]) : minStep + MAX_I;

  if (isNaN(minStep) || isNaN(maxStep)) {
    return input;
  }

  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const steps = (new Array(count)).fill(null).map(p => randInt(minStep, maxStep));
  return replaceBetween(input, start, end, `<${steps.join(' ')}>`);
};

const alterRandomOnOff = ({ input, parts }: AlterationArgs) => {
  const start = input.indexOf('"');
  const end = input.indexOf('"', start + 1);
  const newValue = randInt(0, 1);
  return replaceBetween(input, start, end, newValue.toString());
};

const alterRandomPlyType = ({ input, parts }: AlterationArgs) => {
  const hashStart = input.indexOf('#');
  const multStart = input.indexOf('|*');

  if (hashStart === -1 && multStart === -1) {
    return input;
  }

  const start = hashStart !== -1 ? hashStart : multStart;

  const end = hashStart !== -1 ? hashStart + 1 : multStart + 2;
  const newValue = Math.random() > 0.5 ? '#' : '|*';

  return `${input.slice(0, start)}${newValue}${input.slice(end)}`;
};



type Alterations = {
  knob: {
    f: (a: AlterationArgs) => string,
    i: (a: AlterationArgs) => string,
    plies: (a: AlterationArgs) => string,
    plytype: (a: AlterationArgs) => string,
    fstep: (a: AlterationArgs) => string;
    istep: (a: AlterationArgs) => string;
    onoff: (a: AlterationArgs) => string;
  },
  button: {
    f: (a: AlterationArgs) => string,
    i: (a: AlterationArgs) => string,
    plies: (a: AlterationArgs) => string,
    plytype: (a: AlterationArgs) => string,
    fstep: (a: AlterationArgs) => string;
    istep: (a: AlterationArgs) => string;
    onoff: (a: AlterationArgs) => string;
  }
};

export const alterations: Alterations = {
  knob: {
    f: alterRandomFloat,
    i: alterRandomInt,
    plies: alterRandomPlies,
    plytype: alterRandomPlyType,
    fstep: alterRandomFStep,
    istep: alterRandomIStep,
    onoff: alterRandomOnOff
  },
  button: {
    f: alterRandomFloat,
    i: alterRandomInt,
    plies: alterRandomPlies,
    plytype: alterRandomPlyType,
    fstep: alterRandomFStep,
    istep: alterRandomIStep,
    onoff: alterRandomOnOff
  }
};