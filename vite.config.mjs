import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  // Staging is deployed under /dev/; production and local development use /.
  base: mode === "staging" ? "/dev/" : "/",

  plugins: [
    react(),
    // Support SVG files imported explicitly as React components with ?react.
    svgr(),
  ],

  // Keep the existing build directory used by the PM2 deployment.
  build: {
    outDir: "build",
  },
}));
