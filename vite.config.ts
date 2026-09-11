import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/terps-racing/",
  plugins: [tailwindcss(), tsconfigPaths()],
  build: {
    // Large photo library — raise the warning bar rather than spamming the log.
    chunkSizeWarningLimit: 1200,
    assetsInlineLimit: 4096,
  },
});
