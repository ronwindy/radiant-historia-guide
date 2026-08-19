import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://ronwindy.github.io',
  base: process.env.NODE_ENV === 'production' ? '/radiant-historia-guide/' : '/',
  build: {
    format: 'directory'
  }
});
