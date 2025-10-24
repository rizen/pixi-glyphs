# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.0.0](https://github.com/rizen/pixi-glyphs/compare/v4.3.0...v5.0.0) (2025-10-24)

- Breaking: Removed the default export. Use `import {Glyphs} from 'pixi-glyphs'` instead.
- Fix: Icons not lining up at their base. 
- Fix: Moved baseUrl inside the compilerOptions object where it belongs.
- Add: SVG icon to the inline images demo.
- Fix: Removed the download measurements button from the demos.
- Fix: Duplicated controls in the demos.

## [4.3.0](https://github.com/rizen/pixi-glyphs/compare/v4.2.1...v4.3.0) (2025-10-23)

- Fix: Sprite/image tokens by tracking tallestSpriteHeight separately and using bounds.height instead of fontProperties.
- Add: Wired up a second slider on the giant text demo to demonstrate topTrim across multiple styles.
- Add: wordSpacing. This is a new property that allows you to add space between words.

### [4.2.1](https://github.com/rizen/pixi-glyphs/compare/v4.2.0...v4.2.1) (2025-10-14)

- Fix: Ensure that when topTrim reduces the ascent of a line, the baseHeight is recalculated from the effective ascent (with topTrim applied) plus descent. This makes subsequent lines move up properly without creating gaps.
- Fix: Apply a clipping mask to resize the bounds of the text removed by topTrim.

## [4.2.0](https://github.com/rizen/pixi-glyphs/compare/v4.1.8...v4.2.0) (2025-10-14)

- Added: release:minor and release:major scripts to package.json.
- Added: new property called `topTrim` that allows you to adjust the top of a word to align it with the line height, which is mostly useful for very large fonts.
- Fixed: Updated the deprecated highlightBlock method to highlightElement to stop the deprecation warning that was appearing in the console when loading the demos.

### [4.1.8](https://github.com/rizen/pixi-glyphs/compare/v4.1.7...v4.1.8) (2025-10-13)

- Fixed: PixiJS Deprecation Warning: Container.name property has been removed, use Container.label instead
- Fixed: PixiJS Deprecation Warning: Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.
- Fixed: PixiJS Deprecation Warning: Graphics#drawRect has been renamed to Graphics#rect
- Fixed: PixiJS Deprecation Warning: Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.
- Fixed: PixiJS Deprecation Warning: Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.
- Added: Giant text demo
- Fixed: Refactored font metrics measurement to use PIXI.CanvasTextMetrics for consistent baseline alignment and removed size-based y-position adjustments
- Fixed: Empty line baseline calculation in layout.ts by detecting lines with only newline tokens and using the newline's ascent value instead of skipping it, which prevented text overlap when empty lines (paragraph spacing) appeared after giant styled text.


### [4.1.7](https://github.com/rizen/pixi-glyphs/compare/v4.1.6...v4.1.7) (2025-10-10)

- Fixed: PixiJS Deprecation Warning: strokeThickness is now a part of stroke by using the new api

### [4.1.6](https://github.com/rizen/pixi-glyphs/compare/v4.1.5...v4.1.6) (2025-10-10)

- Added: an iconScaling slider to the debug demo
- Fixed: A problem where text was always getting a small outline by defaulting the stroke thickness to 0.

### [4.1.5](https://github.com/rizen/pixi-glyphs/compare/v4.1.4...v4.1.5) (2025-10-06)

- The empty lines will now have proper spacing even with negative paragraph spacing!

### [4.1.4](https://github.com/rizen/pixi-glyphs/compare/v4.1.3...v4.1.4) (2025-10-06)

- Multiple consecutive carriage returns will all render with proper vertical spacing based on the last non-empty line's height.

### [4.1.3](https://github.com/rizen/pixi-glyphs/compare/v4.1.2...v4.1.3) (2025-10-03)

- Added: Line Endings example.
- Fixed: A problem where a line wrap on an inline style would create weird gaps between the inline styles.
- Added: Effects example.

### [4.1.2](https://github.com/rizen/pixi-glyphs/compare/v4.1.1...v4.1.2) (2025-09-27)

- Fixed: Outdated refereneces to yarn in the docs.

### [4.1.1](https://github.com/rizen/pixi-glyphs/compare/v4.1.0...v4.1.1) (2025-09-27)

- Fixed: Memory leaks when destroying Glyphs object.
- Fixed: Text color in the highlights demo.
- Added: Documentation for the standard Pixi.TextStyle properties that are inherited by Glyphs in our Readme:
  1. Drop Shadow Details: dropShadowBlur, dropShadowAngle, dropShadowDistance, dropShadowAlpha
  2. Line & Text Layout: lineHeight, leading, textBaseline, whiteSpace
  3. Stroke Details: lineJoin, miterLimit
  4. Word Wrapping: Moved wordWrap, wordWrapWidth, and added breakWords to the standard properties section
  5. Fill: Added explicit documentation for the fill property
  6. fontVariant.
- Fixed: PixiJS Deprecation Warning: addChild: Only Containers will be allowed to add children in v8.0

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
