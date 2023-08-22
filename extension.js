const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
        provideDocumentFormattingEdits(document) {
            const edits = [];

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const lineText = line.text.trimStart();

                if (lineText.startsWith('new entry')) {
                    edits.push(vscode.TextEdit.replace(line.range, lineText));
                } else if (lineText.startsWith('type')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t' + lineText));
                } else if (lineText.startsWith('data')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t\t' + lineText));
                }
            }

            return edits;
        }
    }));
}

exports.activate = activate;
