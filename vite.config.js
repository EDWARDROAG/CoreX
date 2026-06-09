// vite.config.js
// frontend/vite.config.js - Versión simplificada para GitHub Pages

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CoreX/',
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@services': '/src/services',
      '@styles': '/src/styles'
    }
  }
})