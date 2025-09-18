import { convertUnsupportedAlignment, extractDecorations } from "./style";
import { capitalize, isOnlyWhitespace } from "./stringUtil";
import {
  last,
  first,
  assoc,
  mapProp,
  flatReduce,
  Unary,
} from "./functionalUtils";
import { getFontPropertiesOfText } from "./pixiUtils";
import * as PIXI from "pixi.js";
import {
  Align,
  Bounds,
  Point,
  StyledTokens,
  SegmentToken,
  StyledToken,
  TextToken,
  SpriteToken,
  SplitStyle,
  TextStyleExtended,
  IFontMetrics,
  isNewlineToken,
  isWhitespaceToken,
  IMG_DISPLAY_PROPERTY,
  isSpriteToken,
  ParagraphToken,
  LineToken,
  WordToken,
  Nested,
  isNotWhitespaceToken,
  VAlign,
  createEmptySegmentToken,
  FontMap,
} from "./types";

const ICON_SCALE_BASE = 0.8;

// In Pixi v8, Text needs to be created with proper options
const sizer = new PIXI.Text({ text: "" });

/**
 * Translates the current location point to the beginning of the next line.
 *
 * @param offset An offset coordinate. The function will make a clone of this with new coordinates.
 * @param largestLineHeight The largest height in the line of text.
 * @param lineSpacing The amount of extra space to insert between each line.
 */
export const updateOffsetForNewLine = (
  offset: Point,
  largestLineHeight: number,
  lineSpacing: number
): Point => new PIXI.Point(0, offset.y + largestLineHeight + lineSpacing);

const rectFromContainer = (
  container: PIXI.Container,
  offset: Point = { x: 0, y: 0 }
): Bounds => {
  const w = container.width;
  const h = container.height;
  const x = offset.x + container.x;
  const y = offset.y + container.y;

  return new PIXI.Rectangle(x, y, w, h);
};

/**
 * Move a point by an offset.
 * Point p => p -> p-> -> p
 * @param offset Amount to translate the target.
 * @param point Target to translate.
 */
export const translatePoint =
  <P extends Point>(offset: Point) =>
  (point: P): P => {
    const newX = point.x + offset.x;

    // Debug extreme translations
    if (Math.abs(newX) > 10000 && Math.abs(point.x) < 10000) {
      console.error('EXTREME TRANSLATION IN translatePoint:', {
        oldX: point.x,
        offsetX: offset.x,
        newX: newX
      });
    }

    return {
      ...point,
      x: newX,
      y: point.y + offset.y,
    };
  };

/**
 * Same as translatePoint but for all the points in an array.
 */
export const translateLine =
  (offset: Point) =>
  (line: Bounds[]): Bounds[] =>
    line.map(translatePoint(offset));

export const translateWordPosition =
  (offset: Point) =>
  (word: WordToken): WordToken =>
    word.map((token) =>
      mapProp<Bounds, SegmentToken>("bounds")(translatePoint(offset))(token)
    );

export const translateTokenLine =
  (offset: Point) =>
  (line: LineToken): LineToken =>
    line.map(translateWordPosition(offset));

export const lineWidth = (wordsInLine: Bounds[]): number => {
  const firstWord = first(wordsInLine);
  const lastWord = last(wordsInLine);

  if (firstWord === undefined) {
    return 0;
  }
  if (lastWord === firstWord) {
    return firstWord.width;
  }

  const width = lastWord.x + lastWord.width - firstWord.x;

  // Debug extreme values that can cause center alignment issues
  if (width < -1000 || width > 100000 || isNaN(width)) {
    console.warn('Extreme lineWidth detected in animation demo:', {
      width,
      firstWord: { x: firstWord.x, width: firstWord.width },
      lastWord: { x: lastWord.x, width: lastWord.width },
      numWords: wordsInLine.length,
      calculation: `${lastWord.x} + ${lastWord.width} - ${firstWord.x} = ${width}`
    });
  }

  return width;
};

export const center = (x: number, context: number): number => {
  const result = (context - x) / 2;

  // Debug extreme center calculations
  if (Math.abs(result) > 10000) {
    console.error('EXTREME CENTER CALCULATION:', {
      x: x,
      context: context,
      result: result,
      calculation: `(${context} - ${x}) / 2 = ${result}`
    });
  }

  return result;
};

const setBoundsX = assoc<Bounds, number>("x");

