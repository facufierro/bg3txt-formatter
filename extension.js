const vscode = require('vscode');

function activate(context) {
    // Register the document formatting edit provider
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

    // Prompt the user to optimize settings for bg3txt
    (async function () {
        const userChoice = await vscode.window.showInformationMessage('Would you like to optimize settings for bg3txt?', 'Yes', 'No');
        if (userChoice === 'Yes') {
            const config = vscode.workspace.getConfiguration();

            // Check if existing settings are already in place
            const existingTokenColorCustomizations = config.get('editor.tokenColorCustomizations') || {};
            const existingTextMateRules = existingTokenColorCustomizations.textMateRules || [];
            const existingFilesAssociations = config.get('files.associations') || {};

            // Set the default color, unless it's already set
            if (!existingTextMateRules.some(rule => rule.scope === 'keyword.control.bg3txt')) {
                existingTextMateRules.push({
                    "scope": "keyword.control.bg3txt",
                    "settings": {
                        "foreground": "#C586C0"
                    }
                });
            }

            await config.update('editor.tokenColorCustomizations', {
                "textMateRules": existingTextMateRules
            }, vscode.ConfigurationTarget.Workspace);

            // Add file association, unless it's already set
            if (!existingFilesAssociations['*.txt']) {
                existingFilesAssociations['*.txt'] = "bg3txt";
                await config.update('files.associations', existingFilesAssociations, vscode.ConfigurationTarget.Workspace);
            }
        }
    })();
}

exports.activate = activate;
