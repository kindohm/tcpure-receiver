import { TextDocument, TextEditor, window } from "vscode";

type KnobSignal = {
  knob: string;
  value: number;
};

// @ts-ignore
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const commands = {
  ['randomize/plies']: (line: string): string => {
    const startPos = line.indexOf('"<');
    const endPos = line.indexOf('>"');
    const count = randInt(2, 5);
    const newPlies = `${(new Array(count).fill(0).map(p => randInt(1, 10))).join(' ')}`;

    return (
      line.substring(0, startPos + 2) + newPlies + line.substring(endPos)
    );
  }
};


export const alterDocument = (knobSignal: KnobSignal) => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  if (!editor) {
    console.warn('no editor');
    return;
  }

  const document = editor?.document;

  if (!document) {
    console.warn('no document');
    return;
  }

  const { knob } = knobSignal;
  const signal = `${knob.toString().padStart(2, "0")}`;

  const allText = document.getText();
  const lines = allText.split("\n");
  const targetLineNumbers = lines
    .map((l, i) => ({ line: l, lineNumber: i }))
    .filter(l => l.line.includes(`//${signal}`))
    .map(l => l.lineNumber);

  if (targetLineNumbers.length === 0) {
    console.warn('did not find any target lines', signal);
    return;
  }

  const edits = targetLineNumbers.map(n => processLineNumber(n, signal, document, editor));

  editor.edit((editBuilder) => {
    edits.filter(e => e !== null).forEach(e => {
      if (!!e) {
        editBuilder.replace(e.range, e.newLine);
      }
    });
  });

};

const processLineNumber = (lineNumber: number, signal: string, document: TextDocument, editor: TextEditor) => {
  console.log('processing line number', lineNumber);
  const line = document.lineAt(lineNumber);
  const input = line.text;

  if (!input) {
    console.warn('no input!');
    return;
  }

  const index = input.indexOf(`//${signal}`);

  if (index === -1) {
    console.warn('signal index not found!');
    return null;
  }

  const parts = input.slice(index + 1).split('/').map(x => x.trim()).slice(2, 4);
  console.log('parts', parts);

  // @ts-ignore
  const commandString = parts.join('/');

  // @ts-ignore
  const command = commands[commandString];
  if (!command) {
    return null;
  }
  const newLine = command(input);

  return { range: line.range, newLine };

};
