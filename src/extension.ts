import path from 'node:path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('convertjson.showPanel', () => {
		vscode.window.showInformationMessage('Welcome to convertjson!');

		const panel = vscode.window.createWebviewPanel(
			"convertjson",
			"Convert JSON",
			vscode.ViewColumn.One,
			{
				retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
				enableScripts: true, // 运行 JS 执行
			}
		)

		panel.webview.onDidReceiveMessage((e) => {
			vscode.window.showWarningMessage(e.message);
		});
			
		const isProduction = context.extensionMode === vscode.ExtensionMode.Production;
		let srcUrl = '';
		if (isProduction) {
		  const filePath = vscode.Uri.file(
			path.join(context.extensionPath, 'dist', 'static/js/main.js')
		  );
		  srcUrl = panel.webview.asWebviewUri(filePath).toString();
		} else {
		  srcUrl = 'http://localhost:3000/static/js/main.js';
		}

		panel.webview.html = getWebviewContent(srcUrl);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

function getWebviewContent(srcUri: string) {
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width,initial-scale=1">
				<title>webview-react</title>
				<script defer="defer" src="${srcUri}"></script>
			</head>
			<body>
				<div id="root"></div>
				<script>
					// 定义该变量，允许react和vscode通信
					const vscode = acquireVsCodeApi();
				</script>
			</body>
		</html>
	`;
}