const positionWordX =
  (x: number) =>
  (word: any): any => {
    let prevBounds: Bounds;

    const positionRecursive = (item: any): any => {
      // If it's an array, recursively process it
      if (Array.isArray(item)) {
        return item.map(positionRecursive);
      }

      // If it's a token with bounds, position it
      if (item && item.bounds) {
        if (prevBounds === undefined) {
          item.bounds.x = x;
          prevBounds = item.bounds;
        } else {
          item.bounds.x = prevBounds.x + prevBounds.width;
          prevBounds = item.bounds;
        }
      }

      return item;
    };

    return positionRecursive(word);
  };

export const concatBounds = (
  originalBounds: Bounds = { x: NaN, y: NaN, width: NaN, height: NaN },
  bounds: Bounds = { x: NaN, y: NaN, width: NaN, height: NaN }
): Bounds => {
  if (isNaN(originalBounds.x)) {
    return bounds;
  }

  const x = Math.min(originalBounds.x, bounds.x);
  const y = Math.min(originalBounds.y, bounds.y);
  const right = Math.max(
    originalBounds.x + originalBounds.width,
    bounds.x + bounds.width
  );
  const bottom = Math.max(
    originalBounds.y + originalBounds.height,
    bounds.y + bounds.height
  );
  const width = right - x;
  const height = bottom - y;

  return { x, y, width, height };
};

const getCombinedBounds = (bounds: Bounds[]): Bounds =>
  bounds.reduce(concatBounds, { x: NaN, y: NaN, width: NaN, height: NaN });

export const getBoundsNested: Unary<Nested<SegmentToken>, Bounds> = flatReduce<
  SegmentToken,
  Bounds
>((acc: Bounds, t: SegmentToken) => {
  // When a token is a single character with splitStyle, just return its bounds directly
  // instead of trying to concatenate with potentially incorrect accumulated bounds
  if (isNaN(acc.x)) {
    return { ...t.bounds };
  }
  return concatBounds(acc, t.bounds);
}, {
  x: NaN,
  y: NaN,
  width: NaN,
  height: NaN,
});

type AlignFunction = (line: Bounds[]) => Bounds[];
type AlignFunctionMaxWidth = (maxWidth: number) => AlignFunction;

export const alignLeft: AlignFunction = (line) =>
  line.reduce(
    (newLine: Bounds[], bounds: Bounds, i: number): Bounds[] => {
      // is first word?
      if (i === 0) {
        return [setBoundsX(0)(bounds)];
      } else {
        const prevBounds = newLine[i - 1];
        const newX = prevBounds.x + prevBounds.width;

        // Debug extreme spacing between words
        if (Math.abs(newX) > 10000 || prevBounds.width > 10000) {
          console.error('EXTREME SPACING IN alignLeft:', {
            wordIndex: i,
            prevX: prevBounds.x,
            prevWidth: prevBounds.width,
            calculatedX: newX,
            currentBounds: bounds
          });
        }

        return newLine.concat([setBoundsX(newX)(bounds)]);
      }
    },
    []
  );

export const alignRight: AlignFunctionMaxWidth = (maxWidth) => (line) => {
  // First align left to normalize positions
  const leftAligned = alignLeft(line);

  // Calculate the offset based on the properly aligned line
  return translateLine({
    x: maxWidth - lineWidth(leftAligned),
    y: 0,
  })(leftAligned);
};

export const alignCenter: AlignFunctionMaxWidth = (maxWidth) => (line) => {
  // IMPORTANT: First align left to normalize all positions starting from 0
  // This is critical for splitStyle: "characters" where words come with existing positions
  const leftAligned = alignLeft(line);

  // Now calculate the width from the properly aligned line
  const width = lineWidth(leftAligned);
  const centerOffset = center(width, maxWidth);

  // Debug problematic centering with splitStyle characters
  if (Math.abs(centerOffset) > 10000 || isNaN(centerOffset)) {
    console.warn('Bad center offset detected:', {
      lineWidth: width,
      maxWidth: maxWidth,
      centerOffset: centerOffset,
      lineLength: line.length,
      leftAlignedFirst: leftAligned[0],
      leftAlignedLast: leftAligned[leftAligned.length - 1]
    });
  }

  return translateLine({ x: centerOffset, y: 0 })(leftAligned);
};

