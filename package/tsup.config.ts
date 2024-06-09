import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/models.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  target: "es2020",
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true, // generate dts files
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
});
