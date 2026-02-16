import * as PIXI from "pixi.js";
import { Glyphs } from "../src/Glyphs";
import { TextStyleSet } from "../src/types";

/**
 * These tests verify whether PIXI v8 canvas text textures leak when
 * Glyphs instances are updated or destroyed.
 *
 * The PIXI v8 cleanup chain should work like this:
 *   text.destroy() -> ViewContainer.unload() -> emit("unload")
 *   -> GCManagedHash.remove() -> CanvasTextPipe.onTextUnload()
 *   -> CanvasTextSystem.decreaseReferenceCount()
 *   -> when count hits 0, texture returned to pool & _activeTextures[key] = null
 *
 * These tests detect whether that chain is actually working by counting
 * non-null entries in renderer.canvasText._activeTextures after various
 * operations.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CanvasTextSystemInternal = any;

function getActiveTextureCount(renderer: PIXI.Renderer): number {
  const canvasText = (renderer as CanvasTextSystemInternal).canvasText;
  const activeTextures = canvasText._activeTextures;
  let count = 0;
  for (const key in activeTextures) {
    if (activeTextures[key] !== null) {
      count++;
    }
  }
  return count;
}

function getActiveTextureKeys(renderer: PIXI.Renderer): string[] {
  const canvasText = (renderer as CanvasTextSystemInternal).canvasText;
  const activeTextures = canvasText._activeTextures;
  const keys: string[] = [];
  for (const key in activeTextures) {
    if (activeTextures[key] !== null) {
      keys.push(key);
    }
  }
  return keys;
}

describe("Canvas text texture memory management", () => {
  let app: PIXI.Application;

  beforeAll(async () => {
    app = new PIXI.Application();
    await app.init({
      width: 400,
      height: 300,
      // Use webgl or webgpu — electron supports canvas rendering
    });
  });

  afterAll(() => {
    app.destroy(true);
  });

  const style: TextStyleSet = {
    default: {
      fontSize: 14,
      fontFamily: "arial",
    },
    b: { fontWeight: "bold" },
  };

  function renderApp() {
    app.renderer.render({ container: app.stage });
  }

  describe("Test A: Active textures after repeated update() calls", () => {
    it("should not accumulate textures when text content changes between renders", () => {
      const glyphs = new Glyphs("Initial text", style);
      app.stage.addChild(glyphs);
      renderApp();

      const baselineCount = getActiveTextureCount(app.renderer);

      // Update text 10 times, rendering between each
      for (let i = 0; i < 10; i++) {
        glyphs.text = `Updated text ${i} - ${Math.random()}`;
        renderApp();
      }

      const afterUpdatesCount = getActiveTextureCount(app.renderer);

      // There should only be textures for the CURRENT text, not all 10 previous ones.
      // Allow some tolerance — the current text may have multiple text fields.
      // But it should NOT grow by 10+ textures (one per update).
      expect(afterUpdatesCount).toBeLessThanOrEqual(baselineCount + 5);

      // Cleanup
      app.stage.removeChild(glyphs);
      glyphs.destroy();
      renderApp();
    });
  });

  describe("Test B: Active textures after destroy()", () => {
    it("should clean up textures when a Glyphs instance is destroyed", () => {
      // Render once to establish a stable baseline
      renderApp();
      const baselineCount = getActiveTextureCount(app.renderer);

      const glyphs = new Glyphs("Text to <b>destroy</b>", style);
      app.stage.addChild(glyphs);
      renderApp();

      const withGlyphsCount = getActiveTextureCount(app.renderer);
      // We should have MORE active textures now (the rendered text)
      expect(withGlyphsCount).toBeGreaterThan(baselineCount);

      // Now destroy
      app.stage.removeChild(glyphs);
      glyphs.destroy();
      renderApp();

      const afterDestroyCount = getActiveTextureCount(app.renderer);

      // Active texture count should return to baseline
      expect(afterDestroyCount).toBe(baselineCount);
    });
  });

  describe("Test C: Texture accumulation across create/destroy cycles", () => {
    it("should not accumulate textures across 20 create/destroy cycles", () => {
      renderApp();
      const baselineCount = getActiveTextureCount(app.renderer);
      const baselineKeys = getActiveTextureKeys(app.renderer);

      for (let i = 0; i < 20; i++) {
        const glyphs = new Glyphs(
          `Cycle ${i}: <b>Hello World</b>`,
          style
        );
        app.stage.addChild(glyphs);
        renderApp();

        app.stage.removeChild(glyphs);
        glyphs.destroy();
        renderApp();
      }

      const afterCyclesCount = getActiveTextureCount(app.renderer);
      const afterCyclesKeys = getActiveTextureKeys(app.renderer);

      // Find any keys that are new (leaked)
      const leakedKeys = afterCyclesKeys.filter(
        (k) => !baselineKeys.includes(k)
      );

      // There should be no leaked textures after all instances are destroyed
      expect(leakedKeys).toHaveLength(0);
      expect(afterCyclesCount).toBe(baselineCount);
    });
  });

  describe("Test D: Texture cleanup with styled text across updates", () => {
    it("should clean up old styled-text textures when styles change", () => {
      renderApp();
      const baselineCount = getActiveTextureCount(app.renderer);

      const dynamicStyle: TextStyleSet = {
        default: { fontSize: 14, fontFamily: "arial" },
        color: { fill: 0xff0000 },
      };

      const glyphs = new Glyphs("Hello <color>Red</color>", dynamicStyle);
      app.stage.addChild(glyphs);
      renderApp();

      // Change text multiple times with different content to generate
      // different texture keys
      const phrases = [
        "Goodbye <color>Blue</color>",
        "Testing <color>Green</color>",
        "Another <color>Change</color>",
        "Final <color>Text</color>",
      ];

      for (const phrase of phrases) {
        glyphs.text = phrase;
        renderApp();
      }

      // Now destroy and verify cleanup
      app.stage.removeChild(glyphs);
      glyphs.destroy();
      renderApp();

      const afterCleanupCount = getActiveTextureCount(app.renderer);
      expect(afterCleanupCount).toBe(baselineCount);
    });
  });
});
