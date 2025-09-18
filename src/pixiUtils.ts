import * as PIXI from "pixi.js";
import { IFontMetrics } from "./types";

const PX_PER_EM = 16;
const PX_PER_PERCENT = 16 / 100;
const PX_PER_PT = 1.3281472327365;

// Cache for font metrics to avoid repeated measurements of identical fonts
const fontMetricsCache = new Map<string, IFontMetrics>();

// Comprehensive measurement string that captures ALL character extremes
// This ensures we get the maximum ascent/descent for any text in this font
const COMPREHENSIVE_MEASURE_STRING =
  'ÁÇÉÍÑÓÚÜáçéíñóúüĀĢĻŅŖŠŪŽāģļņŗšūž|ÉqÅŠMgpjy' + // Accented chars + descenders
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +                    // All capitals
  'abcdefghijklmnopqrstuvwxyz' +                    // All lowercase
  '0123456789';                                      // Numbers

export const measureFont = (font: string): IFontMetrics => {
  // Check cache first
  if (fontMetricsCache.has(font)) {
    return fontMetricsCache.get(font)!;
  }

  // In Pixi v8, we need to create a canvas context to measure fonts
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Cannot get 2D context');
  context.font = font;

  // CRITICAL CHANGE: Measure comprehensive string to get maximum metrics
  // This matches what PIXI v6's TextMetrics.measureFont() likely did internally
  // NOTE: Using simple string for animation demo compatibility with splitStyle="characters"
  const measureString = "Mgpjy"; // Temporarily reverting to test animation demo
  const metrics = context.measureText(measureString);

  // Match digits followed by 'px' to get the actual font size, not fontWeight
  const fontSize = parseInt(font.match(/(\d+)px/)?.['1'] || '16');

  // Use the actual measurements if available, with better fallback ratios
  const result = {
    ascent: metrics.actualBoundingBoxAscent || fontSize * 0.88,
    descent: metrics.actualBoundingBoxDescent || fontSize * 0.12,
    fontSize: fontSize
  };

  // Cache the result for this font
  fontMetricsCache.set(font, result);

  return result;
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
