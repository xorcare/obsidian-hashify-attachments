import { build } from "esbuild";
import process from "process";

build({
  bundle: true,
  entryPoints: ["./src/main.ts"],
  external: ["obsidian"],
  format: "cjs",
  loader: { ".json": "json" },
  logLevel: "info",
  minify: true,
  outfile: "main.js",
  platform: "browser",
  sourcemap: true,
  target: "es2018",
  treeShaking: true,
}).catch(() => process.exit(1));
