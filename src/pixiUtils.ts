import * as PIXI from "pixi.js";
import { IFontMetrics } from "./types";

const PX_PER_EM = 16;
const PX_PER_PERCENT = 16 / 100;
const PX_PER_PT = 1.3281472327365;

export const measureFont = (font: string): IFontMetrics => {
  // In Pixi v8, we need to create a canvas context to measure fonts
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Cannot get 2D context');
  context.font = font;
  const metrics = context.measureText('M');
  const fontSize = parseInt(font.match(/\d+/)?.['0'] || '16');
  return {
    ascent: metrics.actualBoundingBoxAscent || fontSize * 0.8,
    descent: metrics.actualBoundingBoxDescent || fontSize * 0.2,
    fontSize: fontSize
  };
};

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
  // In Pixi v8, we need to work with the text style directly
  const style = textField.style;
  const fontSize = typeof style.fontSize === 'number' ? style.fontSize : 16;
  const fontFamily = style.fontFamily || 'Arial';
  const fontWeight = (style as any).fontWeight || 'normal';
  const fontStyle = style.fontStyle || 'normal';
  const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

  return measureFont(font);
};

export const addChildrenToContainer = (
  children: PIXI.Container[],
  container: PIXI.Container
): void => children.forEach((child) => container.addChild(child));

export const cloneSprite = (sprite: PIXI.Sprite): PIXI.Sprite =>
  new PIXI.Sprite(sprite.texture);

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
