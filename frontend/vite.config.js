import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // This is correct for ESM

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // This alias looks fine
    },
  },
});
