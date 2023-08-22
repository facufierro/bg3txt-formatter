const vscode = require('vscode');

function formatNewEntryLine(line) {
    return line.text.trimStart();
}

function formatTypeLine(line) {
    return '\t' + line.text.trimStart();
}

function formatDataLine(line) {
    return '\t\t' + line.text.trimStart();
}

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
            provideDocumentFormattingEdits(document) {
                const edits = [];

                for (let i = 0; i < document.lineCount; i++) {
                    const line = document.lineAt(i);
                    let newText = "";

                    if (line.text.startsWith('new entry')) {
                        newText = formatNewEntryLine(line);
                    } else if (line.text.startsWith('type')) {
                        newText = formatTypeLine(line);
                    } else if (line.text.startsWith('data')) {
                        newText = formatDataLine(line);
                    }

                    if (newText) {
                        edits.push(vscode.TextEdit.replace(line.range, newText));
                    }
                }

                return edits;
            }
        })
    );
}

exports.activate = activate;
