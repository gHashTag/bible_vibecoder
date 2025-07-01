/// <reference types="vitest/globals" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: process.cwd(),
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['src/__tests__/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist_backup/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    clearMocks: true,
    mockReset: true,
    reporters: ['default', 'html'],
    outputFile: 'html/index.html',
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text', 'json'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/dist_backup/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': 'src',
    },
  },
});
