const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
        provideDocumentFormattingEdits(document) {
            const edits = [];

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                if (line.text.startsWith('new entry')) {
                    edits.push(vscode.TextEdit.replace(line.range, line.text.trimStart()));
                } else if (line.text.startsWith('type')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t' + line.text.trimStart()));
                } else if (line.text.startsWith('data')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t\t' + line.text.trimStart()));
                }
            }

            return edits;
        }
    }));
}

exports.activate = activate;
