const vscode = require('vscode');
const {
    keywords,
    statements,
    comment_line,
    operators
} = require('./tmLanguage');  // Assuming both files are in the same directory

// Now you can use these variables here

async function setupWorkspace() {
    const userChoice = await vscode.window.showInformationMessage('Would you like to optimize your workspace settings BG3 Modding?', 'Yes', 'No');
    if (userChoice === 'Yes') {
        const config = vscode.workspace.getConfiguration();

        // Check if existing settings are already in place
        const existingTokenColorCustomizations = config.get('editor.tokenColorCustomizations') || {};
        const existingTextMateRules = existingTokenColorCustomizations.textMateRules || [];
        const existingFilesAssociations = config.get('files.associations') || {};

        // Set up additional textMateRules
        const newRules = [
            {
                "scope": "keyword.control.bg3txt",
                "settings": {
                    "foreground": "#C586C0"
                }
            },
            {
                "scope": "keyword.operator.bg3txt",
                "settings": {
                    "foreground": "#ffa200"
                }
            },
            {
                "scope": "string.first-column.bg3txt",
                "settings": {
                    "foreground": "#9CDCFE"
                }
            }
        ];

        newRules.forEach((newRule) => {
            if (!existingTextMateRules.some(rule => rule.scope === newRule.scope)) {
                existingTextMateRules.push(newRule);
            }
        });

        await config.update('editor.tokenColorCustomizations', {
            "textMateRules": existingTextMateRules
        }, vscode.ConfigurationTarget.Workspace);

        // Always use bg3txt for txt files
        existingFilesAssociations['*.txt'] = "bg3txt";
        await config.update('files.associations', existingFilesAssociations, vscode.ConfigurationTarget.Workspace);
    }
}

module.exports = {
    setupWorkspace,
};
