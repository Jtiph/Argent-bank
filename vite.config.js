import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    open: true, // Ouvre le navigateur automatiquement
    port: 3002,
    strictPort: true, // Force l'utilisation du port 3001
    historyApiFallback: true, //  Redirige toutes les routes vers index.html
  },
});
