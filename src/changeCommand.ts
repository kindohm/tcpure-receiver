import { Range, TextEditor, TextDocument, window, workspace } from 'vscode';

// @ts-ignore
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


const commands = {
  ['tc.randomize.plies']: (line: string): string => {
    const startPos = line.indexOf('"<');
    const endPos = line.indexOf('>"');
    const count = randInt(2, 5);
    const newPlies = `${(new Array(count).fill(0).map(p => randInt(1, 10))).join(' ')}`;

    return (
      line.substring(0, startPos + 2) + newPlies + line.substring(endPos)
    );
  }


};

export const evalCommand = () => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  if (!editor) { return; }

  const document = editor?.document;

  if (!document) {
    return;
  }


  const allText = document.getText();
  const lines = allText.split("\n");
  const knob1LineIndex = lines.findIndex(l => l.includes('//knob1'));
  if (knob1LineIndex === -1) {
    return;
  }

  // const position = editor.selection.active;
  const line = document.lineAt(knob1LineIndex);
  const input = line.text;

  if (!input) {
    return;
  }

  if (!input) { return null; }
  const index = input.indexOf('//tc/');
  if (index === -1) {
    return null;
  }

  const parts = input.slice(index + 1).split('/').map(x => x.trim());
  console.log("parts", parts);

  // @ts-ignore
  const commandString = `${parts[1]}.${parts[2]}.${parts[3]}`;
  console.log('commandString', commandString);

  console.log('same', 'tc.randomize.plies' === commandString);
  console.log('tc.randomize.plies');
  console.log(commandString);

  const see = commands['tc.randomize.plies'];
  console.log('see?', see);

  // @ts-ignore
  const command = commands[commandString];
  console.log('command', command);
  const newLine = command(input);
  console.log('newLine', newLine);


  editor.edit((editBuilder) => {
    editBuilder.replace(line.range, newLine);
  });

};

