const vscode = require('vscode');
// Function to set up workspace configuration for BG3 Modding
async function setupWorkspace(rules) {
    try {
        // Show information message asking for user confirmation to optimize settings
        const userChoice = await vscode.window.showInformationMessage('Would you like to optimize your workspace settings BG3 Modding?', 'Yes', 'No');

        // Proceed only if the user chooses 'Yes'
        if (userChoice === 'Yes') {
            // Get the existing workspace configuration
            const config = vscode.workspace.getConfiguration();

            // Retrieve existing settings for tokenColorCustomizations and files.associations
            const existingTokenColorCustomizations = config.get('editor.tokenColorCustomizations') || {};
            const existingTextMateRules = existingTokenColorCustomizations.textMateRules || [];
            const existingFilesAssociations = config.get('files.associations') || {};

            // Initialize new textMateRules array
            let newRules = [];

            // Loop over patterns to set new rules
            for (const rule of rules) {
                newRules.push({
                    "scope": rule.name,
                    "settings": {
                        "foreground": rule.color
                    }
                });
            }

            // Add new rules to existing rules if they don't already exist
            newRules.forEach((newRule) => {
                if (!existingTextMateRules.some(rule => rule.scope === newRule.scope)) {
                    existingTextMateRules.push(newRule);
                }
            });

            // Update tokenColorCustomizations
            console.log("Existing TextMate Rules before update:", existingTextMateRules);

            await config.update('editor.tokenColorCustomizations', {
                "textMateRules": existingTextMateRules
            }, vscode.ConfigurationTarget.Workspace);
            console.log("Existing TextMate Rules after update:", existingTextMateRules);

            // Update files.associations for txt files to use bg3txt
            existingFilesAssociations['*.txt'] = "bg3txt";
            await config.update('files.associations', existingFilesAssociations, vscode.ConfigurationTarget.Workspace);
        }
    } catch (error) {
        // Log error message if any exceptions occur
        console.error(`An error occurred while setting up the workspace: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to set up workspace: ${error.message}`);
    }
}

// Export setupWorkspace function
module.exports = {
    setupWorkspace,
};
