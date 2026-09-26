import { defineConfig } from 'astro/config';

export default defineConfig({
  // Keep built CSS in an external stylesheet, even when it is small.
  build: { inlineStylesheets: 'never' },
});
