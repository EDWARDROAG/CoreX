import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const deployTarget = process.env.VITE_DEPLOY_TARGET || env.VITE_DEPLOY_TARGET;
  const isGhPages =
    mode === 'gh-pages' ||
    (mode === 'production' && deployTarget === 'github');

  return {
    plugins: [
      react(),
      ...(isGhPages
        ? [{
            name: 'github-pages-spa-fallback',
            closeBundle() {
              const distDir = resolve(__dirname, 'dist');
              copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'));
            },
          }]
        : []),
    ],
    base: isGhPages ? '/CoreX/' : '/',
    server: {
      port: 5506,
      strictPort: true,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3004',
          changeOrigin: true,
        },
        '/uploads': {
          target: 'http://localhost:3004',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 5506,
      strictPort: true,
      host: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@hooks': '/src/hooks',
        '@utils': '/src/utils',
        '@services': '/src/services',
        '@styles': '/src/styles',
      },
    },
  };
});
