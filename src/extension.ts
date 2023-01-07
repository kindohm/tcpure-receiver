// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { startServer } from './server';
import * as path from 'path';
import { log } from './output';
import { saveSnapshot } from './saveSnapshot';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const resourocePath = context.asAbsolutePath(path.join('src', 'html'));


	log('tcpure-receiver is active');
	let booted = false;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('tcpure-receiver.boot', () => {
		if (booted) {
			return;
		}
		startServer(resourocePath);
		booted = true;
		vscode.window.setStatusBarMessage("tcpure-receiver booted");

	});

	let disposable2 = vscode.commands.registerCommand('tcpure-receiver.save-snapshot', () => {
		saveSnapshot();
	});


	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() { }
