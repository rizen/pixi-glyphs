import * as PIXI from "pixi.js";
import { IFontMetrics } from "./types";

const PX_PER_EM = 16;
const PX_PER_PERCENT = 16 / 100;
const PX_PER_PT = 1.3281472327365;

export const INITIAL_FONT_PROPS: IFontMetrics = {
  ascent: 10,
  descent: 3,
  fontSize: 13,
};

// TODO: Memoize
export const getFontPropertiesOfText = (
  textField: PIXI.Text,
  forceUpdate = false
): IFontMetrics => {
  const text = textField.text;
  const style = textField.style;

  // For spaces and empty text, use a representative character to get consistent metrics
  // This ensures spaces align on the same baseline as other text
  const measureText = (text && text.trim().length > 0) ? text : 'M';

  // Use PIXI's CanvasTextMetrics which measures the text
  const metrics = PIXI.CanvasTextMetrics.measureText(measureText, style as any);

  // Get fontSize from the metrics or fall back to style
  const fontSize = metrics.fontProperties?.fontSize ||
    (typeof style.fontSize === 'number' ? style.fontSize : 16);

  // Use the actual measured ascent/descent from PIXI
  // For spaces, this gives us the same baseline as regular characters in that font
  return {
    ascent: metrics.fontProperties?.ascent || fontSize * 0.88,
    descent: metrics.fontProperties?.descent || fontSize * 0.12,
    fontSize: fontSize
  };
};

export const addChildrenToContainer = (
  children: PIXI.Container[],
  container: PIXI.Container
): void => children.forEach((child) => container.addChild(child));

export const cloneSprite = (sprite: PIXI.Sprite): PIXI.Sprite => {
  const clone = new PIXI.Sprite(sprite.texture);
  // Ensure linear filtering for smooth scaling
  if (clone.texture?.source) {
    clone.texture.source.scaleMode = "linear";
  }
  return clone;
};

export const fontSizeStringToNumber = (size: string): number => {
  const [valueString, unit] = size.split(/(%|pt|px|r?em)/);
  const value = parseFloat(valueString);

  if (isNaN(value)) {
    NaN;
  }

  switch (unit) {
    case "%":
      return value * PX_PER_PERCENT;
    case "em":
    case "rem":
      return value * PX_PER_EM;
    case "pt":
      return value * PX_PER_PT;
    case "px":
    default:
      // keep as is.
      return value;
  }
};
