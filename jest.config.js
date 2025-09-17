module.exports = {
  preset: "ts-jest",
  runner: "@jest-runner/electron",
  testEnvironment: "@jest-runner/electron/environment",
  setupFiles: ["<rootDir>/test/support/mockConsole.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(pixi.js|earcut)/)"
  ],
  moduleNameMapper: {
    "^pixi\\.js$": "<rootDir>/node_modules/pixi.js/lib/index.js"
  }
};
