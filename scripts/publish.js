const { execFileSync } = require("child_process");

function git(args, options = {}) {
  const output = execFileSync("git", args, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "inherit"],
  });

  return typeof output === "string" ? output.trim() : "";
}

let branch;

try {
  branch = git(["branch", "--show-current"]);
} catch (_error) {
  console.log("Skipping release push outside the pixi-glyphs Git checkout.");
  process.exit(0);
}

// pnpm runs a package's `publish` lifecycle while preparing Git dependencies.
// Those installs use a detached checkout, so publishing must be a harmless no-op
// there while remaining available as `npm run publish` in the real repository.
if (branch !== "main") {
  console.log(`Skipping release push from ${branch || "a detached checkout"}.`);
  process.exit(0);
}

git(["push", "--follow-tags", "origin", "main", ...process.argv.slice(2)], {
  stdio: "inherit",
});
