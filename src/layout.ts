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
  // If context is infinite (no word wrap), don't center
  if (!isFinite(context)) {
    return 0;
  }
  return (context - x) / 2;
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

export const alignLeft: AlignFunction = (line) => {
  return line.reduce(
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
};

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

  // Prevent Infinity when line is too long or only one word
  // If totalSpace is negative (line too long), use 0 spacing
  const spacerWidth = totalSpace > 0 ? totalSpace / (countNonZeroWidthWords - 1) : 0;

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

        const updatedWord = positionWordX(bounds.x)(word);

        line[i] = updatedWord;
      }
    }
  }
  return lines;
};

const getTallestToken = (line: LineToken): SegmentToken => {
  // Find the last non-whitespace token to determine where actual content ends
  let lastNonWhitespaceIndex = -1;
  for (let i = line.length - 1; i >= 0; i--) {
    if (isNotWhitespaceToken(line[i])) {
      lastNonWhitespaceIndex = i;
      break;
    }
  }

  // Only consider tokens up to the last non-whitespace token for line height
  const relevantWords = lastNonWhitespaceIndex >= 0
    ? line.slice(0, lastNonWhitespaceIndex + 1)
    : line;

  return flatReduce<SegmentToken, SegmentToken>((tallest, current) => {
    // Skip whitespace and newline tokens when determining tallest
    if (isWhitespaceToken(current) || isNewlineToken(current)) {
      return tallest;
    }

    let h = current.bounds.height ?? 0;
    if (isSpriteToken(current)) {
      h += current.fontProperties.descent;
    }
    const tallestH = tallest?.bounds.height ?? 0;
    if (h > tallestH) {
      return current;
    }
    return tallest;
  }, createEmptySegmentToken())(relevantWords);
};

