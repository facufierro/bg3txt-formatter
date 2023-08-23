const vscode = require('vscode');

async function activate(context) {
    try {
        // Register a document formatting edit provider for 'bg3txt' language
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
            async provideDocumentFormattingEdits(document) {
                const edits = [];

                for (let i = 0; i < document.lineCount; i++) {
                    const line = document.lineAt(i);
                    const lineText = line.text.trimStart();

                    // Handle lines that start with 'new entry'
                    if (lineText.startsWith('new entry')) {
                        edits.push(vscode.TextEdit.replace(line.range, lineText));
                    }
                    // Handle lines that start with 'type'
                    else if (lineText.startsWith('type')) {
                        edits.push(vscode.TextEdit.replace(line.range, '\t' + lineText));
                    }
                    // Handle lines that start with 'data'
                    else if (lineText.startsWith('data')) {
                        edits.push(vscode.TextEdit.replace(line.range, '\t\t' + lineText));
                    }

                    // If your logic evolves to include async operations, you can await them here
                    // await someAsyncFunction();
                }

                return edits;
            }
        }));
    } catch (error) {
        // Log the error to the console
        console.error("Error occurred:", error);

        // Optionally, inform the user
        vscode.window.showErrorMessage("An error occurred while activating the bg3txt formatter.");
    }
}

exports.activate = activate;
