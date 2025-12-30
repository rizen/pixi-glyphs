// modified from: https://github.com/h26k2/capitalize-text/blob/master/index.js
export const capitalize = (str: string): string => {
  const chars = str.split(" ");
  let converted = ``;

  for (let i = 0; i < chars.length; i++) {
    converted += `${chars[i].charAt(0).toUpperCase()}${chars[i].substr(1)} `;
  }

  return converted.trim();
};

// Returns true if the string is a number string otherwise false.
export const stringIsNumber = (s: string): boolean =>
  s.trim().search(/^-?[0-9]*\.?[0-9]+$/) === 0;

// Returns true if the string is only whitespace and nothing else.
export const isOnlyWhitespace = (s: string): boolean => s.search(/^\s+$/) === 0;

// Placeholders for escaped tag characters
const ESCAPE_LT = "__ESCAPED_LT__";
const ESCAPE_GT = "__ESCAPED_GT__";
const ESCAPE_BACKSLASH = "__ESCAPED_BACKSLASH__";

/**
 * Replace escaped tag characters (\<, \>, \\) with placeholders.
 * This should be called before tag parsing to protect escaped characters.
 */
export const escapeTagCharacters = (input: string): string => {
  return input
    .replace(/\\\\/g, ESCAPE_BACKSLASH) // \\ -> placeholder (must be first)
    .replace(/\\</g, ESCAPE_LT) // \< -> placeholder
    .replace(/\\>/g, ESCAPE_GT); // \> -> placeholder
};

/**
 * Restore placeholders back to actual characters.
 * This should be called after tag parsing to restore escaped characters.
 */
export const unescapeTagCharacters = (input: string): string => {
  return input
    .replace(/__ESCAPED_LT__/g, "<")
    .replace(/__ESCAPED_GT__/g, ">")
    .replace(/__ESCAPED_BACKSLASH__/g, "\\");
};
