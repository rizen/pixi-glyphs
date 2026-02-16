module.exports = {
  runner: "@jest-runner/electron",
  testEnvironment: "@jest-runner/electron/environment",
  setupFiles: ["<rootDir>/test/support/mockConsole.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(pixi.js|earcut)/)"
  ],
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        allowJs: true,
        esModuleInterop: true,
        target: "ESNext",
        module: "CommonJS",
        moduleResolution: "node",
      },
      diagnostics: false,
    }
  },
  moduleNameMapper: {
    "^pixi\\.js$": "<rootDir>/node_modules/pixi.js/lib/index.js"
  }
};
