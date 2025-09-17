import { expectToBeBetween } from "./support/testUtil";
import { DEFAULT_KEY, GlyphsOptions } from "./../src/types";
import * as PIXI from "pixi.js";
import { pluck } from "../src/functionalUtils";
import Glyphs from "../src/Glyphs";
import iconSrc from "./support/icon.base64";
import {
  iconImage,
  iconTexture,
  icon,
  createTexture,
  createSprite,
} from "./support/testIcon";
import {
  Align,
  SplitStyle,
  VAlign,
  ImageDisplayMode,
  TextStyleSet,
  ErrorMessage,
} from "../src/types";
import { Graphics } from "pixi.js";
import DEFAULT_STYLE from "../src/defaultStyle";

describe("Glyphs", () => {
  const style: TextStyleSet = {
    default: {
      fontSize: 10,
      fontFamily: "arial",
    },
    b: { fontWeight: "bold" },
    i: { fontStyle: "italic" },
  };

  const emptySpriteBounds = new PIXI.Rectangle(0, 0, 0, 0);
  const containerSpriteBounds = new PIXI.Rectangle(0, 0, 1, 1);

  describe("mock image", () => {
    test("Image has loaded.", () => {
      expect(iconImage.width).toBeGreaterThan(1);
      expect(iconImage.height).toBeGreaterThan(1);
    });
    test("Texture has loaded.", () => {
      expect(iconTexture.width).toBeGreaterThan(1);
      expect(iconTexture.height).toBeGreaterThan(1);
    });
    test("Sprite has loaded.", () => {
      expect(icon.width).toBeGreaterThan(1);
      expect(icon.height).toBeGreaterThan(1);
    });
  });

  describe("constructor", () => {
    it("Takes a string for the text content. Strings can be multi-line. Strings don't need to contain any tags to work.", () => {
      const t = new Glyphs("Hello,\nworld!");
      expect(t.text).toBe("Hello,\nworld!");
    });
    it("Takes an optional list of styles.", () => {
      const t = new Glyphs("Hello!", { b: { fontWeight: "700" } });
      expect(t.tagStyles).toHaveProperty("b");
    });

    describe("defaultStyles", () => {
      it("Should define some styles by default like text color: black.", () => {
        const text = new Glyphs("Hello");
        expect(text.defaultStyle.fill).toEqual(0);
      });

      it("Should provide the default styles for Glyphs as a static value.", () => {
        const defaultStyles = Glyphs.defaultStyles;
        expect(defaultStyles).toHaveProperty(DEFAULT_KEY);
        expect(defaultStyles.default).toHaveProperty("valign", "baseline");
      });

      it("defaultStyles replaces color names like 'black' with numbers", () => {
        expect(Glyphs.defaultStyles.default).toHaveProperty("fill", 0);
      });

      it("defaultStyles uses 26px as a default for fontSize", () => {
        expect(Glyphs.defaultStyles.default).toHaveProperty("fontSize", 26);
      });

      it("defaultStyles should not be editable.", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => (Glyphs.defaultStyles = {})).toThrow();
        expect(Glyphs.defaultStyles).toHaveProperty(DEFAULT_KEY);
      });
    });
    describe("defaultOptions", () => {
      it("Should define some options by default like text debug:false.", () => {
        const text = new Glyphs("Hello");
        expect(text.options.debug).toBeFalsy();
      });
      it("Should provide the default options as a static value.", () => {
        const defaultOptions = Glyphs.defaultOptions;
        expect(defaultOptions).toHaveProperty("splitStyle", "words");
        expect(defaultOptions).toHaveProperty("debug", false);
      });
      it("defaultOptions should not be editable.", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => (Glyphs.defaultOptions = {})).toThrow();
        expect(Glyphs.defaultOptions).toHaveProperty("splitStyle");
      });
    });
    describe("constructor takes a list of options.", () => {
      describe("debug", () => {
        const control = new Glyphs("Test <b><i>test</i></b>", style);
        const debug = new Glyphs("Test <b><i>test</i></b> test", style, {
          debug: true,
        });
        const blank = new Glyphs("", style, { debug: true });

        it("Draws all shapes into one graphics layer.", () => {
          expect(blank.debugContainer).not.toBeNull();
          expect(blank.debugContainer?.children).toHaveLength(1);
          expect(blank.debugContainer?.getChildAt(0)).toBeInstanceOf(
            PIXI.Graphics
          );
        });

        it("Should show debug information if you set debug to true.", () => {
          // one element for the graphics layer
          // 5 elements for the text layers
          expect(debug.debugContainer?.children).toHaveLength(6);

          expect(debug.debugContainer?.getBounds().width).toBeGreaterThan(100);
        });
        it("Should show the tag names for styled text.", () => {
          expect(debug.debugContainer?.getChildAt(3)).toHaveProperty(
            "text",
            "b,i"
          );
        });

        it("Should have debug set to false by default.", () => {
          expect(control.debugContainer?.children).toHaveLength(0);
          expect(control.debugContainer?.getBounds()).toMatchObject(
            emptySpriteBounds
          );
        });
      });

      describe("debugConsole", () => {
        it("It should log debug info to console.", () => {
          const consoleSpy = jest.spyOn(console, "log");
          new Glyphs("This <b>should appear</b> in console!", style, {
            debugConsole: true,
          });
          expect(consoleSpy).toHaveBeenCalled();
        });

        it("Should have debugCosole set to false by default.", () => {
          const control = new Glyphs("Test <b>test</b>", style);
          expect(control.options.debugConsole).toBeFalsy();
        });
      });

      describe("imageMap", () => {
        const t = new Glyphs(
          "a b c <icon/>",
          { icon: { imgDisplay: "icon", fontSize: 48 } },
          { imgMap: { icon }, debug: true }
        );

        const iconStyle = t.getStyleForTag("icon");

        it("Should allow you to provide a mapping of strings to images to your text field.", () => {
          expect(t.sprites).toHaveLength(1);
        });
        it("Should automatically create a style for a tag with the same name as the image keys.", () => {
          expect(iconStyle?.imgSrc).toBe("icon");
        });
        it("Should not clobber the existing styles if any were already defined.", () => {
          expect(iconStyle?.imgDisplay).toBe("icon");
          expect(iconStyle?.fontSize).toBe(48);
        });

        describe("Icon sizes", () => {
          it("All icons in the same style should have same size.", () => {
            const iconTest = new Glyphs(
              "<icon />A<icon />",
              { icon: { imgDisplay: "icon", fontSize: 30 } },
              { imgMap: { icon } }
            );
            const tokens = iconTest.tokensFlat;
            const [icon0, , icon1] = tokens;

            expect(icon0.bounds.height).toBeGreaterThan(1);
            expect(icon1.bounds.height).toBeGreaterThan(1);

            expect(icon0.bounds.height).toBe(icon1.bounds.height);
            expect(icon0.bounds.width).toBe(icon1.bounds.width);

            const [icon0Sprite, icon1Sprite] = iconTest.sprites;
            expect(icon0Sprite.height).toBe(icon1Sprite.height);
            expect(icon0Sprite.width).toBe(icon1Sprite.width);
          });
        });

        describe("imgSrc using non-Sprite references", () => {
          it("Should load images from a Texture object", () => {
            const texTest = new Glyphs(
              "<icon />",
              { icon: { imgDisplay: "icon" } },
              { imgMap: { icon: iconTexture } }
            );

            const icon = texTest.tokensFlat[0];
            expect(icon.bounds.height).toBeGreaterThan(1);
            expect(texTest.spriteTemplates.icon).toBeInstanceOf(PIXI.Sprite);
          });
          it("Should load images from an HTMLImage object", () => {
            const imgTest = new Glyphs(
              "<icon />",
              { icon: { imgDisplay: "icon" } },
              { imgMap: { icon: iconImage } }
            );

            const icon = imgTest.tokensFlat[0];
            expect(icon.bounds.height).toBeGreaterThan(1);
            expect(imgTest.spriteTemplates.icon).toBeInstanceOf(PIXI.Sprite);
          });
          it("Should load images from a URL", () => {
            const urlTest = new Glyphs(
              "<img />",
              {},
              {
                imgMap: { img: "./100.png" },
              }
            );

            expect(urlTest.spriteTemplates).toHaveProperty("img");
            expect(urlTest.spriteTemplates.img).toBeInstanceOf(PIXI.Sprite);
            const img = urlTest.tokensFlat[0];
            expect(img.bounds.height).toBeGreaterThanOrEqual(1);
            expect(img.bounds.width).toBeGreaterThanOrEqual(1);
          });

          // todo: test HTMLVideoElement
          // todo: test video URL
          // todo: test HTMLCanvasElement
          // todo: test BaseTexture
        });

        it("should throw if an imgSrc uses a bogus reference", () => {
          expect(() => {
            new Glyphs(
              "<img />",
              {},
              { imgMap: { img: new Date() as unknown as string } }
            );
          }).toThrow(/not in a valid format/);
        });

        it("should throw if the reference to the sprite was destroyed", () => {
          const texture = createTexture();
          expect(() => {
            new Glyphs("<img />", {}, { imgMap: { img: texture } });
          }).not.toThrow();

          texture.destroy(true);

          expect(() => {
            new Glyphs("<img />", {}, { imgMap: { img: texture } });
          }).toThrow(/destroyed/);
        });
      });
      describe("adjustFontBaseline", () => {
        const text = "<a>a</a><b>b</b><c>c</c>";
        const style: TextStyleSet = {
          default: { valign: "baseline" },
          a: { fontFamily: "Arial", fontSize: 16 },
          b: { fontFamily: "Georgia", fontSize: 14 },
          c: { fontFamily: "Georgia", fontSize: 28 },
        };
        const aPercent = 0.5;
        const bPixels = 4;
        const cPixels = bPixels;
        const options = {
          adjustFontBaseline: { Arial: `${aPercent * 100}%`, Georgia: bPixels },
        };
        const control = new Glyphs(text, style, {});
        const adjustFontBaseline = new Glyphs(text, style, options);

        const [aControl, bControl, cControl] = control.tokensFlat;
        const [a, b, c] = adjustFontBaseline.tokensFlat;

        const aControlAscent = aControl.fontProperties.ascent;
        const bControlAscent = bControl.fontProperties.ascent;
        const cControlAscent = cControl.fontProperties.ascent;

        const aAscent = a.fontProperties.ascent;
        const bAscent = b.fontProperties.ascent;
        const cAscent = c.fontProperties.ascent;

        const tallestHeight = control.textContainer?.height;
        const baselineControl = Math.max(
          aControlAscent,
          bControlAscent,
          cControlAscent
        );

        const baseline = Math.max(aAscent, bAscent, cAscent);

        test("Check positions and size of text in control sample.", () => {
          expect(aControl.style.fontFamily).toBe("Arial");
          expect(aControl.style.fontSize).toBe(16);
          expect(aControlAscent).toBe(15);
          expect(aControl.fontProperties.descent).toBe(4);
          expect(aControl.fontProperties.fontSize).toBe(19);

          expect(bControl.style.fontFamily).toBe("Georgia");
          expect(bControl.style.fontSize).toBe(14);
          expect(bControlAscent).toBe(13);
          expect(bControl.fontProperties.descent).toBe(4);
          expect(bControl.fontProperties.fontSize).toBe(17);

          expect(cControl.style.fontFamily).toBe("Georgia");
          expect(cControl.style.fontSize).toBe(28);
          expect(cControlAscent).toBe(26);
          expect(cControl.fontProperties.descent).toBe(7);
          expect(cControl.fontProperties.fontSize).toBe(33);

          expect(tallestHeight).toBe(cControl.fontProperties.fontSize);
          expect(baselineControl).toBe(cControlAscent);

          expect(aControl.bounds.y).toBe(baselineControl - aControlAscent);
          expect(bControl.bounds.y).toBe(baselineControl - bControlAscent);
          expect(cControl.bounds.y).toBe(baselineControl - cControlAscent);
        });

        test("Check expected baseline position.", () => {
          expect(baseline).toBe(cAscent);
          expect(baseline).toBe(baselineControl + cPixels);
          expect(baseline).toBe(30);
        });

        describe("It changes where the font is rendered in relation to the baseline by some number of pixels.", () => {
          it('Should adjust "Arial" by 50% of the ascent.', () => {
            const aOffset = aAscent - aControlAscent;
            const aY = a.bounds.y;

            expect(aControlAscent).toBe(15);
            expect(aAscent).toBe(aControlAscent * (1 + aPercent));
            expect(aAscent).toBe(22.5);
            expect(aOffset).toBe(7.5);

            expect(aY).toBe(baseline - aAscent);
          });

          it('Should adjust "Georgia" by 4 pixels.', () => {
            const bOffset = bPixels;
            const cOffset = cPixels;

            const bY = b.bounds.y;
            const cY = c.bounds.y;

            expect(c.fontProperties.fontSize).toBe(tallestHeight);

            expect(bY).toBe(baselineControl - bAscent + bOffset);
            expect(cY).toBe(baselineControl - cAscent + cOffset);
          });
        });
      });

      describe("adjustBaseline", () => {
        describe("adjustBaseline is exactly like adjustFontBaseline except it's style property that affects each tag", () => {
          const str =
            "<small>Small text</small> + <baseline>baseline adjustment</baseline> = <super>superscript</super>";
          const styles = {
            default: { fontSize: 16, fontFamily: "arial" },
            small: { fontSize: 8 },
            baseline: { adjustBaseline: 10 },
            super: { fontSize: 8, adjustBaseline: 10 },
          };

          const text = new Glyphs(str, styles);
          const tokens = text.tokensFlat;
          const small = tokens[0];
          const superscript = tokens[tokens.length - 1];

          test("check control case", () => {
            expect(small.content).toBe("Small");
            expect(small.fontProperties).toMatchObject({
              fontSize: 10,
              ascent: 8,
              descent: 2,
            });
            expect(small.bounds.height).toBe(10);
          });
          it('Should adjust "superscript" by 10px', () => {
            expect(superscript.content).toBe("superscript");
            expect(superscript.fontProperties).toMatchObject({
              fontSize: 10,
              ascent: 18,
              descent: 2,
            });
          });
          it("Should combine with adjustFontBaseline", () => {
            const textWithFontAdjustment = new Glyphs(str, styles, {
              adjustFontBaseline: { arial: 10 },
            });
            const doubleSuper =
              textWithFontAdjustment.tokensFlat[
                textWithFontAdjustment.tokensFlat.length - 1
              ];

            expect(doubleSuper.content).toBe("superscript");
            expect(doubleSuper.fontProperties).toMatchObject({
              ...superscript.fontProperties,
              ascent: superscript.fontProperties.ascent + 10,
            });
          });
        });
      });

      describe("drawWhitespace", () => {
        const noDrawWhitespace = new Glyphs("a b\nc", {});
        const drawWhitespace = new Glyphs(
          "a b\nc",
          {},
          { drawWhitespace: true }
        );

        it("Should be false by default.", () => {
          expect(noDrawWhitespace.options.drawWhitespace).toBeFalsy();
          expect(drawWhitespace.options.drawWhitespace).toBeTruthy();
        });

        it("When false, whitespace is not drawn as a text field.", () => {
          const { textFields } = noDrawWhitespace;
          expect(pluck("text")(textFields)).toMatchObject(["a", "b", "c"]);
        });

        it("When true, whitespace is drawn as a text field.", () => {
          const { textFields } = drawWhitespace;
          expect(pluck("text")(textFields)).toMatchObject([
            "a",
            " ",
            "b",
            "\n",
            "c",
          ]);
        });
      });

      describe("splitStyle", () => {
        const text = "Hello, world!";
        // don't count the space
        const charLength = text.length - " ".length;
        const style = {};

        const control = new Glyphs(text, style);
        const words = new Glyphs(text, style, { splitStyle: "words" });
        const chars = new Glyphs(text, style, { splitStyle: "characters" });

        it('Should be "words" by default.', () => {
          expect(control.options.splitStyle).toBe("words");
        });

        it("Should inform how the text is split into multiple text fields.", () => {
          expect(control.textFields).toHaveLength(2);
          expect(words.textFields).toHaveLength(2);
          expect(chars.textFields).toHaveLength(charLength);
        });

        it("Check that the letters aren't clumping together.", () => {
          const lines = chars.tokens;
          const tokens = lines[0][0];
          const bounds1 = tokens[1].bounds;
          const bounds2 = tokens[2].bounds;
          const bounds3 = tokens[3].bounds;
          expect(bounds1.x).not.toEqual(bounds2.x);
          expect(bounds2.x).not.toEqual(bounds3.x);
        });

        it("Should throw if the style is not supported. It will offer suggestions if you're close!", () => {
          expect(() => {
            new Glyphs(text, style, { splitStyle: "chars" as SplitStyle });
          }).toThrow(/.*(Did you mean "characters"?)/g);
        });
      });

      describe("skipUpdates & skipDraw", () => {
        // See also Glyphs.perf.test.ts

        const text = "Test <b>test</b>";
        const control = new Glyphs(text, style);
        const skipUpdates = new Glyphs(text, style, {
          skipUpdates: true,
        });
        const skipDraw = new Glyphs(text, style, {
          skipDraw: true,
        });

        it("Default should be to automatically call update.", () => {
          expect(control.textContainer?.children).toHaveLength(2);
        });
        it("Should have the option to disable automatic calls to update().", () => {
          expect(skipUpdates.textContainer?.children).toHaveLength(0);
          expect(skipUpdates.getBounds()).toMatchObject(containerSpriteBounds);
          skipUpdates.update();
          expect(skipUpdates.getBounds()).toMatchObject(control.getBounds());
          expect(skipUpdates.textFields).toHaveLength(2);
        });

        it("should allow you to force an update.", () => {
          expect(skipUpdates.textFields).toHaveLength(2);
          skipUpdates.setText("");
          expect(skipUpdates.textFields).toHaveLength(2);
          skipUpdates.setText("", false);
          expect(skipUpdates.textFields).toHaveLength(0);
        });

        it("Should have the option to disable automatic calls to draw().", () => {
          expect(skipDraw.textContainer?.children).toHaveLength(0);
          skipDraw.update();
          expect(skipDraw.textContainer?.children).toHaveLength(0);
          skipDraw.draw();
          expect(skipDraw.textFields).toHaveLength(2);
          expect(skipDraw.tokens).toMatchObject([
            [
              [{ content: "Test" }],
              [{ content: " " }],
              [{ content: "test", tags: "b" }],
            ],
          ]);
          expect(skipDraw.getBounds()).toMatchObject(control.getBounds());
        });
        it("Should allow you to force a draw.", () => {
          skipDraw.setText("");
          expect(skipDraw.textFields).toHaveLength(2);
          skipDraw.update(false);
          expect(skipDraw.textFields).toHaveLength(0);
        });

        it("It can also be forced not to update", () => {
          control.text = "";
          expect(control.textFields).toHaveLength(0);
          control.setText("abc def ghi", true);
          expect(control.textFields).toHaveLength(0);
          expect(control.tokens).toHaveLength(0);
          control.update(true);
          expect(control.textFields).toHaveLength(0);
          expect(control.tokens).toMatchObject([
            [
              [{ content: "abc" }],
              [{ content: " " }],
              [{ content: "def" }],
              [{ content: " " }],
              [{ content: "ghi" }],
            ],
          ]);
          control.update(false);
          expect(control.textFields).toHaveLength(3);
        });
      });
      describe("needsUpdate and needsDraw", () => {
        it("When your code skips an update, the needsUpdate flag will be set to true.", () => {
          const t = new Glyphs("test", style);
          expect(t.needsUpdate).toBeFalsy();
          t.setText("new!", true);
          expect(t.needsUpdate).toBeTruthy();
          t.update();
          expect(t.needsUpdate).toBeFalsy();
        });
        it("Setting text to the same value won't require an update.", () => {
          const t = new Glyphs("test", style);
          expect(t.needsUpdate).toBeFalsy();
          t.setText("test", true);
          expect(t.needsUpdate).toBeFalsy();
        });
        it("When your code skips a draw, the needsUpdate flag will be set to true.", () => {
          const t = new Glyphs("test", style);
          expect(t.needsDraw).toBeFalsy();
          t.update(true);
          expect(t.needsDraw).toBeTruthy();
          t.draw();
          expect(t.needsDraw).toBeFalsy();
        });
      });

      describe("wrapEmoji", () => {
        const control = new Glyphs("test");
        it("Should be true by default", () => {
          expect(control.options.wrapEmoji).toBeTruthy();
        });
        it("should wrap emoji in a span", () => {
          const t = new Glyphs(
            "test 🔥",
            { default: { fontFamily: "Georgia" } },
            { wrapEmoji: true }
          );
          expect(t.tokensFlat).toMatchObject([
            { content: "test", style: { fontFamily: "Georgia" } },
            { content: " " },
            { content: "🔥", style: { fontFamily: "sans-serif" } },
          ]);
        });
        it("should not wrap emoji when set to false", () => {
          const t = new Glyphs(
            "test 🔥",
            { default: { fontFamily: "Georgia" } },
            { wrapEmoji: false }
          );
          expect(t.tokensFlat).toMatchObject([
            { content: "test", style: { fontFamily: "Georgia" } },
            { content: " " },
            { content: "🔥", style: { fontFamily: "Georgia" } },
          ]);
        });
      });
    });
  });

  describe("text", () => {
    const singleLine = new Glyphs("Line 1", style);
    const doubleLine = new Glyphs(
      `Line 1
Line 2`,
      style
    );
    const tripleSpacedLines = new Glyphs("", style);

    describe("setText(), get text, & set text", () => {
      it("Implicit setter should set the text. Does not allow you to override the skipUpdate", () => {
        tripleSpacedLines.text = "temp";
        expect(tripleSpacedLines.text).toBe("temp");
      });
      it(`setText() sets the text and allows you to override the update.`, () => {
        tripleSpacedLines.setText(
          `<b>Line 1</b>


<b>Line 4</b>`,
          true
        );
        const heightBeforeUpdate = tripleSpacedLines.getBounds().height;
        tripleSpacedLines.update();
        const heightAfterUpdate = tripleSpacedLines.getBounds().height;
        expect(heightAfterUpdate).toBeGreaterThan(heightBeforeUpdate);
      });

      it("Implicit getter should return the text of the component with tags intact.", () => {
        expect(singleLine.text).toBe("Line 1");
        expect(tripleSpacedLines.text).toBe(`<b>Line 1</b>


<b>Line 4</b>`);
      });
    });

    // setText() is the same as text but allows you to skipUpdate.
    // text always uses default value for skipUpdate.

    describe("multiple lines", () => {
      it("Should support text with multiple lines.", () => {
        const fontSize = 12;
        const H = singleLine.getBounds().height / fontSize;
        const H2 = doubleLine.getBounds().height / fontSize;
        const H3 = tripleSpacedLines.getBounds().height / fontSize;

        expect(H).toBe(1);
        expect(H2).toBeCloseTo(2, 0);
        expect(H3).toBeCloseTo(4, 0);
      });
    });

    describe("untaggedText", () => {
      it("Returns the text with tags stripped out.", () => {
        const t = new Glyphs(
          "<b>Hello</b>... Is it <i>me</i> you're looking for?",
          { b: {}, i: {} }
        );
        expect(t).toHaveProperty(
          "untaggedText",
          "Hello... Is it me you're looking for?"
        );
      });
      it("Should present multiline text correctly.", () => {
        expect(tripleSpacedLines.untaggedText).toBe(`Line 1


Line 4`);
      });
    });

    describe("textTransform style", () => {
      const t = new Glyphs(
        `control CONTROL
<upper>upperCASE</upper>
<lower>lowerCASE</lower>
<capitalize>capitalized TEXT Text texT</capitalize>`,
        {
          upper: { textTransform: "uppercase" },
          lower: { textTransform: "lowercase" },
          capitalize: { textTransform: "capitalize" },
        }
      );
      const { textFields, tokens } = t;
      const [
        control0,
        control1,
        upper,
        lower,
        capitalized0,
        capitalized1,
        capitalized2,
        capitalized3,
      ] = textFields;
      const [
        ,
        [[upperToken]],
        [[lowerToken]],
        [[capitalizedToken0], , [capitalizedToken1]],
      ] = tokens;
      test("Control case", () => {
        expect(control0).toHaveProperty("text", "control");
        expect(control1).toHaveProperty("text", "CONTROL");
      });
      describe("textTransform: uppercase", () => {
        it("Should convert the text to uppercase in the text field", () => {
          expect(upper).toHaveProperty("text", "UPPERCASE");
        });
        it("Should not affect the tokens", () => {
          expect(upperToken).toHaveProperty("content", "upperCASE");
        });
      });
      describe("textTransform: lowercase", () => {
        it("Should convert the text to lowercase in the text field", () => {
          expect(lower).toHaveProperty("text", "lowercase");
        });
        it("Should not affect the tokens", () => {
          expect(lowerToken).toHaveProperty("content", "lowerCASE");
        });
      });
      describe("textTransform: capitalize", () => {
        it("Should capitalize text in the text field", () => {
          expect(capitalized0).toHaveProperty("text", "Capitalized");
          expect(capitalized1).toHaveProperty("text", "TEXT");
          expect(capitalized2).toHaveProperty("text", "Text");
          expect(capitalized3).toHaveProperty("text", "TexT");
        });
        it("Should not affect the tokens", () => {
          expect(capitalizedToken0).toHaveProperty("content", "capitalized");
          expect(capitalizedToken1).toHaveProperty("content", "TEXT");
        });
      });
    });
    describe("textDecoration style", () => {
      const str = `<u>underline</u>
<o>overline</o>
<lt>line-through</lt>
<u><o>multi</o></u>
`;
      const style = {
        default: {
          fill: 0x000000,
        },
        u: {
          textDecoration: "underline",
        },
        o: {
          textDecoration: "overline",
        },
        lt: {
          textDecoration: "line-through",
        },
      } as TextStyleSet;
      const opt = { drawWhitespace: true };
      const t = new Glyphs(str, style, opt);

      it("Should not break the whole Glyphs object", () => {
        expect(t).toBeDefined();
        expect(t).toHaveProperty("textFields");
        expect(t).toHaveProperty("decorations");
      });

      it("Should create underline objects for each case where there is a line drawn.", () => {
        // fixme: I actually expected this to be 5 since ther eare two lines drawn on the multi line.
        expect(t.decorations).toHaveLength(4);
      });

      it("Should add the decorations as children to the text field.", () => {
        const { textFields } = t;
        expect(textFields[0].children).toHaveLength(1);
        expect(textFields[0].getChildAt(0)).toBeInstanceOf(PIXI.Graphics);
        expect(textFields[0].getChildAt(0)).toBe(t.decorations[0]);
      });

      it("Should pass the text decoration to the tokens", () => {
        const firstWord = t.tokensFlat[0];
        expect(firstWord.textDecorations).toBeDefined();
        expect(
          firstWord.textDecorations &&
            firstWord.textDecorations[0].bounds.height
        ).toBe(1);
        expect(
          firstWord.textDecorations && firstWord.textDecorations[0].color
        ).toBe(0);
      });

      describe("overdrawDecorations", () => {
        const control = t.textFields[0].getChildAt(0) as Graphics;
        const { x: controlX, width: controlWidth } = control.getBounds();

        test("Check that control values are as expected.", () => {
          expect(controlX).toBe(0);
          expect(controlWidth).toBe(107);
        });

        it("Should use a default value of 0.", () => {
          expect(t.options.overdrawDecorations).toBe(0);
        });

        it("Should add additional length to the text decorations on either side.", () => {
          const overValue = 3;

          const overdraw = new Glyphs(str, style, {
            ...opt,
            overdrawDecorations: overValue,
          });

          // confirm it was set on the object.
          expect(overdraw.options.overdrawDecorations).toBe(3);

          const { x: overX, width: overWidth } =
            overdraw.decorations[0].getBounds();

          expect(overX).toBe(-overValue);
          expect(overWidth - controlWidth).toBe(2 * overValue);
        });
        it("Should allow negative values.", () => {
          const underValue = -3;
          const underdraw = new Glyphs(str, style, {
            ...opt,
            overdrawDecorations: underValue,
          });
          const { x: underX, width: underWidth } =
            underdraw.decorations[0].getBounds();

          expect(underX - controlX).toBe(-underValue);
          expect(underWidth - controlWidth).toBe(2 * underValue);
        });

        it("Should not allow the width of the decoration to be below 0", () => {
          const superUnderValue = -100;
          const superUnderdraw = new Glyphs(str, style, {
            ...opt,
            overdrawDecorations: superUnderValue,
          });
          const { width: superUnderWidth } = superUnderdraw.decorations[0];
          expect(superUnderWidth).toBe(0);
        });

        it("Should not affect layout of text.", () => {
          const str = "<u>0 1 2 3 4 5 6 7 8 9 A B C D E F</u>";
          const style = {
            u: {
              textDecoration: "underline",
            },
            default: {
              wordWrapWidth: 100,
            },
          } as TextStyleSet;
          const a = new Glyphs(str, style);
          const b = new Glyphs(str, style, { overdrawDecorations: 30 });

          // without overdraw, text wraps to 4 lines
          expect(a.tokens).toHaveLength(4);
          expect(a.decorations[0].getBounds().width).toBe(15);
          // by adding a super wide underline the width would cause it to wrap more
          // if the underlines affect the width.
          expect(b.tokens).toHaveLength(4);
          expect(b.decorations[0].getBounds().width).toBe(75);
        });
      });

      it('Should log an error if you try to use a color name like "red" for the underline.', () => {
        const text = "a <b>c</b> d";

        const errorHandler = ({
          code,
          message,
          type,
          target,
        }: ErrorMessage) => {
          expect(code).toBe("invalid-color");
          expect(typeof message).toBe("string");
          expect(type).toBe("warning");
          expect(target).toBeInstanceOf(Glyphs);
          expect(target?.text).toBe(text);
        };

        new Glyphs(
          text,
          {
            b: { underlineColor: "red", textDecoration: "underline" },
          },
          { drawWhitespace: true, errorHandler }
        );
      });

      it("If the default style is empty, use the default text color (black)", () => {
        const noDefault = new Glyphs(
          "<a>a</a>",
          {
            a: { textDecoration: "underline" },
          },
          { drawWhitespace: true }
        );
        const decMetrics = noDefault.tokens[0][0][0].textDecorations;
        expect(noDefault.decorations).toHaveLength(1);
        expect(decMetrics).toHaveLength(1);
        expect(decMetrics?.[0].color).toBe(0x000000);
      });

      describe("textDecorations on default style (issue 436)", () => {
        const style = {
          default: { textDecoration: "underline" },
          override: { textDecoration: "none" },
        } as TextStyleSet;
        const text = "Underline <override>NoUnerline</override>";
        const t = new Glyphs(text, style);
        const { decorations, tokensFlat } = t;
        const underline = tokensFlat[0];
        const noUnderline = tokensFlat[2];

        it("Should create textDecorations correctly when you use this property on the default style.", () => {
          expect(underline.textDecorations).toBeDefined;
          expect(underline.textDecorations).toHaveLength(1);
          expect(
            underline.textDecorations &&
              underline.textDecorations[0].bounds.height
          ).toBe(1);
          expect(
            underline.textDecorations && underline.textDecorations[0].color
          ).toBe(DEFAULT_STYLE.fill);
          expect(decorations).toHaveLength(1);
        });
        it("Should override the default text decoration when you use a tag.", () => {
          expect(noUnderline.textDecorations).toHaveLength(0);
        });
      });
    });

    describe("stroke", () => {
      describe("Stroke and whitespace", () => {
        it("Shouldn't affeect whitespace (#303)", () => {
          const t = new Glyphs("a b", {
            default: { fontSize: 10, strokeThickness: 100 },
          });
          const [a, space, b] = t.tokensFlat;
          expect(a.bounds.width).toBeGreaterThan(100);
          expect(space.bounds.width).toBeLessThan(20);
          expect(b.bounds.width).toBeGreaterThan(100);
        });
      });
    });

    describe("fontScaleWidth & fontScaleHeight styles", () => {
      test("fontScaleWidth should scale the final text output horizontally.", () => {
        const wideStyle = {
          default: { fontSize: 30 },
          wide: { fontScaleWidth: 2.0 },
        };
        const text = `hello
<wide>hello</wide>`;
        const w = new Glyphs(text, wideStyle);
        const [normal, wide] = w.textFields;
        expect(wide.width / normal.width).toBeCloseTo(2.0, 0);
        expect(wide.height / normal.height).toBeCloseTo(1, 1);
      });

      test("fontScaleHeight should scale the final text output vertically.", () => {
        const tallStyle = {
          default: { fontSize: 20 },
          tall: { fontScaleHeight: 1.5 },
        };
        const text = `hello
<tall>hello</tall>`;
        const h = new Glyphs(text, tallStyle);
        const [normal, tall] = h.textFields;
        expect(tall.width / normal.width).toBeCloseTo(1, 0);
        expect(tall.height / normal.height).toBeCloseTo(1.5, 1);
      });

      test("icons should scale with the text unless the scaleIcons flag is false.", () => {
        const text = "<icon />A<wide><icon />A</wide>";
        const style: TextStyleSet = {
          default: { fontSize: 30 },
          wide: { fontScaleWidth: 2.0 },
          icon: { imgDisplay: "icon" },
        };
        const options = { imgMap: { icon } };
        const iconTest = new Glyphs(text, style, options);

        const [icon0, , icon1] = iconTest.tokensFlat;

        expect(icon0.bounds.width).toEqual(icon0.bounds.height);
        expect(icon1.bounds.width).toEqual(icon1.bounds.height * 2);

        const iconTestNoScale = new Glyphs(text, style, {
          ...options,
          scaleIcons: false,
        });

        const [icon0NoScale, , icon1NoScale] = iconTestNoScale.tokensFlat;
        expect(icon0NoScale.bounds.width).toEqual(icon0NoScale.bounds.height);
        expect(icon1NoScale.bounds.width).toEqual(icon1NoScale.bounds.height);
      });

      test("bogus values are handled correctly.", () => {
        const wideStyle = {
          default: { fontSize: 20 },
          neg: { fontScaleWidth: -1.5 },
          nan: { fontScaleWidth: NaN },
        };
        const text = `hello
<neg>hello</neg>
<nan>hello</nan>`;
        const w = new Glyphs(text, wideStyle);
        const [, neg, nan] = w.textFields;
        expect(neg.width).toBe(0);
        expect(nan.width).toBe(0);
      });
    });
  });

  describe("styles", () => {
    const t = new Glyphs(`<b>Test</b>`, style);
    describe("getStyleForTag()", () => {
      it("Should return a style object for the tag.", () => {
        expect(t.getStyleForTag("b")).toHaveProperty("fontWeight", "bold");
      });
      it("Should return undefined when there is no tag defined.", () => {
        expect(t.getStyleForTag("bogus")).toBeUndefined();
      });
    });
    describe("removeStylesForTag()", () => {
      it("Should remove a style added to the text field.", () => {
        expect(t.getStyleForTag("b")).toBeDefined();
        t.removeStylesForTag("b");
        expect(t.getStyleForTag("b")).toBeUndefined();
      });
    });
  });

  describe("parsing", () => {
    it("Should allow nested self-closing tags.", () => {
      expect(() => {
        new Glyphs(`<b>Nested <i /> self-closing tag</b>`, style);
      }).not.toThrow();
    });
  });

  describe("attributes", () => {
    it("Should allow attributes on tags.", () => {
      const t = new Glyphs(`<b fontWeight="normal">Test</b>`, style);
      expect(t.tokens[0][0][0].style.fontWeight).toEqual("normal");
    });
    it("Should allow spaces in attributes.", () => {
      const control = new Glyphs(`<times>Test</times>`, {
        times: { fontFamily: "Times New Roman" },
      });
      const t = new Glyphs(
        `<times fontFamily="Times New Roman">Test</times>`,
        {
          times: { fontFamily: "Arial" },
        }
      );
      expect(control.tokens[0][0][0].style.fontFamily).toEqual(
        "Times New Roman"
      );
      expect(t.tokens[0][0][0].style.fontFamily).toEqual("Times New Roman");
    });
  });

  describe("update()", () => {
    const t = new Glyphs(`<b>Test</b>`, style);
    it("Should render the text as pixi text elements.", () => {
      const lines = t.update();
      const [line] = lines;
      const [word] = line;
      const [segment] = word;
      const { content: chars } = segment;

      // lines
      expect(lines).toHaveLength(1);
      // words
      expect(line).toHaveLength(1);
      // segments
      expect(word).toHaveLength(1);
      // chars
      expect(segment).toHaveProperty("content");
      expect(chars).toHaveLength(4);
      expect(chars).toBe("Test");
      expect(segment.tags).toBe("b");
    });
  });

  describe("Child display-object containers and references to children", () => {
    const t = new Glyphs(
      "<u>a</u> b c <icon/>",
      { u: { textDecoration: "underline" } },
      { imgMap: { icon }, debug: true, drawWhitespace: true }
    );
    it("Should have a child called textContainer that displays the text fields", () => {
      expect(t.textContainer).toBeInstanceOf(PIXI.Container);
      expect(t.textContainer?.children).toHaveLength(6);
      expect(t.textContainer?.getChildAt(0)).toBeInstanceOf(PIXI.Text);
    });
    it("Should have a child called spriteContainer that displays the sprites", () => {
      expect(t.spriteContainer).toBeInstanceOf(PIXI.Container);
      expect(t.spriteContainer?.children).toHaveLength(1);
      expect(t.spriteContainer?.getChildAt(0)).toBeInstanceOf(PIXI.Sprite);
    });
    it("Should have a child called debugContainer that displays the debug info", () => {
      expect(t.debugContainer).toBeInstanceOf(PIXI.Container);
      expect(t.debugContainer?.children.length).toBeGreaterThan(0);
      expect(t.debugContainer?.getChildAt(0)).toBeInstanceOf(
        PIXI.DisplayObject
      );
    });
    it("Should have a child called decorationContainer that holds the text decoration graphics", () => {
      expect(t.decorationContainer).toBeInstanceOf(PIXI.Container);
    });
    it("Should have a property textFields that is a list of text fields", () => {
      expect(t.textFields).toBeDefined();
      expect(t.textFields).toHaveLength(6);
      expect(t.textFields[0]).toBeInstanceOf(PIXI.Text);
    });
    it("Text field should contain its own underline.", () => {
      expect(t.textFields[0].children).toHaveLength(1);
      expect(t.textFields[0].getChildAt(0)).toBeInstanceOf(PIXI.Graphics);
    });
    it("should have a property decorations that is a list of text decorations (aka underlines)", () => {
      expect(t.decorations).toBeDefined();
    });
    it("Should have a property sprites that is a list of sprites", () => {
      expect(t.sprites).toBeDefined();
      expect(t.sprites).toHaveLength(1);
      expect(t.sprites[0]).toBeInstanceOf(PIXI.Sprite);
    });
    it("Should have a property spriteTemplates that is a map of sprites created from the sources in imgMap. Each one is cloned before being drawn.", () => {
      expect(t.spriteTemplates).toBeDefined();
      expect(t.spriteTemplates).toBeInstanceOf(Object);
      const sprites = Object.values(t.spriteTemplates);
      expect(sprites[0]).toBeInstanceOf(PIXI.Sprite);
    });
    it("spriteTemplates are not the same as the objects in sprites or spriteContainer, the latter are clones of the spriteTemplates.", () => {
      expect(t.spriteTemplates[0]).not.toBe(t.sprites[0]);
      expect(t.spriteTemplates[0]).not.toBe(t.spriteContainer?.getChildAt(0));
    });
  });

  describe("breakLines", () => {
    it("There is a style called break lines which should default to true.", () => {
      const t = new Glyphs("A");
      expect(t.defaultStyle.breakLines).toBeTruthy();
    });
  });
  describe("breakWords", () => {
    it("When true, the text will break in the middle of a word to wrap to the next line when the text is very long.", () => {
      const charsText = `全局设置的<blue>对齐</blue>属性由「默认」来<big>控制</big>。而且不能被<blue>别的样式</blue>所<red>覆盖</red>。`;
      const charsStyle = {
        default: {
          fontFamily: "Arial",
          fontSize: "16px",
          fill: "#cccccc",
          wordWrap: true,
          wordWrapWidth: 260,
          breakWords: true,
        },
        blue: { fill: 0x4488ff, stroke: 0x2244cc, fontSize: "24px" },
        red: { fill: 0xff8888, stroke: 0xcc4444 },
        big: { fill: 0x88ff88, stroke: 0x44cc44, fontSize: "36px" },
      };
      const opts: GlyphsOptions = { splitStyle: "characters" };

      const control = new Glyphs(
        charsText,
        {
          ...charsStyle,
          default: { ...charsStyle.default, breakWords: false },
        },
        opts
      );
      const chars = new Glyphs(charsText, charsStyle, opts);
      const chars2 = new Glyphs(
        "<big>Selbstständigkeitserklärung</big>",
        charsStyle,
        opts
      );
      const chars3 = new Glyphs(
        `<big>Die Selbstständigkeitserklärung ist noch nicht fertig.</big>`,
        charsStyle,
        opts
      );

      expect(control.tokens).toHaveLength(1);
      expect(chars.tokens).toHaveLength(3);
      expect(chars2.tokens).toHaveLength(2);
      expect(chars3.tokens).toHaveLength(4);
    });
  });
  describe("valign", () => {
    describe("Specific issue with vertical text align", () => {
      describe("Should apply styles across the entire text field correctly.", () => {
        const valignText = `<top>1<code>Top</code>2 <small>Vertical</small> <img/> Alignment.</top>`;

        const valignStyle = {
          default: {
            fontFamily: "Arial",
            fontSize: "24px",
            fill: "#cccccc",
            align: "left" as Align,
          },
          code: {
            fontFamily: "Courier",
            fontSize: "36px",
            fill: "#ff8888",
          },
          small: { fontSize: "14px" },
          top: { valign: "top" as VAlign },
          img: { imgSrc: "valignImg", imgDisplay: "icon" as ImageDisplayMode },
        };

        const valignImg = PIXI.Sprite.from(iconSrc);

        const valign = new Glyphs(valignText, valignStyle, {
          imgMap: { valignImg },
        });

        const tokens = valign.tokens[0];
        test("Top code tag", () => {
          expect(tokens[0][0].tags).toBe("top");
          expect(tokens[0][1].tags).toBe("top,code");
          expect(tokens[0][2].tags).toBe("top");
        });
        test("Top small tag", () => {
          expect(tokens[2][0].tags).toBe("top,small");
        });
        test("img tag", () => {
          expect(tokens[4][0].tags).toBe("top,img");
        });
        test("plain (top) tag", () => {
          expect(tokens[6][0].tags).toBe("top");
        });
        test("Top spaces", () => {
          expect(tokens[1][0].tags).toBe("top");
          expect(tokens[3][0].tags).toBe("top");
          expect(tokens[5][0].tags).toBe("top");
        });
      });
    });
  });

  describe("Glyphs should support percentage font sizes #107", () => {
    test("default size of text", () => {
      expect(new Glyphs("a").textFields[0].style.fontSize).toBe(26);
    });

    const text = "<a>Hello</a> beautiful <b>World<c>!</c></b>";
    const styleControl = {
      default: { fontFamily: "arial", fontSize: 26 },
    };

    const control = new Glyphs(text, styleControl);
    const controlField = control.textFields[0];
    const controlToken = control.tokensFlat[0];

    test("control case is a text field with numeric (pixel) size.", () => {
      expect(controlField.style.fontSize).toBe(26);
      expect(controlToken.style.fontSize).toBe(26);
      expect(controlToken.bounds.height).toBe(30);
      expect(controlToken.fontProperties.ascent).toBe(24);
      expect(controlToken.fontProperties.descent).toBe(6);
      expect(controlToken.fontProperties.fontSize).toBe(30);
    });

    describe("When set on the default style, 100% should equal the default text size, 26px.", () => {
      const stylePercentage = {
        default: { ...styleControl.default, fontSize: "100%" },
      };

      const percentage = new Glyphs(text, stylePercentage);
      const percentageField = percentage.textFields[0];
      const percentageToken = percentage.tokensFlat[0];

      it("Should match the size of a 26px text field.", () => {
        expect(percentageToken.bounds).toMatchObject(controlToken.bounds);
        expect(percentageToken.fontProperties).toMatchObject(
          controlToken.fontProperties
        );
      });

      it("Should set the internal text field to a pixel size.", () => {
        expect(percentageField.style.fontSize).toBe("26px");
      });
    });

    describe("Rendered sizes of percentages will be different based on context.", () => {
      const text = `aaa<b>bbb<c>ccc</c>bbb</b>aaa<c>ccc</c>`;

      const style = {
        default: {
          fontSize: 10,
        },
        b: {
          fontSize: "300%",
        },
        c: {
          fontSize: "50%",
        },
      };

      const nested = new Glyphs(text, style);
      const [a, b, bc, , , ac] = nested.tokensFlat;
      it("renders percentages correctly based on context.", () => {
        expect(a.style.fontSize).toBe(10);
        expect(b.style.fontSize).toBe("30px");
        expect(bc.style.fontSize).toBe("15px"); // 50% of 300% of 10px = 15px
        expect(ac.style.fontSize).toBe("5px"); // 50% of 10px = 5px
      });
    });

    describe("Percentages added via attributes behave correctly.", () => {
      const text = `20px<big>40px</big><medium>30px</medium><medium fontSize="200%">40px</medium>`;

      const style = {
        default: {
          fontSize: 20,
        },
        big: {
          fontSize: "200%",
        },
        medium: {
          fontSize: "150%",
        },
      };

      const nested = new Glyphs(text, style);
      const [control, big, medium, attr] = nested.tokensFlat;
      it("renders percentages correctly based on context and attributes work correctly.", () => {
        expect(control.style.fontSize).toBe(20); // 20px
        expect(big.style.fontSize).toBe("40px"); // 200% of 20px = 40px
        expect(medium.style.fontSize).toBe("30px"); // 150% of 20px = 30px
        expect(attr.style.fontSize).toBe("40px"); // 200% of 20px = 40px
      });
    });

    describe("Check that non-100% scaling is working as expected.", () => {
      const text = "<big>big</big> normal <small>small</small>";
      const styleTest = {
        default: styleControl.default,
        big: { fontSize: "1000%" },
        small: { fontSize: "10%" },
      };

      const test = new Glyphs(text, styleTest);
      const [bigField, defaultField, smallField] = test.textFields;

      it("default size is 26", () => {
        expect(defaultField.height).toBe(30);
      });
      it("big tokens is 10x size.", () => {
        expect(bigField.text).toBe("big");
        expectToBeBetween(bigField.height, 288, 289);
      });
      it("small tokens is 1/10x size.", () => {
        expect(smallField.text).toBe("small");
        expectToBeBetween(smallField.height, 3, 4);
      });
    });

    describe("Any other time 100% equals the size of the text of the enclosing tag. Using the default value of the text.", () => {
      const styleTest = {
        default: { fontFamily: "arial", fontSize: 20 },
        a: { fontSize: "100%" },
        b: { fontSize: "50px" },
        c: { fontSize: "200%" },
      };

      const test = new Glyphs(text, styleTest);
      const [testField, defaultField] = test.textFields;
      const [
        token100percent,
        defaultToken,
        ,
        ,
        token50px,
        token200percentOf50px,
      ] = test.tokensFlat;

      it("100% should match the size of the default style.", () => {
        expect(testField.height).toBe(defaultField.height);
        expect(token100percent.fontProperties).toMatchObject(
          defaultToken.fontProperties
        );
      });

      it("Nested % styles should use their parent as a baseline.", () => {
        expect(token50px.style.fontSize).toBe("50px");
        expect(token200percentOf50px.style.fontSize).toBe("100px");
      });
    });
  });

  describe("destructor", () => {
    let sprite: PIXI.Sprite;
    const recreateSprite = () => (sprite = createSprite());
    recreateSprite();

    const createTextToDestroy = () =>
      new Glyphs(
        "Hello my baby, hello my honey, hello my ragtime gal! <icon />",
        { default: { fontSize: 25, textDecoration: "underline" } },
        { imgMap: { icon: sprite }, debug: true }
      );

    test("All sub-components are as expected before being destroyed.", () => {
      const tt = createTextToDestroy();

      expect(tt.textContainer).toBeInstanceOf(PIXI.Container); // The Sprite layer which holds all the text fields rendered by draw.
      expect(tt.textContainer?.children).toHaveLength(10);
      expect(tt.spriteContainer).toBeInstanceOf(PIXI.Container); // The Sprite layer which holds all the sprites rendered by draw if you're using an image map (imgMap).
      expect(tt.spriteContainer?.children).toHaveLength(1);
      expect(tt.debugContainer).toBeInstanceOf(PIXI.Container); // The Sprite layer which holds all debug overlay information (if you're using the debug: true setting).
      expect(tt.debugContainer?.children.length).toBeGreaterThanOrEqual(10);
      expect(tt.decorationContainer).toBeInstanceOf(PIXI.Container); // The Sprite layer which holds all text decorations (underlines).
      expect(tt.decorations).toBeInstanceOf(Array); // Array of Graphic objects which render the text decorations.
      expect(tt.textFields).toBeInstanceOf(Array); // An array containing all the text fields generated by draw.
      expect(tt.textFields).toHaveLength(10);
      expect(tt.textFields[0]).toBeInstanceOf(PIXI.Text);
      expect(tt.sprites).toBeInstanceOf(Array); // If you're using an image map (imgMap), this array stores references to all the Sprites generated by draw.
      expect(tt.sprites).toHaveLength(1);
      expect(tt.sprites[0]).toBeInstanceOf(PIXI.Sprite);
      expect(tt.spriteTemplates).toBeInstanceOf(Object); // The sprites in sprites and spriteContainer are actually clones of the originals passed in via the imgMap option. To get the originals, access them this way.
      expect(Object.values(tt.spriteTemplates)).toHaveLength(1);
      expect(tt.spriteTemplates.icon).toBeInstanceOf(PIXI.Sprite);
      expect(tt.options.imgMap).toBeInstanceOf(Object);
      expect(tt.options.imgMap).toHaveProperty("icon");
      expect(tt.options.imgMap?.icon).toBeInstanceOf(PIXI.Sprite);
    });

    it("Should destroy the references to children of this object. ", () => {
      const tt = createTextToDestroy();
      tt.destroy();
      expect(tt.textContainer.destroyed).toBeTruthy();
      expect(tt.spriteContainer.destroyed).toBeTruthy();
      expect(tt.debugContainer.destroyed).toBeTruthy();
      expect(tt.decorationContainer.destroyed).toBeTruthy();
      expect(tt.decorations).toHaveLength(0);
      expect(tt.textFields).toHaveLength(0);
      expect(tt.sprites).toHaveLength(0);
      expect(Object.values(tt.spriteTemplates)).toHaveLength(0);
      expect(Object.values(tt.options.imgMap ?? {})).toHaveLength(0);
    });
    it("Should not destroy the sprite textures.", () => {
      recreateSprite();

      const tt = createTextToDestroy();
      tt.destroy();
      expect(sprite.texture.baseTexture).not.toBeNull();
    });

    describe("destroyImgMap()", () => {
      it("Should destroy the sprite textures.", () => {
        recreateSprite();

        const tt = createTextToDestroy();
        tt.destroyImgMap();
        expect(sprite.texture.baseTexture).toBeNull();

        expect(() => createTextToDestroy()).toThrow(/destroyed/);
      });
      it("Should throw if you try to destroy the image map after the object was destroyed.", () => {
        recreateSprite();
        expect(() => {
          const tt = createTextToDestroy();
          tt.destroyImgMap();
          tt.destroy();
        }).not.toThrow();

        recreateSprite();
        expect(() => {
          const tt = createTextToDestroy();
          tt.destroy();
          tt.destroyImgMap();
        }).toThrow(/already destroyed/);
      });
    });
  });

  // https://github.com/mimshwright/pixi-tagged-text/issues/338
  describe("custom inline string property", () => {
    it("Should propagate the string to the style object without modification.", () => {
      const testString = "This/should=not!be!modified=";
      const customPropertyName = "propertyTest";

      const taggedTextInstance = new Glyphs(
        `<test ${customPropertyName}='${testString}'>Test</test>`,
        {
          test: {},
        }
      );
      taggedTextInstance.textFields.forEach((e) => {
        const style = e.style as {
          [customPropertyName]: string;
        };
        const prop: string = style[customPropertyName];
        expect(prop).toEqual(testString);
      });
    });
  });
});
