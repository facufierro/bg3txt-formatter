const fs = require('fs'); // For file system operations
const path = require('path'); // For working with file and directory paths
const { exec } = require('child_process'); // To execute shell commands

// Import and initialize the TextHeighlightService
const TextHeighlightService = require('./src/TextHeighlightService');
TextHeighlightService.initialize();

// Resolve the path where the tmLanguage.json file will be generated
const outputPath = path.resolve(__dirname, './syntaxes/bg3txt.tmLanguage.json');

try {
    // Write the syntax heighlighting data to a JSON file
    fs.writeFileSync(outputPath, JSON.stringify(TextHeighlightService.tmLanguageData, null, 2));
    console.log(`Successfully generated ${outputPath}`);
} catch (error) {
    console.error(`An error occurred while writing the file: ${error.message}`);
    process.exit(1); // Exit with a failure code
}

// Run vsce package to package the extension
exec('npx vsce package', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error during vsce package: ${err}`);
        process.exit(1); // Exit with a failure code
        return;
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
        console.log(`stderr: ${stderr}`);
    }
});
