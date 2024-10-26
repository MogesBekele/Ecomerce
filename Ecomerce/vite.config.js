import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all available interfaces
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
