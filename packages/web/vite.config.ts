import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs(), relay],
  resolve: {
    mainFields: ['main', 'module'],
  },
});
