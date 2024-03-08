import { defineConfig } from "tsup";
import fs from "fs";

function copyToDist(fileName: string): void {
  fs.copyFile(fileName, `dist/${fileName}`, (err) => {
    if (err) {
      console.error(`Error copying ${fileName} to dist: ${err}`)
    } else {
      console.log(`${fileName} was copied to dist`);
    }
  });
}

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/methods/index.ts",
    "./src/apis/index.ts",
    "./src/client/index.ts",
    "./src/models/index.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  treeshake: true,
  minify: true,
  bundle: true,
  sourcemap: true,
  clean: true,
  noExternal: [],
  onSuccess: async (): Promise<void> => {
    copyToDist("package.json");
    copyToDist("README.md");
  },
});