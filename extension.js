const vscode = require('vscode');
// Import the setupWorkspace function from the workspace_setup module
const { setupWorkspace } = require('./src/workspace_setup');

// Import the provideDocumentFormattingEdits function from the document_formatter module
const { provideDocumentFormattingEdits } = require('./src/document_formatter');

// Import and initialize the TextHeighlightService
const TextHeighlightService = require('./src/textHeighlightService');
TextHeighlightService.initialize();

// The activate function is the entry point for the extension
function activate(context) {
    try {
        // Register a new document formatting edit provider for the 'bg3txt' language
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('bg3txt', {
            provideDocumentFormattingEdits(document) {
                return provideDocumentFormattingEdits(document);
            },
        }));

        // Initialize workspace with color and text highlights from TextHeighlightService
        setupWorkspace(TextHeighlightService.patterns);

    } catch (error) {
        // Log and show any errors that occur during the activation process
        console.error(`An error occurred during activation: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to activate extension: ${error.message}`);
    }
}

// Export the activate function so VS Code can call it
exports.activate = activate;