export const alignJustify: AlignFunctionMaxWidth = (maxLineWidth) => (line) => {
  const count = line.length;
  if (count === 0) {
    return [];
  }

  const nonZeroWidthWords: Bounds[] = line.filter(({ width }) => width > 0);
  const countNonZeroWidthWords = nonZeroWidthWords.length;

  if (countNonZeroWidthWords === 1) {
    const [first, ...rest] = line;
    first.x = 0;
    return [first, ...rest];
  }

  const result: Bounds[] = [];
  const combinedBounds = getCombinedBounds(nonZeroWidthWords);
  const w = combinedBounds.width;
  const totalSpace = maxLineWidth - w;
  const spacerWidth = totalSpace / (countNonZeroWidthWords - 1);

  let previousWord;
  for (let i = 0; i < line.length; i++) {
    const bounds = line[i];
    if (bounds.width === 0) {
      result[i] = { ...bounds };
      continue;
    }
    let x;
    if (previousWord === undefined) {
      x = 0;
    } else {
      x = previousWord.x + previousWord.width + spacerWidth;
    }
    if (isNaN(x)) {
      throw new Error(
        `Something went wrong with the justified layout calculation. x is NaN.`
      );
    }
    const newWord: Bounds = setBoundsX(x)(bounds);
    previousWord = newWord;
    result[i] = newWord;
  }
  return result;
};

export const alignLines = (
  align: Align,
  maxWidth: number,
  lines: ParagraphToken
): ParagraphToken => {
  // do horizontal alignment.
  let alignFunction: AlignFunction;
  let lastAlignFunction: AlignFunction;
  switch (align) {
    case "left":
      alignFunction = alignLeft;
      lastAlignFunction = alignFunction;
      break;
    case "right":
      alignFunction = alignRight(maxWidth);
      lastAlignFunction = alignFunction;
      break;
    case "center":
      alignFunction = alignCenter(maxWidth);
      lastAlignFunction = alignFunction;
      break;
    case "justify":
    case "justify-left":
      alignFunction = alignJustify(maxWidth);
      lastAlignFunction = alignLeft;
      break;
    case "justify-right":
      alignFunction = alignJustify(maxWidth);
      lastAlignFunction = alignRight(maxWidth);
      break;
    case "justify-center":
      alignFunction = alignJustify(maxWidth);
      lastAlignFunction = alignCenter(maxWidth);
      break;
    case "justify-all":
      alignFunction = alignJustify(maxWidth);
      lastAlignFunction = alignFunction;
      break;
    default:
      throw new Error(
        `Unsupported alignment type ${align}! Use one of : "left", "right", "center", "justify", "justify-left", "justify-right", justify-center", "justify-all"`
      );
  }

  for (const line of lines) {
    const isLastLine =
      // line is the last in the group OR
      lines.indexOf(line) === lines.length - 1 ||
      // line contains newline character
      line.flat(2).filter(isNewlineToken).length > 0;

    const wordBoundsForLine: Bounds[] = [];
    let alignedLine;
    // Build array of bounds for alignment, normalizing x positions
    let isFirstWord = true;
    let expectedX = 0;

    for (const word of line) {
      const wordBounds = getBoundsNested(word);

      // Debug extreme bounds before normalization
      if (Math.abs(wordBounds.x) > 10000) {
        console.error('EXTREME BOUNDS DETECTED in alignLines:', {
          wordBounds,
          wordLength: word.length,
          firstToken: word[0],
          lineIndex: lines.indexOf(line),
          wordIndex: line.indexOf(word)
        });
      }

      // CRITICAL FIX: Normalize x position for ALL words in the line
      // to start from 0 for proper alignment calculation
      // This is essential when splitStyle: "characters" creates individual word bounds
      if (isFirstWord) {
        expectedX = wordBounds.x; // Remember the offset of the first word
        wordBounds.x = 0;
        isFirstWord = false;
      } else {
        // Adjust subsequent words relative to the first
        wordBounds.x = wordBounds.x - expectedX;
      }

      // Extra safety: if x is still extreme, force to 0
      if (Math.abs(wordBounds.x) > 10000) {
        console.warn('Forcing extreme x to 0 for word:', word[0]?.content);
        wordBounds.x = 0;
      }

      wordBoundsForLine.push(wordBounds);
    }
    if (isLastLine) {
      alignedLine = lastAlignFunction(wordBoundsForLine);
    } else {
      alignedLine = alignFunction(wordBoundsForLine);
    }
    for (let i = 0; i < line.length; i++) {
      const word = line[i];
      if (i < alignedLine.length) {
        const bounds = alignedLine[i];

        // Debug extreme positions after alignment
        if (Math.abs(bounds.x) > 10000) {
          console.error('EXTREME X AFTER ALIGNMENT:', {
            boundsX: bounds.x,
            wordIndex: i,
            lineIndex: lines.indexOf(line),
            wordContent: word[0]?.content || 'unknown',
            wordLength: word.length,
            isCharacterSplit: word.length === 1
          });
        }

        const updatedWord = positionWordX(bounds.x)(word);

        // Check if positionWordX is creating extreme values
        if (updatedWord[0] && Math.abs(updatedWord[0].bounds.x) > 10000) {
          console.error('EXTREME X AFTER positionWordX:', {
            inputBoundsX: bounds.x,
            outputBoundsX: updatedWord[0].bounds.x,
            wordContent: updatedWord[0].content
          });
        }

        line[i] = updatedWord;
      }
    }
  }
  return lines;
};

