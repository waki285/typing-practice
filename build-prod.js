const { build, transform } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { copy:copyPlugin } = require("esbuild-plugin-copy");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const postcssPresetEnv = require("postcss-preset-env");
const TailwindSettings = require("./tailwind.config.js");

build({
  entryPoints: ["src/js/client.tsx"],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: "ES2021",
  outdir: "dist",
  platform: "browser",
  tsconfig: "tsconfig.json",
  logLevel: "info",
  loader: {
    ".png": "file",
  },
  plugins: [
    sassPlugin({
      type: "style",
      filter: /\.s(c|a)ss$/,
      async transform(source, resolveDir) {
        const { css } = await postcss([tailwindcss(TailwindSettings), require("autoprefixer"), postcssPresetEnv])
          .process(source, { from: undefined });
        return css;
      }
    }),
    copyPlugin({
      resolveFrom: "cwd",
      assets: [
        { from: "public/**/*", to: "dist/" }
      ]
    }),
  ]
});