import * as PIXI from "pixi.js";
import * as pixiUtils from "../src/pixiUtils";

describe("pixiUtils", () => {
  describe("cloneSprite()", () => {
    it("should create a shallow copy of a sprite.", () => {
      const originalSprite = PIXI.Sprite.from("./icon.png");
      const cloneSprite = pixiUtils.cloneSprite(originalSprite);

      expect(cloneSprite).not.toBe(originalSprite);
      expect(cloneSprite.texture).toBe(originalSprite.texture);
    });
  });

  describe("getFontPropertiesOfText()", () => {
    const textField = new PIXI.Text("Test");

    it("should return metrics without requiring updateText() first in v8.", () => {
      const fontProps = pixiUtils.getFontPropertiesOfText(textField);
      expect(fontProps.ascent).toBeGreaterThan(0);
      expect(fontProps.descent).toBeGreaterThan(0);
      expect(fontProps.fontSize).toBeGreaterThan(0);
    });

    it("should return expected default metrics for unstyled text.", () => {
      const defaultFontProps = pixiUtils.getFontPropertiesOfText(
        textField,
        true
      );
      expect(defaultFontProps.ascent).toBeGreaterThanOrEqual(23);
      expect(defaultFontProps.ascent).toBeLessThanOrEqual(25);
      expect(defaultFontProps.descent).toBeGreaterThanOrEqual(5);
      expect(defaultFontProps.descent).toBeLessThanOrEqual(7);
      expect(defaultFontProps.fontSize).toBeGreaterThanOrEqual(26);
      expect(defaultFontProps.fontSize).toBeLessThanOrEqual(31);
    });

    it("should provide the correct numbers after changing the style for the text.", () => {
      textField.style = {
        fontSize: 30,
        fontFamily: "Arial",
      };
      const fontProps = pixiUtils.getFontPropertiesOfText(textField, true);
      expect(fontProps.ascent).toBeGreaterThanOrEqual(26);
      expect(fontProps.ascent).toBeLessThanOrEqual(28);
      expect(fontProps.descent).toBeGreaterThanOrEqual(6);
      expect(fontProps.descent).toBeLessThanOrEqual(8);
      expect(fontProps.fontSize).toBeGreaterThanOrEqual(30);
      expect(fontProps.fontSize).toBeLessThanOrEqual(35);
    });

    describe("What if the text you want is exactly what the initial value is?", () => {
      it("should not throw an error if you happen to set your text to the same value as the initial values.", () => {
        const trickyText = new PIXI.Text("Tricky", {
          fontSize: 11,
          fontFamily: "arial",
        });
        expect(() => {
          const initialFontProps = pixiUtils.getFontPropertiesOfText(
            trickyText,
            false
          );
          const actualFontProps = pixiUtils.getFontPropertiesOfText(
            trickyText,
            true
          );
          expect(actualFontProps).toMatchObject(initialFontProps);
        }).not.toThrowError();
      });

      it("should handle string font sizes without throwing in v8.", () => {
        const trickyText = new PIXI.Text("Tricky", {
          fontSize: "0.688em",
          fontFamily: "arial",
        });
        expect(() => {
          pixiUtils.getFontPropertiesOfText(trickyText, false);
        }).not.toThrowError();

        expect(() => {
          pixiUtils.getFontPropertiesOfText(trickyText, true);
        }).not.toThrowError();
      });
      it("should handle unusual fontSize values without throwing in v8.", () => {
        expect(() => {
          pixiUtils.getFontPropertiesOfText(
            new PIXI.Text("Poop", {
              fontSize: "WUT?",
              fontFamily: "arial",
            }),
            false
          );
        }).not.toThrowError();
        expect(() => {
          pixiUtils.getFontPropertiesOfText(
            new PIXI.Text("NoProps", { fontSize: undefined }),
            false
          );
        }).not.toThrowError();
      });
    });
  });

  describe("addChildrenToContainer()", () => {
    describe("Adds each of an array of display objects to a container", () => {
      const container = new PIXI.Container();
      const child1 = new PIXI.Sprite();
      const child2 = new PIXI.Sprite();
      const child3 = new PIXI.Sprite();
      const children = [child1, child2, child3];

      it("should add each of the children to the container", () => {
        pixiUtils.addChildrenToContainer(children, container);
        expect(container.children.length).toBe(3);
      });

      it("should add each of the children to the container in the order they are passed in", () => {
        pixiUtils.addChildrenToContainer(children, container);
        expect(container.children[0]).toBe(child1);
        expect(container.children[1]).toBe(child2);
        expect(container.children[2]).toBe(child3);
      });
    });
  });

  describe("fontSizeStringToNumber()", () => {
    describe("Converts different text based font sizes to a pixel number. everything is based on 16px as the base.", () => {
      it("Converts rems and ems to px", () => {
        expect(pixiUtils.fontSizeStringToNumber("1rem")).toBeCloseTo(16);
        expect(pixiUtils.fontSizeStringToNumber("1em")).toBeCloseTo(16);
        expect(pixiUtils.fontSizeStringToNumber("3em")).toBeCloseTo(48);
      });
      it("Converts % to px", () => {
        expect(pixiUtils.fontSizeStringToNumber("100%")).toBeCloseTo(16);
        expect(pixiUtils.fontSizeStringToNumber("200%")).toBeCloseTo(32);
      });
      it("Converts pt to px", () => {
        expect(pixiUtils.fontSizeStringToNumber("10pt")).toBeCloseTo(13.281472);
        expect(pixiUtils.fontSizeStringToNumber("20pt")).toBeCloseTo(26.562945);
      });
      it("Converts px to px", () => {
        expect(pixiUtils.fontSizeStringToNumber("16.0px")).toBe(16.0);
        expect(pixiUtils.fontSizeStringToNumber("100px")).toBe(100);
      });
      it("Returns NaN if the input evaluates to NaN", () => {
        expect(pixiUtils.fontSizeStringToNumber("Frank")).toBeNaN();
      });
    });
  });
});
