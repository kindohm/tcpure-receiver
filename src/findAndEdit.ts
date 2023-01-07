import { Range, TextDocument, TextEditor, window } from "vscode";
import { Edit, getReplacement } from './getReplacement';


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

  const modAll = control === "knob16";

  const allText = document.getText();
  const lines = allText.split("\n");


  const controlsToCheck: string[] = modAll ? (new Array(16)).fill(0).map((x, i) => `knob${(i + 1).toString().padStart(2, "0")}`) : [control];

  const initialEdits: (Edit | null)[] = [];
  const edits = controlsToCheck.reduce((newEdits, control) => {
    const controlEdits = getEditsForControl(control, lines, document, editor);
    return newEdits.concat(controlEdits);
  }, initialEdits);

  editor.edit((editBuilder) => {
    edits.filter(e => !!e).forEach(e => {
      if (!!e) {
        editBuilder.replace(e.range, e.newLine);
      }
    });
  });

  return edits;
};

const getEditsForControl = (control: string, lines: string[], document: TextDocument, editor: TextEditor): (Edit | null)[] => {
  const targetLineNumbers = lines
    .map((l, i) => ({ line: l, lineNumber: i }))
    .filter(l => l.line.includes(`//${control}`))
    .map(l => l.lineNumber);

  if (targetLineNumbers.length === 0) {
    return [];
  }

  return targetLineNumbers.map(n => getReplacement(n, control, document, editor));
}

