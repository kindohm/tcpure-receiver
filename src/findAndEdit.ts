import { TextEditor, window } from "vscode";
import { getReplacement } from './getReplacement';


export const findAndEdit = ({ control, value }: { control: string, value: number }) => {
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
    .filter(l => l.line.includes(`//${control}`))
    .map(l => l.lineNumber);

  if (targetLineNumbers.length === 0) {
    console.warn('did not find any target lines', control);
    return;
  }

  const edits = targetLineNumbers.map(n => getReplacement(n, control, document, editor));

  editor.edit((editBuilder) => {
    edits.filter(e => e !== null).forEach(e => {
      if (!!e) {
        editBuilder.replace(e.range, e.newLine);
      }
    });
  });

  return edits;
};

