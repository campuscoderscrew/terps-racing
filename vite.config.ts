import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  base: "/terps-racing/",
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    imagemin({
      webp: { quality: 75 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.6, 0.8] },
      svgo: {},
    }),
  ],
});