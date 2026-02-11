import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3111, // Fixed port for WebContainer
    strictPort: true, // Fail if port is already in use
    host: true, // Listen on all addresses (0.0.0.0)
    watch: {
      usePolling: true, // CRITICAL - enables file watching in virtualized filesystem
    },
    hmr: {
      port: 3111, // Hot Module Replacement on same port
    },
  },
});
