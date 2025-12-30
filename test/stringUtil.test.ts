import { isOnlyWhitespace } from "./../src/stringUtil";
import * as stringUtil from "../src/stringUtil";
import {
  escapeTagCharacters,
  unescapeTagCharacters,
} from "../src/stringUtil";

describe("srtingUtil", () => {
  describe("capitalize()", () => {
    it("should capitalize the first letter of a string.", () => {
      expect(stringUtil.capitalize("test")).toBe("Test");
    });
  });

  describe("isOnlyWhitespace()", () => {
    it("Should return true if all the text is whitespace.", () => {
      expect(isOnlyWhitespace(" ")).toBeTruthy();
      expect(isOnlyWhitespace("  ")).toBeTruthy();
      expect(isOnlyWhitespace("\t")).toBeTruthy();
      expect(isOnlyWhitespace("\n")).toBeTruthy();
      expect(isOnlyWhitespace("\n \t \n")).toBeTruthy();
    });
    it("Should return false for strings containing non-whitespace", () => {
      expect(isOnlyWhitespace("a")).toBeFalsy();
      expect(isOnlyWhitespace(" a")).toBeFalsy();
      expect(isOnlyWhitespace("\n a")).toBeFalsy();
      expect(isOnlyWhitespace("a ")).toBeFalsy();
    });
    it("Should return false for empty strings", () => {
      expect(isOnlyWhitespace("")).toBeFalsy();
    });
  });

  describe("stringIsNumber()", () => {
    const f = stringUtil.stringIsNumber;
    it("Should return true if the string is a number.", () => {
      expect(f("1")).toBeTruthy();
      expect(f("100")).toBeTruthy();
    });
    it("Should return true if the first char is -.", () => {
      expect(f("-1")).toBeTruthy();
      expect(f("-100")).toBeTruthy();
    });
    it("Should return true if there is a single period followed by another number", () => {
      expect(f("1.0")).toBeTruthy();
      expect(f("123.321")).toBeTruthy();
      expect(f("0.5")).toBeTruthy();
      expect(f(".1")).toBeTruthy();
      expect(f("-.1")).toBeTruthy();
      expect(f("-11.11")).toBeTruthy();
    });
    it("Should trim whitespace.", () => {
      expect(f("  1")).toBeTruthy();
      expect(f("100   ")).toBeTruthy();
      expect(f(" 123 ")).toBeTruthy();
      expect(
        f(`
100
`)
      ).toBeTruthy();
      expect(f(" 1 2 3 ")).toBeFalsy();
    });
    it("Should return false if empty or all whitespace.", () => {
      expect(f("")).toBeFalsy();
      expect(f(" ")).toBeFalsy();
    });
    it("Should return false if there are any non-numbers.", () => {
      expect(f("123f")).toBeFalsy();
      expect(f("100%")).toBeFalsy();
      expect(f("$100")).toBeFalsy();
    });
    it("Should return false if there is whitespace in the middle.", () => {
      expect(f("1 2")).toBeFalsy();
    });
    it("Should return false if there are multiple periods.", () => {
      expect(f("1.2.3")).toBeFalsy();
    });
    it("Should return false if there are negatives in the middle.", () => {
      expect(f("-1-1")).toBeFalsy();
      expect(f("1-1")).toBeFalsy();
      expect(f("1-")).toBeFalsy();
    });
  });

  describe("escapeTagCharacters()", () => {
    it("Should replace \\< with placeholder", () => {
      expect(escapeTagCharacters("\\<")).toBe("__ESCAPED_LT__");
      expect(escapeTagCharacters("Hello \\<b\\>")).toBe(
        "Hello __ESCAPED_LT__b__ESCAPED_GT__"
      );
    });
    it("Should replace \\> with placeholder", () => {
      expect(escapeTagCharacters("\\>")).toBe("__ESCAPED_GT__");
    });
    it("Should replace \\\\ with placeholder", () => {
      expect(escapeTagCharacters("\\\\")).toBe("__ESCAPED_BACKSLASH__");
    });
    it("Should handle multiple escapes", () => {
      expect(escapeTagCharacters("\\<\\>\\<\\>")).toBe(
        "__ESCAPED_LT____ESCAPED_GT____ESCAPED_LT____ESCAPED_GT__"
      );
    });
    it("Should handle escaped backslash before bracket", () => {
      expect(escapeTagCharacters("\\\\<b>")).toBe("__ESCAPED_BACKSLASH__<b>");
    });
    it("Should not affect unescaped brackets", () => {
      expect(escapeTagCharacters("<b>text</b>")).toBe("<b>text</b>");
    });
  });

  describe("unescapeTagCharacters()", () => {
    it("Should restore < from placeholder", () => {
      expect(unescapeTagCharacters("__ESCAPED_LT__")).toBe("<");
    });
    it("Should restore > from placeholder", () => {
      expect(unescapeTagCharacters("__ESCAPED_GT__")).toBe(">");
    });
    it("Should restore \\ from placeholder", () => {
      expect(unescapeTagCharacters("__ESCAPED_BACKSLASH__")).toBe("\\");
    });
    it("Should restore multiple placeholders", () => {
      expect(
        unescapeTagCharacters(
          "Hello __ESCAPED_LT__b__ESCAPED_GT__world"
        )
      ).toBe("Hello <b>world");
    });
    it("Should be the inverse of escapeTagCharacters", () => {
      const input = "Hello \\<b\\> world \\\\<real>";
      expect(unescapeTagCharacters(escapeTagCharacters(input))).toBe(
        "Hello <b> world \\<real>"
      );
    });
  });
});
