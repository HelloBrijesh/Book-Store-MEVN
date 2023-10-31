import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://book-store-server-uze2.onrender.com",
    },
  },
  plugins: [vue()],
});
