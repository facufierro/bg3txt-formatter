const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
        provideDocumentFormattingEdits(document) {
            const edits = [];
            let lastLineWasParagraph = false;

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const lineText = line.text.trimStart();
                
                if (lineText.startsWith('new entry')) {
                    edits.push(vscode.TextEdit.replace(line.range, lineText));
                } else if (lineText.startsWith('type')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t' + lineText));
                } else if (lineText.startsWith('data')) {
                    edits.push(vscode.TextEdit.replace(line.range, '\t\t' + lineText));
                } else if (lineText.startsWith('//')) {
                    // Handle comments
                } else {
                    // Assume it's a paragraph
                    if (lastLineWasParagraph) {
                        // Add a line break if the last line was also a paragraph
                        edits.push(vscode.TextEdit.insert(line.range.start, '\n'));
                    }
                    lastLineWasParagraph = true;
                    continue;
                }
                
                lastLineWasParagraph = false;
            }

            return edits;
        }
    }));
}

exports.activate = activate;
