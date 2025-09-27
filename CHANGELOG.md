# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.1](https://github.com/rizen/pixi-glyphs/compare/v4.1.0...v4.1.1) (2025-09-27)

## [4.1.0](https://github.com/rizen/pixi-glyphs/compare/v4.0.3...v4.1.0) (2025-09-27)

- Added: `highlightColor` option for highlight text.

### [4.0.3](https://github.com/rizen/pixi-glyphs/compare/v4.0.2...v4.0.3) (2025-09-27)

- Fixed: lineSpacing and paragraphSpacing as options.
- Added: Dynamic demonstration on the spacing demo.
- Added: Style Properties Documentation:
  1. Image properties - Added complete documentation for:
    - imgScale, imgScaleX, imgScaleY - For scaling images by percentage
    - imgWidth, imgHeight - For setting image dimensions
    - Updated imgDisplay to include all three options: "inline", "icon", "block" with default value
  2. Common PIXI.TextStyle properties - Added explicit documentation for commonly used properties that were inherited but not mentioned:
    - fontFamily, fontStyle, fontWeight
    - stroke, strokeThickness
    - dropShadow and related properties
    - padding, trim
  3. Updated Default Styles section - Now shows the complete list of default values:
    - Added fontSize: 26
    - Added stroke: 0x000000
    - Added dropShadowColor: 0x000000
    - Added imgDisplay: "inline"
    - Added iconScale: 1.0
    - Added breakLines: true
  4. Options:
    - Added lineSpacing: 15
    - Added letterSpacing: 3

### [4.0.2](https://github.com/rizen/pixi-glyphs/compare/v4.0.1...v4.0.2) (2025-09-22)

- Fixed: Typos in package.json. 
- Added: Documentation about Pixi 8 to the README.md.

### [4.0.1](https://github.com/rizen/pixi-glyphs/compare/v5.0.0...v4.0.1) (2025-09-19)

- Fixed: PixiJS Deprecation Warning: Texture.baseTexture is now Texture.source
- Fixed: Link to github in demos
- Feature: Added a web fonts demo with an svg icon.
- Fixed: Updated the demos to say pixi 8 rather than 6.
- Fixed: Demos now show more accurate code examples.

## 4.0.0 (2025-09-19)

- Forked from pixi-tagged-text and updated to use pixi.js v8.
- Rewrote demos to have a nicer look and feel.
- For releases before v4, please see [Pixi Tagged Text](https://github.com/mimshwright/pixi-tagged-text).
