// Demo configurations extracted from the original demo

const demos = {
  basic: {
    title: "Basics",
    description: "Basic multiline and multistyle text with Glyphs",
    code: `const text = \`Let's make some
<ml>multiline</ml>
and <ms>multistyle</ms> text for
<pixi>Pixi.js!</pixi>\`;

const styles = {
  default: {
    fontSize: "24px",
    fill: "#cccccc",
    align: "center"
  },
  ml: {
    fontStyle: "italic",
    color: "#ff8888",
    fontSize: "40px"
  },
  ms: {
    fontWeight: "bold",
    fill: "#4488ff",
    fontSize: "40px"
  },
  pixi: {
    fontSize: "64px",
    fill: "#efefef"
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `Let's make some
<ml>multiline</ml>
and <ms>multistyle</ms> text for
<pixi>Pixi.js!</pixi>`;

      const styles = {
        default: {
          fontSize: "24px",
          fill: "#cccccc",
          align: "center"
        },
        ml: {
          fontStyle: "italic",
          color: "#ff8888",
          fontSize: "40px"
        },
        ms: {
          fontWeight: "bold",
          fill: "#4488ff",
          fontSize: "40px"
        },
        pixi: {
          fontSize: "64px",
          fill: "#efefef"
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {});
    }
  },

  img: {
    title: "Inline Images",
    description: "Embed images directly in your text with inline display options",
    code: `// Load textures first in Pixi v8
await PIXI.Assets.load(['icon.png', 'doot.png', '100.png']);

const thinking = new PIXI.Sprite(PIXI.Texture.from("icon.png"));
const doot = PIXI.Texture.from("doot.png");
const url = "100.png";

const text = \`<h2>Inline Images!</h2>

<img imgSrc="doot" imgDisplay="inline" /> <img imgSrc="thinking" imgDisplay="inline" />

Make it an icon <thinking imgDisplay="icon" /> with <code>imgDisplay="icon"</code>!

Control the icon size with <code>iconScale=</code> <thinking imgDisplay="icon" /><thinking imgDisplay="icon" iconScale="1.5" /><thinking imgDisplay="icon" iconScale="2" /><thinking imgDisplay="icon" iconScale="1.5" /><thinking imgDisplay="icon" />

You can even load images from a URL <url /> (if you can figure out the CORS stuff!)\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "20px",
    fill: "#FFFFCC",
    align: "center",
    lineSpacing: 0,
    valign: "baseline",
    iconScale: 1
  },
  h2: {
    fontSize: 36,
    fill: "#44CC99"
  },
  code: {
    fontFamily: "monospace",
    color: "#66FF00"
  },
  img: {},
  doot: {},
  thinking: {},
  url: { imgDisplay: "icon" }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, {
  imgMap: { thinking, doot, url }
});`,
    init: async function() {
      // Load textures asynchronously
      await PIXI.Assets.load(['icon.png', 'doot.png', '100.png']);

      const thinking = new PIXI.Sprite(PIXI.Texture.from("icon.png"));
      const doot = PIXI.Texture.from("doot.png");
      const url = "100.png";

      const text = `<h2>Inline Images!</h2>

<img imgSrc="doot" imgDisplay="inline" /> <img imgSrc="thinking" imgDisplay="inline" />

Make it an icon <thinking imgDisplay="icon" /> with <code>imgDisplay="icon"</code>!

Control the icon size with <code>iconScale=</code> <thinking imgDisplay="icon" /><thinking imgDisplay="icon" iconScale="1.5" /><thinking imgDisplay="icon" iconScale="2" /><thinking imgDisplay="icon" iconScale="1.5" /><thinking imgDisplay="icon" />

You can even load images from a URL <url /> (if you can figure out the CORS stuff!)`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "20px",
          fill: "#FFFFCC",
          align: "center",
          lineSpacing: 0,
          valign: "baseline",
          iconScale: 1
        },
        h2: {
          fontSize: 36,
          fill: "#44CC99"
        },
        code: {
          fontFamily: "monospace",
          color: "#66FF00"
        },
        img: {},
        doot: {},
        thinking: {},
        url: { imgDisplay: "icon" }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {
        imgMap: { thinking, doot, url }
      });
    }
  },

  emoji: {
    title: "Emoji",
    description: "Support for emoji rendering with wrapEmoji option",
    code: `const text = \`<h2>🙆🏾‍♀️ EMOJI 🆗*</h2>
<warning>*But unfortunately, will render differently on different browsers & OSes</warning>

The 🏃‍♀️, 🟫, 🦊 jumps ⤵️ the 💤 🐶.

<big>💯👯‍♂️🔥</big>

<small>🐞🐛🕷🐜🐞🐛🕷🐜🐞🐛🕷🐜</small>\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: 26,
    fill: "#FFFFCC",
    align: "center",
    lineSpacing: 0,
    valign: "baseline"
  },
  h2: {
    fontSize: 48,
    fontWeight: 700
  },
  big: {
    fontSize: 150
  },
  small: {
    fontSize: 24
  },
  warning: {
    fontStyle: "italic",
    fontSize: 14,
    fill: "#ff8888"
  },
  __EMOJI__: {
    fontSize: "100%"
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, {
  wrapEmoji: true
});`,
    init: function() {
      const text = `<h2>🙆🏾‍♀️ EMOJI 🆗*</h2>
<warning>*But unfortunately, will render differently on different browsers & OSes</warning>

The 🏃‍♀️, 🟫, 🦊 jumps ⤵️ the 💤 🐶.

<big>💯👯‍♂️🔥</big>

<small>🐞🐛🕷🐜🐞🐛🕷🐜🐞🐛🕷🐜</small>`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: 26,
          fill: "#FFFFCC",
          align: "center",
          lineSpacing: 0,
          valign: "baseline"
        },
        h2: {
          fontSize: 48,
          fontWeight: 700
        },
        big: {
          fontSize: 150
        },
        small: {
          fontSize: 24
        },
        warning: {
          fontStyle: "italic",
          fontSize: 14,
          fill: "#ff8888"
        },
        __EMOJI__: {
          fontSize: "100%"
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, { wrapEmoji: true });
    }
  },

  align: {
    title: "Alignment",
    description: "Text alignment options: left, right, center, and justify",
    code: `const text = \`You can align text left, right, center or even justify.\\n\\nHowever, alignment can only be set on the default style.\`;

const baseStyle = {
  default: {
    wordWrapWidth: 250
  },
  b: {
    fontWeight: "700",
    fill: "white"
  }
};

// Create four text objects with different alignments
const Glyphs = window.Glyphs?.default || window.Glyphs; let left = new Glyphs(
  text.replace("left", "<b>left</b>"),
  {
    ...baseStyle,
    default: { ...baseStyle.default, align: "left", fill: "teal" }
  }
);

let right = new Glyphs(
  text.replace("right", "<b>right</b>"),
  {
    ...baseStyle,
    default: { ...baseStyle.default, align: "right", fill: "orange" }
  }
);

let center = new Glyphs(
  text.replace("center", "<b>center</b>"),
  {
    ...baseStyle,
    default: { ...baseStyle.default, align: "center", fill: "yellow" }
  }
);

let justify = new Glyphs(
  text.replace("justify", "<b>justify</b>"),
  {
    ...baseStyle,
    default: { ...baseStyle.default, align: "justify", fill: "pink" }
  }
);`,
    init: function() {
      const alignText = `You can align text left, right, center or even justify.\n\nHowever, alignment can only be set on the default style.`;
      const alignStyle = {
        default: {
          wordWrapWidth: 250
        },
        b: {
          fontWeight: "700",
          fill: "white"
        }
      };

      const texts = [];

      const Glyphs = window.Glyphs?.default || window.Glyphs; let left = new Glyphs(
        alignText.replace("left", "<b>left</b>"),
        {
          ...alignStyle,
          default: {
            ...alignStyle.default,
            align: "center",
            fill: "teal"
          }
        }
      );
      texts.push(left);

      let right = new Glyphs(
        alignText.replace("right", "<b>right</b>"),
        {
          ...alignStyle,
          default: {
            ...alignStyle.default,
            align: "right",
            fill: "orange"
          }
        }
      );
      right.x = 300;
      texts.push(right);

      let center = new Glyphs(
        alignText.replace("center", "<b>center</b>"),
        {
          ...alignStyle,
          default: {
            ...alignStyle.default,
            align: "center",
            fill: "yellow"
          }
        }
      );
      center.y = 300;
      texts.push(center);

      let justify = new Glyphs(
        alignText.replace("justify", "<b>justify</b>"),
        {
          ...alignStyle,
          default: {
            ...alignStyle.default,
            align: "justify",
            fill: "pink"
          }
        }
      );
      justify.x = 300;
      justify.y = 300;
      texts.push(justify);

      return texts;
    }
  },

  valign: {
    title: "Vertical Alignment",
    description: "Control vertical alignment of text: top, middle, bottom, baseline",
    code: `// Load texture first in Pixi v8
await PIXI.Assets.load('./icon.png');

const valignImg = new PIXI.Sprite(PIXI.Texture.from("./icon.png"));

const text = \`<top><code>Top</code> <small>Vertical</small> <img/> Alignment.</top>

<middle><code>Middle</code> <small>Vertical</small> <img /> Alignment.</middle>

<bottom><code>Bottom</code> <small>Vertical</small> <img/> Alignment.</bottom>

<baseline><code>Baseline</code> <small>Vertical</small> <img/> Alignment.</baseline>\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#cccccc",
    align: "center"
  },
  code: {
    fontFamily: "Courier",
    fontSize: "36px",
    fill: "#ff8888"
  },
  small: { fontSize: "14px" },
  top: { valign: "top" },
  middle: { valign: "middle" },
  bottom: { valign: "bottom" },
  baseline: { valign: "baseline" },
  img: { imgSrc: "valignImg", imgDisplay: "icon" }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, {
  imgMap: { valignImg }
});`,
    init: async function() {
      // Load texture first in Pixi v8
      await PIXI.Assets.load('./icon.png');

      const valignImg = new PIXI.Sprite(PIXI.Texture.from("./icon.png"));

      const text = `<top><code>Top</code> <small>Vertical</small> <img/> Alignment.</top>

<middle><code>Middle</code> <small>Vertical</small> <img /> Alignment.</middle>

<bottom><code>Bottom</code> <small>Vertical</small> <img/> Alignment.</bottom>

<baseline><code>Baseline</code> <small>Vertical</small> <img/> Alignment.</baseline>`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#cccccc",
          align: "center"
        },
        code: {
          fontFamily: "Courier",
          fontSize: "36px",
          fill: "#ff8888"
        },
        small: { fontSize: "14px" },
        top: { valign: "top" },
        middle: { valign: "middle" },
        bottom: { valign: "bottom" },
        baseline: { valign: "baseline" },
        img: { imgSrc: "valignImg", imgDisplay: "icon" }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {
        imgMap: { valignImg }
      });
    }
  },

  textTransform: {
    title: "Text Transformations",
    description: "Transform text with uppercase, lowercase, capitalize, and small-caps",
    code: `const text = \`<h1>Text transformations:</h1>
<code>textTransform: "lowercase"</code>
<lower>lowerCASE text</lower>
<code>textTransform: "uppercase"</code>
<upper>upperCASE text</upper>
<code>textTransform: "capitalize"</code>
<capitalize>capitalized text</capitalize>
<code>fontVariant: "small-caps"</code>
<smallcaps>Small Caps</smallcaps>\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#FFCC22",
    align: "center"
  },
  h1: { fontSize: "36px", fill: "#CCCCCC" },
  code: { fontFamily: "courier", fontSize: 12, fill: "#FFFFFF" },
  upper: { textTransform: "uppercase" },
  lower: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  smallcaps: { fontVariant: "small-caps" }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `<h1>Text transformations:</h1>
<code>textTransform: "lowercase"</code>
<lower>lowerCASE text</lower>
<code>textTransform: "uppercase"</code>
<upper>upperCASE text</upper>
<code>textTransform: "capitalize"</code>
<capitalize>capitalized text</capitalize>
<code>fontVariant: "small-caps"</code>
<smallcaps>Small Caps</smallcaps>`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#FFCC22",
          align: "center"
        },
        h1: { fontSize: "36px", fill: "#CCCCCC" },
        code: { fontFamily: "courier", fontSize: 12, fill: "#FFFFFF" },
        upper: { textTransform: "uppercase" },
        lower: { textTransform: "lowercase" },
        capitalize: { textTransform: "capitalize" },
        smallcaps: { fontVariant: "small-caps" }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles);
    }
  },

  underline: {
    title: "Text Decorations",
    description: "Underline, overline, and strikethrough text decorations",
    code: `const text = \`<h1>Underline, overline and strikethru:</h1>
<code>textDecoration: "underline"</code>
<underline>A cumque ea quia vel.</underline>

<code>textDecoration: "overline"</code>
<overline>Est labore quibusdam laborum facere.</overline>

<code>textDecoration: "line-through"</code>
<lineThrough>Veritatis aut ducimus occaecati illo.</lineThrough>

<code>underlineThickness, underlineOffset, underlineColor</code>
<underlineCustom>Est labore quibusdam laborum facere.</underlineCustom>

<code>textDecoration: "underline overline"</code>
<underOver>maiores fugiat quae voluptas eaque modi.</underOver>

<code>nested tags (note, textDecoration will override in nested styles)</code>
<overline><underlineCustom><purple>maiores fugiat quae voluptas eaque modi.</purple></underlineCustom></overline>

<code>multiple custom decorations</code>
<custom>consequuntur odit in excepturi perspiciatis dolores commodi aliquam exercitationem at</custom>\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "22px",
    align: "center"
  },
  h1: { fill: "#CCCCCC" },
  code: { fontFamily: "courier", fontSize: 12, fill: "#FFFFFF" },
  purple: { fill: "#6600FF" },
  underline: { textDecoration: "underline", fill: "#FF0000" },
  overline: { textDecoration: "overline", fill: "#FFFF00" },
  lineThrough: { textDecoration: "line-through", fill: "#0066FF" },
  underOver: {
    textDecoration: "underline overline",
    fill: "#FF9900"
  },
  underlineCustom: {
    underlineThickness: 3,
    underlineOffset: 4,
    underlineColor: "#FF00FF",
    fill: "#66FF66"
  },
  custom: {
    fill: "#FFCCFF",
    textStyle: "italic",
    underlineThickness: 4,
    underlineColor: "#FFFF00",
    underlineOffset: 5,
    overlineColor: "#00FFFF",
    overlineThickness: 4,
    overlineOffset: -3,
    lineThroughThickness: 2,
    lineThroughColor: "#FF0000"
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, {
  drawWhitespace: true,
  overdrawDecorations: 2
});`,
    init: function() {
      const text = `<h1>Underline, overline and strikethru:</h1>
<code>textDecoration: "underline"</code>
<underline>A cumque ea quia vel.</underline>

<code>textDecoration: "overline"</code>
<overline>Est labore quibusdam laborum facere.</overline>

<code>textDecoration: "line-through"</code>
<lineThrough>Veritatis aut ducimus occaecati illo.</lineThrough>

<code>underlineThickness, underlineOffset, underlineColor</code>
<underlineCustom>Est labore quibusdam laborum facere.</underlineCustom>

<code>textDecoration: "underline overline"</code>
<underOver>maiores fugiat quae voluptas eaque modi.</underOver>

<code>nested tags (note, textDecoration will override in nested styles)</code>
<overline><underlineCustom><purple>maiores fugiat quae voluptas eaque modi.</purple></underlineCustom></overline>

<code>multiple custom decorations</code>
<custom>consequuntur odit in excepturi perspiciatis dolores commodi aliquam exercitationem at</custom>`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "22px",
          align: "center"
        },
        h1: { fill: "#CCCCCC" },
        code: { fontFamily: "courier", fontSize: 12, fill: "#FFFFFF" },
        purple: { fill: "#6600FF" },
        underline: { textDecoration: "underline", fill: "#FF0000" },
        overline: { textDecoration: "overline", fill: "#FFFF00" },
        lineThrough: { textDecoration: "line-through", fill: "#0066FF" },
        underOver: {
          textDecoration: "underline overline",
          fill: "#FF9900"
        },
        underlineCustom: {
          underlineThickness: 3,
          underlineOffset: 4,
          underlineColor: "#FF00FF",
          fill: "#66FF66"
        },
        custom: {
          fill: "#FFCCFF",
          textStyle: "italic",
          underlineThickness: 4,
          underlineColor: "#FFFF00",
          underlineOffset: 5,
          overlineColor: "#00FFFF",
          overlineThickness: 4,
          overlineOffset: -3,
          lineThroughThickness: 2,
          lineThroughColor: "#FF0000"
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {
        drawWhitespace: true,
        overdrawDecorations: 2
      });
    }
  },

  attributes: {
    title: "Attributes",
    description: "Override tag styles with inline attributes",
    code: `const text = \`You can add <em>attributes</em> to your tags!\\nThey will <em fontStyle="italic">overwrite</em> the <em fill="#FF8822">values</em> for any existing <em fontFamily="Courier" fill="#FFFF00" fontWeight="400">tag styles</em>.\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#cccccc",
    align: "center"
  },
  em: {
    fill: "#4488FF",
    fontWeight: 700
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `You can add <em>attributes</em> to your tags!\nThey will <em fontStyle="italic">overwrite</em> the <em fill="#FF8822">values</em> for any existing <em fontFamily="Courier" fill="#FFFF00" fontWeight="400">tag styles</em>.`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#cccccc",
          align: "center"
        },
        em: {
          fill: "#4488FF",
          fontWeight: 700
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {});
    }
  },

  nested: {
    title: "Nesting Tags",
    description: "Nest tags deeply to combine multiple styles",
    code: `const text = \`You can <outline>nest <b>tags <red>as <i>deeply <thicker>as you'd <large>like, <blue>dude!</blue></large></thicker></i></red></b></outline>\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#cccccc",
    wordWrapWidth: 500,
    wordWrap: true,
    align: "center",
    valign: "baseline"
  },
  outline: { stroke: "#000000", strokeThickness: 2 },
  b: { fontWeight: 700 },
  red: { fill: "#ff8888" },
  blue: { fill: "#8888FF" },
  i: { fontStyle: "italic" },
  thicker: { stroke: "#002266", strokeThickness: 10 },
  large: { fontSize: "36px" }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `You can <outline>nest <b>tags <red>as <i>deeply <thicker>as you'd <large>like, <blue>dude!</blue></large></thicker></i></red></b></outline>`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#cccccc",
          wordWrapWidth: 500,
          wordWrap: true,
          align: "center",
          valign: "baseline"
        },
        outline: { stroke: "#000000", strokeThickness: 2 },
        b: { fontWeight: 700 },
        red: { fill: "#ff8888" },
        blue: { fill: "#8888FF" },
        i: { fontStyle: "italic" },
        thicker: { stroke: "#002266", strokeThickness: 10 },
        large: { fontSize: "36px" }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles);
    }
  },

  spacing: {
    title: "Spacing",
    description: "Interactive demo for line, letter, and paragraph spacing. Adjust the sliders to see changes.",
    code: `const text = "You can <narrow>set line and letter spacing</narrow> to <wide>give your text some drama.</wide>\\nThis line demonstrates lineSpacing between lines in the same paragraph.\\n\\nNotice the extra spacing between paragraphs from paragraphSpacing.\\nParagraph spacing only applies between different paragraphs.";

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#cccccc",
    letterSpacing: 0,
    wordWrap: true,
    wordWrapWidth: 500
  },
  narrow: {
    fill: "#FFCC00",
    letterSpacing: -2
  },
  wide: {
    fill: "#CCFF00",
    letterSpacing: 10
  }
};

const options = {
  lineSpacing: 15,
  paragraphSpacing: 40
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, options);`,
    init: function() {
      const text = "You can <narrow>set line and letter spacing</narrow> to <wide>give your text some drama.</wide>\nThis line demonstrates lineSpacing between lines in the same paragraph.\n\nNotice the extra spacing between paragraphs from paragraphSpacing.\nParagraph spacing only applies between different paragraphs.";

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#cccccc",
          letterSpacing: 0,
          wordWrap: true,
          wordWrapWidth: 500
        },
        narrow: {
          fill: "#FFCC00",
          letterSpacing: -2
        },
        wide: {
          fill: "#CCFF00",
          letterSpacing: 10
        }
      };

      const options = {
        lineSpacing: 15,
        paragraphSpacing: 40
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs;
      const glyphs = new Glyphs(text, styles, options);

      // Create interactive controls
      setTimeout(() => {
        const controlsDiv = document.createElement('div');
        controlsDiv.style.cssText = 'margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; color: white; font-family: Arial; font-size: 14px;';
        controlsDiv.innerHTML = `
          <div style="margin-bottom: 10px;">
            <label>Letter Spacing: <span id="letter-value">0</span>px</label><br>
            <input type="range" id="letter-spacing" min="-5" max="20" value="0" style="width: 300px;">
          </div>
          <div style="margin-bottom: 10px;">
            <label>Line Spacing: <span id="line-value">15</span>px</label><br>
            <input type="range" id="line-spacing" min="0" max="50" value="15" style="width: 300px;">
          </div>
          <div style="margin-bottom: 10px;">
            <label>Paragraph Spacing: <span id="paragraph-value">40</span>px</label><br>
            <input type="range" id="paragraph-spacing" min="0" max="100" value="40" style="width: 300px;">
          </div>
        `;

        const canvasSection = document.querySelector('.canvas-section');
        if (canvasSection) {
          canvasSection.appendChild(controlsDiv);

          // Letter spacing slider
          const letterSlider = document.getElementById('letter-spacing');
          const letterValue = document.getElementById('letter-value');
          letterSlider.addEventListener('input', (e) => {
            const letterSpacing = parseInt(e.target.value);
            letterValue.textContent = letterSpacing;

            // Update letterSpacing in default style
            glyphs.setStyleForTag('default', {
              ...glyphs.tagStyles.default,
              letterSpacing: letterSpacing
            });
          });

          // Line spacing slider
          const lineSlider = document.getElementById('line-spacing');
          const lineValue = document.getElementById('line-value');
          lineSlider.addEventListener('input', (e) => {
            const lineSpacing = parseInt(e.target.value);
            lineValue.textContent = lineSpacing;

            // Update lineSpacing in default style
            glyphs.setDefaultStyle({
              ...glyphs.defaultStyle,
              lineSpacing: lineSpacing
            });
          });

          // Paragraph spacing slider
          const paragraphSlider = document.getElementById('paragraph-spacing');
          const paragraphValue = document.getElementById('paragraph-value');
          paragraphSlider.addEventListener('input', (e) => {
            const paragraphSpacing = parseInt(e.target.value);
            paragraphValue.textContent = paragraphSpacing;

            // Update paragraphSpacing in default style
            glyphs.setDefaultStyle({
              ...glyphs.defaultStyle,
              paragraphSpacing: paragraphSpacing
            });
          });
        }
      }, 100);

      return glyphs;
    }
  },

  wrapping: {
    title: "Word Wrapping",
    description: "Control word wrapping and text overflow behavior",
    code: `// With word wrap
const wrappingText = \`Global word wrap and alignment properties are controlled by the "default" style, and can't be overridden by other styles.\`;

const wrappingStyle = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#CC6600",
    wordWrap: true,
    wordWrapWidth: 150,
    align: "right"
  }
};

const wrapping = new (window.Glyphs?.default || window.Glyphs)(wrappingText, wrappingStyle);

// Without word wrap
const nonWrappingText = \`This one doesn't have \\\`wordWrap\\\` so it just keeps going and going and going off the edge!\`;

const nonWrappingStyle = {
  default: {
    fontFamily: "Arial",
    fontSize: "17px",
    fill: "#669900",
    wordWrap: false,
    wordWrapWidth: 150,
    align: "center"
  }
};

const nonWrapping = new Glyphs(nonWrappingText, nonWrappingStyle);`,
    init: function() {
      const Glyphs = window.Glyphs?.default || window.Glyphs;
      const texts = [];

      const wrappingText = `Global word wrap and alignment properties are controlled by the "default" style, and can\'t be overridden by other styles.`;
      const wrappingStyle = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#CC6600",
          wordWrap: true,
          wordWrapWidth: 150,
          align: "right"
        }
      };
      texts.push(new Glyphs(wrappingText, wrappingStyle, {}));

      const nonWrappingText = `This one doesn't have \`wordWrap\` so it just keeps going and going and going off the edge!`;
      const nonWrappingStyle = {
        default: {
          fontFamily: "Arial",
          fontSize: "17px",
          fill: "#669900",
          wordWrap: false,
          wordWrapWidth: 150,
          align: "center"
        }
      };
      const nonWrapping = new Glyphs(nonWrappingText, nonWrappingStyle);
      nonWrapping.y = 300;
      texts.push(nonWrapping);

      return texts;
    }
  },

  fontScaling: {
    title: "Font Scaling",
    description: "Scale font width and height independently",
    code: `const text = \`You can change the scaling of the font:

<b>fontScaleWidth:</b>
75% = <condensed>narrow / condensed</condensed>
125% = <extended>wide / extended</extended>
250% = <superExtended>super extended</superExtended>

<b>fontScaleHeight:</b>
75% = <short>short</short>
125% = <tall>tall</tall>
250% = <superTall>super tall</superTall>\`;

const styles = {
  default: {
    fontFamily: "arial",
    fontSize: 30,
    valign: "baseline",
    fill: "#FFFFFF"
  },
  b: {
    fontWeight: 700,
    fontFamily: "courier"
  },
  condensed: {
    fontScaleWidth: 0.75,
    fill: "#FF8899",
    fontFamily: "georgia"
  },
  extended: {
    fontScaleWidth: 1.25,
    fill: "#9988FF",
    fontFamily: "georgia"
  },
  superExtended: {
    fontScaleWidth: 2.5,
    fill: "#2266FF",
    fontFamily: "georgia"
  },
  tall: {
    fontScaleHeight: 1.25,
    fill: "#88FF99",
    fontFamily: "georgia"
  },
  short: {
    fontScaleHeight: 0.75,
    fill: "#FFFF33",
    fontFamily: "georgia"
  },
  superTall: {
    fontScaleHeight: 2.5,
    fill: "#FF8866",
    fontFamily: "georgia"
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `You can change the scaling of the font:

            <b>fontScaleWidth:</b>
            75% = <condensed>narrow / condensed</condensed>
            125% = <extended>wide / extended</extended>
            250% = <superExtended>super extended</superExtended>

            <b>fontScaleHeight:</b>
            75% = <short>short</short>
            125% = <tall>tall</tall>
            250% = <superTall>super tall</superTall>
            `;

      const styles = {
        default: {
          fontFamily: "arial",
          fontSize: 30,
          valign: "baseline",
          fill: "#FFFFFF"
        },
        b: {
          fontWeight: 700,
          fontFamily: "courier"
        },
        condensed: {
          fontScaleWidth: 0.75,
          fill: "#FF8899",
          fontFamily: "georgia"
        },
        extended: {
          fontScaleWidth: 1.25,
          fill: "#9988FF",
          fontFamily: "georgia"
        },
        superExtended: {
          fontScaleWidth: 2.5,
          fill: "#2266FF",
          fontFamily: "georgia"
        },
        tall: {
          fontScaleHeight: 1.25,
          fill: "#88FF99",
          fontFamily: "georgia"
        },
        short: {
          fontScaleHeight: 0.75,
          fill: "#FFFF33",
          fontFamily: "georgia"
        },
        superTall: {
          fontScaleHeight: 2.5,
          fill: "#FF8866",
          fontFamily: "georgia"
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles);
    }
  },

  breakWords: {
    title: "Break Words",
    description: "Allow line breaks between characters for languages like Chinese",
    code: `const text = \`Use <code>splitStyle: "characters"</code> and <code>breakWords: true</code> to allow line breaks between characters. Can be useful for languages such as chinese.

<big>Selbstständigkeitserklärung</big>

全局设置的<blue>对齐</blue>属性由「默认」来<big>控制</big>。而且不能被<blue>别的样式</blue>所<red>覆盖</red>。\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "16px",
    fill: "#cccccc",
    wordWrap: true,
    wordWrapWidth: 260
  },
  code: { fontFamily: "Courier" },
  blue: {
    fill: 0x4488ff,
    stroke: 0x2244cc,
    fontSize: "24px",
    breakWords: true
  },
  red: { fill: 0xff8888, stroke: 0xcc4444, breakWords: true },
  big: {
    fill: 0x88ff88,
    stroke: 0x44cc44,
    fontSize: "36px",
    breakWords: true
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles);`,
    init: function() {
      const text = `Use <code>splitStyle: "characters"</code> and <code>breakWords: true</code> to allow line breaks between characters. Can be useful for languages such as chinese.

<big>Selbstständigkeitserklärung</big>

全局设置的<blue>对齐</blue>属性由「默认」来<big>控制</big>。而且不能被<blue>别的样式</blue>所<red>覆盖</red>。`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "16px",
          fill: "#cccccc",
          wordWrap: true,
          wordWrapWidth: 260
        },
        code: { fontFamily: "Courier" },
        blue: {
          fill: 0x4488ff,
          stroke: 0x2244cc,
          fontSize: "24px",
          breakWords: true
        },
        red: { fill: 0xff8888, stroke: 0xcc4444, breakWords: true },
        big: {
          fill: 0x88ff88,
          stroke: 0x44cc44,
          fontSize: "36px",
          breakWords: true
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, {});
    }
  },

  debug: {
    title: "Debug Mode",
    description: "Visual debugging tools to understand text layout",
    code: `const text = \`You can use <blue>debug mode</blue> to help you figure out what your text is doing. Include <code>{debug: true} </code> in the options when you create your text.
You can also set <code>debugConsole: true</code> if you want to log information about the text field to the console.\`;

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "24px",
    fill: "#cccccc",
    wordWrap: true,
    wordWrapWidth: 500,
    valign: "baseline"
  },
  blue: {
    fill: "#4488ff",
    stroke: "#2244cc",
    strokeThickness: 4
  },
  code: {
    fontFamily: "Courier",
    fontSize: "36px",
    fill: "#ff8888",
    stroke: "#660000",
    strokeThickness: 8
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, { debug: true });`,
    init: function() {
      const text = `You can use <blue>debug mode</blue> to help you figure out what your text is doing. Include <code>{debug: true} </code> in the options when you create your text.
You can also set <code>debugConsole: true</code> if you want to log information about the text field to the console.`;

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#cccccc",
          wordWrap: true,
          wordWrapWidth: 500,
          valign: "baseline"
        },
        blue: {
          fill: "#4488ff",
          stroke: "#2244cc",
          strokeThickness: 4
        },
        code: {
          fontFamily: "Courier",
          fontSize: "36px",
          fill: "#ff8888",
          stroke: "#660000",
          strokeThickness: 8
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs?.Glyphs; return new Glyphs(text, styles, { debug: true });
    }
  },

  animated: {
    title: "Animation",
    description: "Animate individual characters with splitStyle option",
    code: `const text = "Now have fun making some\\n<blue>B E A U T I F U L</blue>\\n<red>multistyle</red>\\ntext!";

const styles = {
  default: {
    fontFamily: "Arial",
    fontSize: "48px",
    fontWeight: 900,
    fill: "#cccccc",
    strokeThickness: 1,
    stroke: "#aaaaaa",
    dropShadow: true,
    dropShadowBlur: 15,
    dropShadowDistance: 15,
    dropShadowAngle: 0,
    wordWrapWidth: 500,
    lineSpacing: 40,
    align: "center"
  },
  blue: {
    fill: 0x4488ff,
    stroke: 0x2244cc,
    fontSize: 22
  },
  red: { fill: 0xff8888, stroke: 0xcc4444 }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs?.Glyphs)(text, styles, {
  splitStyle: "characters"
});

// Animate with sine wave
const originalYPositions = glyphs.textFields.map((t) => t.y);
let time = 0;

app.ticker.add((delta) => {
  time += delta;
  for (let i = 0; i < glyphs.textFields.length; i++) {
    const text = glyphs.textFields[i];
    const amplitude = 5;
    const frequency = 0.1;
    const phaseOffsetPerLetter = 1;

    text.y = originalYPositions[i] +
      Math.sin(time * frequency + i * phaseOffsetPerLetter) * amplitude;
  }
});`,
    init: function() {
      const text = "Now have fun making some\n<blue>B E A U T I F U L</blue>\n<red>multistyle</red>\ntext!";

      const styles = {
        default: {
          fontFamily: "Arial",
          fontSize: "48px",
          fontWeight: 900,
          fill: "#cccccc",
          strokeThickness: 1,
          stroke: "#aaaaaa",
          dropShadow: true,
          dropShadowBlur: 15,
          dropShadowDistance: 15,
          dropShadowAngle: 0,
          wordWrapWidth: 500,
          lineSpacing: 40,
          align: "center"
        },
        blue: {
          fill: 0x4488ff,
          stroke: 0x2244cc,
          fontSize: 22
        },
        red: {
          fill: 0xff8888,
          stroke: 0xcc4444
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs;
      const glyphs = new Glyphs(text, styles, {
        splitStyle: "characters"
      });
      // Added splitStyle back - no animation yet

      return glyphs;
    },
    animate: function(glyphs, app) {
      // Store original Y positions
      const originalYPositions = [];
      for (let i = 0; i < glyphs.textFields.length; i++) {
        originalYPositions.push(glyphs.textFields[i].y);
      }

      let frameCount = 0;
      app.ticker.add((delta) => {
        frameCount++;

        // Skip first 10 frames to let everything initialize
        if (frameCount <= 10) {
          return;
        }

        // Animate with sine wave
        const time = (frameCount - 10) * 0.05;
        for (let i = 0; i < glyphs.textFields.length; i++) {
          const text = glyphs.textFields[i];
          const amplitude = 10;
          const frequency = 2;
          const phaseOffsetPerLetter = 0.2;

          const newY = originalYPositions[i] + Math.sin(time * frequency + i * phaseOffsetPerLetter) * amplitude;

          // Use position.set for PIXI v8 compatibility
          text.position.set(text.x, newY);
        }
      });
    }
  },

  webFonts: {
    title: "Web Fonts",
    description: "Using custom web fonts and SVG icons",
    code: `// First, ensure your fonts are loaded (in CSS or using FontFace API)
// Then load the SVG as a texture
await PIXI.Assets.load('dole.svg');
const dole = new PIXI.Sprite(PIXI.Texture.from('dole.svg'));

const text = \`Take <b>some</b> more <dole/> damage.\`;

const styles = {
  default: {
    align: "left",
    breakWords: false,
    fill: "#000000",
    fontFamily: "Aclonica",
    fontSize: 58,
    fontStyle: "normal",
    fontWeight: "400",
    leading: 1.2,
    letterSpacing: 0,
    wordWrap: true,
    wordWrapWidth: 675
  },
  b: {
    fontFamily: "Arimo Bold"
  },
  dole: {
    imgSrc: "dole",
    imgDisplay: "icon"
  }
};

const glyphs = new (window.Glyphs?.default || window.Glyphs)(text, styles, {
  imgMap: { dole }
});`,
    init: async function() {
      // Load fonts using FontFace API
      const aclonica = new FontFace('Aclonica', 'url(Aclonica.ttf)');
      const arimoBold = new FontFace('Arimo Bold', 'url(Arimo_Bold.ttf)');

      await Promise.all([
        aclonica.load(),
        arimoBold.load()
      ]);

      document.fonts.add(aclonica);
      document.fonts.add(arimoBold);

      // Load SVG as texture
      await PIXI.Assets.load('dole.svg');
      const dole = new PIXI.Sprite(PIXI.Texture.from('dole.svg'));

      const text = `Take <b>some</b> more <dole/> damage.`;

      const styles = {
        default: {
          align: "left",
          breakWords: false,
          fill: "#000000",
          fontFamily: "Aclonica",
          fontSize: 58,
          fontStyle: "normal",
          fontWeight: "400",
          leading: 1.2,
          letterSpacing: 0,
          wordWrap: true,
          wordWrapWidth: 675
        },
        b: {
          fontFamily: "Arimo Bold"
        },
        dole: {
          imgSrc: "dole",
          imgDisplay: "icon"
        }
      };

      const Glyphs = window.Glyphs?.default || window.Glyphs;
      return new Glyphs(text, styles, {
        imgMap: { dole }
      });
    }
  }
};

// Also make available globally for backward compatibility
window.demos = demos;

// Export for module usage (only in module context)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = demos;
}

// ES module export
export { demos };