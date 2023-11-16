"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const node_path_1 = __importDefault(require("node:path"));
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('convertjson.showPanel', () => {
        vscode.window.showInformationMessage('Welcome to convertjson!');
        const panel = vscode.window.createWebviewPanel("convertjson", "Convert JSON", vscode.ViewColumn.One, {
            retainContextWhenHidden: true,
            enableScripts: true, // 运行 JS 执行
        });
        // panel.webview.html = getWebviewContent("");
        // ==================== Use React ==================== //
        const isProduction = context.extensionMode === vscode.ExtensionMode.Production;
        let srcUrl = '';
        if (isProduction) {
            const filePath = vscode.Uri.file(node_path_1.default.join(context.extensionPath, 'dist', 'static/js/main.js'));
            srcUrl = panel.webview.asWebviewUri(filePath).toString();
        }
        else {
            srcUrl = 'http://localhost:3000/static/js/main.js';
        }
        panel.webview.html = getWebviewContent(srcUrl);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function getWebviewContent(srcUri) {
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
		</body>
	</html>
	`;
}
//# sourceMappingURL=extension.js.map