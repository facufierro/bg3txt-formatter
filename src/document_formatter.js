const vscode = require('vscode');

function provideDocumentFormattingEdits(document) {
    const edits = [];

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const lineText = line.text.trimStart();

        if (lineText.startsWith('new entry')) {
            edits.push(vscode.TextEdit.replace(line.range, lineText));
        } else if (lineText.startsWith('type') || lineText.startsWith('using')) {
            edits.push(vscode.TextEdit.replace(line.range, '\t' + lineText));
        } else if (lineText.startsWith('data')) {
            edits.push(vscode.TextEdit.replace(line.range, '\t\t' + lineText));
        }
    }

    return edits;

}

module.exports = {
    provideDocumentFormattingEdits,
};
