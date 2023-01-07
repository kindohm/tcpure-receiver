// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { startServer } from './server';
import * as path from 'path';
import { log } from './output';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const resourocePath = context.asAbsolutePath(path.join('src', 'html'));


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	log('tcpure-receiver is active');
	startServer(resourocePath);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tcpure-receiver.boot', () => { });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
