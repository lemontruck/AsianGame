import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({ build: { rollupOptions: { input: { matches: resolve(import.meta.dirname, 'matches/index.html'), rules: resolve(import.meta.dirname, 'archery-rules/index.html'), main: resolve(import.meta.dirname, 'index.html'), blog: resolve(import.meta.dirname, 'blog/index.html'), story: resolve(import.meta.dirname, '2026-asian-games-archery-results/index.html') } } } });
