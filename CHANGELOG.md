# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 5.0.0 (2025-09-19)


### ⚠ BREAKING CHANGES

* **pixi.js v6:** Going forward, this project will target v6 of pixi.js
* Releasing as a breaking change to make sure this doesn't break for any other existing users without any notice. This commit introduces an import for pixi.js to make it work properly in a commonjs/es modules world
* The support for Pixi v4 has been dropped

Co-authored-by: Romain <benzen@hotmail.fr>
* Since we now use microbundle to create the library. The output changes a bit and the output file in a CJS file only. If you need to use the library with a script tag, you should use the UMD build.
* The default text style changed from `bottom` to `baseline`.
* - The `def` style has been renamed to `default` for added clarity.
- Alignment and word wrap properties are controlled by the `default` style, rather than by a separate object passed to the constructor.  (Some related methods have been removed.)
- The default values for the various style options were updated to reflect Pixi's defaults.

### Features

* Add `setTagStyle()` and `deleteTagStyle()` ([588f21b](https://github.com/rizen/pixi-glyphs/commit/588f21bae3d0161f2622b9daf677af4680780d9d)), closes [#34](https://github.com/rizen/pixi-glyphs/issues/34)
* Add more valign options and a debug mode ([#51](https://github.com/rizen/pixi-glyphs/issues/51)) ([49c9326](https://github.com/rizen/pixi-glyphs/commit/49c9326fb86fab271277cbc6cf508c6a7524d557)), closes [#41](https://github.com/rizen/pixi-glyphs/issues/41) [#48](https://github.com/rizen/pixi-glyphs/issues/48)
* Add support for BBCode code style ([#78](https://github.com/rizen/pixi-glyphs/issues/78)) ([2a7be20](https://github.com/rizen/pixi-glyphs/commit/2a7be2084598933502c76419d7a86c0e6cd11719))
* Add support for commonjs/es module ([#92](https://github.com/rizen/pixi-glyphs/issues/92)) ([d1e108c](https://github.com/rizen/pixi-glyphs/commit/d1e108c6c3bf55a883f5be79cee58823fec21274))
* Add support for nested tags ([#5](https://github.com/rizen/pixi-glyphs/issues/5)) ([2996422](https://github.com/rizen/pixi-glyphs/commit/2996422f65500c69986d6ad539c39802001f46ac))
* Add testing and CI ([2f5ec37](https://github.com/rizen/pixi-glyphs/commit/2f5ec3740d3da8236d455eb2477873130b9eed9c))
* **adjustbaseline:** added a style property 'adjustBaseline' ([a3d7c4c](https://github.com/rizen/pixi-glyphs/commit/a3d7c4c473d4cb39ad2ae870fed15b4040e6b164)), closes [#108](https://github.com/rizen/pixi-glyphs/issues/108)
* **adjustFontBaseline:** Added basic support for overriding font properties. ([52db534](https://github.com/rizen/pixi-glyphs/commit/52db534d574cc9fcc94569ca2b90899f493abe98)), closes [#108](https://github.com/rizen/pixi-glyphs/issues/108)
* **alignment:** adds support for more types of justify layout ([9097368](https://github.com/rizen/pixi-glyphs/commit/9097368c65cdac5f94d43004ab0a8a864586e3b4)), closes [#215](https://github.com/rizen/pixi-glyphs/issues/215)
* **breaklines:** added a style that allows you to disable word wrapping for the text in a tag ([00745aa](https://github.com/rizen/pixi-glyphs/commit/00745aa2f69b1431e6545d6269c194ce488ffdeb)), closes [#214](https://github.com/rizen/pixi-glyphs/issues/214)
* **decorations:** added overdrawDecorations option ([989da3f](https://github.com/rizen/pixi-glyphs/commit/989da3fd25be77dc2b8e59fecfa8539092d20602)), closes [#288](https://github.com/rizen/pixi-glyphs/issues/288) [#288](https://github.com/rizen/pixi-glyphs/issues/288)
* **icons:** added iconScale ([730bb46](https://github.com/rizen/pixi-glyphs/commit/730bb4627177c626f60802a8a049fdcc3dca1b16)), closes [#329](https://github.com/rizen/pixi-glyphs/issues/329)
* **percent-sizes:** adds support for percentage-based fontSizes ([c9e5c9d](https://github.com/rizen/pixi-glyphs/commit/c9e5c9d7c3d8148f9c1bf92fd90d99d31574611a)), closes [#107](https://github.com/rizen/pixi-glyphs/issues/107)
* **styles:** added color as an alias for the fill property ([29ab892](https://github.com/rizen/pixi-glyphs/commit/29ab892bc93ecda11dde421b37ac527079ca8898)), closes [#207](https://github.com/rizen/pixi-glyphs/issues/207)
* Support PIXI v5 ([#88](https://github.com/rizen/pixi-glyphs/issues/88)) ([eee5534](https://github.com/rizen/pixi-glyphs/commit/eee5534b268b2c4ad6d2cb4dba8fb61ba7f9d22f))
* tag properties and interaction events ([500c7da](https://github.com/rizen/pixi-glyphs/commit/500c7dae86432e3449e4a52f7e684deef7ba8ada))
* Update for Pixi 4.2, Port to TypeScript ([#8](https://github.com/rizen/pixi-glyphs/issues/8)) ([40050d0](https://github.com/rizen/pixi-glyphs/commit/40050d0d465ef15559025e235de6c4fb4e7e80f8)), closes [#6](https://github.com/rizen/pixi-glyphs/issues/6)
* **warnings:** added an errorHandler in the options ([89bf6c8](https://github.com/rizen/pixi-glyphs/commit/89bf6c85a7e4ad5a1fe84bf398d5f1035000812e)), closes [#204](https://github.com/rizen/pixi-glyphs/issues/204)


### Bug Fixes

* Add offset for stroke after checking alignment ([#24](https://github.com/rizen/pixi-glyphs/issues/24)) ([5d63a3a](https://github.com/rizen/pixi-glyphs/commit/5d63a3a5e69b06f91857eff66ec98b5fdd0d2f64)), closes [#22](https://github.com/rizen/pixi-glyphs/issues/22)
* **alignment:** justified alignment types now correctly handle newlines ([d9fdf35](https://github.com/rizen/pixi-glyphs/commit/d9fdf35c5bf82eed3af99e716b9d075da885bb80)), closes [#215](https://github.com/rizen/pixi-glyphs/issues/215)
* **breakwords:** improved bug is breakWords ([dc30a9d](https://github.com/rizen/pixi-glyphs/commit/dc30a9dbad86df49957275760fc6918c38e064bb)), closes [#48](https://github.com/rizen/pixi-glyphs/issues/48)
* Compute font properties for empty line parts ([#43](https://github.com/rizen/pixi-glyphs/issues/43)) ([228c371](https://github.com/rizen/pixi-glyphs/commit/228c37121f8d0008259a7ef326ed9a1ba3cd8e79)), closes [#42](https://github.com/rizen/pixi-glyphs/issues/42)
* **emoji:** fixed an issue where user styles for emoji are overwritten ([ddbd5d5](https://github.com/rizen/pixi-glyphs/commit/ddbd5d5916f839b1dd7bedf99437ee949f83d008)), closes [#329](https://github.com/rizen/pixi-glyphs/issues/329)
* **errormessaging:** added target to errorMessage ([3451653](https://github.com/rizen/pixi-glyphs/commit/3451653016718f282e12683a9398209db03ba608)), closes [#204](https://github.com/rizen/pixi-glyphs/issues/204)
* Fix build errors ([#14](https://github.com/rizen/pixi-glyphs/issues/14)) ([4fee646](https://github.com/rizen/pixi-glyphs/commit/4fee646b6bfe164eaf748022d06afcdfac217779)), closes [#10](https://github.com/rizen/pixi-glyphs/issues/10)
* Fix demo pixi renderer ([7ca3aaf](https://github.com/rizen/pixi-glyphs/commit/7ca3aaf11fa20ef242074da1940b119d30c2e0f8))
* Fix drop shadows ([2cc378c](https://github.com/rizen/pixi-glyphs/commit/2cc378c8e377281ccd2f22a1f3dc5575f747ce0d)), closes [#26](https://github.com/rizen/pixi-glyphs/issues/26)
* Fix exported module ([#18](https://github.com/rizen/pixi-glyphs/issues/18)) ([cf527eb](https://github.com/rizen/pixi-glyphs/commit/cf527ebd48d2f87b391baa1461df9784af9d53f6)), closes [#12](https://github.com/rizen/pixi-glyphs/issues/12)
* Fix letterSpacing property ([#40](https://github.com/rizen/pixi-glyphs/issues/40)) ([55d8866](https://github.com/rizen/pixi-glyphs/commit/55d8866964571f3005875ced9c6dd00946535a9a)), closes [#39](https://github.com/rizen/pixi-glyphs/issues/39)
* Fix line y-position computation bug ([#17](https://github.com/rizen/pixi-glyphs/issues/17)) ([6aa7636](https://github.com/rizen/pixi-glyphs/commit/6aa7636850356cda2604379db952b95c57538025)), closes [#11](https://github.com/rizen/pixi-glyphs/issues/11)
* Fix Stroke thickness issues ([#73](https://github.com/rizen/pixi-glyphs/issues/73)) ([36cfc62](https://github.com/rizen/pixi-glyphs/commit/36cfc62f1e442c3060cc5ad919320d3633b8cd80)), closes [#59](https://github.com/rizen/pixi-glyphs/issues/59) [#60](https://github.com/rizen/pixi-glyphs/issues/60)
* **font-size:** fixes fontSize percentages in attributes ([bd9af9c](https://github.com/rizen/pixi-glyphs/commit/bd9af9cb4ba613cc71efb86a1a3bd547e512f11f)), closes [#234](https://github.com/rizen/pixi-glyphs/issues/234)
* **layout:** fixed a linter warning ([e7c2dd3](https://github.com/rizen/pixi-glyphs/commit/e7c2dd38d608937e696c17d4bfdcca280e3f4752))
* **letterspacing for icon images:** added letterSpacing between icon images ([8332d08](https://github.com/rizen/pixi-glyphs/commit/8332d08ec96087fd936d25bd500d7a4b6444f901)), closes [#194](https://github.com/rizen/pixi-glyphs/issues/194)
* **letterspacing:** improved support for letterSpacing ([006bafe](https://github.com/rizen/pixi-glyphs/commit/006bafeae3f3ab634307893c0faec63636810658)), closes [#203](https://github.com/rizen/pixi-glyphs/issues/203)
* **memory:** drastically improved memory performance and added new method destroyImgMap() ([caf3dd6](https://github.com/rizen/pixi-glyphs/commit/caf3dd655c4e03ba2e4b111571202bd4fc2da219)), closes [#245](https://github.com/rizen/pixi-glyphs/issues/245)
* **memory:** improved memory management ([405eed9](https://github.com/rizen/pixi-glyphs/commit/405eed9604d5109c307ef064516b26b11c63d0ea)), closes [#223](https://github.com/rizen/pixi-glyphs/issues/223)
* Override wordWrap method to ignore tags ([#20](https://github.com/rizen/pixi-glyphs/issues/20)) ([662d1e6](https://github.com/rizen/pixi-glyphs/commit/662d1e67094a9c24b3418cf4665877250a490670)), closes [#9](https://github.com/rizen/pixi-glyphs/issues/9) [#16](https://github.com/rizen/pixi-glyphs/issues/16)
* Right-alignment-pad first word only ([#25](https://github.com/rizen/pixi-glyphs/issues/25)) ([65eb1f3](https://github.com/rizen/pixi-glyphs/commit/65eb1f3931d1ecedb55901084042d411c433d7ee)), closes [#23](https://github.com/rizen/pixi-glyphs/issues/23)
* **stroke:** fixes issue where size of whitespace increased with the size of the stroke ([ad6bd1d](https://github.com/rizen/pixi-glyphs/commit/ad6bd1d63e9c5f2743a06e7af1743d578c88a746)), closes [#303](https://github.com/rizen/pixi-glyphs/issues/303)
* styled text not wrapped correctly when breakWords is true ([#47](https://github.com/rizen/pixi-glyphs/issues/47)) ([f3bb028](https://github.com/rizen/pixi-glyphs/commit/f3bb02824e0abeb94992fc9c7cf616a9ac33c537))
* **styles:** fixed issue with attribute values that contain spaces ([a0c3e67](https://github.com/rizen/pixi-glyphs/commit/a0c3e6728c713a7e9792ca932574943c49f72d96)), closes [#258](https://github.com/rizen/pixi-glyphs/issues/258)
* **tags:** made a more specific error in cases where attributes are badly formed ([6f0d416](https://github.com/rizen/pixi-glyphs/commit/6f0d41625ab14c12cd03654c2ba649cdf5fa09d5)), closes [#224](https://github.com/rizen/pixi-glyphs/issues/224)
* text not rendered when `stroke` or `fill` is 0x000000 ([#69](https://github.com/rizen/pixi-glyphs/issues/69)) ([aa0e7de](https://github.com/rizen/pixi-glyphs/commit/aa0e7de4f2742dc0b0510a8bdd76f801864ba69a))
* **textdecoration:** fixes text decorations on default style ([dd246db](https://github.com/rizen/pixi-glyphs/commit/dd246dbc289015a26862d7023084efcda8afc0b0)), closes [#436](https://github.com/rizen/pixi-glyphs/issues/436)
* **valing:** fixed issue where valign and paragraphSpacing didn't work together ([7a4534b](https://github.com/rizen/pixi-glyphs/commit/7a4534b84a95edb2fd525d72ef9dfe8acefb0769)), closes [#235](https://github.com/rizen/pixi-glyphs/issues/235)
* wordWrap() - Don't add spaces before the first word on a line ([#38](https://github.com/rizen/pixi-glyphs/issues/38)) ([2060ce0](https://github.com/rizen/pixi-glyphs/commit/2060ce04f0c81fd6a39655023c76e44523bfea7a)), closes [#37](https://github.com/rizen/pixi-glyphs/issues/37)


### Documentation

* **changelog:** added changelog generation ([e86f286](https://github.com/rizen/pixi-glyphs/commit/e86f286c76be3a3a98c6e118a432d572e1aea201)), closes [#163](https://github.com/rizen/pixi-glyphs/issues/163)
* **changelog:** retroactively completed the changelog by hand based on git history ([7830fb4](https://github.com/rizen/pixi-glyphs/commit/7830fb427ae4088f3b61a3ca5fb2de2d4db50ac2)), closes [#163](https://github.com/rizen/pixi-glyphs/issues/163)
* Improved Demo Page ([#28](https://github.com/rizen/pixi-glyphs/issues/28)) ([32e6a4e](https://github.com/rizen/pixi-glyphs/commit/32e6a4e58f3dc21a2fb1375f62fcd3aa182c1a13))
* **readme:** clarified in README that styles inherit from PIXI.TextStyle ([0cba2b9](https://github.com/rizen/pixi-glyphs/commit/0cba2b970d920ea19fd962810417c188bf7054ca)), closes [#193](https://github.com/rizen/pixi-glyphs/issues/193)
* Update demo instructions ([#62](https://github.com/rizen/pixi-glyphs/issues/62)) ([1cc5e3c](https://github.com/rizen/pixi-glyphs/commit/1cc5e3c684fab9363b51d3d5396010899e61b5a0))
* Update readme with yarn usage ([7a90952](https://github.com/rizen/pixi-glyphs/commit/7a9095290adad803f62aaae4c098ed7028ef5c70))


### Tests

* **imgmap:** adds more descriptive errors when a destroyed texture is used for the imgMap ([3a8b596](https://github.com/rizen/pixi-glyphs/commit/3a8b5962dcbd8edd3f41c1c8874830ab02ff294c)), closes [#245](https://github.com/rizen/pixi-glyphs/issues/245)
* **memory:** improved the memory test structure (memory.html) ([1edb970](https://github.com/rizen/pixi-glyphs/commit/1edb97029d71802356482e0b16907e085bfa58e7)), closes [#245](https://github.com/rizen/pixi-glyphs/issues/245)
* **taggedtext:** fixed a platform-specific pixel size test that broke after upgrading ([f74f723](https://github.com/rizen/pixi-glyphs/commit/f74f723db205bb941a16a189cdfd934863284f48))
* **types:** improved coverage for types ([35078e8](https://github.com/rizen/pixi-glyphs/commit/35078e859f4c740e69b034f95d6661c7f9879220))


### Refactors

* **bitmaptext:** added ability to extend class to use BitmapText ([67985b3](https://github.com/rizen/pixi-glyphs/commit/67985b3c2559b4c5bed3570f678997ad3929f58b)), closes [#393](https://github.com/rizen/pixi-glyphs/issues/393)
* **pixi.js v6:** added support for pixi.js@~6.1.0 ([bfcc3a6](https://github.com/rizen/pixi-glyphs/commit/bfcc3a6767da3666d7800c172451de2715df1e17)), closes [#119](https://github.com/rizen/pixi-glyphs/issues/119) [#52](https://github.com/rizen/pixi-glyphs/issues/52)
* **pixiutils:** removed an unused function from pixiUtils ([8b03623](https://github.com/rizen/pixi-glyphs/commit/8b036232dced07a2bfc80e0b7948a8e591b76eef))


### Chore

* Add dependabot config ([343a8dd](https://github.com/rizen/pixi-glyphs/commit/343a8dda40d5380512d80e228afe726908e6a528))
* changed demo port number ([c2a7545](https://github.com/rizen/pixi-glyphs/commit/c2a7545091df5ec3f94715091c5d1966d38b06af))
* **changelog:** added a .versionrc file for changelog generator ([db73c5e](https://github.com/rizen/pixi-glyphs/commit/db73c5e06af3d038027bd88be6b73913845e4e2b))
* **changelog:** added a pretteir fix for changelog before commit so it doesn't break ([42e924d](https://github.com/rizen/pixi-glyphs/commit/42e924deedbfc70119465d39b9332f3602a8a759))
* **changelog:** added config for changelog generator ([10425c4](https://github.com/rizen/pixi-glyphs/commit/10425c48d1781b1d6f1f335c785c203815c34e5d))
* **deps-dev:** bump @types/emoji-regex from 8.0.0 to 9.2.0 ([780bc63](https://github.com/rizen/pixi-glyphs/commit/780bc63656ab071a9fb9a75febe75215ce00da06))
* **deps-dev:** bump @types/jest from 26.0.21 to 26.0.22 ([ee6341c](https://github.com/rizen/pixi-glyphs/commit/ee6341c1311db40f92a7dc5d75779ab84e0eb6a3))
* **deps-dev:** bump @types/jest from 26.0.22 to 26.0.23 ([6d390a4](https://github.com/rizen/pixi-glyphs/commit/6d390a4a0dd584ddab53b2404c560cf48da90fd4))
* **deps-dev:** bump @types/jest from 26.0.23 to 26.0.24 ([c57e94a](https://github.com/rizen/pixi-glyphs/commit/c57e94a6a151645f631eb671bf5e5f6124ff97ca))
* **deps-dev:** bump @types/jest from 26.0.24 to 27.0.2 ([1dadb74](https://github.com/rizen/pixi-glyphs/commit/1dadb74d88aaef367fa042671987d6e0596be8ad))
* **deps-dev:** bump @types/jest from 27.0.2 to 27.0.3 ([5e0f52c](https://github.com/rizen/pixi-glyphs/commit/5e0f52ceee175ca41ca50bcc7993b4f532f51064))
* **deps-dev:** bump @types/jest from 27.0.3 to 27.4.0 ([ad7b072](https://github.com/rizen/pixi-glyphs/commit/ad7b0721ad2d594f14b78835e515eb6be8d1d24c))
* **deps-dev:** bump @types/jest from 27.4.0 to 27.4.1 ([368ab8d](https://github.com/rizen/pixi-glyphs/commit/368ab8df9209e3781c393c36dd07b696ef6e82e8))
* **deps-dev:** bump @types/jest from 27.4.1 to 27.5.0 ([dabfff8](https://github.com/rizen/pixi-glyphs/commit/dabfff8d968047f3b036408631a6dc8ed1ec0000))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([ce03535](https://github.com/rizen/pixi-glyphs/commit/ce035359a8fc879d65593f794ed2f72dd280065d))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([0a72967](https://github.com/rizen/pixi-glyphs/commit/0a72967f05a40f3a19bcaec621d149200b01b1f4))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([5305f38](https://github.com/rizen/pixi-glyphs/commit/5305f3833071e688e699390d4250bd35c1c20316))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([0a6ef12](https://github.com/rizen/pixi-glyphs/commit/0a6ef12c7078b149df1a052603e8d73dba8dff41))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([9360d74](https://github.com/rizen/pixi-glyphs/commit/9360d741a78f58bcb5aaae7b54a05d4d3a9a8be0))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([f950fe3](https://github.com/rizen/pixi-glyphs/commit/f950fe302bbfd2ba3bf8c088196d6121dc65f6db))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([91282c2](https://github.com/rizen/pixi-glyphs/commit/91282c2f78a84d3379e1eaa5c2be9326a736b5f3))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([da73369](https://github.com/rizen/pixi-glyphs/commit/da7336908acf294ab9a04b2d2f05f727278dbac1))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([4031401](https://github.com/rizen/pixi-glyphs/commit/403140180a23aa43f7815f491dc368139097b3af))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([f4d4321](https://github.com/rizen/pixi-glyphs/commit/f4d432120c0f07ae44f915e09cc2d5ab0952be2b))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([af9398a](https://github.com/rizen/pixi-glyphs/commit/af9398a15c838d24fb520133f134211320dc85b1))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([7075ac6](https://github.com/rizen/pixi-glyphs/commit/7075ac6a777e61b98348770ef207fd713a4257e2))
* **deps-dev:** bump @typescript-eslint/parser from 4.16.1 to 4.19.0 ([0d972ac](https://github.com/rizen/pixi-glyphs/commit/0d972ac2a288b4d6245034ae30ec0e3d30eb731d))
* **deps-dev:** bump @typescript-eslint/parser from 4.19.0 to 4.22.0 ([aa30c49](https://github.com/rizen/pixi-glyphs/commit/aa30c49305a9404244aa595296eac9615cfe331c))
* **deps-dev:** bump @typescript-eslint/parser from 4.22.0 to 4.22.1 ([92e4915](https://github.com/rizen/pixi-glyphs/commit/92e4915957df019b46708aab774a3e26e8a524a0))
* **deps-dev:** bump @typescript-eslint/parser from 4.22.1 to 4.23.0 ([80385a5](https://github.com/rizen/pixi-glyphs/commit/80385a52c61d3b41215f44262a68d849ed85d514))
* **deps-dev:** bump @typescript-eslint/parser from 4.24.0 to 4.25.0 ([b85dda8](https://github.com/rizen/pixi-glyphs/commit/b85dda818180a21665647cabe3c36da818e4c236))
* **deps-dev:** bump @typescript-eslint/parser from 4.25.0 to 4.28.0 ([58fb0ef](https://github.com/rizen/pixi-glyphs/commit/58fb0efd43bb5c0afa788fb867d21287520cc3e5))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.0 to 4.28.1 ([ba705f1](https://github.com/rizen/pixi-glyphs/commit/ba705f1ac53bd0e82312f4904123edc5ad2a27e4))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.1 to 4.28.2 ([f5ce4e5](https://github.com/rizen/pixi-glyphs/commit/f5ce4e54ed14cfa0aa997e8035e0ae3e67b44662))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.2 to 4.28.3 ([5efd81d](https://github.com/rizen/pixi-glyphs/commit/5efd81d0b7adf4e16acc182e76c2577e53bb671b))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.3 to 4.28.4 ([b5ad084](https://github.com/rizen/pixi-glyphs/commit/b5ad08438697904f3456113e533fb734712ca431))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.4 to 4.28.5 ([741ad2f](https://github.com/rizen/pixi-glyphs/commit/741ad2f9cad4c023e97ac5671d7c18b2a96bb9e5))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.5 to 4.33.0 ([249b869](https://github.com/rizen/pixi-glyphs/commit/249b869faf99c14c406baffb72e96cd443f43610))
* **deps-dev:** bump ansi-regex from 5.0.1 to 6.0.1 ([1c2c9b8](https://github.com/rizen/pixi-glyphs/commit/1c2c9b82ebe6a53a4e8588971470287ee394c3a0))
* **deps-dev:** bump canvas from 2.10.1 to 2.10.2 ([97769a4](https://github.com/rizen/pixi-glyphs/commit/97769a4b95bfe569c6d95829f8e0ea4606c17de1))
* **deps-dev:** bump canvas from 2.7.0 to 2.8.0 ([0cfb8e1](https://github.com/rizen/pixi-glyphs/commit/0cfb8e1c8fffcada6e13cd278bb5ca4d65933b40))
* **deps-dev:** bump canvas from 2.8.0 to 2.9.0 ([9f844de](https://github.com/rizen/pixi-glyphs/commit/9f844de245f0e5ddafdc0fa785778adaf43d9991))
* **deps-dev:** bump canvas from 2.9.0 to 2.9.1 ([1d561cc](https://github.com/rizen/pixi-glyphs/commit/1d561cc5072024fb378519e6853ea0afc263178b))
* **deps-dev:** bump electron from 17.0.1 to 17.1.2 ([877489a](https://github.com/rizen/pixi-glyphs/commit/877489adb61fe396c74abf05551982465b7bb0c4))
* **deps-dev:** bump electron from 17.1.2 to 18.0.1 ([ddc2963](https://github.com/rizen/pixi-glyphs/commit/ddc2963c53cdfab22463f5890f411138f5a4279c))
* **deps-dev:** bump electron from 18.0.1 to 18.2.4 ([a5d67e9](https://github.com/rizen/pixi-glyphs/commit/a5d67e9a738d75e03ec3df440edd8bc8edd90ec4))
* **deps-dev:** bump electron from 18.2.4 to 19.0.1 ([00c594a](https://github.com/rizen/pixi-glyphs/commit/00c594afa79d9c0ed81e27d4f67a09a283fb6894))
* **deps-dev:** bump electron from 21.2.0 to 21.2.2 ([a6a5281](https://github.com/rizen/pixi-glyphs/commit/a6a5281e3a1375a6e6085c58ee299f5c51df8985))
* **deps-dev:** bump eslint from 7.21.0 to 7.22.0 ([a8bdeca](https://github.com/rizen/pixi-glyphs/commit/a8bdeca7f178d1ba71a0f22c9baa21a30ae237cb))
* **deps-dev:** bump eslint from 7.22.0 to 7.23.0 ([4fb5ddf](https://github.com/rizen/pixi-glyphs/commit/4fb5ddf91dff34b9f9a1963e0c53e9683595883e))
* **deps-dev:** bump eslint from 7.23.0 to 7.24.0 ([6af1a97](https://github.com/rizen/pixi-glyphs/commit/6af1a975f1a12410948b6260960ef9175f632cd2))
* **deps-dev:** bump eslint from 7.24.0 to 7.26.0 ([1f5567e](https://github.com/rizen/pixi-glyphs/commit/1f5567e4d6ca03b069c3834fbfed73a325070b94))
* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([9366fb6](https://github.com/rizen/pixi-glyphs/commit/9366fb6a106265829fee8175ce9768004feddc60))
* **deps-dev:** bump eslint from 7.27.0 to 7.29.0 ([ed37bf2](https://github.com/rizen/pixi-glyphs/commit/ed37bf2785087eb51976175481a3488278032f46))
* **deps-dev:** bump eslint from 7.29.0 to 7.30.0 ([bfb6407](https://github.com/rizen/pixi-glyphs/commit/bfb640724049699831afaf7f08db256b6b682875))
* **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([c4ff0d5](https://github.com/rizen/pixi-glyphs/commit/c4ff0d5bf4b48d5c8655ebfe96066425f5fdcb4f))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.2.0 ([c0b0f72](https://github.com/rizen/pixi-glyphs/commit/c0b0f72fe84f3f34948fa2f4b5a4f537d5dc2d32))
* **deps-dev:** bump eslint-config-prettier from 8.2.0 to 8.3.0 ([9143e3a](https://github.com/rizen/pixi-glyphs/commit/9143e3a2c41e636467812ceb2e1a3c38adbc7b2b))
* **deps-dev:** bump eslint-config-prettier from 8.4.0 to 8.5.0 ([1bad414](https://github.com/rizen/pixi-glyphs/commit/1bad41478777f112bbcfb38c52fa1f5b15373134))
* **deps-dev:** bump eslint-plugin-prettier from 3.3.1 to 3.4.0 ([1c9b1e6](https://github.com/rizen/pixi-glyphs/commit/1c9b1e63f2b3c6fbf7d6bbb4f1cdea228bfde1bb))
* **deps-dev:** bump eslint-plugin-prettier from 3.4.0 to 4.0.0 ([124975f](https://github.com/rizen/pixi-glyphs/commit/124975fc3f9baab9cbe3223b496d13eb042f2e4d))
* **deps-dev:** bump eslint-plugin-prettier from 4.0.0 to 4.2.1 ([9bf4253](https://github.com/rizen/pixi-glyphs/commit/9bf4253bce40902716eec210fb3c6531ead3808b))
* **deps-dev:** bump fs-extra from 10.0.0 to 10.0.1 ([7a55103](https://github.com/rizen/pixi-glyphs/commit/7a55103ac988ff058fa3d7a79ec3b908965ade86))
* **deps-dev:** bump fs-extra from 10.0.1 to 10.1.0 ([5a23a34](https://github.com/rizen/pixi-glyphs/commit/5a23a3413d18caa2468bd7bd7d1292d59a5f7a86))
* **deps-dev:** bump fs-extra from 9.1.0 to 10.0.0 ([f1194b4](https://github.com/rizen/pixi-glyphs/commit/f1194b4bc9e0d476efcd706e27b39369e1b99756))
* **deps-dev:** bump http-server from 0.12.3 to 13.0.2 ([0b3a385](https://github.com/rizen/pixi-glyphs/commit/0b3a38505c36226fcd3a8a88e2586da104a79045))
* **deps-dev:** bump http-server from 13.0.2 to 14.0.0 ([933cfc2](https://github.com/rizen/pixi-glyphs/commit/933cfc251cdab5e8b7516f7ed4036f0dabf54e02))
* **deps-dev:** bump http-server from 14.0.0 to 14.1.0 ([05c8b48](https://github.com/rizen/pixi-glyphs/commit/05c8b489a8313fdb590ab8f6ad4fd4b8ead2ff65))
* **deps-dev:** bump husky from 4.2.3 to 5.1.0 ([f3369d1](https://github.com/rizen/pixi-glyphs/commit/f3369d1365c448459f8fd3709876d1a1f8e7016c))
* **deps-dev:** bump husky from 5.1.1 to 5.1.2 ([f8b3210](https://github.com/rizen/pixi-glyphs/commit/f8b321040afd8f6f969b03403a164470ff7c7321))
* **deps-dev:** bump husky from 5.1.3 to 5.2.0 ([a3dce55](https://github.com/rizen/pixi-glyphs/commit/a3dce5528382f58194b6c795068a53eb31e8311e))
* **deps-dev:** bump husky from 5.2.0 to 6.0.0 ([367919c](https://github.com/rizen/pixi-glyphs/commit/367919cad5ac83681046a39d8c8eb4ca97885847))
* **deps-dev:** bump husky from 6.0.0 to 7.0.0 ([de4e78d](https://github.com/rizen/pixi-glyphs/commit/de4e78df754931b8fcd89807319b96a5df954f08))
* **deps-dev:** bump husky from 7.0.0 to 7.0.1 ([2c8d539](https://github.com/rizen/pixi-glyphs/commit/2c8d53975548704bbb3bfc29519935ec8c8ece32))
* **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([3d6f10a](https://github.com/rizen/pixi-glyphs/commit/3d6f10a64b4123ee773f1096dfe929ce93c1daf0))
* **deps-dev:** bump husky from 7.0.2 to 7.0.4 ([7bc5fbc](https://github.com/rizen/pixi-glyphs/commit/7bc5fbc8b7ff6982e87c897cb9722daf5d19bc79))
* **deps-dev:** bump husky from 7.0.4 to 8.0.1 ([c75d5bd](https://github.com/rizen/pixi-glyphs/commit/c75d5bd72fa6837d5bfeb8badc0a22919bfb942d))
* **deps-dev:** bump husky from 8.0.1 to 8.0.2 ([6abb03e](https://github.com/rizen/pixi-glyphs/commit/6abb03e9b2e8d5c2b21ac4529abca19b79d9b047))
* **deps-dev:** bump husky from 8.0.3 to 9.0.7 ([8868e80](https://github.com/rizen/pixi-glyphs/commit/8868e8014537ce78012ecf6e94980eb4ea0e1eb6))
* **deps-dev:** bump jest-canvas-mock from 2.3.1 to 2.4.0 ([8744dad](https://github.com/rizen/pixi-glyphs/commit/8744dad2724c70d6da2ce0efb9d73f4d21a4e0ec))
* **deps-dev:** bump jsdom from 16.6.0 to 16.7.0 ([bbb8fe9](https://github.com/rizen/pixi-glyphs/commit/bbb8fe993cac40f0073d123b007cd0ecef7ef32d))
* **deps-dev:** bump jsdom from 16.7.0 to 18.0.0 ([31911b7](https://github.com/rizen/pixi-glyphs/commit/31911b7e0febb935628fb97379916a8e27e8f9d9))
* **deps-dev:** bump jsdom from 18.0.0 to 18.0.1 ([7a0f91f](https://github.com/rizen/pixi-glyphs/commit/7a0f91fa255132139e0a9295bbdc47a26946276e))
* **deps-dev:** bump jsdom from 18.0.1 to 18.1.0 ([4af87de](https://github.com/rizen/pixi-glyphs/commit/4af87defee6c61991fa4b12165aea19326f06464))
* **deps-dev:** bump jsdom from 18.1.0 to 19.0.0 ([03dbf18](https://github.com/rizen/pixi-glyphs/commit/03dbf188aadf13e61229bb19ab3657e4b4f46db3))
* **deps-dev:** bump jsdom from 19.0.0 to 20.0.2 ([7912d91](https://github.com/rizen/pixi-glyphs/commit/7912d914846c6c623aa86d901673b92b4e0c1a86))
* **deps-dev:** bump jsdom from 20.0.2 to 20.0.3 ([23b2676](https://github.com/rizen/pixi-glyphs/commit/23b26762f3ce0579bf522399b9441bd2c81b9293))
* **deps-dev:** bump jsdom from 23.2.0 to 24.0.0 ([ac88ee7](https://github.com/rizen/pixi-glyphs/commit/ac88ee7a8b4d38309cea12de53723ce55a5a1200))
* **deps-dev:** bump lint-staged from 10.0.8 to 10.5.4 ([18c3cb2](https://github.com/rizen/pixi-glyphs/commit/18c3cb2194a99be773d4b986620b8e8928da8a38))
* **deps-dev:** bump microbundle from 0.13.0 to 0.13.1 ([d18c6a3](https://github.com/rizen/pixi-glyphs/commit/d18c6a393592b6d4fb4bcc0c9305c0e83c4ad5f5))
* **deps-dev:** bump microbundle from 0.13.1 to 0.13.3 ([80ac60a](https://github.com/rizen/pixi-glyphs/commit/80ac60a632dfb93710d6640c89ed104d91b726b5))
* **deps-dev:** bump microbundle from 0.13.3 to 0.14.1 ([da81ff2](https://github.com/rizen/pixi-glyphs/commit/da81ff243b6d41be060071062364c812a514ff10))
* **deps-dev:** bump microbundle from 0.13.3 to 0.14.1 ([83cd0df](https://github.com/rizen/pixi-glyphs/commit/83cd0df1762e7d0e677900cc716df8e51323ce02))
* **deps-dev:** bump microbundle from 0.14.1 to 0.14.2 ([3ba82df](https://github.com/rizen/pixi-glyphs/commit/3ba82df2fcb904454981a27a68ade9377acca57e))
* **deps-dev:** bump microbundle from 0.14.2 to 0.15.0 ([9f6abe8](https://github.com/rizen/pixi-glyphs/commit/9f6abe85ef5a2807a43359b1a71135a5312eff96))
* **deps-dev:** bump microbundle from 0.15.0 to 0.15.1 ([2f4a6b3](https://github.com/rizen/pixi-glyphs/commit/2f4a6b3addb4ce841d2d2923d6ca149209aa8187))
* **deps-dev:** bump nth-check from 2.0.1 to 2.1.1 ([cc53290](https://github.com/rizen/pixi-glyphs/commit/cc53290fd7a7924015aafcc02c45025fd912e9fd))
* **deps-dev:** bump prettier from 1.19.1 to 2.2.1 ([f3fe30a](https://github.com/rizen/pixi-glyphs/commit/f3fe30a1eb181b56266b68570eba5fa363b0c99d))
* **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([0b7206a](https://github.com/rizen/pixi-glyphs/commit/0b7206ad6ea6fb9b1a661032bca882becf301be8))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([63c8c9d](https://github.com/rizen/pixi-glyphs/commit/63c8c9d1398cae96bfdf8f3dacabd6e3e09ef36d))
* **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([e4f8aa7](https://github.com/rizen/pixi-glyphs/commit/e4f8aa75edea933ddad01658a8ff417c4fc3609e))
* **deps-dev:** bump prettier from 2.3.2 to 2.4.1 ([badd52a](https://github.com/rizen/pixi-glyphs/commit/badd52acb153bb55290a7a27609947475532c9c1))
* **deps-dev:** bump prettier from 2.4.1 to 2.5.1 ([d069f4b](https://github.com/rizen/pixi-glyphs/commit/d069f4bd21c78b8a7b70f27849712f2930e726f7))
* **deps-dev:** bump prettier from 2.5.1 to 2.6.0 ([7f127d5](https://github.com/rizen/pixi-glyphs/commit/7f127d5cdfde78b7276fc36415ab2140c3208555))
* **deps-dev:** bump prettier from 2.6.0 to 2.6.2 ([9c3a0c4](https://github.com/rizen/pixi-glyphs/commit/9c3a0c4220162ce49ee1eb9a4ccdefffa9ec9925))
* **deps-dev:** bump standard-version from 9.1.1 to 9.2.0 ([897c629](https://github.com/rizen/pixi-glyphs/commit/897c6295874b0ebfac6601166d158f43c881b1f1))
* **deps-dev:** bump standard-version from 9.2.0 to 9.3.0 ([6d4d2fd](https://github.com/rizen/pixi-glyphs/commit/6d4d2fd43adc911fae22412951b04ac60e1d8bcd))
* **deps-dev:** bump standard-version from 9.3.1 to 9.3.2 ([0fe6d22](https://github.com/rizen/pixi-glyphs/commit/0fe6d22a45da43e95c9da9063a53081df2214234))
* **deps-dev:** bump standard-version from 9.3.2 to 9.5.0 ([5bd0a53](https://github.com/rizen/pixi-glyphs/commit/5bd0a5372301c66fd86adc1c7648f594b9924fe4))
* **deps-dev:** bump ts-jest from 26.5.4 to 26.5.5 ([6fbd2ea](https://github.com/rizen/pixi-glyphs/commit/6fbd2ea712bb775c6ad340769676fedcb9c99bdd))
* **deps-dev:** bump ts-jest from 26.5.5 to 26.5.6 ([b89ceff](https://github.com/rizen/pixi-glyphs/commit/b89ceff93ef76dd3325b27d38acd8da36cbf8f3d))
* **deps-dev:** bump typescript from 3.8.2 to 3.8.3 ([#97](https://github.com/rizen/pixi-glyphs/issues/97)) ([e44260b](https://github.com/rizen/pixi-glyphs/commit/e44260b302155d1c287ab670cdb75a780180b012))
* **deps-dev:** bump typescript from 4.1.5 to 4.2.2 ([596f03b](https://github.com/rizen/pixi-glyphs/commit/596f03b0dfd7d8f8aa2a804721d235aad2fc45e0))
* **deps-dev:** bump typescript from 4.2.2 to 4.2.3 ([c54c7e7](https://github.com/rizen/pixi-glyphs/commit/c54c7e7bc7cdb84f47430479dc51e2fdae11088e))
* **deps-dev:** bump typescript from 4.2.3 to 4.2.4 ([03a4b25](https://github.com/rizen/pixi-glyphs/commit/03a4b25ee8377f92057b46577c3ece0cdd8af42c))
* **deps-dev:** bump typescript from 4.2.4 to 4.3.2 ([1912554](https://github.com/rizen/pixi-glyphs/commit/1912554d0221e0ee7f4ec8ee25c840a169f2bc3e))
* **deps-dev:** bump typescript from 4.3.2 to 4.3.4 ([ee8c534](https://github.com/rizen/pixi-glyphs/commit/ee8c5345963995b7038767e083f333c30ae471fd))
* **deps-dev:** bump typescript from 4.3.4 to 4.3.5 ([c7cc15a](https://github.com/rizen/pixi-glyphs/commit/c7cc15aaba04807a6990932a1d102f18199a7db8))
* **deps-dev:** bump typescript from 4.3.5 to 4.4.3 ([817bf70](https://github.com/rizen/pixi-glyphs/commit/817bf708676fd6089129387e1b5a52abc59e0208))
* **deps-dev:** bump typescript from 4.4.3 to 4.4.4 ([fa47e2e](https://github.com/rizen/pixi-glyphs/commit/fa47e2e6b235e6e331abf9b3de04b0f735decc84))
* **deps-dev:** bump typescript from 4.4.4 to 4.5.2 ([443ac96](https://github.com/rizen/pixi-glyphs/commit/443ac96a4144c1cf7d29486b311a330a504ee1b4))
* **deps-dev:** bump typescript from 4.5.2 to 4.5.5 ([2d380d2](https://github.com/rizen/pixi-glyphs/commit/2d380d2f3d6af6ef3614bf773383a3d188bce631))
* **deps-dev:** bump typescript from 4.5.5 to 4.6.2 ([c2629e3](https://github.com/rizen/pixi-glyphs/commit/c2629e3606d16e1d975155f00f565dd702d17dac))
* **deps-dev:** bump typescript from 4.6.2 to 4.6.3 ([ed602b5](https://github.com/rizen/pixi-glyphs/commit/ed602b5207fe13f0f30dbf97d06b1f9c0516a025))
* **deps-dev:** bump typescript from 4.6.3 to 4.6.4 ([321f4a0](https://github.com/rizen/pixi-glyphs/commit/321f4a0e7e885f68cb1d1770f45be3088fa2c9a7))
* **deps-dev:** bump typescript from 4.6.4 to 4.7.2 ([1341543](https://github.com/rizen/pixi-glyphs/commit/1341543b35188f100c4f4963674358816feaf2ca))
* **deps-dev:** bump typescript from 4.8.4 to 4.9.3 ([48db222](https://github.com/rizen/pixi-glyphs/commit/48db2220ec4a5f8ea69928ee6bf2189671eee8ac))
* **deps:** [security] bump acorn from 6.4.0 to 6.4.1 ([#98](https://github.com/rizen/pixi-glyphs/issues/98)) ([d4cedbf](https://github.com/rizen/pixi-glyphs/commit/d4cedbfd07b21759dac07eeb6e322ae941176658))
* **deps:** bump @babel/traverse from 7.17.3 to 7.23.9 ([8b39b5d](https://github.com/rizen/pixi-glyphs/commit/8b39b5dc1706d2c0156e2ec44657cb0271f78351))
* **deps:** bump async from 2.6.3 to 2.6.4 ([34c6522](https://github.com/rizen/pixi-glyphs/commit/34c652238599f8129f8c932f87b588c0e55719e2))
* **deps:** bump bl from 3.0.0 to 3.0.1 ([#127](https://github.com/rizen/pixi-glyphs/issues/127)) ([5c4acf9](https://github.com/rizen/pixi-glyphs/commit/5c4acf9698829e5a5798c4fe76f478233131741b))
* **deps:** bump convict from 6.2.1 to 6.2.3 ([7d06981](https://github.com/rizen/pixi-glyphs/commit/7d06981663684237331459637b92919e1c1e2851))
* **deps:** bump decode-uri-component from 0.2.0 to 0.2.2 ([28756c9](https://github.com/rizen/pixi-glyphs/commit/28756c995870841e251c9ebab3cf22d05ad9553c))
* **deps:** bump ejs from 3.1.6 to 3.1.7 ([04fb6b5](https://github.com/rizen/pixi-glyphs/commit/04fb6b5f5fd14c535f315a75777ae7cbdb073480))
* **deps:** bump emoji-regex from 9.2.2 to 10.0.0 ([54eef00](https://github.com/rizen/pixi-glyphs/commit/54eef0004442dae0943b1ec0b53b02ab6cb6d3da))
* **deps:** bump follow-redirects from 1.14.1 to 1.14.8 ([23db225](https://github.com/rizen/pixi-glyphs/commit/23db22547c2481dbaea3b9778b46fe68906604d6))
* **deps:** bump follow-redirects from 1.14.9 to 1.15.5 ([92a4551](https://github.com/rizen/pixi-glyphs/commit/92a45513f32698dc844676836c21c5887f5e8a8f))
* **deps:** bump json5 from 2.2.0 to 2.2.3 ([a19f4fa](https://github.com/rizen/pixi-glyphs/commit/a19f4faf6a0c87ba151f9650dd27fac990ac0a66))
* **deps:** bump loader-utils from 3.2.0 to 3.2.1 ([45e0d61](https://github.com/rizen/pixi-glyphs/commit/45e0d61a4d22c766af2dad1393154a13fe804b7b))
* **deps:** bump nanoid from 3.1.23 to 3.2.0 ([0789c1f](https://github.com/rizen/pixi-glyphs/commit/0789c1faed1fe18e6226f2df884a15250902fbaf))
* **deps:** bump node-fetch from 2.6.1 to 2.6.7 ([3ba2804](https://github.com/rizen/pixi-glyphs/commit/3ba2804ce4d58073f7255f21de558dfd8f15c158))
* **deps:** bump postcss from 7.0.35 to 7.0.36 ([73b7037](https://github.com/rizen/pixi-glyphs/commit/73b70379f41454cfccd5a9c614e97ca5088be0e1))
* **deps:** bump postcss from 8.4.6 to 8.4.33 ([ca4ffdc](https://github.com/rizen/pixi-glyphs/commit/ca4ffdc2887f7a0a350ea6c4490006888bff4be9))
* **deps:** bump semver from 5.7.1 to 5.7.2 ([4969ed3](https://github.com/rizen/pixi-glyphs/commit/4969ed3f1809f946ddda49ae4611f3dde798f7aa))
* **deps:** bump simple-get from 3.1.0 to 3.1.1 ([d64e266](https://github.com/rizen/pixi-glyphs/commit/d64e2662981ffd4c66ff868dc3dbcf1a419fac65))
* **deps:** bump tar from 6.1.0 to 6.1.5 ([9243f31](https://github.com/rizen/pixi-glyphs/commit/9243f31229aeabebe82eaa03d81f562656ea6215))
* **deps:** bump tar from 6.1.5 to 6.1.11 ([c2a6f35](https://github.com/rizen/pixi-glyphs/commit/c2a6f35d3a5328a1c5438633c7fab765b7f6ece7))
* **deps:** bump tmpl from 1.0.4 to 1.0.5 ([13f12e8](https://github.com/rizen/pixi-glyphs/commit/13f12e8b20352661900c03fdf3b2f08a9ee27400))
* **deps:** bump trim-off-newlines from 1.0.1 to 1.0.3 ([3a77ff4](https://github.com/rizen/pixi-glyphs/commit/3a77ff41c99397598a8a8b265b24c5b47f088688))
* **deps:** bump word-wrap from 1.2.3 to 1.2.5 ([d8f7cf8](https://github.com/rizen/pixi-glyphs/commit/d8f7cf8ff1c97c295f405e91e3fa3ce1c466b1d3))
* **deps:** bump ws from 7.4.5 to 7.4.6 ([3b84e94](https://github.com/rizen/pixi-glyphs/commit/3b84e94a6b06c1657137b9d2ad7341320e1019c9))
* **deps:** downgraded ts to v4. Upgraded other deps ([67faf5a](https://github.com/rizen/pixi-glyphs/commit/67faf5a0d3e3a7f1b7949da3bb2cc350e9f556fd))
* **deps:** removed some unused deps ([916121c](https://github.com/rizen/pixi-glyphs/commit/916121c74ef22b37f4fb413470bdf90d3d44f34c))
* **deps:** updated all other dependencies including prettier and jest ([39d5037](https://github.com/rizen/pixi-glyphs/commit/39d5037735dd427a1682e3bd0842511d13dc1775))
* **deps:** updated dependencies ([83a430b](https://github.com/rizen/pixi-glyphs/commit/83a430b83d949c6abb1f1326405e4c4fe0eddc25))
* **deps:** updated dependencies ([2145784](https://github.com/rizen/pixi-glyphs/commit/2145784c038f41043c2ab3c44693ce0b6ca8c6c0))
* **deps:** updated dependencies thru dependabot ([f522f23](https://github.com/rizen/pixi-glyphs/commit/f522f2349dcafdc0806928f5372bf4424a7cde66))
* **deps:** updated deps ([d0e923b](https://github.com/rizen/pixi-glyphs/commit/d0e923be9f1e4d585702d75e5d657da30e181261))
* **deps:** updated js-dom ([47fdacf](https://github.com/rizen/pixi-glyphs/commit/47fdacfac8f3f81a0e2861c81ebe8186193d5134))
* **deps:** upgrade electron (for tests) ([f40cc79](https://github.com/rizen/pixi-glyphs/commit/f40cc794393fa342bc1172cdbc765daa353cc0ee))
* **deps:** upgraded electron ([f6c7c7c](https://github.com/rizen/pixi-glyphs/commit/f6c7c7c1ffc6505d84ce89e87b2365ba83f851d9))
* **deps:** upgraded Pixi to latest version 6.2.x ([377caa1](https://github.com/rizen/pixi-glyphs/commit/377caa12f9a34221e4d96e285028c0fecc886cdc))
* **deps:** Upgraded pixi.js to latest version 6 release ([d168353](https://github.com/rizen/pixi-glyphs/commit/d16835378c82c6758646970722bec10a6b52aef7))
* **deps:** upgraded typescript and eslint ([69fb1ad](https://github.com/rizen/pixi-glyphs/commit/69fb1ad2df63955d29c8a5473fe350295a583852))
* **deps:** upgraded typescript and other dependencies ([996c384](https://github.com/rizen/pixi-glyphs/commit/996c3841360f118c0b78b8a1e24dbd3a6fc3c7ed))
* fix happo, use microbundle to create the dist files, use circleci v2 ([#63](https://github.com/rizen/pixi-glyphs/issues/63)) ([56c7a80](https://github.com/rizen/pixi-glyphs/commit/56c7a80cca395d39f51f57ad17b8b1d6d28bfef0))
* **node:** bump node version to 16.14.2 ([9f3292c](https://github.com/rizen/pixi-glyphs/commit/9f3292c51bde72a87b19f53cbc40f0d79c72f8df))
* **prerelease:** 0.7.0-rc.1 ([77df7b9](https://github.com/rizen/pixi-glyphs/commit/77df7b914482f05ac65ae36d6fbdcfc7c6a0d921))
* **release:** 0.10.0 ([e8b7cf0](https://github.com/rizen/pixi-glyphs/commit/e8b7cf0057fe5bed7330bd57a9add56166573615))
* **release:** 0.5.0 ([0b5d29c](https://github.com/rizen/pixi-glyphs/commit/0b5d29cbbc39fb5c587c190b50fddaa8c38af963))
* **release:** 0.5.1 ([98ae9eb](https://github.com/rizen/pixi-glyphs/commit/98ae9ebace1f47f5a59564fdcc1c5545bedf87bf))
* **release:** 0.5.2 ([9862381](https://github.com/rizen/pixi-glyphs/commit/98623814db935c10e5bf4fdac917769e857bb8ec))
* **release:** 0.5.3 ([ec488f1](https://github.com/rizen/pixi-glyphs/commit/ec488f143a4248a82bbcb120a0cb5688165a8917))
* **release:** 0.5.4 ([630031f](https://github.com/rizen/pixi-glyphs/commit/630031fd16445a61e478c27abbe6481b5ff01877))
* **release:** 0.6.0 ([47b0856](https://github.com/rizen/pixi-glyphs/commit/47b0856ed2ad3a04c13164de5cf7b28a8fd878a8))
* **release:** 0.7.0 ([1a402cd](https://github.com/rizen/pixi-glyphs/commit/1a402cd65c35455c4f072837bbcdf2ad136f3e92))
* **release:** 0.8.0 ([336bed0](https://github.com/rizen/pixi-glyphs/commit/336bed0b206043e2c3e81c373b7ca02094ecabe7))
* **release:** 0.9.0 ([7418d70](https://github.com/rizen/pixi-glyphs/commit/7418d7048d2ec408428a48e60c5ea8f5775a27ad))
* **release:** 2.5.1 ([b0295da](https://github.com/rizen/pixi-glyphs/commit/b0295da04518ec53fc5e604e85f057cf9d4f3662))
* **release:** 2.5.2 ([3866a16](https://github.com/rizen/pixi-glyphs/commit/3866a16e37d3a5d2130af837d0c34d33f9e86920))
* **release:** 2.5.3 ([259e49a](https://github.com/rizen/pixi-glyphs/commit/259e49aa9675f456b9722b41be277447df96d5ab))
* **release:** 2.5.5 ([1aafe85](https://github.com/rizen/pixi-glyphs/commit/1aafe85f60b1f53db4f2504be21a1f088e927e44))
* **release:** 2.5.6 ([9b9f66f](https://github.com/rizen/pixi-glyphs/commit/9b9f66f3f33e5c8c875fe4d9c8462f37d45f399f))
* **release:** 2.6.0 ([5c76656](https://github.com/rizen/pixi-glyphs/commit/5c76656aa9f34a522badf0834ea2bd6c44da548d))
* **release:** 2.7.0 ([b23776a](https://github.com/rizen/pixi-glyphs/commit/b23776a73f28eaccb62b2e48a8727f73b909ca76))
* **release:** 2.7.1 ([8c145fd](https://github.com/rizen/pixi-glyphs/commit/8c145fd6ef8e6571e74d7fc5954563e85b860345))
* **release:** 3.0.0 ([5b002da](https://github.com/rizen/pixi-glyphs/commit/5b002da1c28dd442b761b63c370f722c2b454430))
* **release:** 3.1.0 ([bb8e955](https://github.com/rizen/pixi-glyphs/commit/bb8e95536523d62336c4f930024adfcd40ea7c57))
* **release:** 3.10.0 ([44c8867](https://github.com/rizen/pixi-glyphs/commit/44c88675a576a84e75919aa3631dfd51ab7bc6fd))
* **release:** 3.10.1 ([1351da7](https://github.com/rizen/pixi-glyphs/commit/1351da73e5a40980c9e40016cec2bc25acdd611a))
* **release:** 3.11.0 ([a42d1ff](https://github.com/rizen/pixi-glyphs/commit/a42d1ff13fc2ede38f2b94f2ada9981faebdce6c))
* **release:** 3.11.1 ([1455890](https://github.com/rizen/pixi-glyphs/commit/14558908ec4d0e03d6031e42de03939e512c5337))
* **release:** 3.11.2 ([0d5c4f9](https://github.com/rizen/pixi-glyphs/commit/0d5c4f909139854646e4a95109683abea62f2d05))
* **release:** 3.11.3 ([270ac78](https://github.com/rizen/pixi-glyphs/commit/270ac7866bed80102e49e01f9065eb16529584a4))
* **release:** 3.12.0 ([d28d8af](https://github.com/rizen/pixi-glyphs/commit/d28d8aff3bbedbc71d869d3bffb407630f2cfba4))
* **release:** 3.13.0 ([1f23fca](https://github.com/rizen/pixi-glyphs/commit/1f23fcabb988ab759067dc0f07d4c67ff80f40e2))
* **release:** 3.14.0 ([86f22c6](https://github.com/rizen/pixi-glyphs/commit/86f22c6d1737307c16b0275998fa47ce1f4ef3fe))
* **release:** 3.14.1 ([e156b18](https://github.com/rizen/pixi-glyphs/commit/e156b18612f1982452d8340224949c98b4f5f2c7))
* **release:** 3.15.0 ([6794c87](https://github.com/rizen/pixi-glyphs/commit/6794c87116065b278b8f539e5bc26c5496d92ff0))
* **release:** 3.15.1 ([a87b1f2](https://github.com/rizen/pixi-glyphs/commit/a87b1f2fedc4519fe3e11280991917cb7b71f3e4))
* **release:** 3.15.2 ([23072b8](https://github.com/rizen/pixi-glyphs/commit/23072b86bbaa46ae4b3b9a017431c933686d80d4))
* **release:** 3.2.0 ([d86c7d0](https://github.com/rizen/pixi-glyphs/commit/d86c7d0cfc1e7b2091ec299d876c6d0ae4d60f68))
* **release:** 3.3.0 ([88662e8](https://github.com/rizen/pixi-glyphs/commit/88662e808a1887dbab089cf6e82c788a82ea80c5))
* **release:** 3.3.1 ([7725f3f](https://github.com/rizen/pixi-glyphs/commit/7725f3fa2e9a162e5cefdb27773f12a5d8ca93e8))
* **release:** 3.4.0 ([ce7c163](https://github.com/rizen/pixi-glyphs/commit/ce7c16374cf67f47c255452d4d71dca0a911aaf4))
* **release:** 3.5.0 ([dd3ae52](https://github.com/rizen/pixi-glyphs/commit/dd3ae523e02867c58f71a13d04e68b6c04eaac9a))
* **release:** 3.5.1 ([b9cd887](https://github.com/rizen/pixi-glyphs/commit/b9cd88741fdf3831d8405468a34289e1c5194c6d))
* **release:** 3.5.2 ([d74fef2](https://github.com/rizen/pixi-glyphs/commit/d74fef28a70236c0e7f2ea94c0552c410800d564))
* **release:** 3.5.3 ([5a22928](https://github.com/rizen/pixi-glyphs/commit/5a229281962ddb70b6e666a8912d36f8276429f2))
* **release:** 3.6.0 ([365b1c5](https://github.com/rizen/pixi-glyphs/commit/365b1c5871bc534e71265fa6b249f7ef863750d6))
* **release:** 3.6.1 ([341a1a2](https://github.com/rizen/pixi-glyphs/commit/341a1a2f4ff8cf8b93b6a05db9f72d4ac26c6ed0))
* **release:** 3.7.0 ([7cba928](https://github.com/rizen/pixi-glyphs/commit/7cba9288cc197324e03edc46a6575a59e1b221f4))
* **release:** 3.7.1 ([2087fd1](https://github.com/rizen/pixi-glyphs/commit/2087fd14a599cb86dff3769e31ab12316aa3aede))
* **release:** 3.7.2 ([4d6c2c6](https://github.com/rizen/pixi-glyphs/commit/4d6c2c600adda29946cf452dc29c7d3d073808b4))
* **release:** 3.7.3 ([467e653](https://github.com/rizen/pixi-glyphs/commit/467e653fe8fba317acd34a6a618617aee725d1ec))
* **release:** 3.7.4 ([10b88d5](https://github.com/rizen/pixi-glyphs/commit/10b88d50e27969265c06811f0d72488a0e5f07d8))
* **release:** 3.7.5 ([d1025fe](https://github.com/rizen/pixi-glyphs/commit/d1025fe36e12c17a8ad9b588e58872d93b89fe5f))
* **release:** 3.7.6 ([6b82e5f](https://github.com/rizen/pixi-glyphs/commit/6b82e5fd87d3a75be835278905a5dd14111d7229))
* **release:** 3.8.0 ([05b0e28](https://github.com/rizen/pixi-glyphs/commit/05b0e288452000ea9eebd04e919f8cbdc2626387))
* **release:** 3.8.1 ([5507a54](https://github.com/rizen/pixi-glyphs/commit/5507a54b18cc1f689bc95590a81ff3367f51f795))
* **release:** 3.9.0 ([497990e](https://github.com/rizen/pixi-glyphs/commit/497990e46baadda6e03b170433137efc558e4672))
* **release:** 3.9.1 ([488fe59](https://github.com/rizen/pixi-glyphs/commit/488fe5946311a03e234a9dc2b7f575a65a453a81))
* Remove dist files from github ([98b57e9](https://github.com/rizen/pixi-glyphs/commit/98b57e9db6530a9dfbcd9f865c2133c0337d878d))
* Remove grunt ([9a24e2b](https://github.com/rizen/pixi-glyphs/commit/9a24e2bbd61190517692b13261384004f661f254))
* Remove gruntfile + new readme image ([b8eb959](https://github.com/rizen/pixi-glyphs/commit/b8eb959bc98fcc46f3a4cad8ed09ae8cd0ce588a))
* removed vscode settings from repo ([d8731d7](https://github.com/rizen/pixi-glyphs/commit/d8731d7c0440ca39d6565e62e47b05ba4b2b9196))
* Replace ; with && for Windows compatibility ([#32](https://github.com/rizen/pixi-glyphs/issues/32)) ([7783dc1](https://github.com/rizen/pixi-glyphs/commit/7783dc1f427a6a91d30a7e90d1ced44238398f83))
* **republish:** 3.7.3 may have been corrupted during build. Please use this instead ([75911fb](https://github.com/rizen/pixi-glyphs/commit/75911fb574be948d5094df95262de5df061ddb93))
* **tests:** mocked the console object in tests ([0d3266e](https://github.com/rizen/pixi-glyphs/commit/0d3266ee466dfc6e4921ac6581b22c716c4307a9)), closes [#204](https://github.com/rizen/pixi-glyphs/issues/204)
* **tests:** removed a skipped test ([db83523](https://github.com/rizen/pixi-glyphs/commit/db8352316b2a54a9cafd587d9de06657b914c851))
* Update dependencies ([276a3cf](https://github.com/rizen/pixi-glyphs/commit/276a3cf3ce50edcbbfd8cd758fc32bc1216721bf))
* Update dependencies ([94598ac](https://github.com/rizen/pixi-glyphs/commit/94598ac71a06f5cbf3c8f2e64c9d52d2e93da0c1))
* Update dependencies ([#89](https://github.com/rizen/pixi-glyphs/issues/89)) ([1feef77](https://github.com/rizen/pixi-glyphs/commit/1feef7721475a6ed95e548f09c90984687e88373))
* Update deps, reset version ([#66](https://github.com/rizen/pixi-glyphs/issues/66)) ([a0f0506](https://github.com/rizen/pixi-glyphs/commit/a0f0506e705a3f1029f5a64519fc88fdb096b74e))
* Update dev dependencies ([#72](https://github.com/rizen/pixi-glyphs/issues/72)) ([3fa73e4](https://github.com/rizen/pixi-glyphs/commit/3fa73e4b18c7e7f35fed9e60d731275a3a0f2949))
* Use `opener` for opening the demo on all platforms ([#91](https://github.com/rizen/pixi-glyphs/issues/91)) ([9fa8c0e](https://github.com/rizen/pixi-glyphs/commit/9fa8c0e4a46815f2a8ecaa4870d49278129fe437))
* Use standard-version to release versions ([5365ab0](https://github.com/rizen/pixi-glyphs/commit/5365ab08842dfcca95e675d1eaa60b70152abaf9))

### [3.15.2](https://github.com/mimshwright/pixi-tagged-text/compare/v3.15.1...v3.15.2) (2024-10-14)

### Bug Fixes

- **textdecoration:** fixes text decorations on default style ([dd246db](https://github.com/mimshwright/pixi-tagged-text/commit/dd246dbc289015a26862d7023084efcda8afc0b0)), closes [#436](https://github.com/mimshwright/pixi-tagged-text/issues/436)

### [3.15.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.15.0...v3.15.1) (2024-01-31)

### Chore

- **deps-dev:** bump husky from 8.0.3 to 9.0.7 ([8868e80](https://github.com/mimshwright/pixi-tagged-text/commit/8868e8014537ce78012ecf6e94980eb4ea0e1eb6))
- **deps-dev:** bump jsdom from 23.2.0 to 24.0.0 ([ac88ee7](https://github.com/mimshwright/pixi-tagged-text/commit/ac88ee7a8b4d38309cea12de53723ce55a5a1200))
- **deps:** bump @babel/traverse from 7.17.3 to 7.23.9 ([8b39b5d](https://github.com/mimshwright/pixi-tagged-text/commit/8b39b5dc1706d2c0156e2ec44657cb0271f78351))
- **deps:** bump decode-uri-component from 0.2.0 to 0.2.2 ([28756c9](https://github.com/mimshwright/pixi-tagged-text/commit/28756c995870841e251c9ebab3cf22d05ad9553c))
- **deps:** bump follow-redirects from 1.14.9 to 1.15.5 ([92a4551](https://github.com/mimshwright/pixi-tagged-text/commit/92a45513f32698dc844676836c21c5887f5e8a8f))
- **deps:** bump json5 from 2.2.0 to 2.2.3 ([a19f4fa](https://github.com/mimshwright/pixi-tagged-text/commit/a19f4faf6a0c87ba151f9650dd27fac990ac0a66))
- **deps:** bump postcss from 8.4.6 to 8.4.33 ([ca4ffdc](https://github.com/mimshwright/pixi-tagged-text/commit/ca4ffdc2887f7a0a350ea6c4490006888bff4be9))
- **deps:** bump semver from 5.7.1 to 5.7.2 ([4969ed3](https://github.com/mimshwright/pixi-tagged-text/commit/4969ed3f1809f946ddda49ae4611f3dde798f7aa))
- **deps:** bump word-wrap from 1.2.3 to 1.2.5 ([d8f7cf8](https://github.com/mimshwright/pixi-tagged-text/commit/d8f7cf8ff1c97c295f405e91e3fa3ce1c466b1d3))
- **deps:** downgraded ts to v4. Upgraded other deps ([67faf5a](https://github.com/mimshwright/pixi-tagged-text/commit/67faf5a0d3e3a7f1b7949da3bb2cc350e9f556fd))

## [3.15.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.14.1...v3.15.0) (2024-01-29)

### Refactors

- **bitmaptext:** added ability to extend class to use BitmapText ([67985b3](https://github.com/mimshwright/pixi-tagged-text/commit/67985b3c2559b4c5bed3570f678997ad3929f58b)), closes [#393](https://github.com/mimshwright/pixi-tagged-text/issues/393)

### [3.14.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.14.0...v3.14.1) (2024-01-14)

### Bug Fixes

- **layout:** fixed a linter warning ([e7c2dd3](https://github.com/mimshwright/pixi-tagged-text/commit/e7c2dd38d608937e696c17d4bfdcca280e3f4752))

### Chore

- **deps:** updated all other dependencies including prettier and jest ([39d5037](https://github.com/mimshwright/pixi-tagged-text/commit/39d5037735dd427a1682e3bd0842511d13dc1775))
- **deps:** updated dependencies ([83a430b](https://github.com/mimshwright/pixi-tagged-text/commit/83a430b83d949c6abb1f1326405e4c4fe0eddc25))
- **deps:** upgraded electron ([f6c7c7c](https://github.com/mimshwright/pixi-tagged-text/commit/f6c7c7c1ffc6505d84ce89e87b2365ba83f851d9))
- **deps:** upgraded typescript and other dependencies ([996c384](https://github.com/mimshwright/pixi-tagged-text/commit/996c3841360f118c0b78b8a1e24dbd3a6fc3c7ed))

## [3.14.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.13.0...v3.14.0) (2023-06-09)

### Bug Fixes

- **breakwords:** improved bug is breakWords ([dc30a9d](https://github.com/mimshwright/pixi-tagged-text/commit/dc30a9dbad86df49957275760fc6918c38e064bb)), closes [#48](https://github.com/mimshwright/pixi-tagged-text/issues/48)

### [3.13.2](https://github.com/mimshwright/pixi-tagged-text/compare/v3.13.0...v3.13.2) (2023-06-09)

### Bug Fixes

- **breakwords:** improved bug is breakWords ([dc30a9d](https://github.com/mimshwright/pixi-tagged-text/commit/dc30a9dbad86df49957275760fc6918c38e064bb)), closes [#48](https://github.com/mimshwright/pixi-tagged-text/issues/48)

### [3.13.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.13.0...v3.13.1) (2023-06-09)

### Bug Fixes

- **breakwords:** improved bug is breakWords ([dc30a9d](https://github.com/mimshwright/pixi-tagged-text/commit/dc30a9dbad86df49957275760fc6918c38e064bb)), closes [#48](https://github.com/mimshwright/pixi-tagged-text/issues/48)

## [3.13.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.12.0...v3.13.0) (2023-03-16)

### Features

- **breaklines:** added a style that allows you to disable word wrapping for the text in a tag ([00745aa](https://github.com/mimshwright/pixi-tagged-text/commit/00745aa2f69b1431e6545d6269c194ce488ffdeb)), closes [#214](https://github.com/mimshwright/pixi-tagged-text/issues/214)

### Bug Fixes

- **tags:** made a more specific error in cases where attributes are badly formed ([6f0d416](https://github.com/mimshwright/pixi-tagged-text/commit/6f0d41625ab14c12cd03654c2ba649cdf5fa09d5)), closes [#224](https://github.com/mimshwright/pixi-tagged-text/issues/224)

## [3.12.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.11.3...v3.12.0) (2023-03-13)

### Bug Fixes

- **stroke:** fixes issue where size of whitespace increased with the size of the stroke ([ad6bd1d](https://github.com/mimshwright/pixi-tagged-text/commit/ad6bd1d63e9c5f2743a06e7af1743d578c88a746)), closes [#303](https://github.com/mimshwright/pixi-tagged-text/issues/303)

### [3.11.2](https://github.com/mimshwright/pixi-tagged-text/compare/v3.11.1...v3.11.2) (2023-03-13)

### Chore

- **deps:** removed some unused deps ([916121c](https://github.com/mimshwright/pixi-tagged-text/commit/916121c74ef22b37f4fb413470bdf90d3d44f34c))
- **deps:** updated js-dom ([47fdacf](https://github.com/mimshwright/pixi-tagged-text/commit/47fdacfac8f3f81a0e2861c81ebe8186193d5134))
- **deps:** upgrade electron (for tests) ([f40cc79](https://github.com/mimshwright/pixi-tagged-text/commit/f40cc794393fa342bc1172cdbc765daa353cc0ee))
- **deps:** upgraded typescript and eslint ([69fb1ad](https://github.com/mimshwright/pixi-tagged-text/commit/69fb1ad2df63955d29c8a5473fe350295a583852))

### [3.11.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.11.0...v3.11.1) (2023-03-13)

### Chore

- **deps:** updated deps ([d0e923b](https://github.com/mimshwright/pixi-tagged-text/commit/d0e923be9f1e4d585702d75e5d657da30e181261))

## [3.11.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.10.1...v3.11.0) (2023-02-01)

### Features

- **icons:** added iconScale ([730bb46](https://github.com/mimshwright/pixi-tagged-text/commit/730bb4627177c626f60802a8a049fdcc3dca1b16)), closes [#329](https://github.com/mimshwright/pixi-tagged-text/issues/329)

### [3.10.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.10.0...v3.10.1) (2023-02-01)

### Bug Fixes

- **emoji:** fixed an issue where user styles for emoji are overwritten ([ddbd5d5](https://github.com/mimshwright/pixi-tagged-text/commit/ddbd5d5916f839b1dd7bedf99437ee949f83d008)), closes [#329](https://github.com/mimshwright/pixi-tagged-text/issues/329)

## [3.10.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.9.1...v3.10.0) (2022-12-02)

### Features

- **styles:** added color as an alias for the fill property ([29ab892](https://github.com/mimshwright/pixi-tagged-text/commit/29ab892bc93ecda11dde421b37ac527079ca8898)), closes [#207](https://github.com/mimshwright/pixi-tagged-text/issues/207)

### [3.9.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.9.0...v3.9.1) (2022-11-30)

- **pixi:** Made some changes to the code that will make the codebase more compatible with Pixi v7.

## [3.9.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.8.1...v3.9.0) (2022-11-30)

### Features

- **decorations:** added overdrawDecorations option ([989da3f](https://github.com/mimshwright/pixi-tagged-text/commit/989da3fd25be77dc2b8e59fecfa8539092d20602)), closes [#288](https://github.com/mimshwright/pixi-tagged-text/issues/288) [#288](https://github.com/mimshwright/pixi-tagged-text/issues/288)

### [3.8.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.8.0...v3.8.1) (2022-11-23)

### Chore

- **deps-dev:** bump husky from 8.0.1 to 8.0.2 ([6abb03e](https://github.com/mimshwright/pixi-tagged-text/commit/6abb03e9b2e8d5c2b21ac4529abca19b79d9b047))
- **deps-dev:** bump jsdom from 20.0.2 to 20.0.3 ([23b2676](https://github.com/mimshwright/pixi-tagged-text/commit/23b26762f3ce0579bf522399b9441bd2c81b9293))
- **deps-dev:** bump typescript from 4.8.4 to 4.9.3 ([48db222](https://github.com/mimshwright/pixi-tagged-text/commit/48db2220ec4a5f8ea69928ee6bf2189671eee8ac))
- **deps:** bump loader-utils from 3.2.0 to 3.2.1 ([45e0d61](https://github.com/mimshwright/pixi-tagged-text/commit/45e0d61a4d22c766af2dad1393154a13fe804b7b))
- **deps:** updated dependencies ([2145784](https://github.com/mimshwright/pixi-tagged-text/commit/2145784c038f41043c2ab3c44693ce0b6ca8c6c0))

## [3.8.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.6...v3.8.0) (2022-11-07)

### Chore

- **deps-dev:** bump canvas from 2.10.1 to 2.10.2 ([97769a4](https://github.com/mimshwright/pixi-tagged-text/commit/97769a4b95bfe569c6d95829f8e0ea4606c17de1))
- **deps-dev:** bump electron from 21.2.0 to 21.2.2 ([a6a5281](https://github.com/mimshwright/pixi-tagged-text/commit/a6a5281e3a1375a6e6085c58ee299f5c51df8985))
- **deps-dev:** bump jsdom from 19.0.0 to 20.0.2 ([7912d91](https://github.com/mimshwright/pixi-tagged-text/commit/7912d914846c6c623aa86d901673b92b4e0c1a86))
- **deps-dev:** bump microbundle from 0.15.0 to 0.15.1 ([2f4a6b3](https://github.com/mimshwright/pixi-tagged-text/commit/2f4a6b3addb4ce841d2d2923d6ca149209aa8187))
- **config:** cleaning up some small things in config files

### Tests

- **types:** improved coverage for types ([35078e8](https://github.com/mimshwright/pixi-tagged-text/commit/35078e859f4c740e69b034f95d6661c7f9879220))
- **layout:** improved test coverage for layout
- **styles:** improved test coverage for styles
- **functionalutils:** improved test coverage for functionalUtils
- **test:** fixed an issue with canvas package for testing
- **stringutil:** improved test coverage and simplified function
- **errorMessaging:** added test coverage for errorMessaging
- **pixiUtils:** added additional test coverage for pixiutils

### Build

- **eslint:** added exception for unused vars starting with underscore
- **build:** added coverage script
- **deps:** updated browser matrix

### Fix

- **tests:** Fixed a reference to a renamed function in tests.

### Refactor

- **general:** separated default options and styles and renamed some token types. Added even more detailed description to the types of tokens.

### Docs

- **docs:** added comments and reorganized.
- **readme:** tweak to readme

### [3.7.6](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.5...v3.7.6) (2022-10-25)

### Chore

- **deps-dev:** bump eslint-plugin-prettier from 4.0.0 to 4.2.1 ([9bf4253](https://github.com/mimshwright/pixi-tagged-text/commit/9bf4253bce40902716eec210fb3c6531ead3808b))

### Tests

- **taggedtext:** fixed a platform-specific pixel size test that broke after upgrading ([f74f723](https://github.com/mimshwright/pixi-tagged-text/commit/f74f723db205bb941a16a189cdfd934863284f48))

### [3.7.5](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.4...v3.7.5) (2022-06-13)

### Bug Fixes

- **styles:** fixed issue with attribute values that contain spaces ([a0c3e67](https://github.com/mimshwright/pixi-tagged-text/commit/a0c3e6728c713a7e9792ca932574943c49f72d96)), closes [#258](https://github.com/mimshwright/pixi-tagged-text/issues/258)

### Chore

- **deps-dev:** bump nth-check from 2.0.1 to 2.1.1 ([cc53290](https://github.com/mimshwright/pixi-tagged-text/commit/cc53290fd7a7924015aafcc02c45025fd912e9fd))
- **deps-dev:** bump standard-version from 9.3.2 to 9.5.0 ([5bd0a53](https://github.com/mimshwright/pixi-tagged-text/commit/5bd0a5372301c66fd86adc1c7648f594b9924fe4))
- **deps:** bump async from 2.6.3 to 2.6.4 ([34c6522](https://github.com/mimshwright/pixi-tagged-text/commit/34c652238599f8129f8c932f87b588c0e55719e2))

### [3.7.4](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.3...v3.7.4) (2022-05-29)

### Chore

- **republish:** 3.7.3 may have been corrupted during build. Please use this instead ([75911fb](https://github.com/mimshwright/pixi-tagged-text/commit/75911fb574be948d5094df95262de5df061ddb93))

### [3.7.3](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.2...v3.7.3) (2022-05-29)

**WARNING: THIS RELEASE MAY BE CORRUPTED. USE 3.7.4**

### Bug Fixes

- **valing:** fixed issue where valign and paragraphSpacing didn't work together ([7a4534b](https://github.com/mimshwright/pixi-tagged-text/commit/7a4534b84a95edb2fd525d72ef9dfe8acefb0769)), closes [#235](https://github.com/mimshwright/pixi-tagged-text/issues/235)

### [3.7.2](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.1...v3.7.2) (2022-05-27)

### Chore

- **deps-dev:** bump electron from 18.2.4 to 19.0.1 ([00c594a](https://github.com/mimshwright/pixi-tagged-text/commit/00c594afa79d9c0ed81e27d4f67a09a283fb6894))
- **deps-dev:** bump typescript from 4.6.4 to 4.7.2 ([1341543](https://github.com/mimshwright/pixi-tagged-text/commit/1341543b35188f100c4f4963674358816feaf2ca))

### [3.7.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.7.0...v3.7.1) (2022-05-27)

### Chore

- **deps-dev:** bump @types/jest from 27.4.1 to 27.5.0 ([dabfff8](https://github.com/mimshwright/pixi-tagged-text/commit/dabfff8d968047f3b036408631a6dc8ed1ec0000))
- **deps-dev:** bump electron from 18.0.1 to 18.2.4 ([a5d67e9](https://github.com/mimshwright/pixi-tagged-text/commit/a5d67e9a738d75e03ec3df440edd8bc8edd90ec4))
- **deps-dev:** bump fs-extra from 10.0.1 to 10.1.0 ([5a23a34](https://github.com/mimshwright/pixi-tagged-text/commit/5a23a3413d18caa2468bd7bd7d1292d59a5f7a86))
- **deps-dev:** bump husky from 7.0.4 to 8.0.1 ([c75d5bd](https://github.com/mimshwright/pixi-tagged-text/commit/c75d5bd72fa6837d5bfeb8badc0a22919bfb942d))
- **deps-dev:** bump jest-canvas-mock from 2.3.1 to 2.4.0 ([8744dad](https://github.com/mimshwright/pixi-tagged-text/commit/8744dad2724c70d6da2ce0efb9d73f4d21a4e0ec))
- **deps-dev:** bump microbundle from 0.14.2 to 0.15.0 ([9f6abe8](https://github.com/mimshwright/pixi-tagged-text/commit/9f6abe85ef5a2807a43359b1a71135a5312eff96))
- **deps-dev:** bump typescript from 4.6.3 to 4.6.4 ([321f4a0](https://github.com/mimshwright/pixi-tagged-text/commit/321f4a0e7e885f68cb1d1770f45be3088fa2c9a7))
- **deps:** bump convict from 6.2.1 to 6.2.3 ([7d06981](https://github.com/mimshwright/pixi-tagged-text/commit/7d06981663684237331459637b92919e1c1e2851))
- **deps:** bump ejs from 3.1.6 to 3.1.7 ([04fb6b5](https://github.com/mimshwright/pixi-tagged-text/commit/04fb6b5f5fd14c535f315a75777ae7cbdb073480))

## [3.7.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.6.1...v3.7.0) (2022-05-26)

### Bug Fixes

- **memory:** drastically improved memory performance and added new method destroyImgMap() ([caf3dd6](https://github.com/mimshwright/pixi-tagged-text/commit/caf3dd655c4e03ba2e4b111571202bd4fc2da219)), closes [#245](https://github.com/mimshwright/pixi-tagged-text/issues/245)

### Tests

- **imgmap:** adds more descriptive errors when a destroyed texture is used for the imgMap ([3a8b596](https://github.com/mimshwright/pixi-tagged-text/commit/3a8b5962dcbd8edd3f41c1c8874830ab02ff294c)), closes [#245](https://github.com/mimshwright/pixi-tagged-text/issues/245)
- **memory:** improved the memory test structure (memory.html) ([1edb970](https://github.com/mimshwright/pixi-tagged-text/commit/1edb97029d71802356482e0b16907e085bfa58e7)), closes [#245](https://github.com/mimshwright/pixi-tagged-text/issues/245)

### [3.6.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.6.0...v3.6.1) (2022-05-02)

### Bug Fixes

- **font-size:** fixes fontSize percentages in attributes ([bd9af9c](https://github.com/mimshwright/pixi-tagged-text/commit/bd9af9cb4ba613cc71efb86a1a3bd547e512f11f)), closes [#234](https://github.com/mimshwright/pixi-tagged-text/issues/234)

## [3.6.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.5.3...v3.6.0) (2022-04-05)

### Bug Fixes

- **memory:** improved memory management ([405eed9](https://github.com/mimshwright/pixi-tagged-text/commit/405eed9604d5109c307ef064516b26b11c63d0ea)), closes [#223](https://github.com/mimshwright/pixi-tagged-text/issues/223)

### [3.5.3](https://github.com/mimshwright/pixi-tagged-text/compare/v3.5.2...v3.5.3) (2022-04-05)

### Chore

- changed demo port number ([c2a7545](https://github.com/mimshwright/pixi-tagged-text/commit/c2a7545091df5ec3f94715091c5d1966d38b06af))
- **deps-dev:** bump electron from 17.1.2 to 18.0.1 ([ddc2963](https://github.com/mimshwright/pixi-tagged-text/commit/ddc2963c53cdfab22463f5890f411138f5a4279c))
- **deps-dev:** bump prettier from 2.6.0 to 2.6.2 ([9c3a0c4](https://github.com/mimshwright/pixi-tagged-text/commit/9c3a0c4220162ce49ee1eb9a4ccdefffa9ec9925))
- **deps-dev:** bump typescript from 4.6.2 to 4.6.3 ([ed602b5](https://github.com/mimshwright/pixi-tagged-text/commit/ed602b5207fe13f0f30dbf97d06b1f9c0516a025))
- **node:** bump node version to 16.14.2 ([9f3292c](https://github.com/mimshwright/pixi-tagged-text/commit/9f3292c51bde72a87b19f53cbc40f0d79c72f8df))
- removed vscode settings from repo ([d8731d7](https://github.com/mimshwright/pixi-tagged-text/commit/d8731d7c0440ca39d6565e62e47b05ba4b2b9196))

### [3.5.2](https://github.com/mimshwright/pixi-tagged-text/compare/v3.5.1...v3.5.2) (2022-03-25)

### Chore

- **deps-dev:** bump @types/jest from 27.4.0 to 27.4.1 ([368ab8d](https://github.com/mimshwright/pixi-tagged-text/commit/368ab8df9209e3781c393c36dd07b696ef6e82e8))
- **deps-dev:** bump canvas from 2.9.0 to 2.9.1 ([1d561cc](https://github.com/mimshwright/pixi-tagged-text/commit/1d561cc5072024fb378519e6853ea0afc263178b))
- **deps-dev:** bump electron from 17.0.1 to 17.1.2 ([877489a](https://github.com/mimshwright/pixi-tagged-text/commit/877489adb61fe396c74abf05551982465b7bb0c4))
- **deps-dev:** bump eslint-config-prettier from 8.4.0 to 8.5.0 ([1bad414](https://github.com/mimshwright/pixi-tagged-text/commit/1bad41478777f112bbcfb38c52fa1f5b15373134))
- **deps-dev:** bump fs-extra from 10.0.0 to 10.0.1 ([7a55103](https://github.com/mimshwright/pixi-tagged-text/commit/7a55103ac988ff058fa3d7a79ec3b908965ade86))
- **deps-dev:** bump prettier from 2.5.1 to 2.6.0 ([7f127d5](https://github.com/mimshwright/pixi-tagged-text/commit/7f127d5cdfde78b7276fc36415ab2140c3208555))
- **deps-dev:** bump typescript from 4.5.5 to 4.6.2 ([c2629e3](https://github.com/mimshwright/pixi-tagged-text/commit/c2629e3606d16e1d975155f00f565dd702d17dac))
- **deps:** updated dependencies thru dependabot ([f522f23](https://github.com/mimshwright/pixi-tagged-text/commit/f522f2349dcafdc0806928f5372bf4424a7cde66))

### [3.5.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.5.0...v3.5.1) (2022-03-19)

### Bug Fixes

- **alignment:** justified alignment types now correctly handle newlines ([d9fdf35](https://github.com/mimshwright/pixi-tagged-text/commit/d9fdf35c5bf82eed3af99e716b9d075da885bb80)), closes [#215](https://github.com/mimshwright/pixi-tagged-text/issues/215)

## [3.5.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.4.0...v3.5.0) (2022-03-17)

### Features

- **alignment:** adds support for more types of justify layout ([9097368](https://github.com/mimshwright/pixi-tagged-text/commit/9097368c65cdac5f94d43004ab0a8a864586e3b4)), closes [#215](https://github.com/mimshwright/pixi-tagged-text/issues/215)
  - **`"justify-left"`** - aka `"justify"`
  - **`"justify-center"`**
  - **`"justify-right"`**
  - **`"justify-all"`**

## [3.4.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.3.1...v3.4.0) (2022-02-27)

### Features

- **percent-sizes:** adds support for percentage-based fontSizes ([c9e5c9d](https://github.com/mimshwright/pixi-tagged-text/commit/c9e5c9d7c3d8148f9c1bf92fd90d99d31574611a)), closes [#107](https://github.com/mimshwright/pixi-tagged-text/issues/107)

### [3.3.1](https://github.com/mimshwright/pixi-tagged-text/compare/v3.3.0...v3.3.1) (2022-02-25)

### Bug Fixes

- **warnings:** added target to errorMessage ([3451653](https://github.com/mimshwright/pixi-tagged-text/commit/3451653016718f282e12683a9398209db03ba608)), closes [#204](https://github.com/mimshwright/pixi-tagged-text/issues/204)

## [3.3.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.2.0...v3.3.0) (2022-02-25)

### Features

- **warnings:** added an errorHandler in the options ([89bf6c8](https://github.com/mimshwright/pixi-tagged-text/commit/89bf6c85a7e4ad5a1fe84bf398d5f1035000812e)), closes [#204](https://github.com/mimshwright/pixi-tagged-text/issues/204)

### Refactors

- **pixiutils:** removed an unused function from pixiUtils ([8b03623](https://github.com/mimshwright/pixi-tagged-text/commit/8b036232dced07a2bfc80e0b7948a8e591b76eef))

### Chore

- **tests:** mocked the console object in tests ([0d3266e](https://github.com/mimshwright/pixi-tagged-text/commit/0d3266ee466dfc6e4921ac6581b22c716c4307a9)), closes [#204](https://github.com/mimshwright/pixi-tagged-text/issues/204)

## [3.2.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.1.0...v3.2.0) (2022-02-24)

### Chore

- **deps:** upgraded Pixi to latest version 6.2.x ([377caa1](https://github.com/mimshwright/pixi-tagged-text/commit/377caa12f9a34221e4d96e285028c0fecc886cdc))
- **deps:** Upgraded pixi.js to latest version 6 release ([d168353](https://github.com/mimshwright/pixi-tagged-text/commit/d16835378c82c6758646970722bec10a6b52aef7))

## [3.1.0](https://github.com/mimshwright/pixi-tagged-text/compare/v3.0.0...v3.1.0) (2022-02-23)

### Features

- **adjustbaseline:** added a style property 'adjustBaseline' ([a3d7c4c](https://github.com/mimshwright/pixi-tagged-text/commit/a3d7c4c473d4cb39ad2ae870fed15b4040e6b164)), closes [#108](https://github.com/mimshwright/pixi-tagged-text/issues/108)

### Documentation

- **readme:** clarified in README that styles inherit from PIXI.TextStyle ([0cba2b9](https://github.com/mimshwright/pixi-tagged-text/commit/0cba2b970d920ea19fd962810417c188bf7054ca)), closes [#193](https://github.com/mimshwright/pixi-tagged-text/issues/193)

## [3.0.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.7.1...v3.0.0) (2022-02-21)

### ⚠ BREAKING CHANGES

- **pixi.js v6:** Going forward, this project will target v6 of pixi.js

### Refactors

- **pixi.js v6:** added support for pixi.js@~6.1.0 ([bfcc3a6](https://github.com/mimshwright/pixi-tagged-text/commit/bfcc3a6767da3666d7800c172451de2715df1e17)), closes [#119](https://github.com/mimshwright/pixi-tagged-text/issues/119) [#52](https://github.com/mimshwright/pixi-tagged-text/issues/52)

### [2.7.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.7.0...v2.7.1) (2022-02-21)

### Bug Fixes

- **letterspacing for icon images:** added letterSpacing between icon images ([8332d08](https://github.com/mimshwright/pixi-tagged-text/commit/8332d08ec96087fd936d25bd500d7a4b6444f901)), closes [#194](https://github.com/mimshwright/pixi-tagged-text/issues/194)
- **letterspacing:** improved support for letterSpacing ([006bafe](https://github.com/mimshwright/pixi-tagged-text/commit/006bafeae3f3ab634307893c0faec63636810658)), closes [#203](https://github.com/mimshwright/pixi-tagged-text/issues/203)

### Chore

- **tests:** removed a skipped test ([db83523](https://github.com/mimshwright/pixi-tagged-text/commit/db8352316b2a54a9cafd587d9de06657b914c851))

## [2.7.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.6.0...v2.7.0) (2022-02-17)

### Features

- **adjustFontBaseline:** Added basic support for overriding font properties. ([52db534](https://github.com/mimshwright/pixi-tagged-text/commit/52db534d574cc9fcc94569ca2b90899f493abe98)), closes [#108](https://github.com/mimshwright/pixi-tagged-text/issues/108)

## [2.6.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.6...v2.6.0) (2022-02-16)

Since several patches related to the changelog and dependabot updates were released as I configured `standard-version`, I'm combining the following patches into 2.6.0

- [2.5.6](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.5...v2.5.6)

- [2.5.5](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.4...v2.5.5)

- [2.5.4](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.3...v2.5.4)

- [2.5.3](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.2...v2.5.3)

- [2.5.2](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.1...v2.5.2)

- [2.5.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.5.0...v2.5.1)

### Documentation

- **changelog:** retroactively completed the changelog by hand based on git history [7830fb4]
- **changelog:** Added changelog.
- **changelog:** Added standard-version and commitizen for automating changelogs.
- **changelog:** added a pretteir fix for changelog before commit so it doesn't break ([42e924d](https://github.com/mimshwright/pixi-tagged-text/commit/42e924deedbfc70119465d39b9332f3602a8a759))

### Chore

- **deps-dev:** bump @types/emoji-regex from 8.0.0 to 9.2.0 ([780bc63](https://github.com/mimshwright/pixi-tagged-text/commit/780bc63656ab071a9fb9a75febe75215ce00da06))
- **deps-dev:** bump @types/jest from 27.0.3 to 27.4.0 ([ad7b072](https://github.com/mimshwright/pixi-tagged-text/commit/ad7b0721ad2d594f14b78835e515eb6be8d1d24c))
- **deps:** bump follow-redirects from 1.14.1 to 1.14.8 ([23db225](https://github.com/mimshwright/pixi-tagged-text/commit/23db22547c2481dbaea3b9778b46fe68906604d6))
- **deps:** bump nanoid from 3.1.23 to 3.2.0 ([0789c1f](https://github.com/mimshwright/pixi-tagged-text/commit/0789c1faed1fe18e6226f2df884a15250902fbaf))
- **deps-dev:** Several additional dependabot updates

## [2.5.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.4.0...v2.5.0) (2021-12-06)

### Features

- **styles** - Added paragraph spacing - closes [#174](https://github.com/mimshwright/pixi-tagged-text/issues/174)

### Chore

- **deps**: Updated node version
- **deps-dev**: upgraded prettier, jsdom, @types/jest, typescript, microbundle

## [2.4.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.6...v2.4.0) (2021-11-17)

- fix(icons): #179 Icon sprites now scale when fontscale is set. can be overridden with the scaleIcons flag in options

### [2.3.6](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.5...v2.3.6) (2021-11-17)

- fix: #180 regarding regex flag

- chore(deps-dev): upgraded jsdom

### [2.3.5](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.4...v2.3.5) (2021-11-05)

- fix: #171 - Error when using justified layout on a line with only whitespace.

### [2.3.4](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.3...v2.3.4) (2021-11-04)

- fix: resolves issue with emoji-regex version

- chore(deps): Upgraded node version
- chore(deps-dev): upgraded microbundle

### [2.3.3](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.2...v2.3.3) (2021-10-27)

- chore(deps-dev): upgraded typescript
- chore(deps): upgraded emoji-regex

### [2.3.2](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.1...v2.3.2) (2021-10-27)

- chore(deps-dev): upgraded http-server, husky, standard-version

### [2.3.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.3.0...v2.3.1) (2021-10-15)

- chore(deps-dev): upgraded @typescript-eslint/eslint-plugin, jsdom, @typescript-eslint/parser, @types/jest, prettier, http-server, typescript, eslint-plugin-prettier, husky
- chore(deps): upgraded tmpl, upgraded tar

## [2.3.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.11...v2.3.0) (2021-08-05)

- feat(text-decoration): Adds support for default color and thickness of text decorations.

- chore(deps-dev): upgraded @typescript-eslint/eslint-plugin, eslint, jsdom, @typescript-eslint/parser
- chore(deps): upgraded tar

### [2.2.11](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.10...v2.2.11) (2021-08-02)

- feat: Added defaultOptions as a static property

### [2.2.10](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.9...v2.2.10) (2021-07-29)

- feat: Added defaultStyles as a static property

### [2.2.9](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.8...v2.2.9) (2021-07-28)

- NO CHANGES

### [2.2.8](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.7...v2.2.8) (2021-07-28)

- Fixes issue where space from previous line appears on next line.

- chore(deps-dev): upgraded @typescript-eslint/eslint-plugin, @typescript-eslint/parser

### [2.2.7](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.6...v2.2.7) (2021-07-25)

- fix(wordWrap): #100, #118 - weird issues with word wrapping when the last word would cause the line to wrap.

- chore(deps-dev): updated dependencies

### [2.2.6](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.5...v2.2.6) (2021-07-22)

- fix: minor fix for typescript types

### [2.2.5](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.4...v2.2.5) (2021-07-22)

- chore: Changed target for tsconfig

- chore(deps-dev): upgraded @typescript-eslint/parser, @typescript-eslint/eslint-plugin

### [2.2.4](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.3...v2.2.4) (2021-07-12)

- fix: Fixed bugs with wrapping emoji.
- fix: Changed how files are compiled to fix issue with regexp

- chore(deps-dev): upgraded husky

### [2.2.3](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.2...v2.2.3) (2021-07-12)

- feat(emoji): #71 Added support for emoji

- chore(deps-dev): upgraded @types/jest, @typescript-eslint/parser, @typescript-eslint/eslint-plugin

### [2.2.2](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.2-beta1...v2.2.2) (2021-07-06)

- fix: #106 - Changed the method for scaling text to get sharper results by scaling up the font-size and inverting the text-scale.

- chore(deps-dev): upgraded @typescript-eslint/parser, @typescript-eslint/eslint-plugin, typescript, husky, eslint

### [2.2.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.2.0...v2.2.1) (2021-06-30)

- fix: changed how fontScales are handled in edge cases

## [2.2.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.4...v2.2.0) (2021-06-30)

- feat: #87 - Added fontScaleWidth and fontScaleHeight

- chore(deps-dev): upgraded prettier & other dependencies

### [2.1.4](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.3...v2.1.4) (2021-06-27)

- feat: #57 - Allow setting sprite map sprites using the same inputs as Sprite.from() or Texture.from(). Added ability to work with sprites from non-sprite references including URLs

### [2.1.3](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.2...v2.1.3) (2021-06-26)

- fix: #60 - wordWrap:false is now supported and weird values for wordWrapWidth like -1 and NaN are ignored.

- chore(deps-dev): updated dev dependencies on jsdom and canvas

### [2.1.2](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.1...v2.1.2) (2021-06-25)

- NO CHANGES

### [2.1.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.0...v2.1.1) (2021-06-25)

- feat(text-decoration): Support for underline, overline, and strikethrough #68

- fix:moved default styles to style to avoid circular dependency

- chore(deps-dev): upgraded @typescript-eslint/parser, @typescript-eslint/eslint-plugin
- chore(deps): upgraded postcss

## [2.1.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.1.0-beta.1...v2.1.0) (2021-06-25)

- feat: #54 Added text-transform but now seeing issues with positioning of the text since the layout happens before hte transformation.
- Fix(text-decoration): Got the text decorations working much better. Still to fix, make decoration lines stretch across entire tag / line. More testing of edge cases.

- chore(demo): updated pixi version in demo
- chore(demo): Updated demos to avoid warnings in console

- chore(deps-dev): upgraded microbundle, prettier, microbundle, typescript, eslint, @typescript-eslint/eslint-plugin, @typescript-eslint/parser
- chore(deps): upgraded ws

### [2.0.3](https://github.com/mimshwright/pixi-tagged-text/compare/v2.0.2...v2.0.3) (2021-05-30)

- fix #67 - icon sizes at the beginning of a line

- chore(deps-dev): upgraded eslint

### [2.0.2](https://github.com/mimshwright/pixi-tagged-text/compare/v2.0.1...v2.0.2) (2021-05-21)

- Fixed #66 - self-closing tags
- Fixed prettier issue

### [2.0.1](https://github.com/mimshwright/pixi-tagged-text/compare/v2.0.0...v2.0.1) (2021-05-19)

- fix: #49 Added stroke size into calculation of baseline.
- chore(test): Unflagged some tests that were being skipped.

- chore(deps-dev): upgraded canvas, @typescript-eslint/parser

## [2.0.0](https://github.com/mimshwright/pixi-tagged-text/compare/v2.0.0-beta.7...v2.0.0) (2021-05-16)

- First full version since forking from pixi-rich-text