const getTallestToken = (line: LineToken): SegmentToken =>
  flatReduce<SegmentToken, SegmentToken>((tallest, current) => {
    let h = current.bounds.height ?? 0;
    if (isSpriteToken(current)) {
      h += current.fontProperties.descent;
    }
    const tallestH = tallest?.bounds.height ?? 0;
    if (h > tallestH) {
      return current;
    }
    return tallest;
  }, createEmptySegmentToken())(line);

export const verticalAlignInLines = (
  lines: ParagraphToken,
  lineSpacing: number,
  overrideValign?: VAlign // If you want to override the valign from the styles object, set it here.
): ParagraphToken => {
  let previousTallestToken: SegmentToken = createEmptySegmentToken();
  let previousLineBottom = 0;
  let paragraphModifier = 0;

  const newLines: ParagraphToken = [];

  for (const line of lines) {
    const newLine: LineToken = [];

    let tallestToken: SegmentToken = getTallestToken(line);
    // Note, paragraphModifier from previous line applied here.
    let tallestHeight = (tallestToken.bounds?.height ?? 0) + paragraphModifier;

    // For baseline alignment, we need the tallest ascent in the line
    // We should find the actual tallest ascent, not just from the tallest height token
    let tallestAscent = 0;
    for (const word of line) {
      for (const segment of word) {
        const segAscent = segment.fontProperties?.ascent ?? 0;
        if (segAscent > tallestAscent) {
          tallestAscent = segAscent;
        }
      }
    }
    tallestAscent += paragraphModifier;

    const valignParagraphModifier = paragraphModifier;
    paragraphModifier = 0;

    const lastToken = line[line.length - 1][0];
    if (isNewlineToken(lastToken)) {
      // Note, this will get applied on the NEXT line
      paragraphModifier = tallestToken.style.paragraphSpacing ?? 0;
    }
    if (isSpriteToken(tallestToken)) {
      tallestHeight += tallestToken.fontProperties.descent;
      tallestAscent = tallestToken.bounds.height;
    }

    if (tallestHeight === 0) {
      tallestToken = previousTallestToken;
    } else {
      previousTallestToken = tallestToken;
    }

    for (const word of line) {
      const newWord: WordToken = [];
      for (const segment of word) {
        const { bounds, fontProperties, style } = segment;
        const { height } = bounds;

        const newBounds: Bounds = { ...bounds };
        const valign = overrideValign ?? style.valign;

        let { ascent } = fontProperties;
        if (isSpriteToken(segment)) {
          ascent = segment.bounds.height;
        }

        if (isNewlineToken(segment)) {
          const newToken = {
            ...segment,
          };
          newToken.bounds.y = previousLineBottom + tallestAscent - ascent;
          newWord.push(newToken);
          continue;
        }

        // Every valignment starts at the previous line bottom.
        let newY = previousLineBottom;

        // Check if text has stroke for adjustment
        const hasStroke = style?.stroke && (style as any).strokeThickness > 0;
        const strokeThickness = hasStroke ? (style as any).strokeThickness : 0;

        switch (valign) {
          case "bottom":
            newY += tallestHeight - height;
            // Adjust for stroke (positions from outer edge)
            if (hasStroke) {
              newY -= strokeThickness / 2;
            }
            break;
          case "middle":
            // Need to account for how paragraph spacing affects the middle positioning.
            newY += (tallestHeight + valignParagraphModifier - height) / 2;
            // Adjust for stroke (positions from outer edge)
            if (hasStroke) {
              newY -= strokeThickness / 2;
            }
            break;
          case "top":
            // Normally the change would be 0px but we need to account for paragraph spacing.
            newY += valignParagraphModifier;
            // Adjust for stroke (positions from outer edge)
            if (hasStroke) {
              newY -= strokeThickness / 2;
            }
            break;
          case "baseline":
          default:
            // Baseline alignment with correct font metrics from comprehensive measurement
            // The comprehensive measurement string in pixiUtils.ts ensures
            // we get consistent ascent/descent values like PIXI v6 did
            newY = previousLineBottom + tallestAscent - ascent;

            // Adjust for stroke if present
            // PIXI positions stroked text from the outer edge of the stroke
            // So we compensate by subtracting half the stroke width
            if (hasStroke) {
              newY -= strokeThickness / 2;
            }

        }
        newBounds.y = newY;

        const newToken = {
          ...segment,
          bounds: newBounds,
        };
        newWord.push(newToken);
      }
      newLine.push(newWord);
    }

    // Update the position for the next line
    previousLineBottom += tallestHeight + lineSpacing;
    newLines.push(newLine);
  }

  return newLines;
};

