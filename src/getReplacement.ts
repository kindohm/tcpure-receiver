import { TextDocument, TextEditor } from "vscode";
import { getParts } from "./getParts";
import { alterations } from "./alterations/alterations";

export const getReplacement = (lineNumber: number, signal: string, document: TextDocument, editor: TextEditor) => {

  const line = document.lineAt(lineNumber);
  const input = line.text;

  try {

    if (!input) {
      console.warn('no input!');
      return;
    }

    const index = input.indexOf(`//${signal}`);

    if (index === -1) {
      console.warn('signal index not found!');
      return null;
    }

    const parts = getParts(index, input);
    const firstKey = parts[0].startsWith('knob') ? 'knob' : 'button';


    // @ts-ignore it's fine, really
    const newLine = alterations[firstKey][parts[1]](input, parts.slice(2));

    return { range: line.range, newLine };
  } catch (err) {
    console.error(err);
    return { range: line.range, newLine: input };
  }



};