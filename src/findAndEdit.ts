import { alterations } from './alterations/alterations';

import { TextDocument, TextEditor, window } from "vscode";
import { getParts } from './getParts';
import { getReplacement } from './getReplacement';

// // @ts-ignore
// function randInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

// const commands = {
//   ['randomize/plies']: (line: string): string => {
//     const startPos = line.indexOf('"<');
//     const endPos = line.indexOf('>"');
//     const count = randInt(2, 5);
//     const newPlies = `${(new Array(count).fill(0).map(p => randInt(1, 10))).join(' ')}`;

//     return (
//       line.substring(0, startPos + 2) + newPlies + line.substring(endPos)
//     );
//   }
// };


export const findAndEdit = ({ knob, value }: { knob: string, value: number }) => {
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

  const allText = document.getText();
  const lines = allText.split("\n");
  const targetLineNumbers = lines
    .map((l, i) => ({ line: l, lineNumber: i }))
    .filter(l => l.line.includes(`//${knob}`))
    .map(l => l.lineNumber);

  if (targetLineNumbers.length === 0) {
    console.warn('did not find any target lines', knob);
    return;
  }

  const edits = targetLineNumbers.map(n => getReplacement(n, knob, document, editor));

  editor.edit((editBuilder) => {
    edits.filter(e => e !== null).forEach(e => {
      if (!!e) {
        editBuilder.replace(e.range, e.newLine);
      }
    });
  });

};

