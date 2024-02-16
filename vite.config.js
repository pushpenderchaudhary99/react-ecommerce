import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Display error overlay on the webpage
    overlay: {
      warnings: false,
      errors: true,
    },
  },
});