export const collapseWhitespacesOnEndOfLines = (
  lines: ParagraphToken
): ParagraphToken => {
  for (const line of lines) {
    const l = line.length;
    let i = l;
    while (i >= 0) {
      i -= 1;
      const word = line[i];
      if (isNotWhitespaceToken(word)) {
        break;
      } else {
        for (const token of word) {
          token.bounds.width = 0;
          token.bounds.height = Math.min(
            token.bounds.height,
            token.fontProperties.fontSize
          );
        }
      }
    }
  }
  return lines;
};

const layout = (
  tokens: SegmentToken[],
  maxWidth: number,
  lineSpacing: number,
  align: Align,
  _splitStyle: SplitStyle
): ParagraphToken => {
  const cursor = { x: 0, y: 0 };
  let wordWidth = 0;
  let word: WordToken = [];
  let line: LineToken = [];
  const allLines: ParagraphToken = [];
  let tallestHeightInLine = 0;
  let token: SegmentToken;

  for (let i = 0; i < tokens.length; i++) {
    token = tokens[i];
    // when using an unbroken line (breakLines === false), treat the entire line as one word
    // unless you encounter one that isn't unbroken or a newline character
    const normalLineBreaks = hasNormalLineBreaks(token);
    const isWhitespace = isWhitespaceToken(token);
    const isNewline = isNewlineToken(token);
    const isImage = isSpriteToken(token);
    const isWordEndingToken = isWhitespace || isImage;

    if (
      (isWordEndingToken && normalLineBreaks) ||
      isNewline ||
      token.style.breakWords
    ) {
      positionWordBufferAndAddToLine();
    }

    addTokenToWordAndUpdateWordWidth(token);
    setTallestHeight(token);

    // always immediately add whitespace to the line.
    if ((isWhitespace && normalLineBreaks) || isNewline) {
      positionWordBufferAndAddToLine();
    }

    // If the token is a newline character,
    // move the cursor to next line immediately
    if (isNewline || isBlockImage(token)) {
      addLineToListOfLinesAndMoveCursorToNextLine(token);
    } else if (wordInBufferExceedsLineLength()) {
      // don't wrap if it's the first word in the line.
      if (line.length > 0) {
        addLineToListOfLinesAndMoveCursorToNextLine(token);
      }
    }
  }

  // After we reach the last token, add it to the word and finalize both buffers.
  if (word.length > 0) {
    positionWordBufferAndAddToLine();
  }
  if (line.length > 0) {
    addLineToListOfLines();
  }

  const collapsedWhitespace = collapseWhitespacesOnEndOfLines(allLines);
  const alignedLines = alignLines(align, maxWidth, collapsedWhitespace);
  const valignedLines = verticalAlignInLines(alignedLines, lineSpacing);

  return valignedLines;

  function addWordBufferToLineBuffer() {
    if (word !== undefined && word.length > 0) {
      // add word to line
      line.push(word);
    }

    // reset word buffer
    word = [];
    wordWidth = 0;
  }

  function addLineToListOfLines() {
    allLines.push(line);
    line = [];
  }

  function addLineToListOfLinesAndMoveCursorToNextLine(token: SegmentToken) {
    // finalize Line
    addLineToListOfLines();

    // move cursor to next line
    cursor.x = 0;
    cursor.y = cursor.y + tallestHeightInLine + lineSpacing;

    // reset tallestHeight
    tallestHeightInLine = 0;
    setTallestHeight(token);
  }

  function setTallestHeight(token?: SegmentToken): void {
    const fontSize = token?.fontProperties?.fontSize ?? 0;
    const height = token?.bounds?.height ?? 0;

    // Don't include lineSpacing in the max - it should be added separately when moving to next line
    tallestHeightInLine = Math.max(tallestHeightInLine, fontSize);

    // Don't try to measure the height of newline tokens
    if (isNewlineToken(token) === false) {
      tallestHeightInLine = Math.max(tallestHeightInLine, height);
    }
  }

  function positionTokenAtCursorAndAdvanceCursor(token: SegmentToken): void {
    // position token at cursor
    setTallestHeight(token);

    // Debug extreme cursor positions BEFORE assignment
    if (Math.abs(cursor.x) > 10000) {
      console.error('EXTREME CURSOR.X BEFORE ASSIGNMENT:', {
        cursorX: cursor.x,
        cursorY: cursor.y,
        tokenContent: token.content,
        tokenWidth: token.bounds.width,
        tokenBounds: { ...token.bounds }
      });
    }

    token.bounds.x = cursor.x;
    token.bounds.y = cursor.y;

    // advance cursor
    cursor.x += token.bounds.width;

    // Debug if cursor becomes extreme AFTER advancing
    if (Math.abs(cursor.x) > 10000) {
      console.error('EXTREME CURSOR.X AFTER ADVANCING:', {
        cursorX: cursor.x,
        tokenContent: token.content,
        tokenWidth: token.bounds.width
      });
    }
  }

  function positionWordBufferAtCursorAndAdvanceCursor(): void {
    word.forEach(positionTokenAtCursorAndAdvanceCursor);
  }

  function wordInBufferExceedsLineLength(): boolean {
    return cursor.x + wordWidth > maxWidth;
  }

  function isBlockImage(token: SegmentToken): boolean {
    return token.style[IMG_DISPLAY_PROPERTY] === "block";
  }

  function hasNormalLineBreaks(token: SegmentToken): boolean {
    return token.style.breakLines ?? true;
  }

  function addTokenToWordAndUpdateWordWidth(token: SegmentToken): void {
    // add the token to the current word buffer.
    word.push(token);
    wordWidth += token.bounds.width;
  }

  function positionWordBufferAndAddToLine() {
    positionWordBufferAtCursorAndAdvanceCursor();
    addWordBufferToLineBuffer();
  }
};

