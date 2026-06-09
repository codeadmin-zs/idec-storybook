import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  injectStyle: false,
  esbuildOptions(options) {
    options.banner = { js: "'use client';" };
  },
  loader: { '.css': 'copy' },
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.js' };
  },
  onSuccess: async () => {
    mkdirSync('dist', { recursive: true });
    copyFileSync('src/styles/styles.css', 'dist/styles.css');
    console.log('copied styles.css -> dist/styles.css');
  },
});
