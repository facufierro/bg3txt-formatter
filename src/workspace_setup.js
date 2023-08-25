const vscode = require('vscode');

// Function to set up workspace configuration for BG3 Modding
async function setupWorkspace(rules) {
    try {
        // Display an information message with options for the user
        const userChoice = await vscode.window.showInformationMessage('Would you like to optimize settings for bg3txt?', 'Yes', 'No');

        // Proceed only if the user chooses 'Yes'
        if (userChoice === 'Yes') {

            // Retrieve existing workspace configuration
            const config = vscode.workspace.getConfiguration();

            // Check for existing token color customizations
            const existingTokenColorCustomizations = config.get('editor.tokenColorCustomizations') || {};
            const existingTextMateRules = existingTokenColorCustomizations.textMateRules || [];

            // Check for existing files associations
            const existingFilesAssociations = config.get('files.associations') || {};

            // Define new textMateRules using rules parameter
            const newRules = rules;

            // Add new rules if they don't already exist
            newRules.forEach((newRule) => {
                if (!existingTextMateRules.some(rule => rule.scope === newRule.scope)) {
                    existingTextMateRules.push(newRule);
                }
            });

            // Update the configuration to include new and existing rules
            await config.update('editor.tokenColorCustomizations', {
                "textMateRules": existingTextMateRules
            }, vscode.ConfigurationTarget.Workspace);

            // Always use bg3txt for txt files
            existingFilesAssociations['*.txt'] = "bg3txt";

            // Update the file associations in the workspace configuration
            await config.update('files.associations', existingFilesAssociations, vscode.ConfigurationTarget.Workspace);
        }
    } catch (error) {
        // Display an error message if something goes wrong
        vscode.window.showErrorMessage(`An error occurred: ${error.message}`);
    }
}

// Export setupWorkspace function
module.exports = {
    setupWorkspace,
};
