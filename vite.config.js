// vite.config.js
// frontend/vite.config.js - Versión simplificada para GitHub Pages

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist')
        copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
      },
    },
  ],
  base: '/CoreX/',
  server: {
    port: 5174,
    strictPort: false,
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