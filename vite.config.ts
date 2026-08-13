import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { umamiScriptTag } from './src/config/blog';

/**
 * Adds the analytics tag to index.html at build time. The blog generator reads
 * the same config, so both halves of the site are always tagged the same way,
 * and dev runs stay untracked.
 */
function analytics(): Plugin {
  return {
    name: 'novada-analytics',
    apply: 'build',
    transformIndexHtml(html) {
      const tag = umamiScriptTag();
      return tag === '' ? html : html.replace('</head>', `  ${tag}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), analytics()],
  build: {
    chunkSizeWarningLimit: 800,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
