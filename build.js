const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const tmLanguageData = require('./src/tmLanguage');

const outputPath = path.resolve(__dirname, './syntaxes/bg3txt.tmLanguage.json');

fs.writeFileSync(outputPath, JSON.stringify(tmLanguageData, null, 2));
console.log(`Successfully generated ${outputPath}`);

// Run vsce package
exec('npx vsce package', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error during vsce package: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
