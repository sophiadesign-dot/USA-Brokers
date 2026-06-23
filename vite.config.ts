import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Доступ з LAN; для HMR відкривай у браузері той самий host, що виводить Vite (не змішуй localhost і 127.0.0.1).
    host: true,
    port: 5173,
    strictPort: false,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
    warmup: {
      clientFiles: ['./index.html', './src/main.tsx', './src/assets/styles/index.scss'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-hook-form', 'zod', '@hookform/resolvers/zod'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, './src')],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
});