export const verticalAlignInLines = (
  lines: ParagraphToken,
  lineSpacing: number,
  overrideValign?: VAlign // If you want to override the valign from the styles object, set it here.
): ParagraphToken => {
  let previousTallestToken: SegmentToken = createEmptySegmentToken();
  let lastNonEmptyTallestToken: SegmentToken = createEmptySegmentToken();
  let previousLineBottom = 0;
  let paragraphModifier = 0;

  const newLines: ParagraphToken = [];

  for (const line of lines) {
    const newLine: LineToken = [];

    let tallestToken: SegmentToken = getTallestToken(line);

    // Get the base height without paragraph modifier first
    let baseHeight = tallestToken.bounds?.height ?? 0;
    let baseTallestAscent = 0;

    // For baseline alignment, we need the tallest ascent in the line
    // We should find the actual tallest ascent, not just from the tallest height token
    // Skip NEWLINE tokens but INCLUDE whitespace if they have stroke
    for (const word of line) {
      for (const segment of word) {
        // Skip newline tokens only
        if (isNewlineToken(segment)) {
          continue;
        }

        // Get the base ascent from font metrics
        let segAscent = segment.fontProperties?.ascent ?? 0;

        // Add stroke to ascent for LINE HEIGHT calculation only
        // This ensures stroked text doesn't overlap with lines above
        // IMPORTANT: This must include spaces with stroke so they align with stroked text
        const style = segment.style;
        const strokeWidth = typeof style?.stroke === 'object' ? (style.stroke as any).width : 0;
        const legacyStrokeThickness = (style as any).strokeThickness || 0;
        const strokeThickness = strokeWidth || legacyStrokeThickness;
        if (strokeThickness && strokeThickness > 0) {
          segAscent += strokeThickness / 2;
        }

        // Skip whitespace tokens that don't have stroke (use default style metrics)
        const shouldSkip = isWhitespaceToken(segment) && !(strokeThickness && strokeThickness > 0);

        if (shouldSkip) {
          continue;
        }

        if (segAscent > baseTallestAscent) {
          baseTallestAscent = segAscent;
        }
      }
    }

    // If the line is empty (only whitespace), use the last non-empty line's tallest token for spacing
    // This ensures blank lines maintain proper vertical spacing
    if (baseHeight === 0 && baseTallestAscent === 0) {
      baseHeight = lastNonEmptyTallestToken.bounds?.height ?? 0;
      baseTallestAscent = lastNonEmptyTallestToken.fontProperties?.ascent ?? 0;
    } else {
      // Track the last non-empty line's tallest token
      lastNonEmptyTallestToken = tallestToken;
    }

    // Now apply paragraph modifier AFTER determining if line is empty
    // Note, paragraphModifier from previous line applied here.
    let tallestHeight = baseHeight + paragraphModifier;
    let tallestAscent = baseTallestAscent + paragraphModifier;

    const valignParagraphModifier = paragraphModifier;
    paragraphModifier = 0;

    const lastToken = line[line.length - 1][0];
    if (isNewlineToken(lastToken)) {
      // Note, this will get applied on the NEXT line
      paragraphModifier = tallestToken.style.paragraphSpacing ?? 0;
    }
    if (isSpriteToken(tallestToken)) {
      tallestHeight += tallestToken.fontProperties.descent;
      // For sprites, use their full height as the ascent for line spacing
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

        // Check if text has stroke for adjustment
        // Support both PIXI v8 format (stroke.width) and legacy format (strokeThickness)
        const strokeWidth = typeof style?.stroke === 'object' ? (style.stroke as any).width : 0;
        const legacyStrokeThickness = (style as any).strokeThickness || 0;
        const strokeThickness = strokeWidth || legacyStrokeThickness;
        const hasStroke = style?.stroke && strokeThickness > 0;

        let { ascent } = fontProperties;

        // DON'T add stroke to individual segment ascent - stroke should not affect baseline!
        // All text (stroked or not) should sit on the same baseline.
        // Stroke only affects line height (calculated in tallestAscent above)

        // For sprites, use their height as ascent
        if (isSpriteToken(segment)) {
          const imgDisplay = segment.style[IMG_DISPLAY_PROPERTY];
          if (imgDisplay === 'icon') {
            // For icons, use fontProperties.ascent which was calculated based on the
            // surrounding text's font metrics. This ensures icons align with text baseline.
            // The icon height is already scaled to match the font size in calculateTokens
            ascent = fontProperties.ascent;
          } else {
            // For non-icon images (regular inline images), use the full height as ascent
            // This maintains v6 behavior
            ascent = segment.bounds.height;
          }
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

            // CRITICAL: When text has stroke, PIXI includes the stroke in the rendered bounds
            // The stroke extends equally above and below the text (strokeThickness/2 each direction)
            // Since we added stroke to bounds.height, the bounds are taller by strokeThickness
            // This extra height is split: half above the ascent, half below the descent
            // So we need to subtract strokeThickness/2 to position the text baseline correctly
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
    // Don't use whitespace or newline tokens to determine line height
    // This prevents default style's font size from affecting line height at wrap boundaries
    if (!token || isWhitespaceToken(token) || isNewlineToken(token)) {
      return;
    }

    const fontSize = token?.fontProperties?.fontSize ?? 0;
    const height = token?.bounds?.height ?? 0;

    // Don't include lineSpacing in the max - it should be added separately when moving to next line
    tallestHeightInLine = Math.max(tallestHeightInLine, fontSize);
    tallestHeightInLine = Math.max(tallestHeightInLine, height);
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

      // Remove stroke from sizer style to avoid PIXI v8 errors
      // but keep track of it for manual adjustments
      // Support both PIXI v8 format (stroke.width) and legacy format (strokeThickness)
      const strokeWidth = typeof (sizerStyle as any).stroke === 'object' ? (sizerStyle as any).stroke.width : 0;
      const legacyStrokeThickness = (sizerStyle as any).strokeThickness || 0;
      const strokeThickness = strokeWidth || legacyStrokeThickness;
      delete (sizerStyle as any).stroke;
      delete (sizerStyle as any).strokeThickness;

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

          // DON'T add stroke to fontProperties.ascent here!
          // The ascent is used for baseline calculation and should be the font's natural ascent
          // Stroke will be accounted for when calculating line height in verticalAlignInLines

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
            let height = fontProperties.fontSize;

            // CRITICAL: Add stroke to whitespace height so spaces align with stroked text
            // Without this, spaces inside stroked tags would be positioned higher than the text
            if (strokeThickness && strokeThickness > 0) {
              height += strokeThickness;
            }

            bounds = new PIXI.Rectangle(0, 0, spaceWidth, height);

          } else {
            // Use a fresh sizer instance for measurement
            const measureSizer = new PIXI.Text({
              text: localSizer.text,
              style: { ...localSizer.style } as any
            });
            measureSizer.scale.set(localSizer.scale.x, localSizer.scale.y);
            bounds = rectFromContainer(measureSizer);

            // Add stroke width to measurements since we removed it from the sizer
            // PIXI measures text including stroke, so we need to add it back
            if (strokeThickness && strokeThickness > 0) {
              bounds.width += strokeThickness;
              bounds.height += strokeThickness;
            }
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

          // For whitespace with stroke, we should NOT reduce the width
          // The whitespace needs to maintain proper spacing between stroked words
          // Previously we were subtracting stroke width from whitespace which caused
          // stroked words like "debug" and "mode" to overlap


          return convertedToken;
        });

        output = output.concat(textTokens);
      } else if (token instanceof PIXI.Sprite) {
        const sprite = token;
        const imgDisplay = style[IMG_DISPLAY_PROPERTY];
        // const isBlockImage = imgDisplay === "block";
        const isIcon = imgDisplay === "icon";

        // For icons, we need to measure text properties with actual text
        // Empty text gives incorrect font metrics
        if (localSizer.text === "") {
          localSizer.text = "Mg"; // Use Mg to get proper ascent/descent
        }

        // Debug: Check what localSizer style has

        fontProperties = { ...getFontPropertiesOfText(localSizer, true) };

        // Icons scale based on the font's natural metrics
        // Stroke is handled in verticalAlignInLines for line height calculation

        if (isIcon) {
          // Set to minimum of 1 to avoid devide by zero.
          // if it's height is zero or one it probably hasn't loaded yet.
          // It will get refreshed after it loads.
          const h = Math.max(sprite.height, 1);

          if (h > 1 && sprite.scale.y === 1) {
            const { iconScale = 1.0 } = style;
            // Use fontSize directly for more consistent scaling
            // The ascent measurement is too small in PIXI v8 compared to v6
            const effectiveFontSize = fontProperties.fontSize || 20;
            const ratio =
              (effectiveFontSize / h) * ICON_SCALE_BASE * iconScale;
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