const notEmptyString = (s: string) => s !== "";

const SPLIT_MARKER = `_🔪_`;
export const splitAroundWhitespace = (s: string): string[] =>
  s
    .replace(/\s/g, `${SPLIT_MARKER}$&${SPLIT_MARKER}`)
    .split(SPLIT_MARKER)
    .filter((s) => s !== "");

export const splitText = (s: string, splitStyle: SplitStyle): string[] => {
  if (splitStyle === "words") {
    return [s].flatMap(splitAroundWhitespace).filter(notEmptyString);
  } else if (splitStyle === "characters") {
    return s.split("");
  } else {
    // unsupported splitStyle.
    let suggestion = ` Supported styles are "words" and "characters"`;
    const badStyle = (splitStyle as string).toLowerCase();
    if (badStyle.indexOf("char") === 0) {
      suggestion = `Did you mean "characters"?`;
    } else if (badStyle.indexOf("wor") === 0) {
      suggestion = `Did you mean "words"?`;
    }
    throw new Error(`Unsupported split style "${splitStyle}". ${suggestion}`);
  }
};

export const calculateTokens = (
  styledTokens: StyledTokens,
  splitStyle: SplitStyle = "words",
  scaleIcons = true,
  adjustFontBaseline?: FontMap
): ParagraphToken => {
  // Create a text field to use for measurements.
  const defaultStyle = styledTokens.style;

  let fontProperties: IFontMetrics;

  const generateTokensFormStyledToken =
    (style: TextStyleExtended, tags: string) =>
    (token: StyledToken | TextToken | SpriteToken): SegmentToken[] => {
      let output: SegmentToken[] = [];

      const alignClassic = convertUnsupportedAlignment(style.align);

      const isNestedContext = tags && tags.includes("outline");

      // Clean up the style for PIXI v8 compatibility
      const cleanedStyle = { ...style };

      // Remove stroke properties from sizer - we don't need them for measuring
      // and they can cause issues with PIXI v8
      delete cleanedStyle.stroke;
      delete cleanedStyle.strokeThickness;

      // Create a fresh sizer for this context to avoid state corruption in nested tags
      // Make sure we have all required style properties for PIXI v8
      const sizerStyle = {
        ...cleanedStyle,
        align: alignClassic,
        // Override some styles for the purposes of sizing text.
        wordWrap: false,
        dropShadow: undefined,
        // Ensure we have required properties
        fontFamily: cleanedStyle.fontFamily || 'Arial',
        fontSize: cleanedStyle.fontSize || 24,
        fill: cleanedStyle.fill || 0x000000,
      };

      const localSizer = new PIXI.Text({
        text: "",
        style: sizerStyle as any
      });

      if (typeof token === "string") {
        // split into pieces and convert into tokens.

        const textSegments = splitText(token, splitStyle);

        const textTokens = textSegments.map((str): SegmentToken => {

          switch (style.textTransform) {
            case "uppercase":
              localSizer.text = str.toUpperCase();
              break;
            case "lowercase":
              localSizer.text = str.toLowerCase();
              break;
            case "capitalize":
              localSizer.text = capitalize(str);
              break;
            default:
              localSizer.text = str;
          }


          fontProperties = { ...getFontPropertiesOfText(localSizer, true) };

          // Incorporate the size of the stroke into the size of the text.
          if (isOnlyWhitespace(token) === false) {
            const stroke = (localSizer.style as any).stroke ?? 0;
            if (stroke > 0) {
              fontProperties.descent += stroke / 2;
              fontProperties.ascent += stroke / 2;
              fontProperties.fontSize =
                fontProperties.ascent + fontProperties.descent;
            }
          }

          const sw = style.fontScaleWidth ?? 1.0;
          const sh = style.fontScaleHeight ?? 1.0;
          // clamp negative or NaN fontScales to 0
          const scaleWidth = isNaN(sw) || sw < 0 ? 0.0 : sw;
          const scaleHeight = isNaN(sh) || sh < 0 ? 0.0 : sh;

          localSizer.scale.set(scaleWidth, scaleHeight);

          fontProperties.ascent *= scaleHeight;
          fontProperties.descent *= scaleHeight;
          fontProperties.fontSize *= scaleHeight;

          // For whitespace, we need special handling since PIXI.Text sometimes returns NaN
          let bounds: Bounds;

          if (isOnlyWhitespace(str)) {
            // For whitespace, calculate width based on font metrics
            // Use approximately 0.3em per space character
            const fontSize = typeof localSizer.style.fontSize === 'string'
              ? parseInt(localSizer.style.fontSize)
              : localSizer.style.fontSize || 24;

            const spaceWidth = fontSize * 0.3 * str.length;
            const height = fontProperties.fontSize;

            bounds = new PIXI.Rectangle(0, 0, spaceWidth, height);

          } else {
            // Use a fresh sizer instance for measurement
            const measureSizer = new PIXI.Text({
              text: localSizer.text,
              style: { ...localSizer.style } as any
            });
            measureSizer.scale.set(localSizer.scale.x, localSizer.scale.y);
            bounds = rectFromContainer(measureSizer);
          }



          // Final sanity check - ensure bounds are valid
          if (isNaN(bounds.width) || isNaN(bounds.height)) {
            console.error(`[ERROR] NaN bounds after all attempts for token "${str}" with tags="${tags}"`);
            // Use a reasonable fallback
            if (isOnlyWhitespace(str)) {
              bounds = new PIXI.Rectangle(0, 0, fontProperties.fontSize * 0.3 * str.length, fontProperties.fontSize);
            } else {
              bounds = new PIXI.Rectangle(0, 0, 0, fontProperties.fontSize);
            }
          }


          const textDecorations = extractDecorations(
            style,
            bounds,
            fontProperties
          );

          const baselineAdjustment = getBaselineAdjustment(
            style,
            adjustFontBaseline,
            fontProperties.ascent
          );
          fontProperties.ascent += baselineAdjustment;

          const { letterSpacing } = style;
          if (letterSpacing) {
            bounds.width += letterSpacing;
          }

          const convertedToken = {
            content: str,
            style,
            tags,
            bounds,
            fontProperties,
            textDecorations,
          };

          // Required to remove extra stroke width from whitespace.
          // to be totally honest, I'm not sure why this works / why it was being added.
          if (isOnlyWhitespace(str)) {
            const strokeThickness = (style as any).strokeThickness;
            let strokeWidth = 0;

            // Only use strokeThickness if it's a positive number
            if (typeof strokeThickness === 'number' && strokeThickness > 0) {
              strokeWidth = strokeThickness;
            }
            // Don't check stroke value - it can be a color string like "#aaaaaa"
            // which would be misinterpreted as a number

            // Only adjust width if we have a valid stroke width
            if (strokeWidth > 0 && !isNaN(strokeWidth)) {
              const newWidth = bounds.width - strokeWidth;
              bounds.width = Math.max(0, newWidth); // Never go negative!
            }
          }


          return convertedToken;
        });

        output = output.concat(textTokens);
      } else if (token instanceof PIXI.Sprite) {
        const sprite = token;
        const imgDisplay = style[IMG_DISPLAY_PROPERTY];
        // const isBlockImage = imgDisplay === "block";
        const isIcon = imgDisplay === "icon";
        fontProperties = { ...getFontPropertiesOfText(localSizer, true) };

        if (isIcon) {
          // Set to minimum of 1 to avoid devide by zero.
          // if it's height is zero or one it probably hasn't loaded yet.
          // It will get refreshed after it loads.
          const h = Math.max(sprite.height, 1);

          if (h > 1 && sprite.scale.y === 1) {
            const { iconScale = 1.0 } = style;
            const ratio =
              (fontProperties.ascent / h) * ICON_SCALE_BASE * iconScale;
            sprite.scale.set(ratio);
          }

          if (scaleIcons) {
            const {
              fontScaleWidth: scaleX = 1.0,
              fontScaleHeight: scaleY = 1.0,
            } = style;
            sprite.scale.x *= scaleX;
            sprite.scale.y *= scaleY;
          }
        }

        // handle images
        const bounds = rectFromContainer(sprite);

        const { letterSpacing } = style;
        if (letterSpacing && isIcon) {
          bounds.width += letterSpacing;
        }

        output.push({
          content: sprite,
          style,
          tags,
          bounds,
          fontProperties,
          textDecorations: undefined,
        });
      } else {
        // token is a composite
        const styledToken = token as StyledToken;
        const { children } = styledToken;
        // set tags and styles for children of this composite token.
        const newStyle = styledToken.style;
        const newTags = styledToken.tags;

        if (newStyle === undefined) {
          throw new Error(
            `Expected to find a 'style' property on ${styledToken}`
          );
        }

        output = output.concat(
          children.flatMap(generateTokensFormStyledToken(newStyle, newTags))
        );
      }
      return output;
    };

  // when starting out, use the default style
  const tags = "";
  const style: TextStyleExtended = defaultStyle;

  const finalTokens = styledTokens.children.flatMap(
    generateTokensFormStyledToken(style, tags)
  );

  const { wordWrap: ww, wordWrapWidth: www } = defaultStyle;
  const hasWordWrapWidth = www !== undefined && isNaN(www) === false && www > 0;
  const maxWidth =
    ww && hasWordWrapWidth ? (www as number) : Number.POSITIVE_INFINITY;

  const lineSpacing = defaultStyle.lineSpacing ?? 0;
  const align = defaultStyle.align ?? "left";


  const lines = layout(finalTokens, maxWidth, lineSpacing, align, splitStyle);

  return lines;
};

export const getBaselineAdjustment = (
  style: TextStyleExtended,
  fontBaselineMap: FontMap = {},
  ascent: number
): number => {
  const fontFamily = style.fontFamily?.toString() ?? "";
  const adjustBaseline = style.adjustBaseline ?? 0;
  const adjustFontBaseline = fontBaselineMap[fontFamily] ?? null;

  let finalValue = adjustBaseline;
  if (typeof adjustFontBaseline === "string") {
    const percentPair = adjustFontBaseline.split("%");
    const isPercent = percentPair.length > 1;
    const value = Number(percentPair[0]);

    if (isPercent) {
      finalValue += ascent * (value / 100);
    } else {
      finalValue += value;
    }
  } else {
    finalValue += Number(adjustFontBaseline);
  }
  return finalValue;
};
