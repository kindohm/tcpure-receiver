import { window, workspace } from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';
import { log } from "./output";

const { setStatusBarMessage: status, showWarningMessage: warn } = window;

const hasFolders = () => {
  const folders = workspace.workspaceFolders;
  if (!folders || folders.length !== 1) {
    return false;
  }
  return true;
};

const getSnapshotDir = () => {

  const folders = workspace.workspaceFolders;
  if (!folders) {
    throw new Error("cannot do this without a workspace");
  };

  const folder = folders[0];
  const { uri } = folder;
  const { path: folderPath } = uri;
  return path.join(folderPath, 'snapshots');
};

const ensureSnapshotsDir = () => {

  const dir = getSnapshotDir();
  if (!fs.existsSync(dir)) {
    status(`creating ${dir}`);
    fs.mkdirSync(dir);
  }
};

export const saveSnapshot = () => {
  if (!hasFolders()) {
    return;
  }
  ensureSnapshotsDir();
  const currentText = window.activeTextEditor?.document.getText();
  if (!currentText) {
    warn('could not get current editor text');
    return;
  }

  const date = new Date();
  const fileName = `${format(date, 'yyyy-MM-dd-hhmmss')}.tidal`;
  const newFilePath = path.join(getSnapshotDir(), fileName);
  fs.writeFileSync(newFilePath, currentText, { encoding: 'utf-8' });
  status(`wrote ${fileName}`);
  log(`wrote ${fileName}`);

};