import { window } from "vscode";

const channel = window.createOutputChannel("tcpure-receiver");

export const log = (message: any) => {
  channel.append(`${message} `);
};