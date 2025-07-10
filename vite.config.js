import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === "production",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 8080,
  },
});
