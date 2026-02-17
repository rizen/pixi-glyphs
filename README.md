# pixi-glyphs

[![NPM](https://nodei.co/npm/pixi-glyphs.png)](https://nodei.co/npm/pixi-glyphs/)

`Glyphs` is a multi-style text component for [pixi.js](https://github.com/GoodBoyDigital/pixi.js) that supports multiple `TextStyle`s using HTML-like tags. Includes many additional features not found in `PIXI.Text` such as embedded images (sprites), underlines, justified layout, and more.

Inspired by the original [pixi-multistyle-text](https://github.com/tleunen/pixi-multistyle-text) and is the spiritual successor to [pixi-tagged-text](https://github.com/mimshwright/pixi-tagged-text). The difference in pixi-glyphs vs pixi-tagged-text is that pixi-glyphs is designed from the ground up for Pixi 8, whereas pixi-tagged-text was built for Pixi 6.

## Usage

```javascript
// constructor
new Glyphs(text, styles, options);
```

- `text` - A string containing the text to display. The text can be decorated with tags just like html.
- `styles` - An object with tag names as keys and `PIXI.TextStyle`+ objects as the values. The key `"default"` is used to set base values for all text.
- `options` - An object with additional confirguration options.

All parameters are optional.

### Text & tags

#### Text

The text can be any UTF-8 string.

- Multiline strings are supported (using "\n" or multiline strings wrapped in backticks).
- Emoji's are supported.
- RTL languages are NOT officially supported but seem to work in a limited capacity.

You can get the text with tags stripped out with the `.untaggedText` implicit getter.

#### Tags

- Tags are html-like, e.g. `Normal text. <bold>Bold text</bold>`
- Self-closing tags are ok e.g. `<img />`
- Nesting tags is supported. Closing tags must match in a FILO order as opening tags. `<b>bold <i>bold italic</i></b>`
- Attibutes added to tags will override any existing styles on the tag. `<b>bold</b> <b fontStyle="italic">bold italic</b>`
- Tags that do not have a matching style are NOT treated as tags. `<i><bold>just italic!</bold></i>` would render as _&lt;bold&gt;just italic!&lt;/bold&gt;_ if there were a style for `i` but not `bold`.
- No tag definitions are included by default. e.g. `<b>` won't be bold unless you include a style for `b` tags.
- Use backslash to escape tag characters and display them literally: `\<` renders as `<` and `\>` renders as `>`. For example, `\<b\>` displays the literal text `<b>` instead of being parsed as a tag. Use `\\` to display a literal backslash before a `<` or `>`.

#### Styles

`styles` is a plain object containing one or more keys. Each key is the name of a tag to style. 'Global' styles that apply everywhere can be set under the `default` key. _Note, some values such as `wordWrapWidth` are ignored if they are included in any styles other than `default`._

The style objects are modified versions (supersets) of `PIXI.TextStyle` (referred to as `TextStyleExtended` in the source code). In addition to [the properties allowed in TextStyle](https://pixijs.download/dev/docs/PIXI.TextStyle.html), the following extended properties are added.

(By the way, there is an excellent [TextStyle visual editor](https://pixijs.io/pixi-text-style/) that you can use to preview how your style will appear. The style objects generated can be used in this component.)

- Everything in [`PIXI.TextStyle`](https://pixijs.download/dev/docs/PIXI.TextStyle.html) including:
  - `fontFamily` - The font family. e.g. `"Arial"` or `"Arial, Helvetica, sans-serif"`
  - `fontStyle` - Font style. Options are `"normal"`, `"italic"`, `"oblique"`. Default is `"normal"`.
  - `fontVariant` - Font variant. Options are `"normal"`, `"small-caps"`. Default is `"normal"`. Small-caps renders lowercase letters as smaller versions of capital letters.
  - `fontWeight` - Font weight. Options include `"normal"`, `"bold"`, `"bolder"`, `"lighter"`, `"100"` through `"900"`. Default is `"normal"`.
  - `stroke` - Stroke color for the text. Default is `0x000000` (black).
  - `strokeThickness` - Thickness of the stroke. Default is `0` (no stroke).
  - `dropShadow` - Enable drop shadow. Default is `false`.
  - `dropShadowColor` - Drop shadow color. Default is `0x000000`.
  - `dropShadowBlur` - Drop shadow blur radius. Default is `0`.
  - `dropShadowAngle` - Drop shadow angle in radians. Default is `Math.PI / 6`.
  - `dropShadowDistance` - Drop shadow distance. Default is `5`.
  - `dropShadowAlpha` - Drop shadow alpha/opacity. Default is `1`.
  - `lineHeight` - The height of each line of text. Can be a number or a percentage string. Default is `0` (auto).
  - `leading` - The space between lines of text. Default is `0`.
  - `lineJoin` - Type of corner when drawing strokes. Options are `"miter"`, `"round"`, `"bevel"`. Default is `"miter"`.
  - `miterLimit` - Miter limit ratio when using `"miter"` lineJoin. Default is `10`.
  - `padding` - Padding around the text. Default is `0`.
  - `trim` - Trim transparent borders. Default is `false`.
  - `textBaseline` - The baseline of the text. Options are `"alphabetic"`, `"top"`, `"hanging"`, `"middle"`, `"ideographic"`, `"bottom"`. Default is `"alphabetic"`.
  - `whiteSpace` - How whitespace and newlines are handled. Options are `"normal"`, `"pre"`, `"pre-line"`. Default is `"pre"` (preserve whitespace and newlines).
  - `wordWrap` - Enable word wrapping. Default is `true` (changed from PIXI default of `false`).
  - `wordWrapWidth` - The width at which text wraps. Default is `500` (changed from PIXI default of `100`).
  - `breakWords` - Break words if they're too long for the wordWrapWidth. Default is `false`.
  - `fill` - The fill color. Can be a string, number, or gradient. Default is `0x000000` (black).
- `align` - Has all the options from `PIXI.TextStyle` plus additional options for justified alignment:
  - `"justify-left"`, `"justify-right"`, and `"justify-center"` are all types of jutified alignment and they only differ in how they treat the last line of text.
  - `"justify-all"` justifies all lines of text even the last line.
  - `"justify"` is an alias for `"justify-left"`.
- `valign` - Options are `"top"`, `"middle"`, `"bottom"`, `"baseline"`
- `textTransform` - Options are `"normal"`, `"capitalize"`, `"uppercase"`, `"lowercase"`
- `fontSize` - Has the added ability to use percentage-based sizes which are based on the `fontSize` in the parent tag. In the example: `<small fontSize="10">small<big fontSize="300%">big</big></small>`, "small" will be 10px and "big" will be 30px. The default `fontSize` is `26`px.
- `fontScaleWidth` - Percentage to scale the font e.g. `0.5` = 50%
- `fontScaleHeight` - Percentage to scale the font e.g. `1.25` = 125%
- `letterSpacing` - Additional horizontal spacing between each character in pixels. Can be positive to spread letters apart or negative to bring them closer together. Default is `0`.
- `wordSpacing` - Additional horizontal spacing for word separators (spaces) in pixels. Adjusts the width of spaces between words. Can be positive to increase spacing or negative to decrease spacing. Default is `0`.
- `lineSpacing` - Additional vertical spacing between lines of text in pixels. This spacing is added between all lines within a paragraph. Default is `0`.
- `paragraphSpacing` - Additional spacing between paragraphs that is added when you use an explicit carriage return rather than letting the text wrap at the end of a line. Default is `0`. Can also be negative.
- `breakLines` - When `breakLines` is `false`, the text in the tag will ignore the `wordWrapWidth` property and never wrap to the next line unless you explicitly include a newline character. It essentially treats the whole tag as a single word. If a nested tag overrides this, only the text inside the nested tag will wrap. Default is `true`.
- `imgSrc` - ID of image to include in this tag (see `imgMap` under Options section)
- `imgDisplay` - How should the image be displayed. `"block"` is no scaling, `"icon"` scales the image to match the text-size and appear inline, `"inline"` displays at original size inline. Default is `"inline"`.
- `iconScale` - If you use `imgDisplay="icon"`, this value will scale the size of the icon relative to the text size. Default is `1.0` (or 100%)
- `imgScale` - Scales both width and height of an image by a percentage. e.g. `"50%"` makes the image half size.
- `imgScaleX` - Scales only the width of an image by a percentage. e.g. `"200%"` makes the image twice as wide.
- `imgScaleY` - Scales only the height of an image by a percentage. e.g. `"75%"` makes the image 3/4 of its original height.
- `imgWidth` - Sets the width of an image in pixels or as a percentage. e.g. `100` or `"50%"`.
- `imgHeight` - Sets the height of an image in pixels or as a percentage. e.g. `50` or `"150%"`.
- `textDecoration` - (i.e. underlines) Adds lines under, over, or through your text. Possible values are either `"normal"` or one or more of `"underline"`, `"overline"`, `"line-through"` (as a space separated string). Can also be set using the more fine-grained properties below. By default, decorations have `color` that matches the `fill` color of the text, `thickness` of `1` and `offset` `0`. **Note: You may need to enabled the `drawWhitespace` option in `options` to avoid seeing gaps in your text decorations between words.**
- `decorationColor` - overrides the default color (`fill`) for all decorations.
- `decorationThickness` - overrides the default thickness (`1`) for all decorations.
- `underlineColor` - Sets the color of the underline. Default is same as `fill`
- `underlineThickness` - Sets the thickness of the underline. Default is `1`.
- `underlineOffset` - Positions the underline above or below the default location. Default is `0`.
- `overlineColor` - Sets the color of the overline. Default is same as `fill`
- `overlineThickness` - Sets the thickness of the overline. Default is `1`.
- `overlineOffset` - Positions the overline above or below the default location. Default is `0`.
- `lineThroughColor` - Sets the color of the line-through. Default is same as `fill`
- `lineThroughThickness` - Sets the thickness of the line-through. Default is `1`.
- `lineThroughOffset` - Positions the line-through above or below the default location. Default is `0`.
- `adjustBaseline` - Adjusts the position of the text above or below the baseline. Default is `0`. Also see the `adjustFontBaseline` property in the options.
- `topTrim` - Adjusts the line height of text by trimming (or expanding) from the top of the text. Positive values reduce the line height by trimming from the top (useful for reducing gaps above large text), while negative values increase the line height. This property only affects the segments that have it set, and the overall line height is determined by the tallest effective segment after all individual `topTrim` adjustments. Default is `0`. Example: `<big topTrim="50">Big Text</big>` reduces the line height of "Big Text" by 50 pixels from the top.
- `highlightColor` - Adds a background highlight color behind the text. Can be a hex number like `0xFFEB3B` or a hex string like `"#FFEB3B"`. The highlight appears as a continuous solid color box behind the text with no borders, spanning across spaces between words for a seamless highlight effect. When the same highlight color is applied to consecutive text segments, they will be rendered as a single continuous highlight box. Perfect for emphasizing important text, creating visual hierarchy, inline code blocks, or implementing syntax highlighting. Example: `<highlight>This entire phrase is highlighted</highlight>` will create one continuous highlight box. See also `highlightRoundness`, `highlightAlpha`, and `highlightSpaces` for additional control.
- `highlightRoundness` - Sets the corner radius of highlight boxes in pixels. Default is `0` (square corners). Higher values create more rounded corners on the highlight background. Example: `highlightRoundness: 8` creates pill-shaped highlights.
- `highlightAlpha` - Sets the opacity of the highlight background from `0` (fully transparent) to `1` (fully opaque). Default is `1`. Example: `highlightAlpha: 0.5` creates a semi-transparent highlight.
- `highlightSpaces` - When `true` (default), whitespace between words is highlighted, creating one continuous highlight box. When `false`, only the text characters are highlighted with gaps at spaces, creating a marker-highlighter effect. Example: `highlightSpaces: false` leaves gaps at spaces.
- `color` - An alias for `fill`. It's recommended you just use either `fill` or `color`, but if both are set, `fill` will be used. If tags are nested, `color` on an inner tag can override `fill` in an outer tag.

Note that pixi-glyphs changes some default values from PIXI.TextStyle:

- `wordWrap`: `false` -> `true`
- `wordWrapWidth`: `100` -> `500`
- `fill`, `stroke`, & `dropShadowColor` - `"black"` -> `0x000000`

##### 'Default' `default` styles

Some styles (`fontSize`, `color`, etc.) are set by default when you call `new Glyphs()` but they can all be overridden. The complete default styles are:

```javascript
{
  align: "left",
  valign: "baseline",
  wordWrap: true,
  wordWrapWidth: 500,
  fill: 0x000000,
  fontSize: 26,
  stroke: 0x000000,
  dropShadowColor: 0x000000,
  imgDisplay: "inline",
  iconScale: 1.0,
  breakLines: true
}
```

To get a complete list, you can view the static property `Glyphs.defaultStyles` or look in the source code for `DEFAULT_STYLES`

### Options

The third parameter in the Glyphs constructor is a set of options.

- `debug` - If `true`, generates debug information which is overlaid on the text during `draw()`. default is `false`.
- `debugConsole` - If `true`, logs debug information to the console during `draw()`. default is `false`.
- `splitStyle` - Allows you to specify how the text should be split into `PIXI.Text` objects when rendered. This would affect things like animations that operate on each individual piece of text within the component. Possible values are are `"words"` (default) and `"characters"`.
- `imgMap` - An object that maps string ids like `"myImage"` to Sprite objects like `PIXI.Sprite.from("./myImage.png")`. This id will be used in the `imgSrc` style property to make a tag with that id render the sprite. As of v2.1.4, in addition to Sprites, you can also use any value supported by `Sprite.from()` or `Texture.from()` (including ImageHTMLElement or url strings). When a style contains `imgSrc="myImage"`, the matching sprite is used. By default, each of the keys you provide here will automatically be added as a style in the `tagStyles` (equivalent to `{ myImage: { imgSrc: "myImage"}}`) so you can add a tag `<myImage />`. default is `{}`.

  **Note on icon scaling:** pixi-glyphs automatically enables linear filtering and mipmaps on textures to ensure icons scale smoothly. However, if a texture has already been rendered to the GPU before being passed to pixi-glyphs, mipmaps may not generate correctly. If you experience pixelated icons, load your textures with mipmaps enabled:
  ```javascript
  const texture = await PIXI.Assets.load({
    src: 'icon.png',
    data: { scaleMode: 'linear', autoGenerateMipmaps: true }
  });
  const icon = new PIXI.Sprite(texture);
  ```
- `adjustFontBaseline` - For fonts that do not align correctly with the baseline, this adjusts the position of the text relative to the baseline. This should be an object with font names for keys and a value which is a string percentage (of the font's _ascent_, or height above the baseline) or a numerical value in pixels to adjust the offset. E.g. `{"arial": "80%"}`. Since this value changes for each `fontFamily` and for each `fontSize` it's recomended that you use the percentage values. Default is no adjustments.
- `scaleIcons` - When `true`, images in the imgMap that use `imgDisplay: icon` will scale with the text when `fontScaleWidth` or `fontScaleHeight` are set. Default is `true`.
- `drawWhitespace` - When `true`, whitespace characters are rendered as their own Text objects. Default is `false`.
- `wrapEmoji` - When `true`, emoji characters are automatically wrapped in a special tag `<__EMOJI__>` which allows the user to specify styles for emoji only. A base style is automatically defined for `__EMOJI__` that sets the `font-family` to `sans-serif`. This helps to solve some issues with rendering on certain fonts that don't handle emojis well. Default is `true`. (This feature may be removed in future updates)
- `skipUpdates` - When `true`, `update()` will not be called when text or styles are changed; it must be called explicitly or overridden using the skipUpdate parameter in functions such as `setText()`. default is `false`.
- `skipDraw` - When `true`, `draw()` will not be called by `update()` it must be called explicitly or overridden using the `skipDraw` parameter, e.g. `myGlyphs.update(false)`. default is `false`.
- `supressConsole` - When `true`, prevents warnings and other messages from being logged to the console, however, this does **not** affect `debugConsole`.
- `errorHandler` - A handler function that will receive non-fatal warnings and errors generated by the component. **This will not catch any exceptions**, only internal messaging such as when you try use an unknown tag. The handler should be in the format `(e:ErrorMessage) => void` where `ErrorMessage` is an object with the shape `{ code: string, message: string, type: "warning" | "error" }`.
- `overdrawDecorations` - When using text decorations (e.g. `underline`) an additional length in pixels equal to `overdrawDecorations` will be added to _both_ sides of the line. Default is `0`.
- `lineSpacing` - Sets the default line spacing for all text. Can also be set per-tag in styles. Default is `0`.
- `paragraphSpacing` - Sets the default paragraph spacing for all text. Can also be set per-tag in styles. Default is `0`.

To see a list of the default options, you can view the static property `Glyphs.defaultOptions` or look in the source code for `DEFAULT_OPTIONS`

## A note about the component architecture

`Glyphs` allows you to control text with multiple styles and embedded images as though it were a single Pixi component. It was inspired by [pixi-multistyle-text](https://github.com/tleunen/pixi-multistyle-text) but is structurally very different.

pixi-multistyle-text composes bitmap snapshots of text objects into a single canvas. Conversely, pixi-glyphs creates a separate `PIXI.Text` component for each word, or word segment. Using multiple `Text` components allows developers to have control over individual words or even characters for the purposes of animation or other effects. It also makes embedding sprites into the layout easier. Cosmetically, they're very similar, however, the overhead of creating multiple Text objects is much larger potentially making `Glyphs` a heavier slower component.

Another similar component is [@pixi/text-html](https://github.com/pixijs/html-text) which renders a bitmap from an HTML element using the browser's native rendering. While pixi-glyphs should theoretically render more consistently cross-browsers, this could be a good option if pixel perfection and cross-browser support is not a concern.

## Child DisplayObjects

Glyphs generates multiple display objects when it renders the text with `draw()`. Developers can access these children if desired for example to add additional interactivity or to animated individual elements.

**Please note that by default, these are recreated every time text or style properties change (technically, whenever `draw()` is called).** Manipulating the children directly may cause your view to become out of sync with the `text` and `styles` properties.

These properties are available:

- `textContainer` - The Container layer which holds all the text fields rendered by draw.
- `spriteContainer` - The Container layer which holds all the sprites rendered by draw if you're using an image map (`imgMap`).
- `debugContainer` - The SpContainerite layer which holds all debug overlay information (if you're using the `debug: true` setting).
- `decorationContainer` - The Container layer which holds all text decorations (underlines).
- `textFields` - An array containing all the text fields generated by draw.
- `sprites` - If you're using an image map (`imgMap`), this array stores references to all the Sprites generated by draw.
- `spriteTemplates` - The sprites in `sprites` and `spriteContainer` are actually _clones_ of the originals passed in via the `imgMap` option. To get the originals, access them this way.
- `decorations` - Array of Graphic objects which render the text decorations.

### Life-cycle & optional updates

In order to maximize performance of Glyphs, it helps to understand how it renders the input.

1. Constructor - creating the component is the first step. You can set `text`, `styles`, and `options` in the constructor.
2. `update()` - Update generates a list of plain JS object tokens that hold information on what type of text to create and where to position it. The tokens contain all the information you need to draw the text and are saved as the instance member `tokens` but also returned by the `update()` method. Aside from decoupling from the render code, this allows us to write tests to verify every step of the lexing, styling and layout independently without drawing anything at all. By default, this is called every time the text or style definitions are changed (e.g. `setTagStyles()`, `setText()`). This is a fairly expensive process but usually faster than `draw()`.
3. `draw()` - Draw creates the child objects based on the data generated by `update()`. It clears any existing children (if needed) then recreates and positions them. This is probably the costliest method in the life-cycle. By default, this is called automatically by `update()`.
4. Of course, you won't see anything on your screen until your component is added to a visible PIXI container that's part of the stage in a pixi app.

The methods that normally trigger an update are:

- `setText()` & `myText.text =` (implicit setter)
- `setTagStyles()` & `tagStyles =` (implicit setter)
- `setStyleForTag()`
- `setDefaultStyle()` & `defaultStyle =` (implicit setter)
- `removeStylesForTag()`

The methods that normally trigger a draw:

- `update()`

**Please note that direct changes to styles or other objects will not trigger an automatic update unless you use one of the above methods.** For example:

```typescript
const t = new Glyphs("<big>Big text</big>", { big: { fontSize: 25 } }); // renders "Big text" at 25px

t.getStyleForTag("big").fontSize = 100; // The change to the style wasn't detected. It still renders "Big text" at 25px

t.update(); // now it renders correctly.

t.textFields[0].visible = false; // Makes the word "Big" disappear.

t.draw(); // recreates the text fields restoring "Big"
```

#### `skipUpdates` & `skipDraw`

If performance is becoming an issue, you can use the `skipUpdates` and `skipDraw` flags in the options object with `new Glyphs()` to disable automatic updates and automatic drawing (more on that below). This gives you control over when the update() or draw() function will be called. However, the component can become out of sync with what you see on your screen so use this with caution.

Several other individual functions, such as `setText()` also give you the option to `skipUpdate` on an as needed basis.

```typescript
// Create a new Glyphs but disable automatic updates and draws.
const t = new Glyphs("", {}, {skipUpdate: true, skipDraw: true});
const words = ["lorem", "ipsum", ... ];
// add words until the length of text is > 500 characters.
while (t.untaggedText.length <= 500) {
  t.text += words[i];
}

// Normally, update() will draw() also, but we've disabled that.
// t.tokens will be up dated to match the new text but it will not appear on the screen.
t.update();
t.textContainer.length; // 0 - text fields never got created.

// Manually call draw to generate the PIXI.Text fields
t.draw();
t.textContainer.length; // This will now contain all the PIXI.Text objects created by draw.
```

### Destructor

Like with other Pixi components, when you're ready to remove your `Glyphs` object from the stage and make it ready for garbage collection, use the [`.destroy()`](https://pixijs.download/release/docs/PIXI.Container.html#destroy) method. Unlike some other Pixi components, `Glyphs` will automatically destroy its child objects, such as fragments of text and debug drawings (with the exception of `imgMap`, see below). Child objects can still be retained by passing options to the destructor, e.g. `.destroy(false)`.

### Destroying `imgMap` sources

`destroy()` will _not_ by default destroy the textures used for the `imgMap` since these are often shared between multiple `Glyphs` objects.

To destroy the source textures in `imgMap` use the method `.destroyImgMap()`. Please note that this must be called _before_ destroying the `Glyphs` instance and will throw an error if you try to call it on an already-destroyed instance.

## Contributing

If you'd like to contribute, a great place to start is to log an issue. If you are interested in bug-fixing, please take a look at the issues list and notify one of the owners that you're interested in working on it. Please make sure to test the code you write! If you're not sure how, just ask for help!

## Build instructions

```bash
npm install
npm run build
```

The [node-canvas](https://www.npmjs.com/package/canvas) package, used for testing, has some additional dependencies. For Mac users, there's a homebrew Brewfile that you can install using `brew bundle`. For other users, see [the instructions for the package](https://www.npmjs.com/package/canvas). On Apple Silicon, [this issue](https://github.com/Automattic/node-canvas/issues/2433) was helpful with troubleshooting.

npm should automatically install peer dependencies (including the very important pixi.js) but in my experience, you may have to run `npm install` again after adding any additional packages.

### VSCode Users

If you're using the [vscode-jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest), you may need [some additional packages](https://github.com/Automattic/node-canvas#compiling) to get the tests to run in your IDE. If you're on a Mac you can use `brew bundle install` to install these packages.

## Demo

You can view examples using the command:

```bash
npm run docs
```

This will start a simple HTTP server running locally on port 8080. Navigate to [http://localhost:8080/demo](http://localhost:8080/demo)

## Dependencies

The build process is slightly complex and some of the build dependencies are at the max major version that doesn't break. These depdencies seem to cause issues at certain versions...

| package                    | max version |
| -------------------------- | ----------- |
| jest, @types/jest, ts-jest | 26          |
| emoji-regex                | 9           |

## License

MIT, see [LICENSE.md](http://github.com/rizen/pixi-glyphs/blob/main/LICENSE.md) for details.
