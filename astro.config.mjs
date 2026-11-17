// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed on GitHub Pages as a project site: https://2falx.github.io/danielefalcetta/
export default defineConfig({
  site: 'https://2falx.github.io',
  base: '/danielefalcetta',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
    }),
  ],
});
