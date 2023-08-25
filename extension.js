const vscode = require('vscode');
const { setupWorkspace } = require('./src/workspace_setup');
const { provideDocumentFormattingEdits } = require('./src/document_formatter');

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
        provideDocumentFormattingEdits(document) {
            return provideDocumentFormattingEdits(document);
        },
    }));

    // Call the setup workspace function
    setupWorkspace();
}

exports.activate = activate;
