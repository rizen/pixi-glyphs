// Patches rollup-plugin-typescript2's broken default include pattern.
// rpt2 uses bash extglob syntax that picomatch doesn't support,
// causing the filter to silently skip all .ts files.
const fs = require("fs");
const path = require("path");

const rpt2Dist = path.join(
  __dirname,
  "..",
  "node_modules",
  "rollup-plugin-typescript2",
  "dist",
  "rollup-plugin-typescript2.cjs.js"
);

if (!fs.existsSync(rpt2Dist)) {
  process.exit(0);
}

const code = fs.readFileSync(rpt2Dist, "utf8");
const broken = '"*.ts+(|x)", "**/*.ts+(|x)"';
const fixed = '"*.ts", "*.tsx", "**/*.ts", "**/*.tsx"';

if (!code.includes(broken)) {
  if (code.includes(fixed)) {
    process.exit(0);
  }
  console.warn("warn: rpt2 include pattern not found, skipping patch");
  process.exit(0);
}

fs.writeFileSync(rpt2Dist, code.replace(broken, fixed));
console.log("Patched rollup-plugin-typescript2 include pattern");
