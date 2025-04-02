import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  output: 'static',
  integrations: [tailwind(), react()],
  site: 'https://apachenergy.com',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    logLevel: 'info',
    clearScreen: false
  },
  server: {
    host: true
  }
});