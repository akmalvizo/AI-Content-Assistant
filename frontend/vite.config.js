// vite.config.js
// Vite configuration for AI Content Assistant.
//
// Dev proxy: all /api/* and /health requests are forwarded to the FastAPI
// backend at localhost:8000. This means:
//   - No CORS issues during development (same-origin from the browser's view)
//   - The backend URL only needs to be changed here, not in the app code
//
// Production: Axios uses VITE_API_URL (set in Vercel environment variables)
//             pointing to the Render backend. The proxy is not used.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    strictPort: false, // fall back to 5174 if 5173 is taken

    proxy: {
      // All requests beginning with /api are forwarded to FastAPI
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      // Health check endpoint (no /api prefix on the backend)
      '/health': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
