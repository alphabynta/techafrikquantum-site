import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alphabynta.github.io',
  base: '/techafrikquantum-site',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
