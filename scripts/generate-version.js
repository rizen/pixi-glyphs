const fs = require('fs');
const path = require('path');

// Read version from package.json
const packagePath = path.join(__dirname, '../package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Generate version.js for docs
const versionContent = `// Auto-generated file - do not edit
export const VERSION = '${packageData.version}';
`;

const outputPath = path.join(__dirname, '../docs/version.js');
fs.writeFileSync(outputPath, versionContent, 'utf8');

console.log(`Generated docs/version.js with version ${packageData.version}`);
